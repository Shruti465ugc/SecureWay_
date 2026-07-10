import { useState } from "react";
import BottomNav from "./BottomNav";
import EmergencyServices from "./EmergencyServices";
import SOSButton from "./SOSButton";
import Header from "./Header";
import EmergencyContacts from "./EmergencyContacts";
import NearbyVolunteers from "./NearbyVolunteers";
import "../styles/Home.css";

function Home() {
  const [selectedEmergency, setSelectedEmergency] =
    useState(null);

  return (
    <div className="home-container">
      <Header />
      <div className="status-card">
        <h3>🟢 Status</h3>
        <p>Safe</p>
        <span>Monitoring active</span>
      </div>
      <EmergencyServices
        selectedEmergency={selectedEmergency}
        setSelectedEmergency={setSelectedEmergency}
      />
      <SOSButton
        selectedEmergency={selectedEmergency}
      />
<EmergencyContacts />
<NearbyVolunteers />


      <p className="sos-info">
        Activation will notify emergency contacts and
        local authorities with your real-time coordinates.
      </p>

      <BottomNav />
    </div>
  );
}

export default Home;