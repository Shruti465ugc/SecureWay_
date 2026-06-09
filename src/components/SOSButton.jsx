import { useState, useRef } from "react";
import "../styles/SOSButton.css";

function SOSButton({ selectedEmergency }) {
  const [activated, setActivated] = useState(false);
  const timerRef = useRef(null);

  const startHold = () => {
    if (!selectedEmergency) return;

    timerRef.current = setTimeout(() => {
      setActivated(true);
    }, 3000); // hold for 3 sec
  };

  const stopHold = () => {
    clearTimeout(timerRef.current);
  };

  return (
    <div className="sos-container">
      <button
        className={`sos-button ${
          !selectedEmergency ? "disabled" : ""
        }`}
        onMouseDown={startHold}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={startHold}
        onTouchEnd={stopHold}
      >
        {!selectedEmergency
          ? "SELECT EMERGENCY"
          : "HOLD TO ACTIVATE SOS"}
      </button>

      {activated && (
        <div className="sos-modal">
          <h2>⚠️ SOS Activated</h2>

          <p>Emergency Type: {selectedEmergency}</p>
          <p>Location Shared</p>
          <p>Emergency Contacts Notified</p>
          <p>Nearby Volunteers Alerted</p>

          <button onClick={() => setActivated(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default SOSButton;