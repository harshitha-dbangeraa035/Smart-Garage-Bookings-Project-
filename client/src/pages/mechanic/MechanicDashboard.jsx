import { Link, useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaTasks,
  FaArrowRight,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import "../users/Dashboard.css";

function MechanicDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dashboard-header">

        <div>
          <h1>Mechanic Dashboard</h1>

          <p>
            Manage assigned service bookings and update
            repair status.
          </p>
        </div>

        {/* Logout */}
        <button
          type="button"
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-grid">

        {/* Assigned Bookings */}
        <div className="dashboard-card">

          <div className="dashboard-icon">
            <FaClipboardList />
          </div>

          <h2>Assigned Bookings</h2>

          <p>
            View all bookings assigned to you.
          </p>

          <div className="dashboard-links">
            <Link to="/mechanic/bookings">
              My Bookings
            </Link>
          </div>

          <Link
            className="open-btn"
            to="/mechanic/bookings"
          >
            Open Module
            <FaArrowRight />
          </Link>

        </div>

        {/* Update Status */}
        <div className="dashboard-card">

          <div className="dashboard-icon">
            <FaTasks />
          </div>

          <h2>Update Status</h2>

          <p>
            Update booking progress and completion.
          </p>

          <div className="dashboard-links">
            <Link to="/mechanic/bookings">
              Update Booking
            </Link>
          </div>

          <Link
            className="open-btn"
            to="/mechanic/bookings"
          >
            Open Module
            <FaArrowRight />
          </Link>

        </div>

      </div>

    </div>
  );
}

export default MechanicDashboard;