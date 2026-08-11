import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCar, FaEdit, FaTrash, FaPlus, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../../services/api";
import "./MyVehicles.css";

function MyVehicles() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await API.get("/vehicles");
      console.log("Vehicle API Response:", res.data);
      setVehicles(res.data.vehicles || []);
    } catch (error) {
      toast.error("Failed to fetch vehicles");
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/vehicles/${id}`);
      toast.success("Vehicle deleted successfully");

      setVehicles((prev) =>
        prev.filter((vehicle) => vehicle._id !== id)
      );
    } catch (error) {
      toast.error("Failed to delete vehicle");
    }
  };

  if (loading) {
    return (
      <div className="vehicles-loading">
        <div className="loading-spinner"></div>
        <p>Loading your vehicles...</p>
      </div>
    );
  }

  return (
    <div className="vehicles-wrapper">
      <main className="vehicles-main">
        {/* Navigation Bar / Back Button */}
        <div className="vehicles-topbar">
<button className="btn btn-secondary" onClick={() => navigate("/user/dashboard")}>
  <FaArrowLeft />
  <span>Back to Dashboard</span>
</button>
        </div>

        {/* Header Section */}
        <header className="vehicles-header">
          <div>
            <h1>My Vehicles</h1>
            <p className="subtitle">View and manage your registered vehicles</p>
          </div>

          <Link to="/add-vehicle" className="btn btn-primary">
            <FaPlus />
            <span>Add Vehicle</span>
          </Link>
        </header>

        {/* Content Body */}
        {Array.isArray(vehicles) && vehicles.length === 0 ? (
          <div className="vehicles-empty">
            <div className="empty-icon-wrapper">
              <FaCar />
            </div>
            <h2>No Vehicles Found</h2>
            <p>You haven't added any vehicles yet. Start by adding your first one!</p>
            <Link to="/add-vehicle" className="btn btn-primary">
              <FaPlus />
              <span>Add Vehicle</span>
            </Link>
          </div>
        ) : (
          <div className="vehicles-grid">
            {vehicles.map((vehicle) => (
              <div key={vehicle._id} className="vehicle-card">
                <div className="card-top">
                  <div className="vehicle-icon-badge">
                    <FaCar />
                  </div>
                  <h2>
                    {vehicle.brand} {vehicle.model}
                  </h2>
                </div>

                <div className="vehicle-details">
                  <div className="detail-row">
                    <span className="detail-label">Year</span>
                    <span className="detail-value">{vehicle.year}</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Registration</span>
                    <span className="detail-value highlight">{vehicle.registrationNumber}</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Fuel Type</span>
                    <span className="detail-value">{vehicle.fuelType || "N/A"}</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Transmission</span>
                    <span className="detail-value">{vehicle.transmission || "N/A"}</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Color</span>
                    <span className="detail-value">{vehicle.color || "N/A"}</span>
                  </div>
                </div>

                <div className="card-actions">
                  <Link
                    to={`/update-vehicle/${vehicle._id}`}
                    className="btn btn-action btn-edit"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </Link>

                  <button
                    onClick={() => deleteVehicle(vehicle._id)}
                    className="btn btn-action btn-delete"
                  >
                    <FaTrash />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MyVehicles;