import { useEffect, useState } from "react";
import "../styles/RescueStatus.css";

function RescueStatus() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [tracking, setTracking] = useState(null);

  useEffect(() => {

    loadTracking();

    const interval = setInterval(() => {
      loadTracking();
    },5000);

    return ()=>clearInterval(interval);

  },[]);

 const loadTracking = async () => {
  try {

    const res = await fetch(
      `https://safepath-hackhazard-project.onrender.com/api/sos/tracking/user/${user.id}`
    );

    if (!res.ok) {
      setTracking(null);
      return;
    }

    const data = await res.json();

    if (!data) {
      setTracking(null);
      return;
    }

    setTracking(data);

  } catch (err) {
    console.log(err);
  }
};

  if(!tracking){

    return(
      <div className="tracking-card">
        <h3>🚑 Rescue Status</h3>
        <p>No Active SOS</p>
      </div>
    );

  }

  return(

    <div className="tracking-card">

      <h3>🚑 Rescue Status</h3>

      <p>

        Status :

        <strong>{tracking.status}</strong>

      </p>

      {tracking.volunteer ? (

        <>

          <p>

            Volunteer :

            <strong>{tracking.volunteer.name}</strong>

          </p>

          <p>

            Phone :

            <strong>{tracking.volunteer.phone}</strong>

          </p>

          <p>

            Skill :

            <strong>{tracking.volunteer.skill}</strong>

          </p>

        </>

      ):(

        <p>🔍 Searching for nearby volunteer...</p>

      )}

    </div>

  );

}

export default RescueStatus;