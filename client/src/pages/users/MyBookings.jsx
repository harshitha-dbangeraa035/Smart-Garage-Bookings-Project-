import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  FaCalendarAlt, 
  FaClock, 
  FaCar, 
  FaPlus, 
  FaArrowLeft, 
  FaSpinner, 
  FaInfoCircle, 
  FaTimes 
} from "react-icons/fa";
import API from "../../services/api";
import "./MyBookings.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  // Fetch Logged-in User Bookings
  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      console.log("Bookings API Response:", res.data);
      setBookings(res.data.data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch bookings"
      );
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // Cancel Booking
  const cancelBooking = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      const res = await API.put(`/bookings/${id}/cancel`);

      toast.success(
        res.data.message || "Booking cancelled successfully"
      );

      fetchBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);

      toast.error(
        error.response?.data?.message || "Failed to cancel booking"
      );
    }
  };

  // Helper for status badge CSS classes
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "badge-pending";
      case "Accepted":
      case "In Progress":
        return "badge-accepted";
      case "Completed":
        return "badge-completed";
      case "Cancelled":
        return "badge-cancelled";
      default:
        return "badge-default";
    }
  };

  if (loading) {
    return (
      <div className="bookings-loading">
        <FaSpinner className="spinner-icon" />
        <h2>Loading Bookings...</h2>
      </div>
    );
  }

  return (
    <div className="bookings-container">
      <div className="bookings-wrapper">
        
        {/* Top Navigation & Header */}
        <div className="bookings-header">
          <div className="header-title-group">
            <button
              onClick={() => navigate("/user/dashboard")}
              className="btn-back"
            >
              <FaArrowLeft />
              <span>Dashboard</span>
            </button>
            <h1 className="page-title">My Bookings</h1>
          </div>

          <Link to="/bookings/create" className="btn-create">
            <FaPlus />
            <span>Create Booking</span>
          </Link>
        </div>

        {/* Bookings List or Empty State */}
        {bookings.length === 0 ? (
          <div className="empty-bookings-card">
            <div className="empty-icon-wrapper">
              <FaCalendarAlt />
            </div>
            <h2>No Bookings Found</h2>
            <p>You haven't scheduled any service bookings yet.</p>
            <Link to="/bookings/create" className="btn-create">
              <FaPlus /> Book a Service
            </Link>
          </div>
        ) : (
          <div className="bookings-grid">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div>
                  {/* Card Header */}
                  <div className="card-header">
                    <h2 className="service-title">{booking.serviceType}</h2>
                    <span className={`status-badge ${getStatusClass(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  {/* Booking Details */}
                  <div className="card-body">
                    <div className="info-row">
                      <FaCar className="info-icon" />
                      <span>
                        <strong>Vehicle:</strong>{" "}
                        {booking.vehicle?.brand || "N/A"} {booking.vehicle?.model || ""}
                      </span>
                    </div>

                    <div className="info-row">
                      <span className="hash-icon">#</span>
                      <span>
                        <strong>Reg No:</strong>{" "}
                        {booking.vehicle?.registrationNumber || "N/A"}
                      </span>
                    </div>

                    <div className="info-row">
                      <FaCalendarAlt className="info-icon" />
                      <span>
                        <strong>Date:</strong>{" "}
                        {booking.bookingDate
                          ? new Date(booking.bookingDate).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>

                    <div className="info-row">
                      <FaClock className="info-icon" />
                      <span>
                        <strong>Time:</strong> {booking.bookingTime || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="card-actions">
                  <Link to={`/bookings/${booking._id}`} className="btn-details">
                    <FaInfoCircle /> Details
                  </Link>

                  {booking.status === "Pending" && (
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="btn-cancel"
                    >
                      <FaTimes /> Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;