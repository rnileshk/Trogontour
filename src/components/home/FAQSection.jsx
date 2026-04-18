import { useState } from "react";

function FAQSection() {
  const faqs = [
    {
      question: "How do I book a tour package?",
      answer:
        "You can send an enquiry through our website, and our team will contact you with pricing, itinerary and booking details.",
    },
    {
      question: "Can I request a customized itinerary?",
      answer:
        "Yes, we can create personalized travel plans based on your destination, duration, budget and preferences.",
    },
    {
      question: "Are flights included in the package price?",
      answer:
        "It depends on the package. Some packages include transport and some are land-only. You can confirm during enquiry.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can use the contact form, call us directly, or message us on WhatsApp for quick support.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section" style={{ background: "#fff" }}>
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>

        <div style={{ maxWidth: "850px", margin: "0 auto" }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card"
              style={{ marginBottom: "15px", padding: "18px" }}
            >
              <div
                onClick={() => toggleFAQ(index)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <h3 style={{ color: "#1f4d3a", fontSize: "1.05rem" }}>
                  {faq.question}
                </h3>
                <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  {activeIndex === index ? "-" : "+"}
                </span>
              </div>

              {activeIndex === index && (
                <p style={{ marginTop: "12px", lineHeight: "1.7", color: "#2dce8b" }}>
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;