import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaClipboardList,
  FaSave,
} from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../../services/api";

import "./UpdateBookingStatus.css";

function UpdateBookingStatus() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("Accepted");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.put(`/bookings/${id}/status`, {
        status,
      });

      toast.success("Booking status updated successfully");

      navigate("/mechanic/bookings");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update booking status"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-status-page">

      <div className="update-status-container">

        {/* Back Button */}
        <Link
          to="/mechanic/bookings"
          className="back-btn"
        >
          <FaArrowLeft />
          Back to Bookings
        </Link>

        {/* Card */}
        <div className="update-status-card">

          {/* Icon */}
          <div className="update-status-icon">
            <FaClipboardList />
          </div>

          {/* Header */}
          <div className="update-status-header">

            <h1>Update Booking Status</h1>

            <p>
              Update the current status of this
              customer booking.
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="update-status-form"
          >

            <div className="form-group">

              <label htmlFor="status">
                Booking Status
              </label>

              <select
                id="status"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >

                <option value="Accepted">
                  Accepted
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>

              </select>

            </div>

            {/* Button */}
            <button
              type="submit"
              className="update-status-btn"
              disabled={loading}
            >
              <FaSave />

              {loading
                ? "Updating..."
                : "Update Status"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default UpdateBookingStatus;