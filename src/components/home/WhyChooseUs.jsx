function WhyChooseUs() {
  const items = [
    {
      title: "Affordable Pricing",
      desc: "We believe great travel should not feel like a luxury locked behind a vault. Our pricing is designed to be fair, flexible, and fully transparent, so you always know exactly what you are paying for.",
    },
    {
      desc: "Our birding guide brings more than 10 years of experience in the field, offering deep knowledge of local bird species, habitats, and birdwatching techniques. With a keen eye for spotting rare and beautiful birds, he ensures every tour is both exciting and educational for nature enthusiasts of all levels. Known for his friendly nature and well-mannered personality, he creates a comfortable and enjoyable experience for guests, making every birding trip memorable and rewarding.",
    },
  ];

  return (
    <section className="section" style={{ background: "#fff" }}>
      <div className="container">
        <h2 className="section-title">Why Choose Us</h2>

        <div className="grid grid-3">
          {items.map((item, index) => (
            <div className="card" key={index}>
              <div style={{ padding: "24px" }}>
                <h3 style={{ marginBottom: "10px", color: "#1f4d3a" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#2dce8b" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;