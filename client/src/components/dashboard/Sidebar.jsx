import {
  FaHome,
  FaCar,
  FaCalendarAlt,
  FaClipboardList,
  FaMoneyBillWave,
  FaStar,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Vehicles",
      path: "/vehicles",
      icon: <FaCar />,
    },
    {
      name: "Book Service",
      path: "/book-service",
      icon: <FaCalendarAlt />,
    },
    {
      name: "Bookings",
      path: "/my-bookings",
      icon: <FaClipboardList />,
    },
    {
      name: "Payments",
      path: "/payments",
      icon: <FaMoneyBillWave />,
    },
    {
      name: "Reviews",
      path: "/reviews",
      icon: <FaStar />,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900 text-white flex flex-col">

      {/* Logo */}
      <div className="px-8 py-8 border-b border-slate-800">

        <h1 className="text-3xl font-bold text-blue-500">
          Smart Garage
        </h1>

        <p className="text-slate-400 mt-1">
          Service Management
        </p>

      </div>

      {/* Navigation */}
      <nav className="flex-1 p-5 space-y-2">

        {menus.map((menu) => (

          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl transition
              ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {menu.icon}

            {menu.name}

          </NavLink>

        ))}

      </nav>

      {/* Logout */}
      <div className="p-5 border-t border-slate-800">

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl flex justify-center items-center gap-3"
        >
          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;