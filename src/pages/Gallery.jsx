import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/common/Loader";
import PageBanner from "../components/common/PageBanner";
import EmptyState from "../components/common/EmptyState";
import LightboxModal from "../components/gallery/LightboxModal";

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await api.get("/gallery");
        setImages(res.data.data || []);
      } catch (error) {
        console.error("Error fetching gallery", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <>
      <PageBanner
        title="Travel Gallery"
        subtitle="A glimpse of unforgettable landscapes, wildlife and journeys."
      />

      <section
        style={{
          padding: "80px 0",
          background:
            "linear-gradient(to bottom, #f8fafc, #eef7f3)",
          minHeight: "100vh",
          backgroundColor: "black",
        }}
      >
        <div
          style={{
            width: "92%",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {/* Top Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "50px",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "42px",
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: "12px",
                }}
              >
                Explore Moments
              </h2>
            </div>

            <div
              style={{
                background: "#32a977",
                color: "#fff",
                padding: "14px 24px",
                borderRadius: "50px",
                fontWeight: "600",
                fontSize: "15px",
                boxShadow: "0 12px 30px rgba(50,169,119,0.25)",
              }}
            >
              {images.length} Photos
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <Loader />
          ) : images.length === 0 ? (
            <EmptyState message="No gallery images available." />
          ) : (
            <div
              style={{
                columnCount:
                  window.innerWidth <= 600
                    ? 1
                    : window.innerWidth <= 992
                    ? 2
                    : 3,
                columnGap: "22px",
              }}
            >
              {images.map((img, index) => (
                <div
                  key={img.id}
                  onClick={() => setSelectedImage(img)}
                  style={{
                    position: "relative",
                    marginBottom: "22px",
                    breakInside: "avoid",
                    cursor: "pointer",
                    borderRadius: "24px",
                    overflow: "hidden",
                    background: "#fff",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
                    transition: "all 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 55px rgba(0,0,0,0.18)";

                    const image =
                      e.currentTarget.querySelector(".gallery-image");

                    if (image) {
                      image.style.transform = "scale(1.08)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0px)";
                    e.currentTarget.style.boxShadow =
                      "0 15px 40px rgba(0,0,0,0.08)";

                    const image =
                      e.currentTarget.querySelector(".gallery-image");

                    if (image) {
                      image.style.transform = "scale(1)";
                    }
                  }}
                >
                  {/* Image */}
                  <img
                    className="gallery-image"
                    src={img.imageUrl}
                    alt={img.title}
                    style={{
                      width: "100%",
                      display: "block",
                      objectFit: "cover",
                      transition: "transform 0.6s ease",
                    }}
                  />

                  {/* Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.15), transparent)",
                    }}
                  />

                  {/* Number Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "18px",
                      right: "18px",
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.18)",
                      backdropFilter: "blur(10px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: "700",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    {index + 1}
                  </div>

                  {/* Bottom Content */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "22px",
                      left: "22px",
                      right: "22px",
                      zIndex: 2,
                    }}
                  >
                    {/* Category */}
                    <div
                      style={{
                        display: "inline-block",
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(10px)",
                        color: "#fff",
                        padding: "7px 16px",
                        borderRadius: "50px",
                        fontSize: "13px",
                        marginBottom: "14px",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      {img.category}
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        color: "#fff",
                        fontSize: "25px",
                        fontWeight: "700",
                        marginBottom: "10px",
                        lineHeight: "1.4",
                      }}
                    >
                      {img.title}
                    </h3>

                    {/* Footer */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        color: "#d1fae5",
                        fontSize: "14px",
                      }}
                    >
                      <span>Click to View</span>

                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        →
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <LightboxModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}

export default Gallery;