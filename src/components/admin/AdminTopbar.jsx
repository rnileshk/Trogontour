import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBackward, FaUserShield } from "react-icons/fa";
import { removeToken } from "../../utils/auth";

function AdminTopbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    removeToken();
    navigate("/admin/login");
  };

  const getPageTitle = () => {
    if (location.pathname.includes("/dashboard")) return "Dashboard";
    if (location.pathname.includes("/tours")) return "Manage Tours";
    if (location.pathname.includes("/enquiries")) return "Manage Enquiries";
    if (location.pathname.includes("/testimonials")) return "Manage Testimonials";
    if (location.pathname.includes("/gallery")) return "Manage Gallery";
    return "Admin Panel";
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "16px 20px",
        borderRadius: "20px",
        marginBottom: "24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 10px 28px rgba(0,0,0,0.20)",
        flexWrap: "wrap",
        gap: "14px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px", minWidth: 0 }}>
        <div
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #1f4d3a, #2f6f55)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            flexShrink: 0,
          }}
        >
          <FaUserShield />
        </div>

        <div style={{ minWidth: 0 }}>
          <h2
            style={{
              color: "#30936a",
              marginBottom: "3px",
              fontSize: "1.2rem",
              wordBreak: "break-word",
            }}
          >
            {getPageTitle()}
          </h2>
          <p style={{ color: "#666", fontSize: "14px" }}>
            TravelScape Admin Control Panel
          </p>
        </div>
      </div>

      <div className="admin-topbar-actions">
        <Link to="/admin/dashboard">
          <button
            style={{
              background: "#1f4d3a",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontWeight: "600",
            }}
          >
            <FaBackward />
            Go Back
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AdminTopbar;