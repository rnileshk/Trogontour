function WhyChooseUs() {
  const items = [
    {
      title: "Handpicked Packages",
      desc: "Carefully designed tours for comfort, adventure and memorable experiences.",
    },
    {
      title: "Affordable Pricing",
      desc: "Get quality travel experiences at competitive and transparent prices.",
    },
    {
      title: "Trusted Support",
      desc: "Our team is always ready to help you before, during and after your trip.",
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