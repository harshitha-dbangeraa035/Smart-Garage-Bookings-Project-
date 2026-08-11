import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaArrowLeft,
  FaSync,
  FaStar,
  FaUser,
  FaCar,
  FaTools,
  FaCalendarAlt,
  FaCommentDots,
  FaPen,
  FaSpinner,
} from "react-icons/fa";
import API from "../../services/api";
import "./ViewReviews.css";

function ViewReviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  // Fetch All Reviews
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await API.get("/reviews");
      setReviews(res.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch reviews"
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper to render Star Ratings
  const renderStars = (rating) => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, index) => (
      <FaStar
        key={index}
        className={`star-icon ${index < rating ? "filled" : "empty"}`}
      />
    ));
  };

  // Initial Loading Screen
  if (loading && reviews.length === 0) {
    return (
      <div className="view-reviews-container">
        <div className="reviews-loading-card">
          <FaSpinner className="spinner-icon" />
          <span>Loading Reviews...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="view-reviews-container">
      <div className="view-reviews-card">
        
        {/* Header Section */}
        <div className="reviews-header">
          <div className="header-left">
            {/* Top-Left Back Button */}
            <button
              type="button"
              onClick={() => navigate("/user/dashboard")}
              className="btn-back-top-left"
              aria-label="Go Back"
            >
              <FaArrowLeft />
              <span>Back</span>
            </button>
            <div>
              <h1 className="reviews-title">Customer Reviews</h1>
              <p className="reviews-subtitle">
                See what our customers are saying about our services
              </p>
            </div>
          </div>

          <div className="header-actions">
            <button
              type="button"
              onClick={() => navigate("/reviews/write")}
              className="btn-write-review"
            >
              <FaPen />
              <span>Write Review</span>
            </button>

            <button
              type="button"
              onClick={fetchReviews}
              disabled={loading}
              className="btn-refresh"
            >
              <FaSync className={loading ? "spinner-icon" : ""} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Empty State */}
        {reviews.length === 0 ? (
          <div className="empty-reviews-state">
            <FaCommentDots className="empty-icon" />
            <h2>No Reviews Found</h2>
            <p>Be the first to share your experience with us!</p>
            <button
              type="button"
              onClick={() => navigate("/reviews/write")}
              className="btn-write-review-empty"
            >
              <FaPen />
              <span>Write a Review</span>
            </button>
          </div>
        ) : (
          /* Reviews Responsive Grid */
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review._id} className="review-card">
                
                {/* Card Header */}
                <div className="review-card-header">
                  <div className="customer-info">
                    <div className="avatar-badge">
                      <FaUser />
                    </div>
                    <div>
                      <h3 className="customer-name">
                        {review.customer?.name || "Anonymous Customer"}
                      </h3>
                      <span className="review-date">
                        <FaCalendarAlt className="inline-icon" />
                        {new Date(review.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="rating-badge">
                    <div className="stars-row">{renderStars(review.rating)}</div>
                    <span className="rating-num">{review.rating}/5</span>
                  </div>
                </div>

                {/* Review Body */}
                <div className="review-card-body">
                  <p className="review-comment">
                    "{review.comment || review.review || "No comment provided."}"
                  </p>
                </div>

                {/* Review Footer Metadata */}
                <div className="review-card-footer">
                  <div className="meta-item">
                    <FaTools className="meta-icon" />
                    <span className="meta-label">Service:</span>
                    <span className="meta-value">
                      {review.booking?.serviceType || "N/A"}
                    </span>
                  </div>

                  <div className="meta-item">
                    <FaCar className="meta-icon" />
                    <span className="meta-label">Vehicle:</span>
                    <span className="meta-value">
                      {review.booking?.vehicle?.registrationNumber || "N/A"}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default ViewReviews;