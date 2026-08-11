import { Link, useNavigate } from "react-router-dom";
import {
  FaChartBar,
  FaClipboardList,
  FaUserCog,
  FaBoxes,
  FaExclamationTriangle,
  FaUsers,
  FaArrowRight,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css";

function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call logout from AuthContext
      await logout();

      // Go to login immediately
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);

      // Even if logout function throws,
      // clear authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dashboard-header">

        <div>
          <h1>Admin Dashboard</h1>

          <p>
            Manage bookings, mechanics, inventory, users and
            monitor the Smart Garage system from one place.
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

        {/* Statistics */}
        <div className="dashboard-card">

          <div className="dashboard-icon">
            <FaChartBar />
          </div>

          <h2>Dashboard Statistics</h2>

          <p>
            View bookings, users, revenue and system statistics.
          </p>

          <div className="dashboard-links">
            <Link to="/admin/stats">
              View Statistics
            </Link>
          </div>

          <Link
            className="open-btn"
            to="/admin/stats"
          >
            Open Module
            <FaArrowRight />
          </Link>

        </div>

        {/* Bookings */}
        <div className="dashboard-card">

          <div className="dashboard-icon">
            <FaClipboardList />
          </div>

          <h2>Bookings</h2>

          <p>
            View all bookings and assign mechanics.
          </p>

          <div className="dashboard-links">

            <Link to="/admin/bookings">
              All Bookings
            </Link>

            <Link to="/admin/assign-mechanic">
              Assign Mechanic
            </Link>

          </div>

          <Link
            className="open-btn"
            to="/admin/bookings"
          >
            Open Module
            <FaArrowRight />
          </Link>

        </div>

        {/* Inventory */}
        <div className="dashboard-card">

          <div className="dashboard-icon">
            <FaBoxes />
          </div>

          <h2>Inventory</h2>

          <p>
            Manage spare parts and inventory items.
          </p>

          <div className="dashboard-links">
            <Link to="/admin/inventory">
              Inventory List
            </Link>
          </div>

          <Link
            className="open-btn"
            to="/admin/inventory"
          >
            Open Module
            <FaArrowRight />
          </Link>

        </div>

        {/* Mechanics */}
        <div className="dashboard-card">

          <div className="dashboard-icon">
            <FaUserCog />
          </div>

          <h2>Mechanics</h2>

          <p>
            View all mechanics and assign work.
          </p>

          <div className="dashboard-links">
            <Link to="/admin/mechanics">
              View Mechanics
            </Link>
          </div>

          <Link
            className="open-btn"
            to="/admin/mechanics"
          >
            Open Module
            <FaArrowRight />
          </Link>

        </div>

        {/* Users */}
        <div className="dashboard-card">

          <div className="dashboard-icon">
            <FaUsers />
          </div>

          <h2>Users</h2>

          <p>
            View and manage all registered users.
          </p>

          <div className="dashboard-links">
            <Link to="/admin/users">
              All Users
            </Link>
          </div>

          <Link
            className="open-btn"
            to="/admin/users"
          >
            Open Module
            <FaArrowRight />
          </Link>

        </div>

        {/* Low Stock */}
        <div className="dashboard-card">

          <div className="dashboard-icon">
            <FaExclamationTriangle />
          </div>

          <h2>Low Stock</h2>

          <p>
            Monitor inventory items that need replenishment.
          </p>

          <div className="dashboard-links">
            <Link to="/admin/low-stock">
              View Low Stock
            </Link>
          </div>

          <Link
            className="open-btn"
            to="/admin/low-stock"
          >
            Open Module
            <FaArrowRight />
          </Link>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;