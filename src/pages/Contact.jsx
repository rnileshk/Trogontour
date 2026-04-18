import EnquiryForm from "../components/forms/EnquiryForm";
import PageBanner from "../components/common/PageBanner";

function Contact() {
  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="Get in touch for bookings, package details and customized trip planning."
      />

      <section className="section">
        <div className="container">
          <div className="grid two-col" style={{ gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
            <div className="card" style={{ padding: "25px" }}>
              <h3 style={{ marginBottom: "15px", color: "#15d686" }}>Get in Touch</h3>
              <p style={{ marginBottom: "10px", color: "black" }}>Email: support@travelscape.in</p>
              <p style={{ marginBottom: "10px", color: "black" }}>Phone: +91 9876543210</p>
              <p style={{ marginBottom: "10px", color: "black" }}>WhatsApp: +91 9876543210</p>
              <p style={{ marginBottom: "10px", color: "black" }}>Address: Bangalore, Karnataka, India</p>
              <p style={{ marginBottom: "10px", color: "black" }}>Support Hours: Mon - Sat, 9 AM - 7 PM</p>
              <p style={{ color: "black" }}>
                Reach out for customized travel itineraries, package information and
                booking support.
              </p>

              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=YOUR_MAP_EMBED_URL"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;