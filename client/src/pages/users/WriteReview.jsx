import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaArrowLeft,
  FaStar,
  FaSpinner,
  FaPen,
  FaCar,
  FaPaperPlane,
} from "react-icons/fa";
import API from "../../services/api";
import "./WriteReview.css";

function WriteReview() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [review, setReview] = useState({
    bookingId: "",
    rating: 5,
    review: "",
  });

  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    fetchBookings();
  }, []);

  // Fetch completed bookings
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

  // Handle Input Change
  const handleChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Star Click
  const handleStarClick = (selectedRating) => {
    setReview((prev) => ({
      ...prev,
      rating: selectedRating,
    }));
  };

  // Submit Review
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!review.bookingId) {
      toast.error("Please select a booking to review");
      return;
    }

    try {
      setSubmitting(true);
      await API.post("/reviews", review);
      toast.success("Review submitted successfully!");
      navigate("/reviews/all");
    } catch (error) {
      console.error("Response:", error.response);
      toast.error(
        error.response?.data?.message || "Failed to submit review"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Loading Screen State
  if (loading) {
    return (
      <div className="write-review-container">
        <div className="review-loading-card">
          <FaSpinner className="spinner-icon" />
          <span>Loading Bookings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="write-review-container">
      <div className="write-review-card">
        
        {/* Top Header with Left-Aligned Back Button */}
        <div className="review-header">
          <div className="header-left">
            <button
              type="button"
              onClick={() => navigate("/reviews/all")}
              className="btn-back-top-left"
              aria-label="Go Back"
            >
              <FaArrowLeft />
              <span>Back</span>
            </button>
            <div>
              <h1 className="review-title">Write a Review</h1>
              <p className="review-subtitle">
                Share your feedback about your vehicle service experience
              </p>
            </div>
          </div>
        </div>

        {/* Full-Width Form */}
        <form onSubmit={handleSubmit} className="review-form">
          
          <div className="form-grid">
            
            {/* Booking Selection */}
            <div className="form-group full-width">
              <label htmlFor="bookingId" className="form-label">
                Select Booking <span className="required-star">*</span>
              </label>
              <div className="input-wrapper">
                <FaCar className="field-icon" />
                <select
                  id="bookingId"
                  name="bookingId"
                  value={review.bookingId}
                  onChange={handleChange}
                  required
                  className="form-control with-icon"
                >
                  <option value="">-- Choose a Booking to Review --</option>
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

            {/* Interactive Star Rating Picker */}
            <div className="form-group full-width">
              <label className="form-label">
                Overall Rating <span className="required-star">*</span>
              </label>
              <div className="star-rating-container">
                <div className="stars-wrapper">
                  {[1, 2, 3, 4, 5].map((starIndex) => {
                    const isFilled =
                      starIndex <= (hoverRating || review.rating);
                    return (
                      <button
                        type="button"
                        key={starIndex}
                        className={`star-button ${isFilled ? "active" : ""}`}
                        onClick={() => handleStarClick(starIndex)}
                        onMouseEnter={() => setHoverRating(starIndex)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={`Rate ${starIndex} out of 5 stars`}
                      >
                        <FaStar />
                      </button>
                    );
                  })}
                </div>
                <span className="rating-label-text">
                  {hoverRating || review.rating} out of 5 Stars
                </span>
              </div>
            </div>

            {/* Review Comment Textarea */}
            <div className="form-group full-width">
              <label htmlFor="review" className="form-label">
                Your Review / Comment <span className="required-star">*</span>
              </label>
              <div className="input-wrapper textarea-wrapper">
                <FaPen className="field-icon textarea-icon" />
                <textarea
                  id="review"
                  name="review"
                  value={review.review}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Tell us what went well or what could be improved..."
                  required
                  className="form-control with-icon textarea-control"
                />
              </div>
            </div>

          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="submit"
              disabled={submitting}
              className="btn-submit-review"
            >
              {submitting ? (
                <>
                  <FaSpinner className="spinner-icon" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>Submit Review</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate("/reviews/all")}
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

export default WriteReview;