import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCar,
  FaCalendarCheck,
  FaClipboardList,
  FaMoneyBill,
  FaStar,
  FaSignOutAlt,
  FaTools,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      title: "Vehicles",
      path: "/vehicles",
      icon: <FaCar />,
    },
    {
      title: "Book Service",
      path: "/book-service",
      icon: <FaCalendarCheck />,
    },
    {
      title: "My Bookings",
      path: "/my-bookings",
      icon: <FaClipboardList />,
    },
    {
      title: "Payments",
      path: "/payments",
      icon: <FaMoneyBill />,
    },
    {
      title: "Reviews",
      path: "/reviews",
      icon: <FaStar />,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-2xl flex flex-col">

      {/* Logo */}
      <div className="flex items-center gap-4 px-6 py-7 border-b border-white/10">

        <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl text-white shadow-lg">
          <FaTools />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white">
            Smart Garage
          </h1>

          <p className="text-sm text-blue-200">
            Service Management
          </p>
        </div>

      </div>

      {/* Menu */}
      <nav className="flex-1 px-5 py-8 space-y-3">

        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>

            <span className="font-medium">
              {item.title}
            </span>

          </NavLink>

        ))}

      </nav>

      {/* User */}
      <div className="border-t border-white/10 p-6">

        <div className="flex items-center gap-4 mb-5">

          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {user?.name}
            </h3>

            <p className="text-sm text-gray-300">
              {user?.role}
            </p>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl flex items-center justify-center gap-3 font-semibold text-white transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;