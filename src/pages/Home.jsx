import HeroSection from "../components/home/HeroSection";
import FeaturedDestinations from "../components/home/FeaturedDestinations";
import PackageCategories from "../components/home/PackageCategories";
import FeaturedTours from "../components/home/FeaturedTours";
import WhyChooseUs from "../components/home/WhyChooseUs";
import StatsSection from "../components/home/StatsSection";
import TestimonialSection from "../components/home/TestimonialSection";
import BookingCards from "../components/home/BookingCards";
import FAQSection from "../components/home/FAQSection";
import CTASection from "../components/home/CTASection";

function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedDestinations />
      <PackageCategories />
      <FeaturedTours />
      <WhyChooseUs />
      <StatsSection />
      <TestimonialSection />
      <BookingCards />
      <FAQSection />
      <CTASection />
    </>
  );
}

export default Home;