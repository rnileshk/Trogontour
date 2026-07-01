import HeroSection from "../components/home/HeroSection";
import FeaturedTours from "../components/home/FeaturedTours";
import WhyChooseUs from "../components/home/WhyChooseUs";
import StatsSection from "../components/home/StatsSection";
import BookingCards from "../components/home/BookingCards";
import FAQSection from "../components/home/FAQSection";
import CTASection from "../components/home/CTASection";
import HappyClients from "../components/home/HappyClients";
import Feature from "../components/home/Feature";
import BirdingSeason from "../components/home/BirdingSeason";

const MAINTENANCE_MODE = true;

function Home() {
  if (MAINTENANCE_MODE) {
    return <MaintenancePage />;
  }
  return (
    <>
      <HeroSection />
      <FeaturedTours />
      <BirdingSeason />
      <Feature />
      <HappyClients />
      <WhyChooseUs />
      <StatsSection />
      <BookingCards />
      <FAQSection />
      <CTASection />
    </>
  );
}

function MaintenancePage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      textAlign: "center",
    }}>
      <div style={{ fontSize: "72px", marginBottom: "24px" }}>🚧</div>
      <h1 style={{ color: "#fff", fontSize: "clamp(28px, 5vw, 52px)", fontWeight: "800", marginBottom: "16px" }}>
        We'll Be Back Soon
      </h1>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "18px", maxWidth: "480px", lineHeight: "1.8", marginBottom: "40px" }}>
        Our website is currently under maintenance.<br />
        We are working hard to bring you a better experience.
      </p>
      <div style={{ width: "60px", height: "3px", background: "#f59e0b", borderRadius: "99px", marginBottom: "40px" }} />
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", marginBottom: "8px" }}>
        For urgent enquiries, reach us at:
      </p>
      <a href="mailto:supporttrogontours@gmail.com" style={{ color: "#f59e0b", fontSize: "16px", fontWeight: "600", textDecoration: "none" }}>
        supporttrogontours@gmail.com
      </a>
      <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", marginTop: "60px" }}>
        © {new Date().getFullYear()} Trogon Tours Northeast. All rights reserved.
      </p>
    </div>
  );
}

export default Home;
