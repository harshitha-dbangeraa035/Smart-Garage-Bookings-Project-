import { useEffect, useState } from "react";
import {
  FaUsers,
  FaCar,
  FaClipboardList,
  FaMoneyBillWave,
  FaArrowLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../services/api";

import "./DashboardStats.css";

function DashboardStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVehicles: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard/stats");

      console.log("Dashboard Stats:", res.data);

      setStats(res.data.data);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch dashboard statistics"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="stats-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="stats-page">
      <div className="stats-container">

        {/* Header */}
        <div className="stats-header">

          <Link to="/admin/dashboard" className="back-btn">
            <FaArrowLeft />
            Back to Dashboard
          </Link>

          <div className="stats-title">
            <h1>Dashboard Statistics</h1>

            <p>
              Monitor users, vehicles, bookings and revenue from
              your Smart Garage system.
            </p>
          </div>

        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">

          {/* Users */}
          <div className="stat-card">
            <div className="stat-icon users-icon">
              <FaUsers />
            </div>

            <div className="stat-content">
              <span>Total Users</span>
              <h2>{stats.totalUsers}</h2>
            </div>
          </div>

          {/* Vehicles */}
          <div className="stat-card">
            <div className="stat-icon vehicles-icon">
              <FaCar />
            </div>

            <div className="stat-content">
              <span>Total Vehicles</span>
              <h2>{stats.totalVehicles}</h2>
            </div>
          </div>

          {/* Bookings */}
          <div className="stat-card">
            <div className="stat-icon bookings-icon">
              <FaClipboardList />
            </div>

            <div className="stat-content">
              <span>Total Bookings</span>
              <h2>{stats.totalBookings}</h2>
            </div>
          </div>

          {/* Revenue */}
          <div className="stat-card">
            <div className="stat-icon revenue-icon">
              <FaMoneyBillWave />
            </div>

            <div className="stat-content">
              <span>Total Revenue</span>
              <h2>₹ {stats.totalRevenue}</h2>
            </div>
          </div>

        </div>

        {/* Booking Status */}
        <div className="booking-status">

          <div className="section-header">
            <h2>Booking Status</h2>

            <p>
              Overview of current booking activity.
            </p>
          </div>

          <div className="status-grid">

            {/* Pending */}
            <div className="status-card pending">
              <div className="status-info">
                <span>Pending</span>
                <h3>{stats.pendingBookings}</h3>
              </div>
            </div>

            {/* Completed */}
            <div className="status-card completed">
              <div className="status-info">
                <span>Completed</span>
                <h3>{stats.completedBookings}</h3>
              </div>
            </div>

            {/* Cancelled */}
            <div className="status-card cancelled">
              <div className="status-info">
                <span>Cancelled</span>
                <h3>{stats.cancelledBookings}</h3>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default DashboardStats;