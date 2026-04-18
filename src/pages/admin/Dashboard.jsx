import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkedAlt,
  FaEnvelopeOpenText,
  FaQuoteLeft,
  FaImages,
  FaArrowRight,
  FaChartLine,
  FaGlobeAsia,
  FaHandSparkles,
} from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";
import { useToast } from "../../context/ToastContext";

function Dashboard() {
  const { showToast } = useToast();

  const [stats, setStats] = useState({
    totalTours: 0,
    totalEnquiries: 0,
    totalTestimonials: 0,
    totalGalleryImages: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard/stats");
        setStats(res.data.data || {});
      } catch (error) {
        console.error("Dashboard stats fetch error:", error);
        showToast("Failed to load dashboard stats", "error");
      }
    };

    fetchStats();
  }, [showToast]);

  const cards = [
    {
      title: "Total Tours",
      value: stats.totalTours || 0,
      icon: <FaMapMarkedAlt />,
      accent: "#22c55e",
      glow: "rgba(34, 197, 94, 0.28)",
    },
    {
      title: "Total Enquiries",
      value: stats.totalEnquiries || 0,
      icon: <FaEnvelopeOpenText />,
      accent: "#3b82f6",
      glow: "rgba(59, 130, 246, 0.28)",
    },
    {
      title: "Testimonials",
      value: stats.totalTestimonials || 0,
      icon: <FaQuoteLeft />,
      accent: "#a855f7",
      glow: "rgba(168, 85, 247, 0.28)",
    },
    {
      title: "Gallery Images",
      value: stats.totalGalleryImages || 0,
      icon: <FaImages />,
      accent: "#fb923c",
      glow: "rgba(251, 146, 60, 0.28)",
    },
  ];

  const quickLinks = [
    {
      title: "Manage Tours",
      desc: "Create premium packages, update pricing, and organize destinations.",
      link: "/admin/tours",
      icon: <FaGlobeAsia />,
    },
    {
      title: "Manage Enquiries",
      desc: "Track customer requests and follow up with hot leads quickly.",
      link: "/admin/enquiries",
      icon: <FaEnvelopeOpenText />,
    },
    {
      title: "Manage Testimonials",
      desc: "Keep customer trust strong with fresh feedback and reviews.",
      link: "/admin/testimonials",
      icon: <FaQuoteLeft />,
    },
    {
      title: "Manage Gallery",
      desc: "Showcase destinations with rich visuals and engaging images.",
      link: "/admin/gallery",
      icon: <FaImages />,
    },
  ];

  const summaryItems = [
    {
      title: "Tours",
      text: "Update destinations, itinerary and pricing with full control.",
      color: "#22c55e",
    },
    {
      title: "Enquiries",
      text: "Monitor customer interest and convert new leads faster.",
      color: "#3b82f6",
    },
    {
      title: "Testimonials",
      text: "Boost trust using traveler reviews and social proof.",
      color: "#a855f7",
    },
    {
      title: "Gallery",
      text: "Keep your website visually fresh and more attractive.",
      color: "#fb923c",
    },
  ];

  return (
    <AdminLayout>
      <div className="dashboard-hero">
        <div className="dashboard-hero-blur one" />
        <div className="dashboard-hero-blur two" />

        <div className="dashboard-hero-icon">
          <FaHandSparkles />
        </div>

        <h1 className="dashboard-hero-title">Welcome back, Admin</h1>
        <p className="dashboard-hero-text">
          Control your travel platform with a modern command center. Monitor tours,
          leads, testimonials, and gallery content from one premium dashboard.
        </p>
      </div>

      <div className="dashboard-stats-grid premium-gap">
        {cards.map((card, index) => (
          <div
            key={index}
            className="premium-stat-card"
            style={{
              "--accent": card.accent,
              "--glow": card.glow,
            }}
          >
            <div className="premium-stat-top">
              <div className="premium-stat-icon">{card.icon}</div>
              <div className="premium-stat-dot" />
            </div>

            <p className="premium-stat-label">{card.title}</p>
            <h2 className="premium-stat-value">{card.value}</h2>
          </div>
        ))}
      </div>

      <div className="dashboard-main-grid premium-gap">
        <div className="premium-panel">
          <div className="premium-panel-header">
            <h2>Quick Actions</h2>
            <span>Shortcuts</span>
          </div>

          <div className="quick-links-grid">
            {quickLinks.map((item, index) => (
              <Link key={index} to={item.link} className="premium-action-card">
                <div className="premium-action-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span className="premium-action-link">
                  Open <FaArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="premium-panel">
          <div className="premium-panel-header">
            <h2>Admin Summary</h2>
            <span>Overview</span>
          </div>

          <div className="premium-summary-list">
            {summaryItems.map((item, index) => (
              <div
                key={index}
                className="premium-summary-item"
                style={{ "--summary-color": item.color }}
              >
                <div className="premium-summary-bar" />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;