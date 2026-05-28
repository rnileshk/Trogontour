import PageBanner from "../components/common/PageBanner";
import CTASection from "../components/home/CTASection";

function About() {
  return (
    <>
      <PageBanner
        title="About Us"
        subtitle="We create memorable travel experiences with comfort, adventure and trust."
      />

      <section className="section">
        <div className="container">
          <div
            className="grid two-col"
            style={{ gridTemplateColumns: "1fr 1fr", gap: "30px", alignItems: "center" }}
          >
            <div>
              <img
                src="./header.jpeg"
                alt="About travel"
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  height: "420px",
                  objectFit: "cover",
                }}
              />
            </div>

            <div>
              <h2 style={{ color: "#1f4d3a", marginBottom: "18px" }}>
                Your Trusted Travel Partner
              </h2>
              <p style={{ lineHeight: "1.8", color: "grey" }}>
                Trogontours is a travel experience platform focused on helping travelers
                discover beautiful destinations through thoughtfully designed tour packages,
                customized itineraries, and reliable support.
              </p>

              <p style={{ lineHeight: "1.8", color: "grey" }}>
                We believe travel should feel exciting, smooth, and memorable. Our goal is
                to provide curated travel experiences for families, couples, solo travelers,
                and adventure seekers with transparent communication and personalized service.
              </p>

              <p style={{ lineHeight: "1.8", color: "grey" }}>
                From destination planning to enquiry handling and post-booking support, we
                aim to make every journey comfortable and enjoyable.
              </p>
              <p style={{ lineHeight: "1.8", color: "grey" }}>
                With handpicked packages, transparent support and destination
                expertise, we help travelers enjoy more and worry less.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

export default About;