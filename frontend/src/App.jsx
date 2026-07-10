import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

import { useState } from "react";


import Home from "./pages/Home";
import Map from "./pages/Map";
import Report from "./pages/Report";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import VolunteerForm from "./pages/VolunteerForm";

function App() {
  const [user, setUser] = useState({
    name: "John Doe",
    phone: "+91 9876543210",
    emergencyContact: "+91 9123456780",
    email: "johndoe@email.com",
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/report" element={<Report />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/volunteer" element={<VolunteerForm />} />
        <Route path="/edit-profile" element={<EditProfile user={user} setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;