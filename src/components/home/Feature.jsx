import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function Feature() {
  const clients = [
    {
      name: "State bird of assam",
      text: "Critically endangered under iucn",
      image: "./winged.jpeg"
    },
    {
      name: "Sclater's monal",
      text:
        "Critically endangered species endemic to mishmi hills",
      image: "./monal.png"
    },
    {
      name: "Golden creasted myna",
      text:
        "Winter migratory from Thailand And winter migratory in namdapha",
      image: "./creasted.png"
    },
    {
      name: "OWl",
      text:
        "One of rarest owl only found in maguri (dibru-soikhuwa NP)",
      image: "./tr.jpeg"
    },
    {
      name: "From mismi hills",
      text:
        "",
      image: "./owl.jpeg"
    }
  ];

  return (
    <section data-aos="fade-up" data-aos-delay="1000"
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
        Our Gallery
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
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                transition: "transform 0.3s ease"
              }}
            >
              {/* FULL CARD IMAGE */}
              <img
                src={client.image}
                alt={client.name}
                style={{
                  width: "100%",
                  height: "320px",
                  display: "block",
                  objectFit: "cover",
                  objectPosition: "top center"
                }}
              />

              {/* CONTENT */}
              <div style={{ padding: "18px" }}>
                {/* ONE LINE DESCRIPTION */}
                <p
                  style={{
                    color: "#555",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginBottom: "10px"
                  }}
                >
                  {client.text}
                </p>

                {/* NAME */}
                <h4
                  style={{
                    color: "#0f5642",
                    fontSize: "16px",
                    fontWeight: "600",
                    margin: 0
                  }}
                >
                  {client.name}
                </h4>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}