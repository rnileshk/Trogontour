import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/common/Loader";
import EnquiryForm from "../components/forms/EnquiryForm";
import EmptyState from "../components/common/EmptyState";

function TourDetails() {
  const { slug } = useParams();
  const [tour, setTour] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const tourRes = await api.get(`/tours/${slug}`);
        const tourData = tourRes.data.data;
        setTour(tourData);

        if (tourData?.id) {
          const itineraryRes = await api.get(`/tours/${tourData.id}/itinerary`);
          setItinerary(itineraryRes.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching tour details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, [slug]);

  if (loading) return <Loader />;
  if (!tour) return <EmptyState message="Tour not found." />;

  return (
    <section className="section">
      <div className="container">
        <img
          src={tour.bannerImage || "https://via.placeholder.com/1200x450"}
          alt={tour.title}
          style={{
            width: "100%",
            height: "600px",
            objectFit: "cover",
            borderRadius: "12px",
            marginBottom: "20px",
            borderRadius: "5px",
          }}
        />

        <div className="grid two-col" style={{ gridTemplateColumns: "2fr 1fr", gap: "30px" }}>
          <div>
            <h1 style={{ color: "#1f4d3a", marginBottom: "15px" }}>{tour.title}</h1>
            <p style={{ marginBottom: "10px", color: "black" }}><strong>Location:</strong> {tour.location}</p>
            <p style={{ marginBottom: "10px", color: "black" }}><strong>Duration:</strong> {tour.duration}</p>
            <p style={{ marginBottom: "10px", color: "black" }}><strong>Category:</strong> {tour.category}</p>
            <p style={{ marginBottom: "10px", color: "black" }}><strong>Price:</strong> ₹ {tour.price}</p>
            <p style={{ marginBottom: "24px", lineHeight: "1.8", color: "black" }}>{tour.fullDescription}</p>

            <h2 style={{ marginBottom: "15px", color: "#1f4d3a" }}>Itinerary</h2>

            {itinerary.length === 0 ? (
              <EmptyState message="No itinerary available." />
            ) : (
              itinerary.map((day) => (
                <div
                  key={day.id}
                  className="card"
                  style={{ padding: "16px", marginBottom: "15px" }}
                >
                  <h3 style={{ marginBottom: "8px", color: "#1f4d3a" }}>
                    Day {day.dayNumber}: {day.title}
                  </h3>
                  <p style={{ lineHeight: "1.7" }}>{day.description}</p>
                </div>
              ))
            )}
          </div>

          <div>
            <EnquiryForm packageName={tour.title} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TourDetails;