export default function BirdingSeason() {
  const seasons = [
    {
      title: "Winter Birding",
      months: "October • November • December • January • February",
      places: "Namdapha • Maguri • Walong",
      image:
        "./winged.jpeg"
    },
    {
      title: "Summer Birding",
      months: "March • April • May",
      places: "Mishmi • Walong • Dihing Patkai",
      image:
        "./header.jpeg"
    },
    {
      title: "Monsoon Birding",
      months: "June • July • August • September",
      places: "Mishmi • Dihing Patkai",
      image:
        "./owl.jpeg"
    }
  ];

  return (
    <section
      style={{
        padding: "80px 20px",
        background: "#f7faf8"
      }}
    >
      {/* HEADING */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h2
          style={{
            fontSize: "42px",
            fontWeight: "700",
            color: "#0f5642",
            marginBottom: "10px"
          }}
        >
          Best Birding Seasons
        </h2>

        <p
          style={{
            color: "#666",
            fontSize: "16px"
          }}
        >
          Explore the best destinations across every season
        </p>
      </div>

      {/* CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "30px"
        }}
      >
        {seasons.map((season, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              transition: "0.3s ease"
            }}
          >
            {/* IMAGE */}
            <img
              src={season.image}
              alt={season.title}
              style={{
                width: "100%",
                objectFit: "cover",
                height: "250px",
                  display: "block",
                  objectFit: "cover",
                  objectPosition: "top center",
              }}
            />

            {/* CONTENT */}
            <div style={{ padding: "24px" }}>
              <h3
                style={{
                  color: "#0f5642",
                  fontSize: "26px",
                  marginBottom: "15px"
                }}
              >
                {season.title}
              </h3>

              {/* MONTHS */}
              <div style={{ marginBottom: "18px" }}>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#888",
                    marginBottom: "6px",
                    fontWeight: "600",
                    textTransform: "uppercase"
                  }}
                >
                  Best Time
                </p>

                <p
                  style={{
                    fontSize: "16px",
                    color: "#333",
                    lineHeight: "1.7"
                  }}
                >
                  {season.months}
                </p>
              </div>

              {/* PLACES */}
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#888",
                    marginBottom: "6px",
                    fontWeight: "600",
                    textTransform: "uppercase"
                  }}
                >
                  Best Destinations
                </p>

                <p
                  style={{
                    fontSize: "16px",
                    color: "#333",
                    lineHeight: "1.7"
                  }}
                >
                  {season.places}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}