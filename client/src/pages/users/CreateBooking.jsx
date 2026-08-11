import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft, FaCalendarPlus, FaSpinner } from "react-icons/fa";
import API from "../../services/api";
import "./CreateBooking.css";

function CreateBooking() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  const [booking, setBooking] = useState({
    vehicle: "",
    serviceType: "",
    bookingDate: "",
    bookingTime: "",
    problemDescription: "",
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Fetch Logged-in User Vehicles
  const fetchVehicles = async () => {
    try {
      const res = await API.get("/vehicles");
      setVehicles(res.data.vehicles || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load vehicles");
      setVehicles([]);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Booking
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !booking.vehicle ||
      !booking.serviceType ||
      !booking.bookingDate ||
      !booking.bookingTime ||
      !booking.problemDescription
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/bookings", booking);

      toast.success(
        res.data.message || "Booking created successfully"
      );

      navigate("/bookings");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create booking"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-booking-container">
      <div className="create-booking-wrapper">
        
        {/* Header & Back Action */}
        <div className="create-booking-header">
          <button
            type="button"
            onClick={() => navigate("/bookings")}
            className="btn-back-link"
          >
            <FaArrowLeft />
            <span>Back to Bookings</span>
          </button>
          
          <div className="title-group">
            <FaCalendarPlus className="title-icon" />
            <h1 className="form-page-title">Create Booking</h1>
          </div>
          <p className="form-page-subtitle">
            Fill out the details below to schedule a service for your vehicle.
          </p>
        </div>

        {/* Booking Form */}
        <div className="create-booking-card">
          <form onSubmit={handleSubmit} className="booking-form">
            
            {/* Select Vehicle */}
            <div className="form-group">
              <label htmlFor="vehicle" className="form-label">
                Select Vehicle <span className="required-asterisk">*</span>
              </label>
              <select
                id="vehicle"
                name="vehicle"
                value={booking.vehicle}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Choose a Vehicle</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle._id} value={vehicle._id}>
                    {vehicle.brand} {vehicle.model} ({vehicle.registrationNumber})
                  </option>
                ))}
              </select>
            </div>

            {/* Service Type */}
            <div className="form-group">
              <label htmlFor="serviceType" className="form-label">
                Service Type <span className="required-asterisk">*</span>
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={booking.serviceType}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Service Type</option>
                <option value="General Service">General Service</option>
                <option value="Oil Change">Oil Change</option>
                <option value="Brake Service">Brake Service</option>
                <option value="Engine Repair">Engine Repair</option>
                <option value="Wheel Alignment">Wheel Alignment</option>
                <option value="Car Wash">Car Wash</option>
              </select>
            </div>

            {/* Date & Time Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bookingDate" className="form-label">
                  Booking Date <span className="required-asterisk">*</span>
                </label>
                <input
                  type="date"
                  id="bookingDate"
                  name="bookingDate"
                  value={booking.bookingDate}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bookingTime" className="form-label">
                  Booking Time <span className="required-asterisk">*</span>
                </label>
                <input
                  type="time"
                  id="bookingTime"
                  name="bookingTime"
                  value={booking.bookingTime}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            {/* Problem Description */}
            <div className="form-group">
              <label htmlFor="problemDescription" className="form-label">
                Problem Description <span className="required-asterisk">*</span>
              </label>
              <textarea
                id="problemDescription"
                name="problemDescription"
                rows="5"
                value={booking.problemDescription}
                onChange={handleChange}
                placeholder="Please describe the issues or services required for your vehicle..."
                className="form-control textarea-control"
              />
            </div>

            {/* Form Action Buttons */}
            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate("/bookings")}
                className="btn-cancel-form"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="btn-submit-form"
              >
                {loading ? (
                  <>
                    <FaSpinner className="btn-spinner" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <span>Create Booking</span>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}

export default CreateBooking;