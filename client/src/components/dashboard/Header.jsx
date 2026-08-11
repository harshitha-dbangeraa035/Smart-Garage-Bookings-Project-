import { FaBell } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm px-10 py-6 flex justify-between items-center">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Welcome back,
          <span className="text-blue-600">
            {" "}
            {user?.name}
          </span>
          👋
        </h1>

        <p className="text-slate-500">
          Manage your vehicles and bookings
        </p>

      </div>

      <div className="flex items-center gap-5">

        <button className="w-12 h-12 rounded-full bg-slate-100 flex justify-center items-center">

          <FaBell />

        </button>

        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex justify-center items-center font-bold text-lg">

          {user?.name?.charAt(0)}

        </div>

      </div>

    </header>
  );
}

export default Header;