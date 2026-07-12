import { useEffect, useState } from "react";

import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import StatsCard from "../components/StatsCard";
import VolunteerTable from "../components/VolunteerTable";
import VolunteerApplicationsTable from "../components/VolunteerApplicationsTable";
import { useNavigate } from "react-router-dom";

import {
  Users,
  UserCheck,
  FileWarning,
  ShieldAlert,
} from "lucide-react";

import "../styles/Admin.css";
import "../styles/StatsCard.css";

function Admin() {

  const navigate=useNavigate();

useEffect(()=>{

const admin=JSON.parse(
localStorage.getItem("admin")
);

if(!admin){

navigate("/admin-login");

}

},[]);

  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetch("https://safepath-hackhazard-project.onrender.com/api/admin/dashboard")
      .then((res) => res.json())
      .then((data) => setDashboardData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!dashboardData) {
    return (
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-main">
          <AdminTopbar />
          <h2 style={{ color: "white" }}>Loading Dashboard...</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-main">

        <AdminTopbar />

        <div className="stats-grid">

          <StatsCard
            title="Applications"
            value={dashboardData.totalApplications}
            icon={<UserCheck size={34} />}
            color="#2563EB"
          />

          <StatsCard
            title="Pending"
            value={dashboardData.pendingApplications}
            icon={<ShieldAlert size={34} />}
            color="#F59E0B"
          />

          <StatsCard
            title="Volunteers"
            value={dashboardData.totalVolunteers}
            icon={<Users size={34} />}
            color="#16A34A"
          />

          <StatsCard
            title="Reports"
            value={dashboardData.totalReports}
            icon={<FileWarning size={34} />}
            color="#DC2626"
          />

        </div>
        <VolunteerTable />
        <VolunteerApplicationsTable />

      </main>

    </div>
  );
}

export default Admin;