import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import generateInvoice from "../utils/generateInvoice.js";

export const createPayment = asyncHandler(async (req, res) => {

    const {
        bookingId,
        amount,
        paymentMethod
    } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    if (
        booking.customer.toString() !== req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "Unauthorized"
        );
    }

    const payment = await Payment.create({

        booking: bookingId,

        customer: req.user._id,

        amount,

        paymentMethod,

        paymentStatus: "Paid",

        transactionId:
            "TXN" + Date.now()

    });

    return res.status(201).json(

        new ApiResponse(

            201,

            payment,

            "Payment Successful"

        )

    );

});

// ==============================
// Customer - Get My Payments
// ==============================
export const getMyPayments = asyncHandler(async (req, res) => {

    const payments = await Payment.find({
        customer: req.user._id
    })
    .populate({
        path: "booking",
        populate: {
            path: "vehicle",
            select: "brand model registrationNumber"
        }
    });

    return res.status(200).json(

        new ApiResponse(

            200,

            payments,

            "Payments fetched successfully"

        )

    );

});

// ==============================
// Generate Invoice
// ==============================
export const downloadInvoice = asyncHandler(async (req, res) => {

    const payment = await Payment.findById(req.params.paymentId);

    if (!payment) {
        throw new ApiError(
            404,
            "Payment not found"
        );
    }

    if (
        payment.customer.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "Unauthorized"
        );
    }

    const invoicePath = generateInvoice(payment);

    return res.download(invoicePath);

});