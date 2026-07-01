import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import 'swiper/css';
import 'swiper/css/autoplay';

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/admin/ProtectedRoute";

import WhatsAppButton from "./components/common/WhatsAppButton";
import ScrollToTopButton from "./components/common/ScrollToTopButton";

import Home from "./pages/Home";
import About from "./pages/About";
import TourDetails from "./pages/TourDetails";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Testimonials from "./pages/Testimonials";

// ADMIN
import Dashboard from "./pages/admin/Dashboard";
import ManageTours from "./pages/admin/ManageTours";
import ManageEnquiries from "./pages/admin/ManageEnquiries";
import ManageTestimonials from "./pages/admin/ManageTestimonials";
import ManageGallery from "./pages/admin/ManageGallery";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";

const MAINTENANCE_MODE = true; // keep in sync with Home.jsx

function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isEmployeeRoute = location.pathname.startsWith("/employee");
  const isHome = location.pathname === "/";
  const hideChrome = isHome && MAINTENANCE_MODE;

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <>
      {!isAdminRoute && !isEmployeeRoute && !hideChrome && <Navbar />}

      <main style={{ minHeight: "80vh" }}>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tours/:slug" element={<TourDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Testimonials />} />

          {/* ================= ADMIN ================= */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/tours"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <ManageTours />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/enquiries"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <ManageEnquiries />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee/dashboard"
            element={
              <ProtectedRoute allowedRoles={["EMPLOYEE", "ADMIN"]}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/testimonials"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <ManageTestimonials />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/gallery"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <ManageGallery />
              </ProtectedRoute>
            }
          />

          {/* NOT FOUND */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </main>

      {!isAdminRoute && !isEmployeeRoute && !hideChrome && (
        <>
          <Footer />
          <WhatsAppButton />
          <ScrollToTopButton />
        </>
      )}
    </>
  );
}

export default App;
