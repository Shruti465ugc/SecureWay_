import BottomNav from "../components/BottomNav";
import MapComponent from "../components/MapComponent";
import PageHeader from "../components/PageHeader";

import "../styles/Map.css";

function Map() {
  return (

    <div className="map-page">
      <PageHeader/>
     
      <div className="map-header">
        <h1>🗺️ Live Emergency Map</h1>
        <p>
          View your current location and nearby emergency services in real time.
        </p>
      </div>

      <div className="location-card">
        <h3>📍 Current Location</h3>
        <p>Fetching location...</p>
      </div>

      <div className="map-container">
        <MapComponent />
      </div>

      <div className="services-grid">
        <div className="service-card">
          <h3>🚓 Police</h3>
          <p>Find nearby police stations.</p>
        </div>

        <div className="service-card">
          <h3>🚑 Ambulance</h3>
          <p>Locate emergency medical services.</p>
        </div>

        <div className="service-card">
          <h3>🚒 Fire</h3>
          <p>Find nearby fire stations.</p>
        </div>

      </div>
      <BottomNav />
    </div>
    

  );
}

export default Map;