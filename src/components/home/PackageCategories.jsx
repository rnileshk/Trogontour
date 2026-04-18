function PackageCategories() {
  const categories = [
    {
      title: "Adventure Tours",
      icon: "⛰️",
      desc: "Trekking, camping, outdoor and thrill-filled travel experiences.",
    },
    {
      title: "Family Holidays",
      icon: "👨‍👩‍👧‍👦",
      desc: "Comfortable and enjoyable trips planned for families and groups.",
    },
    {
      title: "Honeymoon Packages",
      icon: "💑",
      desc: "Romantic destinations and memorable stays for couples.",
    },
    {
      title: "Wildlife Tours",
      icon: "🦌",
      desc: "Safaris, forests, bird watching and nature exploration tours.",
    },
  ];

  return (
    <section className="section" style={{ background: "#fff" }}>
      <div className="container">
        <h2 className="section-title">Tour Categories</h2>

        <div className="grid grid-3">
          {categories.map((item, index) => (
            <div
              key={index}
              className="card"
              style={{
                padding: "24px",
                textAlign: "center",
                transition: "0.3s ease",
              }}
            >
              <div style={{ fontSize: "2.4rem", marginBottom: "12px" }}>{item.icon}</div>
              <h3 style={{ color: "#1f4d3a", marginBottom: "10px" }}>{item.title}</h3>
              <p style={{ lineHeight: "1.7", color: "grey" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PackageCategories;