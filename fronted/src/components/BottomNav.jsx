import { Link } from "react-router-dom";
import "../styles/BottomNav.css";

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <Link to="/map" className="nav-btn">
        🗺️ Map
      </Link>

      <Link to="/report" className="nav-btn">
        📝 Report
      </Link>

      <Link to="/resources" className="nav-btn">
        📚 Resources
      </Link>

      <Link to="/profile" className="nav-btn">
        👤 Profile
      </Link>
    </nav>
  );
}

export default BottomNav;