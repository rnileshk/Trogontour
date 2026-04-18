function FeaturedDestinations() {
  const destinations = [
    {
      title: "Meghalaya",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      description: "Waterfalls, caves, living root bridges and scenic hills.",
    },
    {
      title: "Assam",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
      description: "Tea gardens, wildlife safaris and river island experiences.",
    },
    {
      title: "Sikkim",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
      description: "Snow peaks, monasteries and peaceful mountain beauty.",
    },
  ];

  return (
    <section className="section" style={{ background: "#fff" }}>
      <div className="container">
        <h2 className="section-title">Featured Destinations</h2>

        <div className="grid grid-3">
          {destinations.map((item, index) => (
            <div className="card" key={index}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "5px" }}
              />
              <div style={{ padding: "20px" }}>
                <h3 style={{ marginBottom: "10px", color: "#1f4d3a" }}>
                  {item.title}
                </h3>
                <p style={{ color: "grey" }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedDestinations;