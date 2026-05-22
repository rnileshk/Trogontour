import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section
      style={{
        backgroundImage:
          "url('https://drive.google.com/file/d/1-h01EZEaiMcfb1wMwFuphRxhmNi3IafP/view?usp=sharing')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
      }}
    >
      <div className="hero-overlay">
        <div className="container">
          <div style={{ maxWidth: "720px" }}>
            <h1 className="hero-title" style={{ fontSize: "3.3rem", marginBottom: "20px" }}>
              Explore Nature, Adventure & Beautiful Destinations
            </h1>
            <p style={{ fontSize: "1.1rem", marginBottom: "30px", lineHeight: "1.7" }}>
              Discover premium travel packages, scenic landscapes and unforgettable
              journeys crafted for every traveler.
            </p>
            <Link to="/tours">
              <button className="btn">Explore Tours</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
