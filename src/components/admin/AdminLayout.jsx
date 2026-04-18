import { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="admin-content">
        <div className="admin-mobile-header">
          <button
            className="admin-menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars />
          </button>

          <h2 className="admin-mobile-title">Admin Panel</h2>
        </div>

        <AdminTopbar />
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;