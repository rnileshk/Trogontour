import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaUserShield,
} from "react-icons/fa";
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
    const role = res.data.role || res.data.data?.role; 
    const user = res.data.user || res.data.data?.user;

    if (token) {
      saveToken(token);
      showToast("Login successful");
      onClose();

      // 🧠 ROLE-BASED REDIRECT FIX
      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "EMPLOYEE") {
        navigate("/employee/dashboard");
      } else {
        showToast("Unknown role received", "error");
      }

    } else {
      showToast("Token not received from server", "error");
    }
  } catch (error) {
    console.error("Login error:", error);
    showToast(error.response?.data?.message || "Login failed", "error");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      {/* BACKDROP */}
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
          padding: "16px",
        }}
      >
        {/* MODAL */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="admin-modal"
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
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              zIndex: 10,
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "none",
              background: "rgba(0,0,0,0.35)",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaTimes />
          </button>

          {/* LEFT PANEL */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(31,77,58,0.96), rgba(47,111,85,0.92)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat",
              color: "#fff",
              padding: "clamp(24px, 5vw, 50px)",
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

            <h2
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2.1rem)",
                marginBottom: "16px",
                lineHeight: "1.2",
              }}
            >
              Welcome Back, Admin
            </h2>

            <p style={{ lineHeight: "1.8", opacity: 0.95 }}>
              Access the dashboard to manage tours, enquiries, testimonials,
              gallery, and keep your travel website updated in one place.
            </p>

            <div style={{ marginTop: "28px", display: "grid", gap: "14px" }}>
              <div style={infoBoxStyle}>Manage packages and destinations</div>
              <div style={infoBoxStyle}>Track enquiries and update status</div>
              <div style={infoBoxStyle}>Control testimonials and gallery</div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div
            style={{
              padding: "clamp(24px, 5vw, 50px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fcfcfc",
            }}
          >
            <div style={{ width: "100%", maxWidth: "380px" }}>
              <h3
                style={{
                  fontSize: "clamp(1.4rem, 3.5vw, 1.8rem)",
                  color: "#1f4d3a",
                  marginBottom: "10px",
                }}
              >
                Admin Login
              </h3>

              <p style={{ color: "#666", marginBottom: "28px" }}>
                Sign in with your admin email and password.
              </p>

              <form onSubmit={handleSubmit}>
                {/* EMAIL */}
                <div style={{ marginBottom: "18px" }}>
                  <label style={labelStyle}>Email Address</label>

                  <div style={inputBoxStyle}>
                    <FaEnvelope style={{ color: "#1f4d3a" }} />
                    <input
                      type="email"
                      name="email"
                      placeholder="admin@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div style={{ marginBottom: "22px" }}>
                  <label style={labelStyle}>Password</label>

                  <div style={inputBoxStyle}>
                    <FaLock style={{ color: "#1f4d3a" }} />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        color: "#1f4d3a",
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* BUTTON */}
                <button type="submit" disabled={loading} style={buttonStyle}>
                  {loading ? "Logging in..." : "Login to Dashboard"}
                </button>
              </form>

              <p
                style={{
                  marginTop: "18px",
                  fontSize: "14px",
                  color: "#777",
                  textAlign: "center",
                }}
              >
                Secure admin access for website management.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RESPONSIVE CSS */}
      <style>
        {`
          @media (max-width: 900px) {
            .admin-modal {
              grid-template-columns: 1fr;
              max-width: 520px;
              min-height: auto;
            }
          }

          @media (max-width: 480px) {
            .admin-modal {
              width: 100%;
              height: 100vh;
              border-radius: 0;
            }
          }
        `}
      </style>
    </>
  );
}

/* reusable styles */
const inputBoxStyle = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #d9d9d9",
  borderRadius: "12px",
  padding: "0 14px",
  background: "#fff",
  gap: "10px",
};

const inputStyle = {
  flex: 1,
  border: "none",
  outline: "none",
  padding: "14px 0",
  fontSize: "15px",
  background: "transparent",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "600",
  color: "#1f4d3a",
};

const buttonStyle = {
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
};

const infoBoxStyle = {
  background: "rgba(255,255,255,0.12)",
  padding: "14px 16px",
  borderRadius: "12px",
};

export default AdminLoginModal;
