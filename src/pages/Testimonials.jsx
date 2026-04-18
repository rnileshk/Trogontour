import { useMemo, useState } from "react";
import api from "../services/api";

const initialForm = {
  name: "",
  role: "",
  message: "",
  rating: 5,
  photoUrl: "",
  active: true,
};

function Testimonials() {
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const previewImage = useMemo(() => {
    return formData.photoUrl?.trim() ? formData.photoUrl.trim() : "";
  }, [formData.photoUrl]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "rating"
          ? Math.max(1, Math.min(5, Number(value || 1)))
          : value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required.";
    if (!formData.role.trim()) return "Trip name is required.";
    if (!formData.message.trim()) return "Feedback message is required.";
    if (formData.message.trim().length < 10) {
      return "Please write a slightly longer feedback message.";
    }
    if (formData.rating < 1 || formData.rating > 5) {
      return "Rating must be between 1 and 5.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMsg("");
    setErrorMsg("");

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    const payload = {
      ...formData,
      rating: Number(formData.rating),
      name: formData.name.trim(),
      role: formData.role.trim(),
      message: formData.message.trim(),
      photoUrl: formData.photoUrl.trim(),
    };

    try {
      setLoading(true);

      if (editingId) {
        await api.put(`/admin/testimonials/${editingId}`, payload);
        setSubmitMsg("Feedback updated successfully.");
      } else {
        await api.post("/testimonials/submit", payload);
        setSubmitMsg("Thank you for your feedback.");
      }

      setFormData(initialForm);
      setEditingId(null);
    } catch (error) {
      console.error("Save testimonial error:", error);
      setErrorMsg("Unable to submit feedback right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Give Us Your Feedback</h1>
          <p style={subtitleStyle}>
            Share your travel experience with us. Your feedback helps us improve
            future trips and build trust with new travelers.
          </p>
        </div>

        <form style={formCardStyle} onSubmit={handleSubmit}>
          <div style={responsiveGridStyle}>
            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Your Name</label>
              <input
                className="input"
                style={inputStyle}
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Trip Name</label>
              <input
                className="input"
                style={inputStyle}
                name="role"
                placeholder="Example: Meghalaya Explorer"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>

            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Photo URL</label>
              <input
                className="input"
                style={inputStyle}
                name="photoUrl"
                placeholder="Paste your photo URL (optional)"
                value={formData.photoUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={labelStyle}>Rating</label>
            <div style={ratingWrapStyle}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, rating: star }))
                  }
                  style={{
                    ...starButtonStyle,
                    color: star <= formData.rating ? "#f59e0b" : "#cbd5e1",
                  }}
                  aria-label={`Rate ${star} star`}
                >
                  ★
                </button>
              ))}
              <span style={ratingTextStyle}>{formData.rating} / 5</span>
            </div>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={labelStyle}>Your Message</label>
            <textarea
              className="textarea"
              style={textareaStyle}
              name="message"
              placeholder="Tell us about your experience"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          {previewImage && (
            <div style={previewCardStyle}>
              <p style={previewTextStyle}>Photo Preview</p>
              <img
                src={previewImage}
                alt="Preview"
                style={previewImgStyle}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          <label style={checkboxRowStyle}>
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              style={{ marginRight: "10px" }}
            />
            Display this feedback publicly
          </label>

          {submitMsg && <p style={successMsgStyle}>{submitMsg}</p>}
          {errorMsg && <p style={errorMsgStyle}>{errorMsg}</p>}

          <div style={buttonRowStyle}>
            <button className="btn" type="submit" style={submitButtonStyle} disabled={loading}>
              {loading
                ? editingId
                  ? "Updating..."
                  : "Submitting..."
                : editingId
                ? "Update Feedback"
                : "Submit Feedback"}
            </button>

            {editingId && (
              <button
                type="button"
                style={secondaryButtonStyle}
                onClick={() => {
                  setFormData(initialForm);
                  setEditingId(null);
                  setSubmitMsg("");
                  setErrorMsg("");
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

const sectionStyle = {
  padding: "24px 12px",
};

const containerStyle = {
  maxWidth: "900px",
  margin: "0 auto",
};

const headerStyle = {
  marginBottom: "20px",
  textAlign: "center",
};

const titleStyle = {
  marginBottom: "10px",
  color: "#1f4d3a",
  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
};

const subtitleStyle = {
  color: "#475569",
  lineHeight: "1.7",
  maxWidth: "700px",
  margin: "0 auto",
};

const formCardStyle = {
  background: "#ffffff",
  borderRadius: "18px",
  padding: "24px",
  boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
};

const responsiveGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
  marginBottom: "18px",
};

const fieldWrapStyle = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  marginBottom: "8px",
  fontWeight: "600",
  color: "#1f2937",
};

const inputStyle = {
  marginBottom: 0,
};

const textareaStyle = {
  marginBottom: 0,
  minHeight: "130px",
};

const ratingWrapStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
};

const starButtonStyle = {
  background: "transparent",
  border: "none",
  fontSize: "2rem",
  cursor: "pointer",
  lineHeight: 1,
  padding: 0,
};

const ratingTextStyle = {
  marginLeft: "8px",
  fontWeight: "600",
  color: "#334155",
};

const previewCardStyle = {
  marginBottom: "18px",
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "14px",
  padding: "14px",
};

const previewTextStyle = {
  marginBottom: "10px",
  fontWeight: "600",
  color: "#334155",
};

const previewImgStyle = {
  width: "100%",
  maxWidth: "180px",
  height: "180px",
  objectFit: "cover",
  borderRadius: "12px",
};

const checkboxRowStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "18px",
  color: "#334155",
  fontWeight: "500",
  flexWrap: "wrap",
};

const buttonRowStyle = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

const submitButtonStyle = {
  minWidth: "180px",
};

const secondaryButtonStyle = {
  background: "#e2e8f0",
  color: "#0f172a",
  border: "none",
  padding: "12px 18px",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
};

const successMsgStyle = {
  marginBottom: "14px",
  color: "#15803d",
  background: "#dcfce7",
  padding: "12px 14px",
  borderRadius: "10px",
};

const errorMsgStyle = {
  marginBottom: "14px",
  color: "#b91c1c",
  background: "#fee2e2",
  padding: "12px 14px",
  borderRadius: "10px",
};

export default Testimonials;