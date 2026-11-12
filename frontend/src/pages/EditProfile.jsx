import { useState } from "react";
import "../styles/EditProfile.css";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: loggedInUser.name || "",
    email: loggedInUser.email || "",
    phone: loggedInUser.phone || "",
    emergencyContact: loggedInUser.emergencyContact || "",
    address: loggedInUser.address || "",
    bloodGroup: loggedInUser.bloodGroup || "",
    gender: loggedInUser.gender || "",
    age: loggedInUser.age || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://SecureWay_-hackhazard-project.onrender.com/api/user/${loggedInUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const updatedUser = await response.json();

      if (!response.ok) {
        alert(updatedUser.message);
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      alert("Profile Updated Successfully!");

      navigate("/profile");

    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
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
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Email</label>

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Phone</label>

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Emergency Contact</label>

          <input
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Address</label>

          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Blood Group</label>

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
        </div>

        <div className="input-group">
          <label>Gender</label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="input-group">
          <label>Age</label>

          <input
            type="number"
            name="age"
            value={formData.age}
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