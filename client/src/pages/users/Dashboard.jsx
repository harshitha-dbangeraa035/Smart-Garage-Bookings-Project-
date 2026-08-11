import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCar,
  FaClipboardList,
  FaMoneyBillWave,
  FaStar,
  FaArrowLeft,
  FaSignOutAlt,
  FaArrowRight,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">
      {/* Top Header */}
      <header className="dashboard-topbar">
        <button className="btn btn-back" onClick={() => navigate(-1)}>
          <FaArrowLeft />
          <span>Back</span>
        </button>

        <button className="btn btn-logout" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </header>

      {/* Main Full-Width Content */}
      <main className="dashboard-main">
        {/* Title Section */}
        <section className="dashboard-header">
<h1>
  Welcome Back{" "}
  <span className="text-blue-600 font-bold">
    {user?.name || "User"}
  </span>
 
</h1>
        </section>

        {/* Dynamic Full-Width Card Grid */}
        <section className="dashboard-grid">
          {/* Vehicle Card */}
          <div className="dashboard-card">
            <div className="card-icon icon-vehicle">
              <FaCar />
            </div>
            <div className="card-body">
              <h2>Vehicle</h2>
              <p>Manage all your registered vehicles easily.</p>
            </div>
            <Link className="card-btn" to="/vehicles">
              <span>Open Module</span>
              <FaArrowRight className="btn-icon" />
            </Link>
          </div>

          {/* Booking Card */}
          <div className="dashboard-card">
            <div className="card-icon icon-booking">
              <FaClipboardList />
            </div>
            <div className="card-body">
              <h2>Booking</h2>
              <p>Book and track all your service appointments.</p>
            </div>
            <Link className="card-btn" to="/bookings">
              <span>Open Module</span>
              <FaArrowRight className="btn-icon" />
            </Link>
          </div>

          {/* Payment Card */}
          <div className="dashboard-card">
            <div className="card-icon icon-payment">
              <FaMoneyBillWave />
            </div>
            <div className="card-body">
              <h2>Payment</h2>
              <p>Secure payments with invoice history.</p>
            </div>
            <Link className="card-btn" to="/payments/create">
              <span>Open Module</span>
              <FaArrowRight className="btn-icon" />
            </Link>
          </div>

          {/* Review Card */}
          <div className="dashboard-card">
            <div className="card-icon icon-review">
              <FaStar />
            </div>
            <div className="card-body">
              <h2>Review</h2>
              <p>Rate your experience and read customer reviews.</p>
            </div>
            <Link className="card-btn" to="/reviews/all">
              <span>Open Module</span>
              <FaArrowRight className="btn-icon" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;