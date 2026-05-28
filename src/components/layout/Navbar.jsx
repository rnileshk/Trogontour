import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import AdminLoginModal from "../admin/AdminLoginModal";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // ================= ROLE BASED LOGIN REDIRECT =================
  const handleLoginClick = () => {
    // If NOT logged in → open login modal
    if (!isAuthenticated()) {
      setShowModal(true);
      return;
    }

    // If logged in → route based on role
    const role = localStorage.getItem("role");

    if (role === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (role === "EMPLOYEE") {
      navigate("/employee/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="container navbar-inner">
          {/* LOGO */}
          <Link to="/" className="logo">
            Trogontours
          </Link>

          {/* MOBILE MENU */}
          <button className="menu-btn" onClick={() => setOpen(!open)}>
            ☰
          </button>

          {/* NAV LINKS */}
          <nav className={`nav-links ${open ? "show" : ""}`}>
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            <Link to="/tours" onClick={() => setOpen(false)}>Tours</Link>
            <Link to="/gallery" onClick={() => setOpen(false)}>Gallery</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>

            {/* LOGIN BUTTON */}
            <button
              onClick={handleLoginClick}
              style={{
                marginLeft: "10px",
                background: "linear-gradient(135deg, #1f4d3a, #2f6f55)",
                color: "white",
                border: "none",
                padding: "7px 14px",
                borderRadius: "6px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.2s ease",
              }}
            >
              Login
            </button>
          </nav>
        </div>
      </header>

      {/* LOGIN MODAL */}
      <AdminLoginModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

export default Navbar;