import { useState } from "react";
import "../styles/SOSButton.css";


function SOSButton() {
  const [activated, setActivated] = useState(false);

  const handleSOS = () => {
    setActivated(true);
  };

  return (
    <div className="sos-container">
      <button
        className="sos-button"
        onClick={handleSOS}
      >
        HOLD TO ACTIVATE
        <br />
        SOS
      </button>

      {activated && (
        <div className="sos-modal">
          <h2>⚠️ SOS Activated</h2>

          <p>Location Shared</p>

          <p>Emergency Contacts Notified</p>

          <p>Nearby Volunteers Alerted</p>

          <button
            onClick={() => setActivated(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default SOSButton;