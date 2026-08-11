import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaArrowLeft,
  FaUser,
  FaCar,
  FaCalendarAlt,
  FaWrench,
  FaReceipt,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";
import API from "../../services/api";
import "./BookingDetails.css";

function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, []);

  // Fetch Booking Details
  const fetchBooking = async () => {
    try {
      const res = await API.get(`/bookings/${id}`);
      setBooking(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch booking details"
      );
      navigate("/bookings");
    } finally {
      setLoading(false);
    }
  };

  // Helper for Status Badge Class
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-badge status-pending";
      case "Accepted":
        return "status-badge status-accepted";
      case "In Progress":
        return "status-badge status-in-progress";
      case "Completed":
        return "status-badge status-completed";
      default:
        return "status-badge status-cancelled";
    }
  };

  // Loading Screen
  if (loading) {
    return (
      <div className="booking-details-container">
        <div className="status-state-card">
          <FaSpinner className="btn-spinner" />
          <span>Loading Booking Details...</span>
        </div>
      </div>
    );
  }

  // Not Found Screen
  if (!booking) {
    return (
      <div className="booking-details-container">
        <div className="status-state-card error-state">
          <FaExclamationTriangle className="error-icon" />
          <h2>Booking Not Found</h2>
          <button
            onClick={() => navigate("/bookings")}
            className="btn-back-top-right"
          >
            <FaArrowLeft />
            <span>Back to Bookings</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-details-container">
      <div className="booking-details-card">
        
        {/* Header Section */}
        <div className="booking-details-header">
          <div>
            <h1 className="details-page-title">Booking Details</h1>
            <p className="details-page-subtitle">
              Booking ID: <span className="highlight-id">{booking._id}</span>
            </p>
          </div>

          {/* Top-Right Back Button */}
          <button
            onClick={() => navigate("/bookings")}
            className="btn-back-top-right"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
        </div>

        {/* 2x2 Information Grid */}
        <div className="details-grid">
          
          {/* Customer Card */}
          <div className="info-card">
            <div className="card-header">
              <FaUser className="card-header-icon" />
              <h2>Customer Information</h2>
            </div>
            <div className="card-body">
              <p>
                <strong>Name:</strong> {booking.customer?.name || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {booking.customer?.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {booking.customer?.phone || "N/A"}
              </p>
            </div>
          </div>

          {/* Vehicle Card */}
          <div className="info-card">
            <div className="card-header">
              <FaCar className="card-header-icon" />
              <h2>Vehicle Information</h2>
            </div>
            <div className="card-body">
              <p>
                <strong>Brand:</strong> {booking.vehicle?.brand || "N/A"}
              </p>
              <p>
                <strong>Model:</strong> {booking.vehicle?.model || "N/A"}
              </p>
              <p>
                <strong>Registration:</strong>{" "}
                {booking.vehicle?.registrationNumber || "N/A"}
              </p>
              <p>
                <strong>Year:</strong> {booking.vehicle?.year || "N/A"}
              </p>
            </div>
          </div>

          {/* Booking Info Card */}
          <div className="info-card">
            <div className="card-header">
              <FaCalendarAlt className="card-header-icon" />
              <h2>Booking Information</h2>
            </div>
            <div className="card-body">
              <p>
                <strong>Service:</strong> {booking.serviceType}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(booking.bookingDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {booking.bookingTime}
              </p>
              <div className="description-box">
                <strong>Description:</strong>
                <p>{booking.problemDescription}</p>
              </div>
            </div>
          </div>

          {/* Mechanic Card */}
          <div className="info-card">
            <div className="card-header">
              <FaWrench className="card-header-icon" />
              <h2>Mechanic Information</h2>
            </div>
            <div className="card-body">
              {booking.mechanic ? (
                <>
                  <p>
                    <strong>Name:</strong> {booking.mechanic.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {booking.mechanic.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {booking.mechanic.phone}
                  </p>
                </>
              ) : (
                <p className="text-muted">Mechanic not assigned yet.</p>
              )}
            </div>
          </div>

        </div>

        {/* Full-Width Status & Financial Card */}
        <div className="status-cost-card">
          <div className="card-header">
            <FaReceipt className="card-header-icon" />
            <h2>Status & Cost Breakdown</h2>
          </div>

          <div className="status-cost-body">
            <div className="status-row">
              <span className="label-title">Current Status:</span>
              <span className={getStatusClass(booking.status)}>
                {booking.status}
              </span>
            </div>

            <div className="cost-row">
              <div className="cost-item">
                <span className="cost-label">Estimated Cost</span>
                <span className="cost-value">₹{booking.estimatedCost ?? "0"}</span>
              </div>

              <div className="cost-item">
                <span className="cost-label">Final Cost</span>
                <span className="cost-value final-cost">
                  ₹{booking.finalCost ?? "0"}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default BookingDetails;