import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import MapComponent from "../components/MapComponent";
import PageHeader from "../components/PageHeader";
import "../styles/Map.css";

function Map() {
  const [services, setServices] = useState([]);
   const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("Detecting location...");
  const [error, setError] = useState(null);
  const [volunteers, setVolunteers] = useState([]);

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
            `http://localhost:5000/api/services/nearby?lat=${lat}&lon=${lon}`
          );

          const data = await res.json();

          if (!res.ok) {
            throw new Error(
              data.error || "Failed to fetch nearby services"
            );
          }

          setServices(data);
          try {
  const volunteerRes = await fetch(
    `http://localhost:5000/api/volunteers/nearby?lat=${lat}&lon=${lon}&radius=5`
  );

  const volunteerData = await volunteerRes.json();

  if (volunteerRes.ok) {
    setVolunteers(volunteerData);
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

      <section className="map-container">
        <div className="map-legend">
          <span>🟢 You</span>
          <span>🚓 Police</span>
          <span>🏥 Hospital</span>
          <span>🚒 Fire</span>
          <span>💊 Pharmacy</span>
        </div>

         <MapComponent
  userLocation={userLocation}
  services={services}
  volunteers={volunteers}
/>
      </section>

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
    </div>
  );
}

export default Map;