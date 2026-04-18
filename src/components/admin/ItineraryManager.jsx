import { useEffect, useState } from "react";
import api from "../../services/api";
import { useToast } from "../../context/ToastContext";

const initialForm = {
  dayNumber: "",
  title: "",
  description: "",
};

function ItineraryManager({ tourId }) {
  const { showToast } = useToast();

  const [days, setDays] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const fetchItinerary = async () => {
    if (!tourId) return;

    try {
      const res = await api.get(`/tours/${tourId}/itinerary`);
      setDays(res.data.data || []);
    } catch (error) {
      console.error("Fetch itinerary error:", error);
    }
  };

  useEffect(() => {
    fetchItinerary();
  }, [tourId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tourId) {
      showToast("Select or create a tour first", "error");
      return;
    }

    const payload = {
      ...formData,
      dayNumber: Number(formData.dayNumber),
    };

    try {
      if (editingId) {
        await api.put(`/admin/itinerary/${editingId}`, payload);
        showToast("Itinerary updated successfully");
      } else {
        await api.post(`/admin/tours/${tourId}/itinerary`, payload);
        showToast("Itinerary day added successfully");
      }

      setFormData(initialForm);
      setEditingId(null);
      fetchItinerary();
    } catch (error) {
      console.error("Save itinerary error:", error);
      showToast("Failed to save itinerary", "error");
    }
  };

  const handleEdit = (day) => {
    setEditingId(day.id);
    setFormData({
      dayNumber: day.dayNumber || "",
      title: day.title || "",
      description: day.description || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/itinerary/${id}`);
      showToast("Itinerary deleted successfully");
      fetchItinerary();
    } catch (error) {
      console.error("Delete itinerary error:", error);
      showToast("Failed to delete itinerary", "error");
    }
  };

  return (
    <div className="admin-card" style={{ marginTop: "30px" }}>
      <h2 style={{ marginBottom: "20px", color: "#1f4d3a" }}>Manage Itinerary</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            className="input"
            name="dayNumber"
            type="number"
            placeholder="Day Number"
            value={formData.dayNumber}
            onChange={handleChange}
            required
          />

          <input
            className="input"
            name="title"
            placeholder="Day Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            className="textarea"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="admin-form-actions">
          <button className="btn" type="submit">
            {editingId ? "Update Day" : "Add Day"}
          </button>

          {editingId && (
            <button
              type="button"
              className="btn"
              onClick={() => {
                setEditingId(null);
                setFormData(initialForm);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div style={{ marginTop: "25px" }}>
        {days.length === 0 ? (
          <p>No itinerary added yet.</p>
        ) : (
          days.map((day) => (
            <div
              key={day.id}
              className="card"
              style={{ padding: "15px", marginBottom: "12px" }}
            >
              <h3 style={{ marginBottom: "8px", color: "white"  }}>
                Day {day.dayNumber}: {day.title}
              </h3>
              <p style={{ marginBottom: "12px", color: "white" }}>{day.description}</p>

              <button className="btn" style={{ marginRight: "10px" }} onClick={() => handleEdit(day)}>
                Edit
              </button>
              <button
                style={{
                  background: "#c0392b",
                  color: "white",
                  border: "none",
                  padding: "10px 14px",
                  borderRadius: "6px",
                }}
                onClick={() => handleDelete(day.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ItineraryManager;