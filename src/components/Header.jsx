import React from 'react'
import "../styles/Header.css"
import { MapPin } from "lucide-react";


const Header = () => {
  return (
    <div>
       
      <div className="header">
        <h2 className="logo">
          <MapPin size={28} className="logo-icon" />
          SafePath
        </h2>

        <img
          src="https://i.pravatar.cc/50"
          alt="profile"
          className="profile-pic"
        />
      </div>

      <div className="location-card">
        <p className="location-title">
          YOUR CURRENT LOCATION
        </p>

        <h2>Central Park West, NY</h2>

        <p>40.7812° N, 73.9665° W</p>
      </div>
    </div>

    
  )
}

export default Header
