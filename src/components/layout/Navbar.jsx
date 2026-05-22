import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import AdminLoginModal from "../admin/AdminLoginModal";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (isAuthenticated()) {
      navigate("/admin/dashboard");
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="container navbar-inner">
          <Link to="/" className="logo">
            Trogontours
          </Link>

          <button className="menu-btn" onClick={() => setOpen(!open)}>
            ☰
          </button>

          <nav className={`nav-links ${open ? "show" : ""}`}>
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            <Link to="/tours" onClick={() => setOpen(false)}>Tours</Link>
            <Link to="/gallery" onClick={() => setOpen(false)}>Gallery</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>

            {/* 🔐 ONLY ADDITION: LOGIN BUTTON NEXT TO CONTACT */}
            <button
              onClick={handleLoginClick}
              style={{
                marginLeft: "10px",
                background: "linear-gradient(135deg, #1f4d3a, #2f6f55)",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                fontWeight: "600",
                cursor: "pointer",
                visibility: "hidden",
              }}
            >
              Login
            </button>
          </nav>
        </div>
      </header>

      {/* Modal */}
      <AdminLoginModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

export default Navbar;
