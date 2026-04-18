import { useEffect, useState } from "react";
import api from "../../services/api";
import Loader from "../common/Loader";

function TestimonialSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.get("/testimonials");
        setTestimonials(res.data.data || []);
      } catch (error) {
        console.error("Error fetching testimonials", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">What Our Travelers Say</h2>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-3">
            {testimonials.map((item) => (
              <div className="card" key={item.id}>
                <div style={{ padding: "20px" }}>
                  <h3 style={{ color: "#1f4d3a", marginBottom: "10px" }}>
                    {item.name}
                  </h3>
                  <p style={{ marginBottom: "10px", fontStyle: "italic", color: "#4eecaa" }}>
                    {item.role}
                  </p>
                  <p style={{ marginBottom: "10px", color: "#2dce8b" }}>{item.message}</p>
                  <p style={{ color: "#2dce8b" }}>Rating: {"⭐ ".repeat(item.rating || 5)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default TestimonialSection;