import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function HappyClients() {
  const clients = [
    {
      name: "Subhankar Roy",
      text:
        "I recently visited Mishmi Hills and Dihing Patkai National Park with Guide Toto Hazarika for 7 days. His birding knowledge, patience, and hospitality made the trip unforgettable. I managed to get 84 lifers including rare species.",
      image: "./Subhankar.jpeg"
    },
    {
      name: "Rahul Mishra",
      text:
        "A heartfelt thank you to our host Kalpa and guide Toto. The hospitality, food, and birding expertise made Maguri Beel and Dehing Patkai experience extraordinary. Highly recommended stay!",
      image: "./Rahul.jpeg"
    },
    {
      name: "Bhavik Dutt",
      text: "Smooth booking experience and well-organized trip. Truly professional service.",
      image: "./Bhavik.jpeg"
    },
    {
      name: "Sudipta Ghose",
      text: "Excellent guidance and very friendly hosting. The experience felt personal and well planned.",
      image: "./Sudipta.jpeg"
    },
    {
      name: "Andris Avotins",
      text: "A peaceful, well-managed birding experience with great attention to detail.",
      image: "./Andris.jpeg"
    }
  ];

  return (
    <section
      style={{
        padding: "80px 20px",
        background: "linear-gradient(to bottom, #ffffff, #f4f9f7)"
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "36px",
          marginBottom: "50px",
          fontWeight: "700",
          color: "#0f5642",
          letterSpacing: "0.5px"
        }}
      >
        Our Happy Clients
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={25}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2800,
          disableOnInteraction: false
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        {clients.map((client, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: "#fff",
                borderRadius: "18px",
                padding: "28px 22px",
                textAlign: "center",
                height: "100%",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                transition: "transform 0.3s ease"
              }}
            >
              {/* IMAGE */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={client.image}
                  alt={client.name}
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid #e8f3ef",
                    marginBottom: "18px"
                  }}
                />
              </div>

              {/* TEXT */}
              <p
                style={{
                  fontStyle: "italic",
                  color: "#444",
                  fontSize: "14.5px",
                  lineHeight: "1.6",
                  minHeight: "90px"
                }}
              >
                “{client.text}”
              </p>

              {/* NAME */}
              <h4
                style={{
                  marginTop: "14px",
                  color: "#0f5642",
                  fontSize: "16px",
                  fontWeight: "600"
                }}
              >
                {client.name}
              </h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}