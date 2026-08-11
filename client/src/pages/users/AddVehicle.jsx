import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaCar, FaSave, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../../services/api";
import "./AddVehicle.css";

const INITIAL_VEHICLE_STATE = {
  brand: "",
  model: "",
  year: "",
  registrationNumber: "",
  fuelType: "",
  transmission: "",
  color: "",
};

function AddVehicle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState(INITIAL_VEHICLE_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({
      ...prev,
      [name]: name === "registrationNumber" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...vehicle,
      brand: vehicle.brand.trim(),
      model: vehicle.model.trim(),
      registrationNumber: vehicle.registrationNumber.trim().toUpperCase(),
      color: vehicle.color.trim(),
    };

    if (!payload.brand || !payload.model || !payload.year || !payload.registrationNumber) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/vehicles", payload);
      toast.success(res.data?.message || "Vehicle Added Successfully");
      navigate("/vehicles");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add vehicle. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <main className="form-container">
        {/* Top Header / Navigation */}
        <div className="form-topbar">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/vehicles")}
            disabled={loading}
          >
            <FaArrowLeft />
            <span>Back to Vehicles</span>
          </button>
        </div>

        {/* Main Form Card */}
        <div className="form-card">
          {/* Form Header */}
          <div className="form-header">
            <div className="header-icon-badge">
              <FaCar />
            </div>
            <div className="header-text">
              <h1>Add New Vehicle</h1>
              <p>Fill in the details below to register your vehicle.</p>
            </div>
          </div>

          <div className="harshitha">
                      {/* Form */}
          <form onSubmit={handleSubmit} className="vehicle-form">
            <fieldset disabled={loading} className="form-fieldset">
              <div className="form-grid">
                {/* Brand */}
                <div className="form-group">
                  <label htmlFor="brand">
                    Brand <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={vehicle.brand}
                    onChange={handleChange}
                    placeholder="e.g. Toyota"
                    required
                  />
                </div>

                {/* Model */}
                <div className="form-group">
                  <label htmlFor="model">
                    Model <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={vehicle.model}
                    onChange={handleChange}
                    placeholder="e.g. Innova"
                    required
                  />
                </div>

                {/* Year */}
                <div className="form-group">
                  <label htmlFor="year">
                    Manufacturing Year <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={vehicle.year}
                    onChange={handleChange}
                    placeholder="e.g. 2023"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    required
                  />
                </div>

                {/* Registration Number */}
                <div className="form-group">
                  <label htmlFor="registrationNumber">
                    Registration Number <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="registrationNumber"
                    name="registrationNumber"
                    value={vehicle.registrationNumber}
                    onChange={handleChange}
                    placeholder="e.g. KA01AB1234"
                    required
                  />
                </div>

                {/* Fuel Type */}
                <div className="form-group">
                  <label htmlFor="fuelType">Fuel Type</label>
                  <select
                    id="fuelType"
                    name="fuelType"
                    value={vehicle.fuelType}
                    onChange={handleChange}
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="CNG">CNG</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                {/* Transmission */}
                <div className="form-group">
                  <label htmlFor="transmission">Transmission</label>
                  <select
                    id="transmission"
                    name="transmission"
                    value={vehicle.transmission}
                    onChange={handleChange}
                  >
                    <option value="">Select Transmission</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>

                {/* Color */}
                <div className="form-group full-width">
                  <label htmlFor="color">Vehicle Color</label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={vehicle.color}
                    onChange={handleChange}
                    placeholder="e.g. Pearl White"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <Link to="/vehicles" className={`btn btn-cancel ${loading ? "disabled" : ""}`}>
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-submit"
                >
                  <FaSave />
                  <span>{loading ? "Saving..." : "Save Vehicle"}</span>
                </button>
              </div>
            </fieldset>
          </form>
          </div>

        </div>
      </main>
    </div>
  );
}

export default AddVehicle;