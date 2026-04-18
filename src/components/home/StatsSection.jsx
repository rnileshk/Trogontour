function StatsSection() {
  const stats = [
    { number: "500+", label: "Happy Travelers" },
    { number: "80+", label: "Tour Packages" },
    { number: "25+", label: "Destinations Covered" },
    { number: "5+", label: "Years of Service" },
  ];

  return (
    <section
      className="section"
      style={{ background: "#1f4d3a", color: "white" }}
    >
      <div className="container">
        <div className="grid grid-3">
          {stats.map((item, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "2.2rem", marginBottom: "10px" }}>
                {item.number}
              </h2>
              <p style={{ fontSize: "1.05rem" }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;