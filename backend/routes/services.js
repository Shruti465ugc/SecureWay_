const express = require('express')
const router = express.Router()

const RADIUS = 3000

router.get('/nearby', async (req, res) => {
  const lat = parseFloat(req.query.lat)
  const lon = parseFloat(req.query.lon)

  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ error: 'lat and lon required' })
  }

  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="hospital"](around:${RADIUS},${lat},${lon});
      node["amenity"="police"](around:${RADIUS},${lat},${lon});
      node["amenity"="fire_station"](around:${RADIUS},${lat},${lon});
      node["amenity"="pharmacy"](around:${RADIUS},${lat},${lon});
    );
    out center 30;
  `

  try {
    const resp = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query
    })

    if (!resp.ok) {
      throw new Error('overpass returned ' + resp.status)
    }

    const data = await resp.json()

    const places = data.elements.map(el => ({
      id: el.id,
      name: el.tags && el.tags.name ? el.tags.name : el.tags.amenity,
      type: el.tags.amenity,
      lat: el.lat,
      lon: el.lon
    }))

    res.json(places)
  } catch (err) {
    console.log('overpass failed:', err.message)
    res.status(502).json({ error: 'failed to fetch nearby services' })
  }
})

module.exports = router
