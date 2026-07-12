import { useState, useRef } from "react";
import { useEffect } from "react";
import "../styles/SOSButton.css";

function SOSButton({ selectedEmergency }) {
  const [sosId, setSosId] = useState(null);
  const [activated, setActivated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [status, setStatus] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [volunteerInfo, setVolunteerInfo] = useState(null);
  useEffect(() => {

    if (!sosId) return;

    const interval = setInterval(async () => {

      try {

        const res = await fetch(
          `https://safepath-hackhazard-project.onrender.com/api/sos/status/${sosId}`
        );

        const data = await res.json();

        if (res.ok) {

          setStatus(data.status);

          if (data.volunteer) {

            setVolunteerInfo(data.volunteer);

          }

          if (data.status === "Accepted") {

            setAccepted(true);

          }

        }

      } catch (err) {

        console.log(err);

      }

    }, 5000);

    return () => clearInterval(interval);

  }, [sosId]);
  const [steps, setSteps] = useState([
    { text: "📍 Sharing Live Location...", done: false },
    { text: "📞 Notifying Emergency Contacts...", done: false },
    { text: "🤝 Alerting Nearby Volunteers...", done: false },
    { text: "🚓 Contacting Authorities...", done: false },
  ]);

  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const API_URL = "https://safepath-hackhazard-project.onrender.com/api/sos";
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("Logged In User:", user);
  console.log("USER FROM LOCAL STORAGE");
console.log(user);

  const startHold = () => {
    if (!selectedEmergency) return;

    let timeLeft = 3;
    setCountdown(timeLeft);

    intervalRef.current = setInterval(() => {
      timeLeft--;
      if (timeLeft > 0) setCountdown(timeLeft);
    }, 1000);

    timerRef.current = setTimeout(() => {
      clearInterval(intervalRef.current);
      setCountdown(null);

      // Start SOS flow
      triggerSOS();
    }, 3000);
  };

  const stopHold = () => {
    clearTimeout(timerRef.current);
    clearInterval(intervalRef.current);
    setCountdown(null);
  };

  const triggerSOS = async () => {
    setLoading(true);

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

         const payload = {
  userId: user.id,
  latitude: lat,
  longitude: lon,
  userName: user.name,
};

console.log("PAYLOAD:", payload);

const res = await fetch(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});

          const data = await res.json();

          console.log("Response Status:", res.status);
          console.log("Backend Response:", data);

          if (!res.ok) {
            alert(JSON.stringify(data));
            setLoading(false);
            return;
          }

          setSosId(data.sos._id);

          alert(
            `SOS Sent Successfully!\nNearby Volunteers Found: ${data.nearbyVolunteers.length}`
          );
          console.log("SOS Response:", data);

          // Animate steps
          const processSteps = [
            "📍 Sharing Live Location...",
            "📞 Notifying Emergency Contacts...",
            "🤝 Alerting Nearby Volunteers...",
            "🚓 Contacting Authorities...",
          ];

          processSteps.forEach((_, index) => {
            setTimeout(() => {
              setSteps((prev) =>
                prev.map((step, i) =>
                  i === index ? { ...step, done: true } : step
                )
              );
            }, (index + 1) * 800);
          });

          setTimeout(() => {
            setLoading(false);
            setActivated(true);
          }, 4000);
        } catch (err) {
          console.error("SOS failed:", err);
          setLoading(false);
        }
      },
      (error) => {
        console.error("Location error:", error);
        setLoading(false);
      }
    );
  };

  return (
    <div className="sos-container">

      {/* BUTTON */}
      <button
        className={`sos-button ${!selectedEmergency ? "disabled" : ""}`}
        onMouseDown={startHold}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={startHold}
        onTouchEnd={stopHold}
      >
        {!selectedEmergency ? (
          "SELECT EMERGENCY"
        ) : countdown ? (
          <>
            <span className="hold-text">HOLDING...</span>
            <span className="countdown">{countdown}</span>
          </>
        ) : (
          <>
            <span className="hold-text">HOLD TO ACTIVATE</span>
            <span className="sos-text">SOS</span>
          </>
        )}
      </button>

      {/* LOADING MODAL */}
      {loading && (
        <div className="sos-modal">
          <div className="sos-modal-content">
            <h2>🚨 Activating SOS</h2>
            <div className="loading-steps">
              {steps.map((step, index) => (
                <p key={index}>
                  {step.done ? "✅" : "⏳"} {step.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {activated && (
        <div className="sos-modal">
          <div className="sos-modal-content">
            <div className="sos-status-icon">🚨</div>

            <h2>SOS ACTIVATED</h2>

            <h3>
              Type: {selectedEmergency?.name}{" "}
              <span>{selectedEmergency?.icon}</span>
            </h3>

            <hr />

            <p>✅ Live Location Shared</p>
            <p>✅ Emergency Contacts Notified</p>
            <p>✅ Nearby Volunteers Alerted</p>
            {accepted ? (
              <h3 style={{ color: "limegreen" }}>
                🚑 Volunteer is on the way!
              </h3>
            ) : (
              <h3 style={{ color: "orange" }}>
                ⏳ Waiting for a volunteer...
              </h3>
            )}
            <p>✅ Authorities Contacted</p>

            <p>⏱ Estimated Response: 3 mins</p>

            <button
              className="close-btn"
              onClick={() => {
                setActivated(false);
                setAccepted(false);
                setSosId(null);

                setSteps([
                  { text: "📍 Sharing Live Location...", done: false },
                  { text: "📞 Notifying Emergency Contacts...", done: false },
                  { text: "🤝 Alerting Nearby Volunteers...", done: false },
                  { text: "🚓 Contacting Authorities...", done: false },
                ]);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SOSButton;