import {
  LayoutDashboard,
  Users,
  UserCheck,
  FileWarning,
  ShieldAlert,
  BarChart3,
  Settings,
  LogOut,
  MapPinned,
} from "lucide-react";

import "../styles/Sidebar.css";

function AdminSidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <MapPinned size={32} />
        <div>
          <h2>SafePath</h2>
          <span>Admin Panel</span>
        </div>
      </div>

      <nav className="sidebar-menu">

        <div className="menu-item active">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>

        <div className="menu-item">
          <UserCheck size={20} />
          <span>Applications</span>
        </div>

        <div className="menu-item">
          <Users size={20} />
          <span>Volunteers</span>
        </div>

        <div className="menu-item">
          <FileWarning size={20} />
          <span>Reports</span>
        </div>

        <div className="menu-item">
          <ShieldAlert size={20} />
          <span>SOS History</span>
        </div>

        <div className="menu-item">
          <BarChart3 size={20} />
          <span>Analytics</span>
        </div>

        <div className="menu-item">
          <Settings size={20} />
          <span>Settings</span>
        </div>

      </nav>

      <div className="logout">

        <LogOut size={20} />

        <span>Logout</span>

      </div>

    </aside>
  );
}

export default AdminSidebar;