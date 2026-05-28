import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import { useToast } from "../../context/ToastContext";
import { removeToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import "../../styles/app.css";

function EmployeeDashboard() {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  const fetchEnquiries = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/employee/enquiries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEnquiries(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      showToast("Failed to fetch enquiries", "error");
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // ================= STATUS UPDATE =================
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/employee/enquiries/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast("Status updated successfully");
      fetchEnquiries();
    } catch (error) {
      console.error(error);
      showToast("Failed to update status", "error");
    }
  };

  // ================= FILTER =================
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      const q = search.toLowerCase();

      return (
        item.name?.toLowerCase().includes(q) ||
        item.email?.toLowerCase().includes(q) ||
        item.packageName?.toLowerCase().includes(q) ||
        item.enquiryCode?.toLowerCase().includes(q)
      );
    });
  }, [enquiries, search]);

  // ================= LOGOUT =================
  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <div style={{ background: "black", minHeight: "100vh", padding: "20px" }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "18px",
        }}
      >
        <div>
          <h1 style={{ color: "#105f4a", marginBottom: "6px" }}>
            Manage Enquiries
          </h1>
          <p style={{ color: "rgba(40, 124, 96, 0.7)" }}>
            Employee workspace — update assigned leads.
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            background: "#c0392b",
            color: "#fff",
            border: "none",
            padding: "10px 14px",
            borderRadius: "10px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search enquiries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          ...inputDarkStyle,
          marginBottom: "18px",
          width: "100%",
          maxWidth: "420px",
        }}
      />

      {/* TABLE */}
      <div className="table-wrap">
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "0 12px",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Enquiry ID</th>
              <th style={thStyle}>Customer</th>
              <th style={thStyle}>Contact</th>
              <th style={thStyle}>Package</th>
              <th style={thStyle}>Message</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Update</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ color: "#fff", padding: "20px" }}>
                  Loading...
                </td>
              </tr>
            ) : filteredEnquiries.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: "20px" }}>
                  <div style={emptyBox}>
                    No enquiries found.
                  </div>
                </td>
              </tr>
            ) : (
              filteredEnquiries.map((item) => (
                <tr key={item.id} style={rowStyle}>
                  <td style={tdStyle}>
                    {item.enquiryCode || `ENQ-${item.id}`}
                  </td>

                  <td style={tdStyle}>{item.name}</td>

                  <td style={tdStyle}>
                    <div>{item.email}</div>
                    <div style={{ opacity: 0.7 }}>{item.phone}</div>
                  </td>

                  <td style={tdStyle}>
                    {item.packageName || "General"}
                  </td>

                  <td style={tdStyle}>
                    <div style={{ maxWidth: "220px" }}>
                      {item.message}
                    </div>
                  </td>

                  <td style={tdStyle}>{item.status}</td>

                  {/* STATUS UPDATE */}
                  <td style={tdStyle}>
                    <select
                      value={item.status || "NEW"}
                      onChange={(e) =>
                        updateStatus(item.id, e.target.value)
                      }
                      style={inputDarkStyle}
                    >
                      <option value="NEW">NEW</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* styles */
const thStyle = {
  textAlign: "left",
  padding: "12px 14px",
  color: "rgba(255,255,255,0.7)",
  fontSize: "14px",
};

const tdStyle = {
  padding: "14px",
  color: "#fff",
  borderTop: "1px solid rgba(255,255,255,0.06)",
};

const inputDarkStyle = {
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  padding: "10px",
};

const rowStyle = {
  background: "rgba(255,255,255,0.06)",
};

const emptyBox = {
  background: "rgba(255,255,255,0.06)",
  padding: "20px",
  textAlign: "center",
  borderRadius: "12px",
  color: "rgba(255,255,255,0.7)",
};

export default EmployeeDashboard;