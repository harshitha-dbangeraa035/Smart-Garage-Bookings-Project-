import { Link } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo">

          <div className="logo-icon">
            <FaCarSide />
          </div>

          <div className="logo-text">
            <h2>Smart Garage</h2>
            <span>Vehicle Service System</span>
          </div>

        </Link>

        {/* Navigation */}
        <nav className="nav-links">

          <a href="/">Home</a>

          <a href="/about">About</a>

          <a href="#services">Services</a>

          <a href="#feature">Features</a>

          <a href="#contact">Contact</a>

        </nav>

        {/* Buttons */}
        <div className="nav-buttons">

        
          

        </div>

      </div>

    </header>
  );
}

export default Navbar;