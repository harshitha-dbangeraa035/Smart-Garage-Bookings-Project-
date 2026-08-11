import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-72 min-h-screen">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>

      </div>

    </div>
  );
}

export default Layout;