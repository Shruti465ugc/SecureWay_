import "../styles/Profile.css";

function Profile() {
  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      <div className="profile-card">
        <div className="profile-avatar">
          👤
        </div>

        <h2>John Doe</h2>

        <p>Phone: +91 9876543210</p>

        <p>Emergency Contact: +91 9123456780</p>

        <p>Email: johndoe@email.com</p>

        <button className="edit-btn">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;