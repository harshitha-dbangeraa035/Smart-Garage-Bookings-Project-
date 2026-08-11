import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaArrowLeft,
  FaCreditCard,
  FaSpinner,
  FaMoneyBillWave,
} from "react-icons/fa";
import API from "../../services/api";
import "./MakePayment.css";

function MakePayment() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [payment, setPayment] = useState({
    bookingId: "",
    paymentMethod: "Cash",
    amount: "",
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  // Fetch bookings available for payment
  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      const bookingData = res.data.data || [];
      setBookings(bookingData);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch bookings"
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle generic form inputs
  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Booking Selection + Auto-populate cost if available
  const handleBookingSelect = (e) => {
    const selectedId = e.target.value;
    const selectedBooking = bookings.find((b) => b._id === selectedId);

    setPayment((prev) => ({
      ...prev,
      bookingId: selectedId,
      // Auto-populate finalCost or estimatedCost if present
      amount: selectedBooking
        ? selectedBooking.finalCost || selectedBooking.estimatedCost || ""
        : "",
    }));
  };

  // Process Payment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!payment.bookingId) {
      toast.error("Please select a booking");
      return;
    }

    try {
      setSubmitting(true);
      await API.post("/payments", payment);
      toast.success("Payment Successful!");
      navigate("/payments/history");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Payment processing failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Loading Screen State
  if (loading) {
    return (
      <div className="payment-page-container">
        <div className="payment-loading-card">
          <FaSpinner className="spinner-icon" />
          <span>Loading bookings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page-container">
      <div className="payment-card">
        
        {/* Top Header with Left-Aligned Back Button */}
        <div className="payment-header">
          <button
            type="button"
            onClick={() => navigate("/user/dashboard")}
            className="btn-back-top-left"
            aria-label="Go Back"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>

          <h1 className="payment-title">Make Payment</h1>
          
          {/* Invisible balance element for flex alignment */}
          <div className="header-spacer"></div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="payment-form">
          
          {/* Select Booking */}
          <div className="form-group">
            <label htmlFor="bookingId" className="form-label">
              Select Booking <span className="required-star">*</span>
            </label>
            <div className="input-wrapper">
              <select
                id="bookingId"
                name="bookingId"
                value={payment.bookingId}
                onChange={handleBookingSelect}
                required
                className="form-control"
              >
                <option value="">-- Choose a Booking --</option>
                {bookings.map((booking) => (
                  <option key={booking._id} value={booking._id}>
                    {booking.vehicle?.registrationNumber
                      ? `${booking.vehicle.registrationNumber} - ${booking.serviceType}`
                      : `${booking.serviceType} (ID: ${booking._id.slice(-6)})`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Amount */}
          <div className="form-group">
            <label htmlFor="amount" className="form-label">
              Amount (₹) <span className="required-star">*</span>
            </label>
            <div className="input-wrapper">
              <span className="currency-prefix">₹</span>
              <input
                type="number"
                id="amount"
                name="amount"
                value={payment.amount}
                onChange={handleChange}
                placeholder="0.00"
                min="1"
                step="any"
                required
                className="form-control with-prefix"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="form-group">
            <label htmlFor="paymentMethod" className="form-label">
              Payment Method
            </label>
            <div className="input-wrapper">
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={payment.paymentMethod}
                onChange={handleChange}
                className="form-control"
              >
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="submit"
              disabled={submitting}
              className="btn-pay-now"
            >
              {submitting ? (
                <>
                  <FaSpinner className="spinner-icon" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <FaCreditCard />
                  <span>Pay Now</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate("/payments/history")}
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default MakePayment;