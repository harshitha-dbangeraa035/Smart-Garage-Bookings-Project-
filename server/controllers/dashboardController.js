import User from "../models/User.js";
import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import Review from "../models/Review.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getDashboardStats = asyncHandler(async (req, res) => {

    const totalUsers = await User.countDocuments();

    const totalVehicles = await Vehicle.countDocuments();

    const totalBookings = await Booking.countDocuments();

    const completedBookings = await Booking.countDocuments({
        status: "Completed"
    });

    const pendingBookings = await Booking.countDocuments({
        status: "Pending"
    });

    const cancelledBookings = await Booking.countDocuments({
        status: "Cancelled"
    });

    const totalMechanics = await User.countDocuments({
        role: "mechanic"
    });

    const payments = await Payment.find();

    const totalRevenue = payments.reduce(
        (sum, payment) => sum + payment.amount,
        0
    );

    const reviews = await Review.find();

    let averageRating = 0;

    if (reviews.length > 0) {

        const totalRating = reviews.reduce(
            (sum, review) => sum + review.rating,
            0
        );

        averageRating = (
            totalRating / reviews.length
        ).toFixed(1);

    }

    return res.status(200).json(

        new ApiResponse(

            200,

            {
                totalUsers,
                totalVehicles,
                totalBookings,
                completedBookings,
                pendingBookings,
                cancelledBookings,
                totalMechanics,
                totalRevenue,
                averageRating
            },

            "Dashboard statistics fetched successfully"

        )

    );

});