import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";
import { useToast } from "../../context/ToastContext";

const initialForm = {
  imageUrl: "",
  title: "",
  category: "",
  active: true,
};

function ManageGallery() {
  const { showToast } = useToast();

  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchImages = async () => {
    try {
      const res = await api.get("/admin/gallery");
      setImages(res.data.data || []);
    } catch (error) {
      console.error("Fetch gallery error:", error);
      showToast("Failed to fetch gallery", "error");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) return formData.imageUrl;

    const uploadData = new FormData();
    uploadData.append("file", selectedFile);

    setUploading(true);

    try {
      const res = await api.post("/admin/upload", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedUrl = res.data.data.imageUrl;
      showToast("Image uploaded successfully");
      return uploadedUrl;
    } catch (error) {
      console.error("Image upload error:", error);
      showToast("Failed to upload image", "error");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalImageUrl = formData.imageUrl;

    if (selectedFile) {
      finalImageUrl = await uploadImage();
      if (!finalImageUrl) return;
    }

    const payload = {
      ...formData,
      imageUrl: finalImageUrl,
    };

    try {
      if (editingId) {
        await api.put(`/admin/gallery/${editingId}`, payload);
        showToast("Gallery image updated successfully");
      } else {
        await api.post("/admin/gallery", payload);
        showToast("Gallery image added successfully");
      }

      setFormData(initialForm);
      setEditingId(null);
      setSelectedFile(null);
      setPreviewUrl("");
      fetchImages();
    } catch (error) {
      console.error("Save gallery image error:", error);
      showToast("Failed to save gallery image", "error");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      imageUrl: item.imageUrl || "",
      title: item.title || "",
      category: item.category || "",
      active: item.active ?? true,
    });
    setPreviewUrl(item.imageUrl || "");
    setSelectedFile(null);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/gallery/${id}`);
      showToast("Gallery image deleted successfully");
      fetchImages();
    } catch (error) {
      console.error("Delete gallery image error:", error);
      showToast("Failed to delete gallery image", "error");
    }
  };

  return (
    <AdminLayout>
      <div className="premium-panel" style={{ marginBottom: "24px" }}>
        <h1 style={{ color: "#fff", marginBottom: "8px", fontSize: "1.8rem" }}>
          Manage Gallery
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "20px" }}>
          Upload and manage gallery images with preview support.
        </p>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <input
              className="input"
              name="title"
              placeholder="Title"
              value={formData.title}
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

            <input
              className="input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={inputDarkStyle}
            />
          </div>

          {previewUrl && (
            <div style={{ marginBottom: "18px" }}>
              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  width: "220px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              />
            </div>
          )}

          <label style={{ display: "block", marginBottom: "16px", color: "#fff" }}>
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              style={{ marginRight: "8px" }}
            />
            Active
          </label>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button className="btn" type="submit" disabled={uploading}>
              {uploading
                ? "Uploading..."
                : editingId
                ? "Update Image"
                : "Add Image"}
            </button>

            {editingId && (
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setEditingId(null);
                  setFormData(initialForm);
                  setSelectedFile(null);
                  setPreviewUrl("");
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "18px",
        }}
      >
        {images.map((item) => (
          <div
            key={item.id}
            className="premium-panel"
            style={{ padding: "16px" }}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "14px",
                marginBottom: "14px",
              }}
            />

            <h3 style={{ color: "#fff", marginBottom: "8px" }}>{item.title}</h3>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "8px" }}>
              {item.category}
            </p>
            <p style={{ color: item.active ? "#4ade80" : "#f87171", marginBottom: "14px" }}>
              {item.active ? "Active" : "Inactive"}
            </p>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button className="btn" onClick={() => handleEdit(item)}>
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "10px 14px",
                  borderRadius: "10px",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
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

export default ManageGallery;