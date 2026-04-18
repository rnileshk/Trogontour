function Toast({ message, type }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 2000,
        padding: "14px 18px",
        borderRadius: "8px",
        color: "white",
        background: type === "error" ? "#c0392b" : "#1f7a4d",
        boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
      }}
    >
      {message}
    </div>
  );
}

export default Toast;