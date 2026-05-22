import { useEffect, useState } from "react";
import api from "../../services/api";
import { useToast } from "../../context/ToastContext";
import { FaEnvelopeOpenText } from "react-icons/fa";

function EmployeeDashboard() {
  const { showToast } = useToast();
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/admin/enquiries", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEnquiries(res.data.data || []);
      } catch (error) {
        console.error(error);
        showToast("Failed to load enquiries", "error");
      }
    };

    fetchEnquiries();
  }, [showToast]);

  return (
    <div className="employee-dashboard">
      {/* HEADER */}
      <div className="employee-header">
        <FaEnvelopeOpenText className="employee-icon" />
        <div>
          <h2>Employee Dashboard</h2>
          <p>Only assigned enquiries are visible here</p>
        </div>
      </div>

      {/* ENQUIRY LIST */}
      <div className="employee-enquiry-grid">
        {enquiries.length === 0 ? (
          <p className="empty-text">No enquiries found</p>
        ) : (
          enquiries.map((item) => (
            <div key={item.id} className="employee-card">
              <h3>{item.name}</h3>
              <p><b>Email:</b> {item.email}</p>
              <p><b>Package:</b> {item.packageName}</p>
              <p><b>Message:</b> {item.message}</p>

              <span className={`status ${item.status?.toLowerCase()}`}>
                {item.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EmployeeDashboard;