import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaTools,
  FaCarSide,
  FaClipboardCheck,
  FaUserShield,
} from "react-icons/fa";

import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-overlay">

        <div className="hero-container">

          {/* Left Content */}

          <div className="hero-content">

            <span className="hero-badge">
              Smart Garage Management System
            </span>

            <h1>
              Smart Vehicle
              <br />
              <span>Service Management</span>
            </h1>

            <p>
              Manage vehicle servicing with a modern digital platform.
              Book appointments, monitor repairs, receive notifications,
              download invoices, and track complete service history
              anytime, anywhere.
            </p>

            <div className="hero-buttons">

              <Link to="/register" className="primary-btn">
                Get Started
                <FaArrowRight />
              </Link>

              <Link to="/login" className="secondary-btn">
                Login
              </Link>

            </div>

            <div className="hero-stats">

              <div>
                <h2>500+</h2>
                <span>Customers</span>
              </div>

              <div>
                <h2>1200+</h2>
                <span>Vehicles</span>
              </div>

              <div>
                <h2>24/7</h2>
                <span>Support</span>
              </div>

            </div>

          </div>

          {/* Right Content */}

          <div className="hero-image">

            <div className="circle">

              <FaCarSide className="main-icon" />

            </div>

            <div className="card card1">
              <FaClipboardCheck />
              <span>Service Tracking</span>
            </div>

            <div className="card card2">
              <FaUserShield />
              <span>Secure Access</span>
            </div>

            <div className="card card3">
              <FaTools />
              <span>Expert Mechanics</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;