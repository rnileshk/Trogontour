import { Link } from "react-router-dom";

function Footer() {
  return (
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
            <h3 style={{ marginBottom: "14px" }}>TravelScape</h3>
            <p style={{ lineHeight: "1.8", maxWidth: "600px" }}>
              Discover beautiful destinations, memorable adventures and
              thoughtfully designed travel experiences with comfort, trust and
              personalized support.
            </p>

            <p style={{ marginTop: "6rem" }}>Designed and Developed by <a href="https://nileshk.netlify.app/" target="_blank">Nilesh Kumar</a></p>
          </div>

          <div className="card" style={{ padding: "25px" }}>
            <h3 style={{ marginBottom: "15px", color: "#15d686" }}>Get in Touch</h3>
            <p style={{ marginBottom: "10px" }}>Email: support@travelscape.in</p>
            <p style={{ marginBottom: "10px" }}>Phone: +91 9876543210</p>
            <p style={{ marginBottom: "10px" }}>WhatsApp: +91 9876543210</p>
            <p style={{ marginBottom: "10px" }}>Address: Bangalore, Karnataka, India</p>
            <p style={{ marginBottom: "10px" }}>Support Hours: Mon - Sat, 9 AM - 7 PM</p>
          </div>
        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.15)", marginBottom: "20px" }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <p>© {new Date().getFullYear()} TravelScape. All rights reserved.</p>
          <p>Email: support@travelscape.com | Phone: +91 9876543210</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;