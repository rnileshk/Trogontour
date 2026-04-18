function LightboxModal({ image, onClose }) {
  if (!image) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.82)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 3000,
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "900px", width: "100%" }}
      >
        <img
          src={image.imageUrl}
          alt={image.title}
          style={{
            width: "100%",
            maxHeight: "80vh",
            objectFit: "contain",
            borderRadius: "10px",
          }}
        />
        <div
          style={{
            marginTop: "12px",
            color: "white",
            textAlign: "center",
          }}
        >
          <h3>{image.title}</h3>
          <p>{image.category}</p>
        </div>
      </div>
    </div>
  );
}

export default LightboxModal;