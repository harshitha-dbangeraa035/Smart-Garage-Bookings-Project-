import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaCar,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer id ="contact" className="footer">

      <div className="footer-container">

        {/* Company */}
        <div className="footer-box">

          <div className="footer-logo">

            <div className="logo-circle">
              <FaCar />
            </div>

            <div>
              <h2>Smart Garage</h2>
              <span>Vehicle Service Management</span>
            </div>

          </div>

          <p>
            Smart Garage provides a complete digital solution for vehicle
            servicing. Book appointments, track repairs, manage vehicles,
            receive notifications and pay securely—all in one place.
          </p>

          <div className="social-icons">

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

            <a href="#">
              <FaLinkedinIn />
            </a>

          </div>

        </div>

        {/* Links */}

        <div className="footer-box">

          <h3>Quick Links</h3>

          <ul>

            <li><Link to="/">Home</Link></li>

            <li><Link to="/login">Login</Link></li>

            <li><Link to="/register">Register</Link></li>

            <li><Link to="/services">Services</Link></li>

            <li><Link to="/contact">Contact</Link></li>

          </ul>

        </div>

        {/* Services */}

        <div className="footer-box">

          <h3>Services</h3>

          <ul>

            <li>Vehicle Servicing</li>

            <li>Oil Change</li>

            <li>Brake Repair</li>

            <li>Engine Diagnostics</li>

            <li>Wheel Alignment</li>

          </ul>

        </div>

        {/* Contact */}

        <div className="footer-box">

          <h3>Contact Us</h3>

          <div className="contact-item">
            <FaEnvelope />
            <span>support@smartgarage.com</span>
          </div>

          <div className="contact-item">
            <FaPhoneAlt />
            <span>+91 98765 43210</span>
          </div>

          <div className="contact-item">
            <FaMapMarkerAlt />
            <span>Bengaluru, Karnataka, India</span>
          </div>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Smart Garage. All Rights Reserved.
        </p>

        <div>

          <Link to="/">Privacy Policy</Link>

          <Link to="/">Terms</Link>

          <Link to="/">Support</Link>

        </div>

      </div>

    </footer>
  );
}

export default Footer;