import { useEffect, useState } from "react";
import api from "../../services/api";
import { useToast } from "../../context/ToastContext";

function EnquiryForm({ packageName = "" }) {
  const { showToast } = useToast();

  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    numberOfPeople: "",
    message: "",
    packageName: packageName,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      packageName,
    }));
  }, [packageName]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (formData.phone.length < 10) newErrors.phone = "Phone must be at least 10 digits";

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      const res = await api.post("/enquiries", {
        ...formData,
        numberOfPeople: formData.numberOfPeople
          ? Number(formData.numberOfPeople)
          : null,
      });

      const enquiryCode = res.data?.data?.enquiryCode;

      setSuccessMsg(
        enquiryCode
          ? `Enquiry submitted successfully. Your enquiry ID is ${enquiryCode}.`
          : "Enquiry submitted successfully."
      );

      showToast("Enquiry submitted successfully!", "success");

      setFormData({
        name: "",
        email: "",
        phone: "",
        travelDate: "",
        numberOfPeople: "",
        message: "",
        packageName,
      });
      setErrors({});
    } catch (error) {
      console.error("Enquiry submit error:", error);
      showToast("Failed to submit enquiry", "error");
    } finally {
      setLoading(false);
    }
  };

  {
    successMsg && (
      <p style={{ color: "#16a34a", marginTop: "14px", lineHeight: "1.7" }}>
        {successMsg}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: "20px" }}>
      <h3 style={{ marginBottom: "20px", color: "#1f4d3a" }}>Send Enquiry</h3>

      <input
        className="input"
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <p style={{ color: "red", marginBottom: "10px" }}>{errors.name}</p>}

      <input
        className="input"
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p style={{ color: "red", marginBottom: "10px" }}>{errors.email}</p>}

      <input
        className="input"
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
      />
      {errors.phone && <p style={{ color: "red", marginBottom: "10px" }}>{errors.phone}</p>}

      <input
        className="input"
        type="date"
        name="travelDate"
        value={formData.travelDate}
        onChange={handleChange}
      />

      <input
        className="input"
        type="number"
        name="numberOfPeople"
        placeholder="Number of People"
        value={formData.numberOfPeople}
        onChange={handleChange}
      />

      <textarea
        className="textarea"
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
      />

      <button className="btn" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Enquiry"}
      </button>
    </form>
  );
}

export default EnquiryForm;