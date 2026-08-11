import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaClipboardList,
  FaEdit,
} from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../../services/api";

import "./AssignedBookings.css";

function AssignedBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get(
        "/bookings/mechanic/my-bookings"
      );

      console.log("Assigned Bookings:", res.data);

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
      <div className="assigned-loading">
        <div className="loading-spinner"></div>
        <p>Loading assigned bookings...</p>
      </div>
    );
  }

  return (
    <div className="assigned-page">

      <div className="assigned-container">

        {/* Header */}
        <div className="assigned-header">

          <Link
            to="/mechanic/dashboard"
            className="back-btn"
          >
            <FaArrowLeft />
            Back to Dashboard
          </Link>

          <div className="assigned-title">

            <div className="assigned-title-icon">
              <FaClipboardList />
            </div>

            <div>
              <h1>Assigned Bookings</h1>

              <p>
                View and manage bookings assigned to you.
              </p>
            </div>

          </div>

        </div>

        {/* Table */}
        <div className="assigned-table-wrapper">

          <table className="assigned-table">

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

              {bookings.length === 0 ? (

                <tr>
                  <td
                    colSpan="6"
                    className="no-bookings"
                  >
                    <FaClipboardList />

                    <span>
                      No assigned bookings found.
                    </span>
                  </td>
                </tr>

              ) : (

                bookings.map((booking) => (

                  <tr key={booking._id}>

                    {/* Customer */}
                    <td>
                      <span className="customer-name">
                        {booking.customer?.name || "-"}
                      </span>
                    </td>

                    {/* Vehicle */}
                    <td>
                      {booking.vehicle?.registrationNumber ||
                        "-"}
                    </td>

                    {/* Service */}
                    <td>
                      {booking.serviceType || "-"}
                    </td>

                    {/* Date */}
                    <td>
                      {booking.bookingDate
                        ? new Date(
                            booking.bookingDate
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`status-badge ${booking.status
                          ?.toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {booking.status || "Pending"}
                      </span>
                    </td>

                    {/* Action */}
                    <td>

                      <Link
                        to={`/mechanic/update-status/${booking._id}`}
                        className="update-btn"
                      >
                        <FaEdit />
                        Update
                      </Link>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AssignedBookings;