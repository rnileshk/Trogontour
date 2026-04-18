import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";

const initialForm = {
  name: "",
  role: "",
  message: "",
  rating: 5,
  photoUrl: "",
  active: true,
};

function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const fetchTestimonials = async () => {
    try {
      const res = await api.get("/admin/testimonials");
      setTestimonials(res.data.data || []);
    } catch (error) {
      console.error("Fetch testimonials error:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      rating: Number(formData.rating),
    };

    try {
      if (editingId) {
        await api.put(`/admin/testimonials/${editingId}`, payload);
      } else {
        await api.post("/admin/testimonials", payload);
      }

      setFormData(initialForm);
      setEditingId(null);
      fetchTestimonials();
    } catch (error) {
      console.error("Save testimonial error:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name || "",
      role: item.role || "",
      message: item.message || "",
      rating: item.rating || 5,
      photoUrl: item.photoUrl || "",
      active: item.active ?? true,
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/testimonials/${id}`);
      fetchTestimonials();
    } catch (error) {
      console.error("Delete testimonial error:", error);
    }
  };

  return (
    <AdminLayout>
      <h1 style={{ marginBottom: "20px", color: "#30936a" }}>Manage Testimonials</h1>

      <form className="card" style={{ padding: "20px", marginBottom: "30px" }} onSubmit={handleSubmit}>
        <div className="grid grid-3">
          <input className="input" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input className="input" name="role" placeholder="Role" value={formData.role} onChange={handleChange} />
          <input className="input" name="rating" type="number" min="1" max="5" placeholder="Rating" value={formData.rating} onChange={handleChange} />
          <input className="input" name="photoUrl" placeholder="Photo URL" value={formData.photoUrl} onChange={handleChange} />
        </div>

        <textarea className="textarea" name="message" placeholder="Message" value={formData.message} onChange={handleChange} />

        <label style={{ display: "block", marginBottom: "15px" }}>
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
            style={{ marginRight: "8px" }}
          />
          Active
        </label>

        <button className="btn" type="submit">
          {editingId ? "Update Testimonial" : "Create Testimonial"}
        </button>
      </form>

      <div className="grid grid-3">
        {testimonials.map((item) => (
          <div key={item.id} className="card" style={{ padding: "20px" }}>
            <h3 style={{ marginBottom: "10px", color: "#30936a" }}>{item.name}</h3>
            <p style={{ marginBottom: "8px" }}>{item.role}</p>
            <p style={{ marginBottom: "8px" }}>{item.message}</p>
            <p style={{ marginBottom: "8px" }}>Rating: {item.rating}</p>
            <p style={{ marginBottom: "16px" }}>Status: {item.active ? "Active" : "Inactive"}</p>

            <button className="btn" style={{ marginRight: "10px" }} onClick={() => handleEdit(item)}>
              Edit
            </button>
            <button style={deleteBtnStyle} onClick={() => handleDelete(item.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

const deleteBtnStyle = {
  background: "#c0392b",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "6px",
};

export default ManageTestimonials;