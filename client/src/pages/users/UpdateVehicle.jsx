import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCar, FaSave, FaArrowLeft, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../../services/api";
import "./UpdateVehicle.css";

function UpdateVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [vehicle, setVehicle] = useState({
    brand: "",
    model: "",
    year: "",
    registrationNumber: "",
    fuelType: "",
    transmission: "",
    color: "",
  });

  useEffect(() => {
    fetchVehicle();
  }, []);

  const fetchVehicle = async () => {
    try {
      const res = await API.get(`/vehicles/${id}`);

      setVehicle({
        brand: res.data.brand || "",
        model: res.data.model || "",
        year: res.data.year || "",
        registrationNumber: res.data.registrationNumber || "",
        fuelType: res.data.fuelType || "",
        transmission: res.data.transmission || "",
        color: res.data.color || "",
      });
    } catch (error) {
      toast.error("Unable to fetch vehicle");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setVehicle({
      ...vehicle,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !vehicle.brand ||
      !vehicle.model ||
      !vehicle.year ||
      !vehicle.registrationNumber
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.put(`/vehicles/${id}`, vehicle);

      toast.success(
        res.data.message || "Vehicle Updated Successfully"
      );

      navigate("/vehicles");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update vehicle."
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="update-vehicle-container">
        <div className="loading-box">
          <FaSpinner className="btn-spinner" />
          <span>Loading Vehicle...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="update-vehicle-container">
      <div className="update-vehicle-card">
        
        {/* Header Section */}
        <div className="update-vehicle-header">
          <div className="header-title-group">
            <div className="icon-badge">
              <FaCar />
            </div>
            <div>
              <h1 className="form-page-title">Update Vehicle</h1>
              <p className="form-page-subtitle">Edit your vehicle details below.</p>
            </div>
          </div>

          {/* Top-Right Back Button */}
          <button
            type="button"
            onClick={() => navigate("/vehicles")}
            className="btn-back-top-right"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
        </div>

        {/* Vehicle Form */}
        <form onSubmit={handleSubmit} className="vehicle-form">
          
          <div className="form-group">
            <label className="form-label">
              Brand <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              name="brand"
              value={vehicle.brand}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g. Toyota"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Model <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              name="model"
              value={vehicle.model}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g. Camry"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Year <span className="required-asterisk">*</span>
            </label>
            <input
              type="number"
              name="year"
              value={vehicle.year}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g. 2022"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Registration Number <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              name="registrationNumber"
              value={vehicle.registrationNumber}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g. ABC-1234"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Fuel Type</label>
            <select
              name="fuelType"
              value={vehicle.fuelType}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select Fuel</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="CNG">CNG</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Transmission</label>
            <select
              name="transmission"
              value={vehicle.transmission}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select Transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          <div className="form-group col-span-full">
            <label className="form-label">Color</label>
            <input
              type="text"
              name="color"
              value={vehicle.color}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g. Metallic Silver"
            />
          </div>

          {/* Form Actions */}
          <div className="form-actions col-span-full">
            <button
              type="button"
              onClick={() => navigate("/vehicles")}
              className="btn-cancel-form"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn-submit-form"
            >
              <FaSave />
              <span>{loading ? "Updating..." : "Update Vehicle"}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default UpdateVehicle;