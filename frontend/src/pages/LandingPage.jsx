import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import heroImage from "../assets/hero-image.jpeg";
import { MapPin, Menu, X } from "lucide-react";

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);
  useEffect(() => {
  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }
}, []);
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  setUser(null);
  setProfileMenuOpen(false);
  setMenuOpen(false);

  navigate("/");
};

  return (
    <div className="landing">
      <nav className="navbar">
        <h2 className="logo">
          <MapPin size={28} className="logo-icon" />
          SafePath
        </h2>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#impact">Impact</a>

 {user ? (
  <div className="profile-menu">
    <button
      className="profile-btn"
      onClick={() => setProfileMenuOpen(!profileMenuOpen)}
    >
      👤 {user.name} ▼
    </button>

    {profileMenuOpen && (
      <div className="dropdown-menu">
        <Link
          to="/profile"
          onClick={() => setProfileMenuOpen(false)}
        >
          My Profile
        </Link>

        <Link
          to="/dashboard"
          onClick={() => setProfileMenuOpen(false)}
        >
          Dashboard
        </Link>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    )}
  </div>
) : (
  <Link to="/login">
    <button className="nav-btn">Sign In</button>
  </Link>
)}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* Mobile Menu */}
       <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>

  <a href="#features" onClick={closeMenu}>
    Features
  </a>

  <a href="#how-it-works" onClick={closeMenu}>
    How It Works
  </a>

  <a href="#impact" onClick={closeMenu}>
    Impact
  </a>

  {user ? (
    <>
      <Link to="/dashboard" onClick={closeMenu}>
        <button className="nav-btn mobile-launch-btn">
          Dashboard
        </button>
      </Link>

      <Link to="/profile" onClick={closeMenu}>
        <button className="nav-btn mobile-launch-btn">
          My Profile
        </button>
      </Link>

      <button
        className="nav-btn mobile-launch-btn"
        onClick={() => {
          handleLogout();
          closeMenu();
          navigate("/");
        }}
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login" onClick={closeMenu}>
        <button className="nav-btn mobile-launch-btn">
          Sign In
        </button>
      </Link>

      <Link to="/register" onClick={closeMenu}>
        <button className="nav-btn mobile-launch-btn">
          Register
        </button>
      </Link>
    </>
  )}

</div>
      </nav>

      <section
        className="hero"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <h1>Emergency Help When Every Second Counts</h1>

        <p>
          Instantly report incidents, share your live location, activate SOS
          alerts, connect with nearby volunteers, and reach emergency services
          faster.
        </p>

        <div className="hero-buttons">
          {user ? (
  <Link to="/dashboard">
    <button className="start-btn">Go to Dashboard</button>
  </Link>
) : (
  <Link to="/register">
    <button className="start-btn">Get Started</button>
  </Link>
)}
        </div>

        <div className="hero-tags">
          <span>🚨 Instant SOS</span>
          <span>📍 Live Tracking</span>
          <span>🤝 Volunteer Network</span>
          <span>🗺 Safe Routes</span>
        </div>
      </section>

      <section className="impact" id="impact">
        <h2>Our Impact</h2>

        <div className="impact-grid">
          <div className="impact-card">
            <h2>🚨 1,24+</h2>
            <p>Incidents Reported</p>
          </div>

          <div className="impact-card">
            <h2>👥 542+</h2>
            <p>Verified Volunteers</p>
          </div>

          <div className="impact-card">
            <h2>🚑 86+</h2>
            <p>Emergency Units</p>
          </div>

          <div className="impact-card">
            <h2>⚡ 3 min</h2>
            <p>Average Response Time</p>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <h2>Why Choose SafePath?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>🚨 Instant SOS</h3>
            <p>Send emergency alerts with one action.</p>
          </div>

          <div className="feature-card">
            <h3>📍 Live Location</h3>
            <p>Share your real-time location instantly.</p>
          </div>

          <div className="feature-card">
            <h3>🤝 Volunteer Network</h3>
            <p>Connect with nearby verified volunteers.</p>
          </div>

          <div className="feature-card">
            <h3>🗺 Safe Route</h3>
            <p>Navigate through safer routes during emergencies.</p>
          </div>

          <div className="feature-card">
            <h3>📝 Incident Reporting</h3>
            <p>Report accidents and hazards with location.</p>
          </div>

          <div className="feature-card">
            <h3>📢 Community Alerts</h3>
            <p>Stay informed about nearby emergencies.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works">
        <h2>How SafePath Works</h2>

        <div className="steps">
          <div className="step">
            <h3>1️⃣ Report</h3>
            <p>Report an incident instantly.</p>
          </div>

          <div className="step">
            <h3>2️⃣ Share</h3>
            <p>Share live location securely.</p>
          </div>

          <div className="step">
            <h3>3️⃣ Notify</h3>
            <p>Emergency contacts and volunteers are alerted.</p>
          </div>

          <div className="step">
            <h3>4️⃣ Respond</h3>
            <p>Get faster assistance and safe navigation.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <h2>SafePath</h2>

        <p>
          Building safer communities through faster emergency response and
          real-time coordination.
        </p>

        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#impact">Impact</a>
        </div>

        <p>© 2026 SafePath. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;