const express = require("express");
const router = express.Router();

const RADIUS = 3000;

const OVERPASS_SERVERS = [
  "https://overpass-api.de/api/interpreter",
  "https://lz4.overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
];

router.get("/nearby", async (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lon = parseFloat(req.query.lon);

  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({
      error: "Latitude and Longitude are required",
    });
  }

  const query = `
[out:json][timeout:25];
(
  node["amenity"="hospital"](around:${RADIUS},${lat},${lon});
  way["amenity"="hospital"](around:${RADIUS},${lat},${lon});
  relation["amenity"="hospital"](around:${RADIUS},${lat},${lon});

  node["amenity"="police"](around:${RADIUS},${lat},${lon});
  way["amenity"="police"](around:${RADIUS},${lat},${lon});
  relation["amenity"="police"](around:${RADIUS},${lat},${lon});

  node["amenity"="fire_station"](around:${RADIUS},${lat},${lon});
  way["amenity"="fire_station"](around:${RADIUS},${lat},${lon});
  relation["amenity"="fire_station"](around:${RADIUS},${lat},${lon});

  node["amenity"="pharmacy"](around:${RADIUS},${lat},${lon});
  way["amenity"="pharmacy"](around:${RADIUS},${lat},${lon});
  relation["amenity"="pharmacy"](around:${RADIUS},${lat},${lon});
);
out center;
`;

  let data = null;

  for (const server of OVERPASS_SERVERS) {
    try {
      console.log(`Trying ${server}`);

      const response = await fetch(server, {
        method: "POST",
        body: query,
      });

      if (!response.ok) {
        console.log(`${server} returned ${response.status}`);
        continue;
      }

      data = await response.json();

      console.log(`Using ${server}`);
      break;
    } catch (err) {
      console.log(`${server} failed`);
    }
  }

  if (!data) {
    console.log("Using fallback emergency services");
    return res.json([
  {
    id: 1,
    name: "Civil Hospital",
    type: "hospital",
    lat: 32.2942,
    lon: 75.6545,
  },
  {
    id: 2,
    name: "Police Station",
    type: "police",
    lat: 32.2910,
    lon: 75.6520,
  },
  {
    id: 3,
    name: "Fire Station",
    type: "fire_station",
    lat: 32.2953,
    lon: 75.6518,
  },
  {
    id: 4,
    name: "Apollo Pharmacy",
    type: "pharmacy",
    lat: 32.2909,
    lon: 75.6557,
  }
]);
  }

  const unique = new Map();

  data.elements.forEach((el) => {
    const latitude = el.lat ?? el.center?.lat;
    const longitude = el.lon ?? el.center?.lon;

    if (!latitude || !longitude) return;

    const place = {
      id: el.id,
      name: el.tags?.name || el.tags?.amenity || "Unknown",
      type: el.tags?.amenity || "Unknown",
      lat: latitude,
      lon: longitude,
    };

    unique.set(`${place.type}-${place.id}`, place);
  });

  res.json([...unique.values()]);
});

module.exports = router;