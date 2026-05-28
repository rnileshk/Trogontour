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
              <p style={{ marginBottom: "10px", color: "black" }}>Name: Ankur Jyoti Dutta</p>
              <p style={{ marginBottom: "10px", color: "black" }}>Email: supporttrogontours@gmail.com</p>
              <p style={{ marginBottom: "10px", color: "black" }}>Phone: +91 6000676063</p>
              <p style={{ marginBottom: "10px", color: "black" }}>WhatsApp: +91 6000676063</p>
              <p style={{ marginBottom: "10px", color: "black" }}>Address: Assam, India</p>
              <p style={{ marginBottom: "10px", color: "black" }}>Support Hours: Mon - Sat, 9 AM - 7 PM</p>
              <p style={{ color: "black" }}>
                Reach out for customized travel itineraries, package information and
                booking support.
              </p>

              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671004.7573773973!2d90.21629647152442!3d26.034682095211085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374516c94c312d63%3A0xd11a73bb736719fb!2sAssam!5e0!3m2!1sen!2sin!4v1779638413817!5m2!1sen!2sin"
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