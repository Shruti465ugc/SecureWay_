import {Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

import { useState } from "react";


import Home from "./pages/Home";
import Map from "./pages/Map";
import Report from "./pages/Report";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import VolunteerForm from "./pages/VolunteerForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminApplications from "./pages/AdminApplications";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminRoute from "./components/AdminRoute";

function App() {
  const [user, setUser] = useState({
    name: "John Doe",
    phone: "+91 9876543210",
    emergencyContact: "+91 9123456780",
    email: "johndoe@email.com",
  });
  return (
  
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>
       <Route
  path="/map"
  element={
    <ProtectedRoute>
      <Map />
    </ProtectedRoute>
  }
/>
        <Route
  path="/report"
  element={
    <ProtectedRoute>
      <Report />
    </ProtectedRoute>
  }
/>
       <Route
  path="/resources"
  element={
    <ProtectedRoute>
      <Resources />
    </ProtectedRoute>
  }
/>

       <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile user={user} />
    </ProtectedRoute>
  }
/>

<Route
path="/admin-login"
element={<AdminLogin/>}
/>
        <Route path="/volunteer" element={<VolunteerForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
     
     <Route
  path="/admin/applications"
  element={
    <AdminRoute>
      <AdminApplications />
    </AdminRoute>
  }
/>
<Route
    path="/volunteer-dashboard"
    element={<VolunteerDashboard />}
/>
       <Route
  path="/edit-profile"
  element={
    <ProtectedRoute>
      <EditProfile user={user} setUser={setUser} />
    </ProtectedRoute>
  }
/>
      </Routes>

  
  
  );
}

export default App;