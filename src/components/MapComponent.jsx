import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapComponent() {
  return (
    <MapContainer
      center={[28.6139, 77.2090]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[28.6139, 77.2090]}>
        <Popup>
          Current Location
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;