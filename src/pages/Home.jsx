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

function Home() {
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

export default Home;
