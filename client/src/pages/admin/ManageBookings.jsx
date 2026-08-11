import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaUser, FaCar } from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../../services/api";

import "./ManageBookings.css";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/admin/all");

      console.log("Bookings:", res.data);

      setBookings(res.data.data || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch bookings"
      );
    } finally {
      setLoading(false);
    }
  };

  /* Loading */
  if (loading) {
    return (
      <div className="bookings-loading">
        <div className="loading-spinner"></div>
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="bookings-page">

      <div className="bookings-container">

        {/* Header */}
        <div className="bookings-header">

          <Link
            to="/admin/dashboard"
            className="back-btn"
          >
            <FaArrowLeft />
            Back to Dashboard
          </Link>

          <div>
            <h1>All Bookings</h1>

            <p>
              View and manage all customer service bookings.
            </p>
          </div>

        </div>

        {/* Booking Table */}
        <div className="bookings-table-wrapper">

          <table className="bookings-table">

            <thead>
              <tr>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Service</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {bookings.length > 0 ? (
                bookings.map((booking) => (

                  <tr key={booking._id}>

                    {/* Customer */}
                    <td>
                      <div className="customer-cell">
                        <div className="table-icon">
                          <FaUser />
                        </div>

                        <span>
                          {booking.customer?.name || "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* Vehicle */}
                    <td>
                      <div className="vehicle-cell">
                        <FaCar />

                        <span>
                          {booking.vehicle?.registrationNumber ||
                            "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* Service */}
                    <td>
                      {booking.serviceType || "N/A"}
                    </td>

                    {/* Date */}
                    <td>
                      {booking.bookingDate
                        ? new Date(
                            booking.bookingDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`status-badge ${booking.status
                          ?.toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {booking.status || "Unknown"}
                      </span>
                    </td>

                    {/* Action */}
                    <td>
                      <Link
                        to={`/admin/assign-mechanic/${booking._id}`}
                        className="assign-btn"
                      >
                        Assign Mechanic
                      </Link>
                    </td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td
                    colSpan="6"
                    className="no-bookings"
                  >
                    No bookings found.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ManageBookings;