import  asyncHandler  from "../utils/asyncHandler.js";
import  ApiError  from "../utils/ApiError.js";
import  ApiResponse  from "../utils/ApiResponse.js";
import Booking from "../models/Booking.js";
import Review from "../models/Review.js";

export const addReview = asyncHandler(async (req, res) => {

    console.log("Request Body:", req.body);
    console.log("Logged in User:", req.user);
    const { bookingId, rating, review } = req.body;

    // Validate input
    if (!bookingId || !rating || !review) {
        throw new ApiError(
            400,
            "Booking, rating and review are required"
        );
    }

    // Find booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    // Check ownership
    if (booking.customer.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized");
    }

    // Booking must be completed
    if (booking.status !== "Completed") {
        throw new ApiError(
            400,
            `Review can only be added after service completion. Current status: ${booking.status}`
        );
    }

    // Prevent duplicate review
    const existingReview = await Review.findOne({
        booking: bookingId,
    });

    if (existingReview) {
        throw new ApiError(
            400,
            "Review already submitted for this booking"
        );
    }

    // Create review
    const newReview = await Review.create({
        customer: req.user._id,
        booking: bookingId,
        rating: Number(rating),
        review,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            newReview,
            "Review submitted successfully"
        )
    );

});

// ==============================
// Get All Reviews
// ==============================
export const getAllReviews = asyncHandler(async (req, res) => {

    const reviews = await Review.find()
        .populate("customer", "name")
        .populate("booking");

    return res.status(200).json(
        new ApiResponse(
            200,
            reviews,
            "Reviews fetched successfully"
        )
    );

});