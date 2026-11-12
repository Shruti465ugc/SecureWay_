import React, { useEffect, useState } from "react";
import "../styles/Header.css";
import { MapPin } from "lucide-react";
import { CircleUserRound } from "lucide-react";

const Header = () => {
  const [locationName, setLocationName] = useState("Detecting location...");
  const [coordinates, setCoordinates] = useState("Getting coordinates...");

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationName("Location not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setCoordinates(
          `${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E`
        );

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
          );

          const data = await response.json();

          setLocationName(
            data.display_name || "Location Found"
          );
        } catch (error) {
          console.error(error);
          setLocationName("Location Found");
        }
      },
      (error) => {
        console.error(error);
        setLocationName("Location Access Denied");
        setCoordinates("Enable location permissions");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div>
      <div className="header">
        <div className="logocard">
          <h2 className="logo">
            <MapPin size={28} className="logo-icon" />
            SecureWay_
          </h2>
        </div>
        <div className="profilecard">
          <CircleUserRound size={42} alt="profile"
            className="profile-pic" />
        </div>


      </div>

      <div className="location-card" style={{ backgroundColor: "#1b30436e" }}>
        <p className="location-title" style={{ color: "white", fontWeight: "bold", }}>
          YOUR CURRENT LOCATION
        </p>

        <h2>{locationName}</h2>

        <p>{coordinates}</p>
      </div>
    </div>
  );
};

export default Header;
