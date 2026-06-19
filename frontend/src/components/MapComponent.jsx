import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function RecenterMap({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 15);
    }
  }, [center, map]);

  return null;
}

function MapComponent({
  userLocation,
  services = [],
  volunteers = [],
}) {
  const center = userLocation
    ? [userLocation.lat, userLocation.lon]
    : [28.6139, 77.2090];

  const userIcon = L.divIcon({
    html: "🟢",
    className: "",
    iconSize: [25, 25],
  });

  return (
    <MapContainer
      center={center}
      zoom={15}
      style={{
        height: "500px",
        width: "100%",
      }}
    >
      <RecenterMap center={center} />

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User */}
      {userLocation && (
        <>
          <Marker
            position={[
              userLocation.lat,
              userLocation.lon,
            ]}
            icon={userIcon}
          >
            <Popup>
              📍 Your Current Location
            </Popup>
          </Marker>

          <Circle
            center={[
              userLocation.lat,
              userLocation.lon,
            ]}
            radius={3000}
          />
        </>
      )}

      {/* Services */}
      {services.map((service) => (
        <Marker
          key={`service-${service.id}`}
          position={[service.lat, service.lon]}
        >
          <Popup>
            <div>
              <h3>{service.name}</h3>
              <p>{service.type}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Volunteers */}
      {volunteers.map((volunteer) => (
        <Marker
          key={`volunteer-${volunteer.id}`}
          position={[
            volunteer.lat,
            volunteer.lon,
          ]}
        >
          <Popup>
            <div>
              <h3>🤝 {volunteer.name}</h3>

              <p>
                <strong>Skill:</strong>{" "}
                {volunteer.skill}
              </p>

              <p>
                <strong>Distance:</strong>{" "}
                {volunteer.distanceKm} km
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {volunteer.phone}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;