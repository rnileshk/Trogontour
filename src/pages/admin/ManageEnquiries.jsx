import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";
import { useToast } from "../../context/ToastContext";

function ManageEnquiries() {
  const { showToast } = useToast();

  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchEnquiries = async () => {
    try {
      const res = await api.get("/admin/enquiries");
      setEnquiries(res.data.data || []);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      showToast("Failed to fetch enquiries", "error");
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/enquiries/${id}/status`, { status });
      showToast("Status updated successfully");
      fetchEnquiries();
    } catch (error) {
      console.error("Error updating status:", error);
      showToast("Failed to update status", "error");
    }
  };

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      const matchesSearch =
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.email?.toLowerCase().includes(search.toLowerCase()) ||
        item.packageName?.toLowerCase().includes(search.toLowerCase()) ||
        item.enquiryCode?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter ? item.status === statusFilter : true;

      return matchesSearch && matchesStatus;
    });
  }, [enquiries, search, statusFilter]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "NEW":
        return {
          background: "rgba(59,130,246,0.15)",
          color: "#60a5fa",
          border: "1px solid rgba(96,165,250,0.25)",
        };
      case "CONTACTED":
        return {
          background: "rgba(251,191,36,0.15)",
          color: "#fbbf24",
          border: "1px solid rgba(251,191,36,0.25)",
        };
      case "CONFIRMED":
        return {
          background: "rgba(34,197,94,0.15)",
          color: "#4ade80",
          border: "1px solid rgba(74,222,128,0.25)",
        };
      case "CLOSED":
        return {
          background: "rgba(168,85,247,0.15)",
          color: "#c084fc",
          border: "1px solid rgba(192,132,252,0.25)",
        };
      default:
        return {
          background: "rgba(255,255,255,0.08)",
          color: "#e5e7eb",
          border: "1px solid rgba(255,255,255,0.08)",
        };
    }
  };

  return (
    <AdminLayout>
      <div className="premium-panel" style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >
          <div>
            <h1 style={{ color: "#fff", marginBottom: "6px", fontSize: "1.8rem" }}>
              Manage Enquiries
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)" }}>
              Track customer enquiries, search records, and update lead status.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
              width: "100%",
              maxWidth: "520px",
            }}
          >
            <input
              className="input"
              type="text"
              placeholder="Search by name, email, package, ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={inputDarkStyle}
            />

            <select
              className="select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={inputDarkStyle}
            >
              <option value="">All Status</option>
              <option value="NEW">NEW</option>
              <option value="CONTACTED">CONTACTED</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="CLOSED">CLOSED</option>
            </select>
          </div>
        </div>

        <div className="table-wrap">
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "0 12px",
              minWidth: "1100px",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Enquiry ID</th>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Contact</th>
                <th style={thStyle}>Package</th>
                <th style={thStyle}>Travel Info</th>
                <th style={thStyle}>Message</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Update</th>
              </tr>
            </thead>

            <tbody>
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ paddingTop: "16px" }}>
                    <div
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "18px",
                        padding: "24px",
                        textAlign: "center",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      No enquiries found.
                    </div>
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((item) => (
                  <tr
                    key={item.id}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      backdropFilter: "blur(14px)",
                    }}
                  >
                    <td style={tdStyle}>
                      <div style={{ fontWeight: "600", color: "#fff" }}>
                        {item.enquiryCode || `ENQ-${item.id}`}
                      </div>
                    </td>

                    <td style={tdStyle}>
                      <div style={{ fontWeight: "600", color: "#fff", marginBottom: "4px" }}>
                        {item.name}
                      </div>
                    </td>

                    <td style={tdStyle}>
                      <div style={{ color: "#fff", marginBottom: "4px" }}>{item.email}</div>
                      <div style={{ color: "rgba(255,255,255,0.7)" }}>{item.phone}</div>
                    </td>

                    <td style={tdStyle}>
                      <div style={{ color: "#fff" }}>{item.packageName || "General Enquiry"}</div>
                    </td>

                    <td style={tdStyle}>
                      <div style={{ color: "#fff", marginBottom: "4px" }}>
                        {item.travelDate || "Not specified"}
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.7)" }}>
                        {item.numberOfPeople ? `${item.numberOfPeople} people` : "People not specified"}
                      </div>
                    </td>

                    <td style={tdStyle}>
                      <div
                        style={{
                          maxWidth: "220px",
                          color: "rgba(255,255,255,0.78)",
                          lineHeight: "1.6",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                        }}
                      >
                        {item.message || "No message"}
                      </div>
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          ...getStatusStyle(item.status),
                          padding: "8px 12px",
                          borderRadius: "999px",
                          fontSize: "13px",
                          fontWeight: "600",
                          display: "inline-block",
                        }}
                      >
                        {item.status || "NEW"}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      <select
                        value={item.status || "NEW"}
                        onChange={(e) => updateStatus(item.id, e.target.value)}
                        className="select"
                        style={{
                          ...inputDarkStyle,
                          minWidth: "150px",
                          marginBottom: 0,
                        }}
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
    </AdminLayout>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "12px 14px",
  color: "rgba(255,255,255,0.7)",
  fontSize: "14px",
  fontWeight: "600",
};

const tdStyle = {
  padding: "16px 14px",
  borderTop: "1px solid rgba(255,255,255,0.06)",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  verticalAlign: "top",
};

const inputDarkStyle = {
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  padding: "12px 14px",
};

export default ManageEnquiries;