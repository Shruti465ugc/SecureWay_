import { useEffect, useState } from "react";
import "../styles/VolunteerDashboard.css";

function VolunteerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [volunteer, setVolunteer] = useState(null);

  const [pendingSOS, setPendingSOS] = useState([]);

  const [currentSOS, setCurrentSOS] = useState(null);

  useEffect(() => {
    loadVolunteer();
    loadPendingSOS();
    getCurrentLocation();

    const locationInterval = setInterval(() => {
      getCurrentLocation();
    }, 10000);

    const refreshInterval = setInterval(() => {
      loadVolunteer();
      loadPendingSOS();
    }, 5000);

    return () => {
      clearInterval(locationInterval);
      clearInterval(refreshInterval);
    };
  }, []);

  // ---------------- Volunteer ----------------

  const loadVolunteer = async () => {
    try {
      const res = await fetch(
        `https://safepath-hackhazard-project.onrender.com/api/volunteers/me/${user.id}`
      );

      const data = await res.json();

      if (res.ok) {
        setVolunteer(data);

        loadAssignedSOS(data._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- Assigned SOS ----------------

  const loadAssignedSOS = async (volunteerId) => {
    try {
      const res = await fetch(
        `https://safepath-hackhazard-project.onrender.com/api/sos/assigned/${volunteerId}`
      );

      const data = await res.json();

      if (res.ok) {
        setCurrentSOS(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- Pending SOS ----------------

  const loadPendingSOS = async () => {
    try {
      const res = await fetch(
        "https://safepath-hackhazard-project.onrender.com/api/sos/pending"
      );

      const data = await res.json();

      if (res.ok) {
        setPendingSOS(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- Live Location ----------------

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await fetch(
            `https://safepath-hackhazard-project.onrender.com/api/volunteers/location/${user.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }),
            }
          );
        } catch (err) {
          console.log(err);
        }
      }
    );
  };

  // ---------------- Toggle ----------------

  const toggleAvailability = async () => {
    try {
      const res = await fetch(
        `https://safepath-hackhazard-project.onrender.com/api/volunteers/toggle/${user.id}`,
        {
          method: "PUT",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setVolunteer(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- Accept SOS ----------------

  const acceptSOS = async (id) => {
    if (!volunteer.available) {
      alert("Finish your current rescue first.");
      return;
    }

    try {
      const res = await fetch(
        `https://safepath-hackhazard-project.onrender.com/api/sos/${id}/accept/${volunteer._id}`,
        {
          method: "PUT",
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert(data.message);

        loadVolunteer();
        loadPendingSOS();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- Complete ----------------

  const completeSOS = async (id) => {
    try {
      const res = await fetch(
        `https://safepath-hackhazard-project.onrender.com/api/sos/${id}/complete`,
        {
          method: "PUT",
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert(data.message);

        setCurrentSOS(null);

        loadVolunteer();
        loadPendingSOS();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!volunteer) {
    return <h2>Loading...</h2>;
  }

return (
  <div className="volunteer-dashboard">

    <h1>Volunteer Dashboard</h1>

    {/* Volunteer Profile */}

    <div className="dashboard-card">

      <h2>{user.name}</h2>

      <p>
        Status:
        <strong>
          {volunteer.verified ? " Approved" : " Pending"}
        </strong>
      </p>

      <p>
        Availability:
        <strong>
          {volunteer.available ? " Online" : " Offline"}
        </strong>
      </p>

      <p>
        Total Rescues:
        <strong> {volunteer.totalRescues}</strong>
      </p>

      <p>
        Latitude:
        <strong> {volunteer.latitude.toFixed(5)}</strong>
      </p>

      <p>
        Longitude:
        <strong> {volunteer.longitude.toFixed(5)}</strong>
      </p>

      <button
        className="toggle-btn"
        onClick={toggleAvailability}
      >
        {volunteer.available
          ? "Go Offline"
          : "Go Online"}
      </button>

    </div>

    {/* Current Rescue */}

    <h2 style={{ marginTop: "35px" }}>
      🚑 Current Rescue
    </h2>

    {currentSOS ? (

      <div className="dashboard-card">

        <h3>{currentSOS.userName}</h3>

        <p>
          Status:
          <strong> {currentSOS.status}</strong>
        </p>

        <p>
          Latitude:
          <strong> {currentSOS.latitude.toFixed(5)}</strong>
        </p>

        <p>
          Longitude:
          <strong> {currentSOS.longitude.toFixed(5)}</strong>
        </p>

        <a
          href={`https://www.google.com/maps?q=${currentSOS.latitude},${currentSOS.longitude}`}
          target="_blank"
          rel="noreferrer"
        >
          📍 Open in Google Maps
        </a>

        <br />
        <br />

        <button
          className="complete-btn"
          onClick={() => completeSOS(currentSOS._id)}
        >
          ✅ Complete Rescue
        </button>

      </div>

    ) : (

      <p>No Active Rescue</p>

    )}

    {/* Pending SOS */}

    <h2 style={{ marginTop: "40px" }}>
      Pending SOS Requests
    </h2>

    {pendingSOS.length === 0 ? (

      <p>No Active SOS</p>

    ) : (

      pendingSOS.map((sos) => (

        <div
          className="dashboard-card"
          key={sos._id}
        >

          <h3>{sos.userName}</h3>

          <p>
            Status:
            <strong> {sos.status}</strong>
          </p>

          <p>
            Latitude:
            <strong> {sos.latitude.toFixed(5)}</strong>
          </p>

          <p>
            Longitude:
            <strong> {sos.longitude.toFixed(5)}</strong>
          </p>

          <a
            href={`https://www.google.com/maps?q=${sos.latitude},${sos.longitude}`}
            target="_blank"
            rel="noreferrer"
          >
            📍 Open in Google Maps
          </a>

          <br />
          <br />

          <button
            className="accept-btn"
            onClick={() => acceptSOS(sos._id)}
            disabled={!volunteer.available}
          >
            {volunteer.available
              ? "Accept SOS"
              : "Busy"}
          </button>

        </div>

      ))

    )}

  </div>
);

}

export default VolunteerDashboard;