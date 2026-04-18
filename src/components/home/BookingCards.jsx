import { Link } from "react-router-dom";

function BookingCards() {
  const cards = [
    {
      title: "Customize Your Trip",
      desc: "Need a personal itinerary based on your time and budget? We can help.",
      button: "Plan My Trip",
      link: "/contact",
    },
    {
      title: "Browse Tour Packages",
      desc: "Explore destination packages and find the perfect journey for you.",
      button: "View Packages",
      link: "/tours",
    },
    {
      title: "Talk to Our Team",
      desc: "Get quick assistance for bookings, packages and travel planning.",
      button: "Contact Us",
      link: "/contact",
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-3">
          {cards.map((card, index) => (
            <div
              key={index}
              className="card"
              style={{
                padding: "28px",
                background: "linear-gradient(135deg, #ffffff, #f3f8f4)",
              }}
            >
              <h3 style={{ color: "#1f4d3a", marginBottom: "12px" }}>{card.title}</h3>
              <p style={{ marginBottom: "20px", lineHeight: "1.8", color: "grey" }}>{card.desc}</p>
              <Link to={card.link}>
                <button className="btn">{card.button}</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BookingCards;