import { useState } from "react";

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
          style={{
            gridTemplateColumns: "1.5fr 1fr",
            gap: "30px",
            marginBottom: "25px",
          }}
        >
          {/* LEFT */}
          <div>
            <h3 style={{ marginBottom: "14px" }}>Trogontours</h3>

            <p style={{ lineHeight: "1.8", maxWidth: "600px" }}>
              Discover beautiful destinations, memorable adventures and
              thoughtfully designed travel experiences with comfort, trust
              and personalized support.
            </p>

            <p style={{ marginTop: "4rem", visibility: "hidden" }}>
              Designed and Developed by Nilesh Kumar
            </p>
          </div>

          {/* RIGHT */}
          <div className="card" style={{ padding: "25px" }}>
            <h3 style={{ marginBottom: "15px", color: "#15d686" }}>
              Get in Touch
            </h3>

            <p>Name: Ankur Jyoti Dutta</p>
            <p>Email: supporttrogontours@gmail.com</p>
            <p>Phone: +91 6000676063</p>
            <p>WhatsApp: +91 6000676063</p>
            <p>Address: Assam, India</p>
            <p>Support Hours: Mon - Sat, 9 AM - 7 PM</p>
          </div>
        </div>

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
          <p>Email: supporttrogontours@gmail.com | Phone: +91 6000676063</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;