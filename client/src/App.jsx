import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import About from "./components/About";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/users/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

import AddVehicle from "./pages/users/AddVehicle";
import MyVehicles from "./pages/users/MyVehicles";
import UpdateVehicle from "./pages/users/UpdateVehicle";
import MyBookings from "./pages/users/MyBookings";
import CreateBooking from "./pages/users/CreateBooking";
import BookingDetails from "./pages/users/BookingDetails";
import MakePayment from "./pages/users/MakePayment";
import PaymentHistory from "./pages/users/PaymentHistory";
import WriteReview from "./pages/users/WriteReview";
import ViewReviews from "./pages/users/ViewReviews";
import DashboardStats from "./pages/admin/DashboardStats";
import ManageBookings from "./pages/admin/ManageBookings";
import AssignMechanic from "./pages/admin/AssignMechanic";
import Inventory from "./pages/admin/Inventory";
import AddInventory from "./pages/admin/AddInventory";
import UpdateInventory from "./pages/admin/UpdateInventory";
import LowStock from "./pages/admin/LowStock";
import Users from "./pages/admin/Users";
import Mechanics from "./pages/admin/Mechanics";
import MechanicDashboard from "./pages/mechanic/MechanicDashboard";
import AssignedBookings from "./pages/mechanic/AssignedBookings";
import UpdateBookingStatus from "./pages/mechanic/UpdateBookingStatus";
// Future pages
// import BookService from "./pages/users/BookService";
// import MyBookings from "./pages/users/MyBookings";
// import Payments from "./pages/users/Payments";
// import Reviews from "./pages/users/Reviews";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Landing Page */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/footer" element={<Footer />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    
      {/* User Dashboard */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

<Route
  path="/bookings/create"
  element={
    <ProtectedRoute>
      <CreateBooking />
    </ProtectedRoute>
  }
/>

        <Route
  path="/bookings"
  element={
    <ProtectedRoute>
      <MyBookings />
     
    </ProtectedRoute>
  }
/>

        <Route
  path="/bookings"
  element={
    <ProtectedRoute>
      <MyBookings />
     
    </ProtectedRoute>
  }
/>

        <Route
  path="/bookings/:id"
  element={
    <ProtectedRoute>
      <BookingDetails />
     
    </ProtectedRoute>
  }
/>

<Route
  path="/payments/create"
  element={
    <ProtectedRoute>
      <MakePayment />
    </ProtectedRoute>
  }
/>

<Route
  path="/payments/history"
  element={
    <ProtectedRoute>
      <PaymentHistory />
    </ProtectedRoute>
  }
/>

<Route
  path="/reviews/write"
  element={
    <ProtectedRoute>
      <WriteReview />
    </ProtectedRoute>
  }
/>

<Route
  path="/reviews/all"
  element={<ViewReviews />}
/>


      {/* Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

<Route
path="/admin/stats"
element={
  <DashboardStats/>
}
/>

<Route
  path="/admin/bookings"
  element={
    <ProtectedRoute>
      <ManageBookings />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/assign-mechanic/:id"
  element={
    <ProtectedRoute>
      <AssignMechanic />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/inventory"
  element={
    <ProtectedRoute>
      <Inventory />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/inventory/add"
  element={
    <ProtectedRoute>
      <AddInventory />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/inventory/update/:id"
  element={
    <ProtectedRoute>
      <UpdateInventory />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/low-stock"
  element={
    <ProtectedRoute>
      <LowStock />
    </ProtectedRoute>
  }
/>

      {/* Vehicle Management */}
      <Route
        path="/vehicles"
        element={
          <ProtectedRoute>
            <MyVehicles />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-vehicle"
        element={
          <ProtectedRoute>
            <AddVehicle />
          </ProtectedRoute>
        }
      />

      <Route
        path="/update-vehicle/:id"
        element={
          <ProtectedRoute>
            <UpdateVehicle />
          </ProtectedRoute>
        }
      />

<Route
  path="/admin/users"
  element={
    <ProtectedRoute>
      <Users />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/mechanics"
  element={
    <ProtectedRoute>
      <Mechanics />
    </ProtectedRoute>
  }
/>

<Route
  path="/mechanic/dashboard"
  element={
    <ProtectedRoute>
      <MechanicDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/mechanic/bookings"
  element={
    <ProtectedRoute>
      <AssignedBookings />
    </ProtectedRoute>
  }
/>

<Route
  path="/mechanic/update-status/:id"
  element={
    <ProtectedRoute>
      <UpdateBookingStatus />
    </ProtectedRoute>
  }
/>

      {/* Future Modules */}

      {/*
      <Route
        path="/book-service"
        element={
          <ProtectedRoute>
            <BookService />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reviews"
        element={
          <ProtectedRoute>
            <Reviews />
          </ProtectedRoute>
        }
      />
      */}

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;