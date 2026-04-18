import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section
      className="section"
      style={{
        background: "linear-gradient(135deg, #1f4d3a, #2f6f55)",
        color: "white",
        textAlign: "center",
      }}
    >
      <div className="container">
        <h2 style={{ fontSize: "2.3rem", marginBottom: "18px" }}>
          Ready for Your Next Adventure?
        </h2>
        <p
          style={{
            maxWidth: "700px",
            margin: "0 auto 25px",
            lineHeight: "1.8",
            fontSize: "1.05rem",
          }}
        >
          Explore beautiful destinations, create unforgettable memories, and let
          us craft a travel experience made just for you.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <Link to="/tours">
            <button className="btn">View Packages</button>
          </Link>
          <Link to="/contact">
            <button
              style={{
                background: "white",
                color: "#1f4d3a",
                border: "none",
                padding: "12px 22px",
                borderRadius: "6px",
                fontSize: "1rem",
              }}
            >
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTASection;