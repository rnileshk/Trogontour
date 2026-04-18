import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaTimes, FaEye, FaEyeSlash, FaUserShield } from "react-icons/fa";
import api from "../../services/api";
import { saveToken } from "../../utils/auth";
import { useToast } from "../../context/ToastContext";

function AdminLoginModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      const token = res.data.token || res.data.data?.token;

      if (token) {
        saveToken(token);
        showToast("Login successful");
        onClose();
        navigate("/admin/dashboard");
      } else {
        showToast("Token not received from server", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast("Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 3000,
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "950px",
          minHeight: "540px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderRadius: "22px",
          overflow: "hidden",
          background: "#fff",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            zIndex: 10,
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,0.2)",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          <FaTimes />
        </button>

        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(31,77,58,0.96), rgba(47,111,85,0.92)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat",
            color: "#fff",
            padding: "50px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "74px",
              height: "74px",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
              fontSize: "30px",
            }}
          >
            <FaUserShield />
          </div>

          <h2 style={{ fontSize: "2.1rem", marginBottom: "16px", lineHeight: "1.2" }}>
            Welcome Back, Admin
          </h2>

          <p style={{ lineHeight: "1.8", fontSize: "1rem", opacity: 0.95, maxWidth: "420px" }}>
            Access the dashboard to manage tours, enquiries, testimonials, gallery,
            and keep your travel website updated in one place.
          </p>

          <div style={{ marginTop: "28px", display: "grid", gap: "14px" }}>
            <div
              style={{
                background: "rgba(255,255,255,0.12)",
                padding: "14px 16px",
                borderRadius: "12px",
              }}
            >
              Manage packages and destinations
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.12)",
                padding: "14px 16px",
                borderRadius: "12px",
              }}
            >
              Track enquiries and update status
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.12)",
                padding: "14px 16px",
                borderRadius: "12px",
              }}
            >
              Control testimonials and gallery
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "50px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fcfcfc",
          }}
        >
          <div style={{ width: "100%", maxWidth: "380px" }}>
            <h3 style={{ fontSize: "1.8rem", color: "#1f4d3a", marginBottom: "10px" }}>
              Admin Login
            </h3>
            <p style={{ color: "#666", marginBottom: "28px", lineHeight: "1.7" }}>
              Sign in with your admin email and password.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "18px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#1f4d3a",
                  }}
                >
                  Email Address
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #d9d9d9",
                    borderRadius: "12px",
                    padding: "0 14px",
                    background: "#fff",
                  }}
                >
                  <FaEnvelope style={{ color: "#1f4d3a", marginRight: "10px" }} />
                  <input
                    type="email"
                    name="email"
                    placeholder="admin@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      padding: "14px 0",
                      fontSize: "15px",
                      background: "transparent",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "22px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#1f4d3a",
                  }}
                >
                  Password
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #d9d9d9",
                    borderRadius: "12px",
                    padding: "0 14px",
                    background: "#fff",
                  }}
                >
                  <FaLock style={{ color: "#1f4d3a", marginRight: "10px" }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      padding: "14px 0",
                      fontSize: "15px",
                      background: "transparent",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      color: "#1f4d3a",
                      fontSize: "16px",
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  border: "none",
                  borderRadius: "12px",
                  padding: "14px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#fff",
                  background: "linear-gradient(135deg, #1f4d3a, #2f6f55)",
                  cursor: "pointer",
                  boxShadow: "0 10px 24px rgba(31,77,58,0.25)",
                }}
              >
                {loading ? "Logging in..." : "Login to Dashboard"}
              </button>
            </form>

            <p
              style={{
                marginTop: "18px",
                fontSize: "14px",
                color: "#777",
                textAlign: "center",
                lineHeight: "1.6",
              }}
            >
              Secure admin access for website management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginModal;