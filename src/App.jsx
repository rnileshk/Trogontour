import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/admin/ProtectedRoute";

import WhatsAppButton from "./components/common/WhatsAppButton";
import ScrollToTopButton from "./components/common/ScrollToTopButton";

import Home from "./pages/Home";
import About from "./pages/About";
import Tours from "./pages/Tours";
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

function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isEmployeeRoute = location.pathname.startsWith("/employee");

  return (
    <>
      {!isAdminRoute && !isEmployeeRoute && <Navbar />}

      <main style={{ minHeight: "80vh" }}>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:slug" element={<TourDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Testimonials />} />

          {/* ================= ADMIN ================= */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/tours"
            element={
              <ProtectedRoute>
                <ManageTours />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/enquiries"
            element={
              <ProtectedRoute>
                <ManageEnquiries />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/testimonials"
            element={
              <ProtectedRoute>
                <ManageTestimonials />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/gallery"
            element={
              <ProtectedRoute>
                <ManageGallery />
              </ProtectedRoute>
            }
          />
          {/* NOT FOUND */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </main>

      {!isAdminRoute && !isEmployeeRoute && (
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