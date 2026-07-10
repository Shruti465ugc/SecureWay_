// components/PageHeader.jsx

import { Link } from "react-router-dom";
import "../styles/PageHeader.css";

function PageHeader() {
  return (
    <div className="page-header">
      <Link to="/" className="nav-btn">
        🏠 Home
      </Link>

      <Link to="/dashboard" className="nav-btn">
        🚨 SOS
      </Link>
    </div>
  );
}

export default PageHeader;