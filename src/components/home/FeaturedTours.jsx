import { useEffect, useState } from "react";
import api from "../../services/api";
import Loader from "../common/Loader";
import TourCard from "../common/TourCard";

function FeaturedTours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedTours = async () => {
      try {
        const res = await api.get("/tours/featured");
        setTours(res.data.data || []);
      } catch (error) {
        console.error("Error fetching featured tours", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTours();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Featured Tours</h2>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-3">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedTours;