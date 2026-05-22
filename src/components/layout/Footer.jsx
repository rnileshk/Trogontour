import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import AdminLoginModal from "../admin/AdminLoginModal";

function Footer() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleAdminClick = () => {
    if (isAuthenticated()) {
      navigate("/admin/dashboard");
    } else {
      setShowModal(true);
    }
  };

  return (
<<<<<<< HEAD
    <footer
      style={{
        background: "#123126",
        color: "white",
        padding: "50px 0 25px",
        marginTop: "40px",
      }}
    >
      <div className="container">
        <div
          className="grid two-col"
          style={{ gridTemplateColumns: "1.5fr 1fr", gap: "30px", marginBottom: "25px" }}
        >
          <div>
            <h3 style={{ marginBottom: "14px" }}>Trogontours</h3>
            <p style={{ lineHeight: "1.8", maxWidth: "600px" }}>
              Discover beautiful destinations, memorable adventures and
              thoughtfully designed travel experiences with comfort, trust and
              personalized support.
            </p>
=======
    <>
      <footer
        style={{
          background: "#123126",
          color: "white",
          padding: "50px 0 25px",
          marginTop: "40px",
        }}
      >
        <div className="container">
          <div
            className="grid two-col"
            style={{
              gridTemplateColumns: "1.5fr 1fr",
              gap: "30px",
              marginBottom: "25px",
            }}
          >
            {/* LEFT */}
            <div>
              <h3 style={{ marginBottom: "14px" }}>Trogontours</h3>
>>>>>>> 63248d3 (Added admin login modal in navbar and UI improvements)

              <p style={{ lineHeight: "1.8", maxWidth: "600px" }}>
                Discover beautiful destinations, memorable adventures and
                thoughtfully designed travel experiences with comfort, trust
                and personalized support.
              </p>

              <p style={{ marginTop: "4rem" }}>
                Designed and Developed by{" "}
                <a
                  href="https://nileshk.netlify.app/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#15d686" }}
                >
                  Nilesh Kumar
                </a>
              </p>

              <button
                onClick={handleAdminClick}
                style={{
                  marginTop: "15px",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 6px 16px rgba(31,77,58,0.2)",
                }}
              >
              </button>
            </div>

            {/* RIGHT */}
            <div className="card" style={{ padding: "25px" }}>
              <h3 style={{ marginBottom: "15px", color: "#15d686" }}>
                Get in Touch
              </h3>

              <p>Email: support@trogontours.in</p>
              <p>Phone: +91 9876543210</p>
              <p>WhatsApp: +91 9876543210</p>
              <p>Address: Assam, India</p>
              <p>Support Hours: Mon - Sat, 9 AM - 7 PM</p>
            </div>
          </div>

<<<<<<< HEAD
          <div className="card" style={{ padding: "25px" }}>
            <h3 style={{ marginBottom: "15px", color: "#15d686" }}>Get in Touch</h3>
            <p style={{ marginBottom: "10px" }}>Email: support@Trogontours.in</p>
            <p style={{ marginBottom: "10px" }}>Phone: +91 9876543210</p>
            <p style={{ marginBottom: "10px" }}>WhatsApp: +91 9876543210</p>
            <p style={{ marginBottom: "10px" }}>Address: Assam, India</p>
            <p style={{ marginBottom: "10px" }}>Support Hours: Mon - Sat, 9 AM - 7 PM</p>
=======
          <hr
            style={{
              borderColor: "rgba(255,255,255,0.15)",
              marginBottom: "20px",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <p>© {new Date().getFullYear()} Trogontours. All rights reserved.</p>
            <p>Email: support@trogontours.in | Phone: +91 9876543210</p>
>>>>>>> 63248d3 (Added admin login modal in navbar and UI improvements)
          </div>
        </div>
      </footer>

      <AdminLoginModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

export default Footer;
