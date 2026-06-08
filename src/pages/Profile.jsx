import "../styles/Profile.css";
import { Link } from "react-router-dom";


function Profile({ user }) {
  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      <div className="profile-card">
        <div className="profile-avatar">
          👤
        </div>

        <h2>{user.name}</h2>

        <p>Phone: {user.phone}</p>

        <p>Emergency Contact: {user.emergencyContact}</p>

        <p>Email: {user.email}</p>

        <Link to="/edit-profile">
          <button className="edit-btn">
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Profile;