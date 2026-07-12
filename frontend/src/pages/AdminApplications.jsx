import { useEffect, useState } from "react";
import "../styles/AdminApplications.css";

function AdminApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch(
        "https://safepath-hackhazard-project.onrender.com/api/volunteer-applications"
      );

      const data = await res.json();
      setApplications(data);
    } catch (err) {
      console.log(err);
    }
  };

  const approve = async (id) => {
    await fetch(
      `https://safepath-hackhazard-project.onrender.com/api/volunteer-applications/${id}/approve`,
      {
        method: "POST",
      }
    );

    fetchApplications();
  };

  const reject = async (id) => {
    await fetch(
      `https://safepath-hackhazard-project.onrender.com/api/volunteer-applications/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchApplications();
  };

  return (
    <div className="admin-page">
      <h1 className="admin-title">
        🛡 Volunteer Applications
      </h1>

      <div className="application-grid">
        {applications.length === 0 ? (
          <h2 style={{ color: "white" }}>
            No Applications Found
          </h2>
        ) : (
          applications.map((app) => (
            <div
              key={app._id}
              className="application-card"
            >
              <h2>👤 {app.user?.name}</h2>

              <p>
                <strong>📧 Email:</strong>{" "}
                {app.user?.email}
              </p>

              <p>
                <strong>📞 Phone:</strong>{" "}
                {app.phone}
              </p>

              <p>
                <strong>📍 City:</strong>{" "}
                {app.city}
              </p>

              <p>
                <strong>🎂 Age:</strong>{" "}
                {app.age}
              </p>

              <p>
                <strong>🛠 Skills:</strong>{" "}
                {app.skills}
              </p>

              <p>
                <strong>⏰ Availability:</strong>{" "}
                {app.availability}
              </p>

              <p>
                <strong>🚑 Experience:</strong>{" "}
                {app.experience}
              </p>

              <p>
                <strong>💬 Reason:</strong>
              </p>

              <p>{app.reason}</p>

              <p
                className={`status ${app.status.toLowerCase()}`}
              >
                Status : {app.status}
              </p>

              <div className="btn-row">
                <button
                  className="approve-btn"
                  onClick={() =>
                    approve(app._id)
                  }
                  disabled={
                    app.status === "Approved"
                  }
                >
                  ✅ Approve
                </button>

                <button
                  className="reject-btn"
                  onClick={() =>
                    reject(app._id)
                  }
                >
                  ❌ Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminApplications;