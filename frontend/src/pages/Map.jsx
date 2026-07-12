import { useEffect, useState } from "react";
import BottomNav from "./BottomNav";
import MapComponent from "./MapComponent";
import PageHeader from "./PageHeader";
import "../styles/Map.css";

function Map() {
  const [services, setServices] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("Detecting location...");
  const [error, setError] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const highIncidents = reports.filter(
    (r) => r.severity === "High"
  ).length;
  useEffect(() => {
    fetchNearbyServices();
  }, []);

  const fetchNearbyServices = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          setUserLocation({ lat, lon });

          setLocation(
            `${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E`
          );

          const res = await fetch(
            `https://safepath-hackhazard-project.onrender.com/api/services/nearby?lat=${lat}&lon=${lon}`
          );

          const data = await res.json();

          if (!res.ok) {
            throw new Error(
              data.error || "Failed to fetch nearby services"
            );
          }

          setServices(data);
          console.log("Services:", data);
          try {
            const volunteerRes = await fetch(
              `https://safepath-hackhazard-project.onrender.com/api/volunteers/verified`
            );

            const volunteerData = await volunteerRes.json();

            if (volunteerRes.ok) {
              setVolunteers(volunteerData);
            }
            const reportsRes = await fetch(
              "https://safepath-hackhazard-project.onrender.com/api/reports"
            );

            const reportsData = await reportsRes.json();

            if (reportsRes.ok) {
              setReports(reportsData);
            }
          } catch (err) {
            console.error("Volunteer fetch error:", err);
          }
          setError(null);
        } catch (err) {
          console.error("Service fetch error:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("Location error:", err);
        setError("Location permission denied");
        setLoading(false);
      }
    );
  };


  const getIcon = (type) => {
    switch (type) {
      case "police":
        return "🚓";
      case "hospital":
        return "🏥";
      case "fire_station":
        return "🚒";
      case "pharmacy":
        return "💊";
      default:
        return "📍";
    }
  };

  const getTypeName = (type) => {
    switch (type) {
      case "police":
        return "Police Station";
      case "hospital":
        return "Hospital";
      case "fire_station":
        return "Fire Station";
      case "pharmacy":
        return "Pharmacy";
      default:
        return type;
    }
  };

  return (
    <div className="map-page">
      <PageHeader />

      <section className="map-header">
        <h1>🗺️ Live Emergency Map</h1>
        <p>
          View your current location and nearby emergency
          services in real time.
        </p>
      </section>

      <section className="location-card">
        <h3>📍 Current Location</h3>
        <p>{location}</p>
        <span>🟢 GPS Active</span>
      </section>
      <div className="map-legend">
        <button className="legend_btn" onClick={() => setSelectedTarget("user")}>
          🟢 You
        </button>

        <button className="legend_btn" onClick={() => setSelectedTarget("police")}>
          🚓 Police
        </button>

        <button className="legend_btn" onClick={() => setSelectedTarget("hospital")}>
          🏥 Hospital
        </button>

        <button className="legend_btn" onClick={() => setSelectedTarget("fire_station")}>
          🚒 Fire
        </button>

        <button className="legend_btn" onClick={() => setSelectedTarget("pharmacy")}>
          💊 Pharmacy
        </button>

        <button
          className="legend_btn"
          onClick={() => setSelectedTarget("volunteer")}
        >

          🤝 Volunteers

        </button>
      </div>



      <section className="map-container">
        <MapComponent
          userLocation={userLocation}
          services={services}
          volunteers={volunteers}
          reports={reports}
          selectedTarget={selectedTarget}
        />
      </section>

      <section>
        <div className="stats-bar">
          <div>🚨 {reports.length} Incidents</div>
          <div>⚠ {highIncidents} High Risk</div>
          <div>🤝 {volunteers.length} Volunteers</div>
          <div>🏥 {services.length} Services</div>
        </div>
      </section >

      <section className="services-section">
        <h2>Nearby Services</h2>

        <div className="services-grid">
          {loading ? (
            <p>Loading nearby services...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : services.length === 0 ? (
            <p>No nearby services found.</p>
          ) : (
            services.map((service) => (
              <div
                className="service-card"
                key={service.id}
              >
                <h3>
                  {getIcon(service.type)} {service.name}
                </h3>

                <p>{getTypeName(service.type)}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="quick-actions">
        <h2>Quick Actions</h2>

        <div className="actions-grid">
          <button>📍 Share Location</button>
          <button>🚨 Report Incident</button>
          <button>📞 Emergency Call</button>
          <button>🧭 Navigate</button>
        </div>
      </section>

      <BottomNav />
    </div >

  );
}

export default Map;