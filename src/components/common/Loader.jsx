function Loader() {
  return (
    <div style={{ textAlign: "center", padding: "50px 20px" }}>
      <div
        style={{
          width: "45px",
          height: "45px",
          border: "4px solid #ddd",
          borderTop: "4px solid #1f4d3a",
          borderRadius: "50%",
          margin: "0 auto 15px",
          animation: "spin 1s linear infinite",
        }}
      />
      <p>Loading...</p>
    </div>
  );
}

export default Loader;