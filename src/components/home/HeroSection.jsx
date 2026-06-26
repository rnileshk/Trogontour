import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section
      style={{
        backgroundImage:
          "url('./header.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        height: "100vh",
      }}
    >
      <div className="hero-overlay" data-aos="zoom-in" >
        <div className="container" >
          <div style={{ maxWidth: "720px" }}>
            <h1 className="hero-title" data-aos="zoom-in" data-aos-delay="2000" style={{ fontSize: "3.3rem", marginBottom: "20px" }}>
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
