import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapComponent() {
  const [position, setPosition] = useState([
    28.6139,
    77.2090,
  ]); // Default: Delhi

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([
          pos.coords.latitude,
          pos.coords.longitude,
        ]);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{
        height: "500px",
        width: "100%",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>
          📍 Your Current Location
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;