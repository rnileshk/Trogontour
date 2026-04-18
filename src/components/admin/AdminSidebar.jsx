import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMapMarkedAlt,
  FaEnvelopeOpenText,
  FaQuoteLeft,
  FaImages,
  FaHome,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { removeToken } from "../../utils/auth";

function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  const handleClose = () => {
    setSidebarOpen(false);
  };

  const linkStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 14px",
    borderRadius: "10px",
    color: "white",
    background: location.pathname === path ? "rgba(255,255,255,0.14)" : "transparent",
    fontWeight: location.pathname === path ? "600" : "400",
  });

  return (
    <>
      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={handleClose}></div>
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-top">
          <div>
            <h2 style={{ marginBottom: "8px" }}>TravelScape</h2>
            <p style={{ fontSize: "14px", opacity: 0.85 }}>
              Admin Management Panel
            </p>
          </div>

          <button className="admin-close-btn" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/" style={linkStyle("/")} onClick={handleClose}>
                <FaHome />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard"
                style={linkStyle("/admin/dashboard")}
                onClick={handleClose}
              >
                <FaTachometerAlt />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/tours"
                style={linkStyle("/admin/tours")}
                onClick={handleClose}
              >
                <FaMapMarkedAlt />
                Manage Tours
              </Link>
            </li>
            <li>
              <Link
                to="/admin/enquiries"
                style={linkStyle("/admin/enquiries")}
                onClick={handleClose}
              >
                <FaEnvelopeOpenText />
                Manage Enquiries
              </Link>
            </li>
            <li>
              <Link
                to="/admin/testimonials"
                style={linkStyle("/admin/testimonials")}
                onClick={handleClose}
              >
                <FaQuoteLeft />
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                to="/admin/gallery"
                style={linkStyle("/admin/gallery")}
                onClick={handleClose}
              >
                <FaImages />
                Gallery
              </Link>
            </li>
          </ul>
        </nav>

        <div style={{ marginTop: "24px" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              background: "#c0392b",
              color: "white",
              border: "none",
              padding: "12px 14px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontWeight: "600",
            }}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;