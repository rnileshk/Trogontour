import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";
import ItineraryManager from "../../components/admin/ItineraryManager";
import { useToast } from "../../context/ToastContext";

const initialForm = {
  title: "",
  slug: "",
  shortDescription: "",
  fullDescription: "",
  location: "",
  duration: "",
  price: "",
  category: "",
  featured: false,
  thumbnail: "",
  bannerImage: "",
  status: "ACTIVE",
};

function ManageTours() {
  const { showToast } = useToast();

  const [tours, setTours] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [selectedTourId, setSelectedTourId] = useState(null);

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");

  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchTours = async () => {
    try {
      const res = await api.get("/admin/tours");
      setTours(res.data.data || []);
    } catch (error) {
      console.error("Error fetching tours:", error);
      showToast("Failed to fetch tours", "error");
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      return (
        tour.title?.toLowerCase().includes(search.toLowerCase()) ||
        tour.location?.toLowerCase().includes(search.toLowerCase()) ||
        tour.category?.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [tours, search]);

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "title" && !editingId) {
        updated.slug = generateSlug(value);
      }

      return updated;
    });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnailFile(file);

    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    setBannerFile(file);

    if (file) {
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const uploadSingleImage = async (file) => {
    if (!file) return null;

    const uploadData = new FormData();
    uploadData.append("file", file);

    const res = await api.post("/admin/upload", uploadData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.data.imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let thumbnailUrl = formData.thumbnail;
      let bannerUrl = formData.bannerImage;

      if (thumbnailFile) {
        thumbnailUrl = await uploadSingleImage(thumbnailFile);
      }

      if (bannerFile) {
        bannerUrl = await uploadSingleImage(bannerFile);
      }

      const payload = {
        ...formData,
        price: formData.price ? Number(formData.price) : 0,
        thumbnail: thumbnailUrl,
        bannerImage: bannerUrl,
      };

      if (editingId) {
        await api.put(`/admin/tours/${editingId}`, payload);
        showToast("Tour updated successfully");
      } else {
        const res = await api.post("/admin/tours", payload);
        setSelectedTourId(res.data.data?.id || null);
        showToast("Tour created successfully");
      }

      setFormData(initialForm);
      setEditingId(null);
      setThumbnailFile(null);
      setBannerFile(null);
      setThumbnailPreview("");
      setBannerPreview("");
      fetchTours();
    } catch (error) {
      console.error("Tour save error:", error);
      showToast("Failed to save tour", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (tour) => {
    setEditingId(tour.id);
    setSelectedTourId(tour.id);

    setFormData({
      title: tour.title || "",
      slug: tour.slug || "",
      shortDescription: tour.shortDescription || "",
      fullDescription: tour.fullDescription || "",
      location: tour.location || "",
      duration: tour.duration || "",
      price: tour.price || "",
      category: tour.category || "",
      featured: tour.featured || false,
      thumbnail: tour.thumbnail || "",
      bannerImage: tour.bannerImage || "",
      status: tour.status || "ACTIVE",
    });

    setThumbnailPreview(tour.thumbnail || "");
    setBannerPreview(tour.bannerImage || "");
    setThumbnailFile(null);
    setBannerFile(null);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/tours/${id}`);
      showToast("Tour deleted successfully");

      if (selectedTourId === id) {
        setSelectedTourId(null);
      }

      fetchTours();
    } catch (error) {
      console.error("Delete tour error:", error);
      showToast("Failed to delete tour", "error");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setSelectedTourId(null);
    setFormData(initialForm);
    setThumbnailFile(null);
    setBannerFile(null);
    setThumbnailPreview("");
    setBannerPreview("");
  };

  return (
    <AdminLayout>
      <div className="premium-panel" style={{ marginBottom: "24px" }}>
        <h1 style={{ color: "#fff", marginBottom: "8px", fontSize: "1.8rem" }}>
          Manage Tours
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "20px" }}>
          Create and update travel packages with image upload and itinerary support.
        </p>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <input
              className="input"
              name="title"
              placeholder="Tour Title"
              value={formData.title}
              onChange={handleChange}
              required
              style={inputDarkStyle}
            />

            <input
              className="input"
              name="slug"
              placeholder="Slug"
              value={formData.slug}
              onChange={handleChange}
              required
              style={inputDarkStyle}
            />

            <input
              className="input"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              style={inputDarkStyle}
            />

            <input
              className="input"
              name="duration"
              placeholder="Duration (e.g. 5 Days / 4 Nights)"
              value={formData.duration}
              onChange={handleChange}
              style={inputDarkStyle}
            />

            <input
              className="input"
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              style={inputDarkStyle}
            />

            <input
              className="input"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              style={inputDarkStyle}
            />

            <select
              className="select"
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={inputDarkStyle}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>

          <textarea
            className="textarea"
            name="shortDescription"
            placeholder="Short Description"
            value={formData.shortDescription}
            onChange={handleChange}
            style={inputDarkStyle}
          />

          <textarea
            className="textarea"
            name="fullDescription"
            placeholder="Full Description"
            value={formData.fullDescription}
            onChange={handleChange}
            style={inputDarkStyle}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
              marginBottom: "18px",
            }}
          >
            <div>
              <label style={labelStyle}>Thumbnail Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                style={inputDarkStyle}
              />

              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  style={previewStyle}
                />
              )}
            </div>

            <div>
              <label style={labelStyle}>Banner Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
                style={inputDarkStyle}
              />

              {bannerPreview && (
                <img
                  src={bannerPreview}
                  alt="Banner Preview"
                  style={previewStyle}
                />
              )}
            </div>
          </div>

          <label style={{ display: "block", marginBottom: "16px", color: "#fff" }}>
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              style={{ marginRight: "8px" }}
            />
            Featured Tour
          </label>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button className="btn" type="submit" disabled={uploading}>
              {uploading
                ? "Saving..."
                : editingId
                ? "Update Tour"
                : "Create Tour"}
            </button>

            {(editingId || selectedTourId) && (
              <button type="button" className="btn" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="premium-panel" style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "14px",
            flexWrap: "wrap",
            marginBottom: "18px",
          }}
        >
          <h2 style={{ color: "#fff", margin: 0 }}>Tour List</h2>

          <input
            className="input"
            placeholder="Search by title, location, category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              ...inputDarkStyle,
              width: "320px",
              maxWidth: "100%",
            }}
          />
        </div>

        <div className="table-wrap">
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "0 12px",
              minWidth: "900px",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Tour</th>
                <th style={thStyle}>Location</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTours.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    <div
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: "18px",
                        padding: "20px",
                        textAlign: "center",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      No tours found.
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTours.map((tour) => (
                  <tr key={tour.id} style={{ background: "rgba(255,255,255,0.05)" }}>
                    <td style={tdStyle}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <img
                          src={tour.thumbnail || "https://via.placeholder.com/80"}
                          alt={tour.title}
                          style={{
                            width: "70px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
                        <div>
                          <div style={{ color: "#fff", fontWeight: "600", marginBottom: "4px" }}>
                            {tour.title}
                          </div>
                          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>
                            {tour.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td style={tdStyle}>{tour.location}</td>
                    <td style={tdStyle}>{tour.category}</td>
                    <td style={tdStyle}>₹ {tour.price}</td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          padding: "8px 12px",
                          borderRadius: "999px",
                          fontSize: "13px",
                          fontWeight: "600",
                          background:
                            tour.status === "ACTIVE"
                              ? "rgba(34,197,94,0.15)"
                              : "rgba(248,113,113,0.15)",
                          color:
                            tour.status === "ACTIVE" ? "#4ade80" : "#f87171",
                          border:
                            tour.status === "ACTIVE"
                              ? "1px solid rgba(74,222,128,0.25)"
                              : "1px solid rgba(248,113,113,0.25)",
                        }}
                      >
                        {tour.status}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <button className="btn" onClick={() => handleEdit(tour)}>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(tour.id)}
                          style={deleteBtnStyle}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ItineraryManager tourId={selectedTourId} />
    </AdminLayout>
  );
}

const inputDarkStyle = {
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  padding: "12px 14px",
};

const labelStyle = {
  display: "block",
  marginBottom: "10px",
  color: "#fff",
  fontWeight: "600",
};

const previewStyle = {
  width: "100%",
  maxWidth: "260px",
  height: "160px",
  objectFit: "cover",
  borderRadius: "14px",
  marginTop: "12px",
  border: "1px solid rgba(255,255,255,0.12)",
};

const thStyle = {
  textAlign: "left",
  padding: "12px 14px",
  color: "rgba(255,255,255,0.7)",
  fontSize: "14px",
  fontWeight: "600",
};

const tdStyle = {
  padding: "16px 14px",
  color: "#fff",
  verticalAlign: "top",
};

const deleteBtnStyle = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "10px 14px",
  borderRadius: "10px",
};

export default ManageTours;