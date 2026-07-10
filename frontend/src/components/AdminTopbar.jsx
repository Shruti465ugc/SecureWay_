import {
  Bell,
  Search,
  CalendarDays,
  UserCircle2,
} from "lucide-react";

import "../styles/Topbar.css";

function AdminTopbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="topbar">

      <div className="topbar-left">

        <h1>Dashboard</h1>

        <p>{today}</p>

      </div>

      <div className="topbar-right">

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search volunteers, reports..."
          />

        </div>

        <div className="notification">

          <Bell size={22} />

          <span className="notification-dot"></span>

        </div>

        <div className="admin-profile">

          <UserCircle2 size={40} />

          <div>

            <h4>Admin</h4>

            <span>Super Admin</span>

          </div>

        </div>

      </div>

    </header>
  );
}

export default AdminTopbar;