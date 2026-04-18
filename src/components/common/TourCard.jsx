import { Link } from "react-router-dom";

function TourCard({ tour }) {
  return (
    <div className="card"
    >
      <img
        src={tour.thumbnail || "https://via.placeholder.com/400x250"}
        alt={tour.title}
        style={{ borderRadius: "5px" }}
      />

      <div style={{ padding: "20px" }}>
        <h3 style={{ marginBottom: "10px", color: "#117f51" }}>{tour.title}</h3>
        <p style={{ marginBottom: "8px", color: "black" }}>{tour.location}</p>
        <p style={{ marginBottom: "8px", color: "black" }}>{tour.duration}</p>
        <p style={{ marginBottom: "12px", fontWeight: "bolder", color: "black" }}>
          ₹ {tour.price}
        </p>
        <p style={{ marginBottom: "16px", color: "black", fontWeight: "bold" }}>{tour.shortDescription}</p>

        <Link to={`/tours/${tour.slug}`}>
          <button className="btn">View Details</button>
        </Link>
      </div>
    </div>
  );
}

export default TourCard;