import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

function LandingPage() {
  return (
    <div className="landing">

      <nav className="navbar">
        <h2>SafePath</h2>
      </nav>

      <section className="hero">

        <h1>
          Emergency Help When Every Second Counts
        </h1>

        <p>
          Report incidents, share live location,
          and connect with nearby volunteers and
          emergency services instantly.
        </p>

        <Link to="/dashboard">
          <button className="start-btn">
            Get Started
          </button>
        </Link>

      </section>

      <section className="stats">

        <div className="stat-card">
          <h2>1000+</h2>
          <p>Reports</p>
        </div>

        <div className="stat-card">
          <h2>500+</h2>
          <p>Volunteers</p>
        </div>

        <div className="stat-card">
          <h2>24/7</h2>
          <p>Support</p>
        </div>

      </section>

      <section className="features">

        <div className="feature-card">
          <h3>📍 Live Location</h3>
          <p>Share your location instantly.</p>
        </div>

        <div className="feature-card">
          <h3>🚨 SOS Alerts</h3>
          <p>Notify volunteers quickly.</p>
        </div>

        <div className="feature-card">
          <h3>📝 Incident Reports</h3>
          <p>Report emergencies easily.</p>
        </div>

      </section>

    </div>
  );
}

export default LandingPage;