import policeImg from "..//assets/police.png"
import hospitalImg from "../assets/hospital.png";
import fireImg from "..//assets/fire_station.png"
import pharmacyImg from "../assets/pharmacy.png";
import volunteerImg from "../assets/volunteer.png";
import incidentImg from "../assets/incident_report.png";
import userImg from "../assets/you_user.png";

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
const policeIcon = L.icon({
  iconUrl: policeImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const hospitalIcon = L.icon({
  iconUrl: hospitalImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const fireIcon = L.icon({
  iconUrl: fireImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const pharmacyIcon = L.icon({
  iconUrl: pharmacyImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const volunteerIcon = L.icon({
  iconUrl: volunteerImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const incidentIcon = L.icon({
  iconUrl: incidentImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const userIcon = L.icon({
  iconUrl: userImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function RecenterMap({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 15);
    }
  }, [center, map]);

  return null;
}
function FlyToLocation({
  selectedTarget,
  userLocation,
  services,
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedTarget) return;

    if (
      selectedTarget === "user" &&
      userLocation
    ) {
      map.flyTo(
        [userLocation.lat, userLocation.lon],
        17,
        {
          duration: 1.5,
        }
      );

      return;
    }

    const service = services.find(
      (s) => s.type === selectedTarget
    );

    if (service) {
      map.flyTo(
        [service.lat, service.lon],
        17,
        {
          duration: 1.5,
        }
      );
    }
  }, [
    selectedTarget,
    userLocation,
    services,
    map,
  ]);

  return null;
}

function MapComponent({
  userLocation,
  services = [],
  volunteers = [],
  reports = [],
  selectedTarget,
})
 {
  const center = userLocation
    ? [userLocation.lat, userLocation.lon]
    : [28.6139, 77.2090];

  

  return (
    <MapContainer
      center={center}
      zoom={15}
      style={{
        height: "80vh",
        width: "100%",
      }}
    >
      <RecenterMap center={center} />

      <FlyToLocation
  selectedTarget={selectedTarget}
  userLocation={userLocation}
  services={services}
/>

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
  icon={
    service.type === "police"
      ? policeIcon
      : service.type === "hospital"
      ? hospitalIcon
      : service.type === "fire_station"
      ? fireIcon
      : pharmacyIcon
  }
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
  icon={volunteerIcon}
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
    {/* Incident Reports */}
{reports.map((report, index) => {
  if (!report.location) return null;

  const [lat, lon] = report.location
    .split(",")
    .map((coord) => Number(coord.trim()));

  return (
   <Marker
  key={`report-${index}`}
  position={[lat, lon]}
  icon={incidentIcon}
>
      <Popup>
        <div>
          <h3>🚨 {report.incidentType}</h3>

          <p>
            <strong>Severity:</strong>{" "}
            {report.severity}
          </p>

          <p>{report.description}</p>
        </div>
      </Popup>
    </Marker>
  );
})}

{/* Hazard Circles */}
{reports.map((report, index) => {
  if (!report.location) return null;

  const [lat, lon] = report.location
    .split(",")
    .map((coord) => Number(coord.trim()));

  let radius = 100;

  if (report.severity === "Medium")
    radius = 250;

  if (report.severity === "High")
    radius = 500;

  return (
    <Circle
      key={`hazard-${index}`}
      center={[lat, lon]}
      radius={radius}
      pathOptions={{
        color:
          report.severity === "High"
            ? "red"
            : report.severity === "Medium"
            ? "orange"
            : "yellow",
        fillOpacity: 0.2,
      }}
    />
  );
})}
  
    </MapContainer>
  );
}

export default MapComponent;