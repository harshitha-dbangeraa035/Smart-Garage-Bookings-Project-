import {
  FaCar,
  FaCalendarCheck,
  FaClipboardList,
  FaMoneyBillWave,
  FaBell,
  FaShieldAlt,
} from "react-icons/fa";

import "./Feature.css";

function Feature() {
  const features = [
    {
      icon: <FaCar />,
      title: "Vehicle Management",
      desc: "Store and manage multiple vehicles with complete service records.",
    },
    {
      icon: <FaCalendarCheck />,
      title: "Online Booking",
      desc: "Book vehicle service appointments anytime with just a few clicks.",
    },
    {
      icon: <FaClipboardList />,
      title: "Track Services",
      desc: "Monitor repair progress and service status in real time.",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Secure Payments",
      desc: "Pay invoices online using safe and secure payment methods.",
    },
    {
      icon: <FaBell />,
      title: "Notifications",
      desc: "Receive instant updates about bookings, repairs and payments.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Trusted Platform",
      desc: "Fast, secure and reliable garage management for everyone.",
    },
  ];

  return (
    <section id ="feature" className="feature-section">

      <div className="feature-container">

        <div className="feature-header">

          <span>OUR FEATURES</span>

          <h2>Everything You Need in One Platform</h2>

          <p>
            Smart Garage simplifies vehicle servicing through one modern
            dashboard with secure, reliable and intelligent features.
          </p>

        </div>

        <div className="feature-grid">

          {features.map((feature, index) => (

            <div className="feature-card" key={index}>

              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.desc}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Feature;