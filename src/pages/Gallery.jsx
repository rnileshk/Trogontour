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
        subtitle="A glimpse of memorable moments, landscapes and experiences."
      />

      <section className="section">
        <div className="container">
          {loading ? (
            <Loader />
          ) : images.length === 0 ? (
            <EmptyState message="No gallery images available." />
          ) : (
            <div className="grid grid-3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "10px"
              }}
            >
              {images.map((img) => (
                <div
                  className="cards"
                  key={img.id}
                  style={{ cursor: "pointer", overflow: "hidden", borderRadius: "5px" }}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      transition: "0.35s ease",
                    }}
                  />
                  <div style={{ padding: "" }}>
                    <h3 style={{ color: "#32a977", marginBottom: "8px" }}>{img.title}</h3>
                    <p style={{ color: "#32a977" }}>{img.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <LightboxModal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </>
  );
}

export default Gallery;