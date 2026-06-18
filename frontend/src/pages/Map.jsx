import BottomNav from "../components/BottomNav";
import MapComponent from "../components/MapComponent";
import PageHeader from "../components/PageHeader";
import "../styles/Map.css";

function Map() {
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
        <p>Model Town, Jalandhar</p>
        <span>🟢 GPS Active</span>
      </section>

      <section className="map-container">
        <div className="map-legend">
          <span>🟢 You</span>
          <span>🚓 Police</span>
          <span>🚑 Ambulance</span>
          <span>🚒 Fire</span>
        </div>

        <MapComponent />
      </section>

      <section className="services-section">
        <h2>Nearby Services</h2>

        <div className="services-grid">
          <div className="service-card">
            <h3>🚓 Police</h3>
            <p>Find nearby police stations</p>
          </div>

          <div className="service-card">
            <h3>🚑 Ambulance</h3>
            <p>Locate emergency medical services</p>
          </div>

          <div className="service-card">
            <h3>🚒 Fire Station</h3>
            <p>Find nearby fire stations</p>
          </div>

          <div className="service-card">
            <h3>🏥 Hospital</h3>
            <p>Find nearby hospitals</p>
          </div>
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