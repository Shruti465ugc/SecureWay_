import { useState } from "react";
import "../styles/EditProfile.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function EditProfile({ user, setUser }) {
  const [formData, setFormData] = useState(user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    setUser(formData);
    e.preventDefault();
    navigate("/profile");
    console.log(formData);

    // API call here
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>

      <form
        className="edit-profile-card"
        onSubmit={handleSubmit}
      >
        <div className="profile-avatar">
          👤
        </div>

        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Emergency Contact</label>
          <input
            type="text"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

          <button
            type="submit"
            className="save-btn"
            
          >
            Save Changes
          </button>
      </form>
    </div>
  );
}

export default EditProfile;