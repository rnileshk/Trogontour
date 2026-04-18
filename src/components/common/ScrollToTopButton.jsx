import { useEffect, useState } from "react";

function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showButton) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "50%",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        border: "none",
        background: "transparent",
        color: "white",
        fontSize: "20px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
        zIndex: 1200,
      }}
      title="Go to top"
    >
      ↑
    </button>
  );
}

export default ScrollToTopButton;