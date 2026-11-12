import { useEffect, useState } from "react";
import "../styles/EmergencyContacts.css";
import { useNavigate } from "react-router-dom";

function EmergencyContacts() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [assignedVolunteer, setAssignedVolunteer] = useState(null);

  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      loadVolunteer();
    }, 3000);

    loadVolunteer();

    return () => clearInterval(interval);

  }, []);

  const loadVolunteer = async () => {
    try {
      const res = await fetch(
        `https://SecureWay_-hackhazard-project.onrender.com/api/sos/status/${user.name}`
      );

      if (!res.ok) return;

      const data = await res.json();

      if (data.status === "Accepted") {
        setAssignedVolunteer(data.volunteer);
      }

    } catch (err) {
      console.log(err);
    }
  };

  if (!assignedVolunteer) {
    return (
      <div className="contacts-card">

        <h3>🚑 Volunteer Assignment</h3>

        <div className="waiting-box">

          <h2>⏳ Waiting...</h2>

          <p>
            Searching for the nearest available volunteer.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="contacts-card">

      <h3>🚑 Volunteer Assigned</h3>

      <div className="volunteer-card">

        <h2>✅ {assignedVolunteer.user.name}</h2>

        <p>

          📞 {assignedVolunteer.phone}

        </p>

        <p>

          🛠 Skill : {assignedVolunteer.skill}

        </p>

        <p>

          ⭐ Rescue Count : {assignedVolunteer.totalRescues}

        </p>

        <button
          className="track-btn"
          onClick={() => navigate("/map")}
        >
          📍 Track Volunteer
        </button>

      </div>

    </div>
  );
}

export default EmergencyContacts;