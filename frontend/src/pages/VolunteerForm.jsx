import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VolunteerForm.css";

function VolunteerForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    age: "",
    skills: "",
    availability: "",
    experience: "",
    reason: "",
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
      const response = await fetch("http://localhost:5000/api/volunteer-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("🎉 Thank you for volunteering with SafePath!");
        navigate("/resources");
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
      alert("Server not running.");
    }
  };

  return (
    <div className="volunteer-page">
      <div className="volunteer-container">

        <h1>Become a SafePath Volunteer</h1>

        <p className="subtitle">
          Join our community of volunteers helping create safer neighborhoods.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              min="18"
              required
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Skills</label>
            <input
              type="text"
              name="skills"
              placeholder="First Aid, Driving, Medical, etc."
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Availability</label>
            <select
              name="availability"
              required
              value={formData.availability}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>Weekdays</option>
              <option>Weekends</option>
              <option>Both</option>
            </select>
          </div>

          <div className="input-group">
            <label>Emergency Response Experience</label>

            <select
              name="experience"
              required
              value={formData.experience}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div className="input-group">
            <label>Why do you want to volunteer?</label>

            <textarea
              rows="5"
              name="reason"
              required
              value={formData.reason}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Become a Volunteer
          </button>

        </form>

      </div>
    </div>
  );
}

export default VolunteerForm;