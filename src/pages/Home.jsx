import BottomNav from "../components/BottomNav";
import EmergencyServices from "../components/EmergencyServices";
import SOSButton from "../components/SOSButton";
import "../styles/Home.css";
import Header from "../components/Header";


function Home() {
  return (
    <div className="home-container">

      <Header/>
      <SOSButton/>
      <EmergencyServices/>
      <p className="sos-info">
  Activation will notify emergency contacts and local authorities
  with your real-time coordinates.
</p>
   <BottomNav/>
    </div>
  );
}

export default Home;