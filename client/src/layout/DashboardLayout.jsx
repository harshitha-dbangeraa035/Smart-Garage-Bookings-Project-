import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 ml-72">

          {/* Header */}
          <Header />

          {/* Page */}
          <main className="p-8">
            {children}
          </main>

        </div>

      </div>
    </div>
  );
}

export default DashboardLayout;