import { useState } from "react";
import BottomNav from "../components/BottomNav";
import EmergencyServices from "../components/EmergencyServices";
import SOSButton from "../components/SOSButton";
import Header from "../components/Header";
import "../styles/Home.css";

function Home() {
  const [selectedEmergency, setSelectedEmergency] =
    useState(null);

  return (
    <div className="home-container">
      <Header />
      <EmergencyServices
        selectedEmergency={selectedEmergency}
        setSelectedEmergency={setSelectedEmergency}
      />
      <SOSButton
        selectedEmergency={selectedEmergency}
      />



      <p className="sos-info">
        Activation will notify emergency contacts and
        local authorities with your real-time coordinates.
      </p>

      <BottomNav />
    </div>
  );
}

export default Home;