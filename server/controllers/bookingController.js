import Booking from "../models/Booking.js";
import Vehicle from "../models/Vehicle.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import sendEmail from "../utils/sendEmail.js";

// Create Booking
export const createBooking = asyncHandler(async (req, res) => {
  const {
    vehicle,
    serviceType,
    bookingDate,
    bookingTime,
    problemDescription,
  } = req.body;

  if (
    !vehicle ||
    !serviceType ||
    !bookingDate ||
    !bookingTime ||
    !problemDescription
  ) {
    throw new ApiError(400, "Please fill all required fields");
  }

  // Check vehicle ownership
  const vehicleExists = await Vehicle.findById(vehicle);

  if (!vehicleExists) {
    throw new ApiError(404, "Vehicle not found");
  }

  if (vehicleExists.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You can only book your own vehicle");
  }

  const booking = await Booking.create({
    customer: req.user._id,
    vehicle,
    serviceType,
    bookingDate,
    bookingTime,
    problemDescription,
  });

try {
  console.log("Sending email to:", req.user.email);

  await sendEmail(
    req.user.email,
    "Booking Confirmed - Smart Garage",
    `Hello ${req.user.name},

Your booking has been created successfully.

Service: ${booking.serviceType}
Date: ${booking.bookingDate.toDateString()}
Time: ${booking.bookingTime}

Thank you for choosing Smart Garage!`
  );

  console.log("✅ Booking confirmation email sent.");
} catch (error) {
  console.error("❌ Email Error:", error.message);
}


  return res.status(201).json(
    new ApiResponse(
      201,
      booking,
      "Booking created successfully"
    )
  );
});

// Get Logged-in User Bookings
export const getMyBookings = asyncHandler(async (req, res) => {

    const bookings = await Booking.find({
        customer: req.user._id
    })
    .populate("vehicle")
    .populate("mechanic", "name email phone");

    return res.status(200).json(
        new ApiResponse(
            200,
            bookings,
            "Bookings fetched successfully"
        )
    );

});

// Get Booking By ID
export const getBookingById = asyncHandler(async (req, res) => {

    const booking = await Booking.findById(req.params.id)
        .populate("customer", "name email phone")
        .populate("vehicle")
        .populate("mechanic", "name email");

    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    if (
        booking.customer._id.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
    ) {
        throw new ApiError(403, "Access denied");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            booking,
            "Booking fetched successfully"
        )
    );

});

// Cancel Booking
export const cancelBooking = asyncHandler(async (req, res) => {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    if (booking.customer.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Access denied");
    }

    if (booking.status !== "Pending") {
        throw new ApiError(
            400,
            "Only pending bookings can be cancelled"
        );
    }

    booking.status = "Cancelled";

    await booking.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            booking,
            "Booking cancelled successfully"
        )
    );

});

// ==============================
// Admin - Get All Bookings
// ==============================
export const getAllBookings = asyncHandler(async (req, res) => {

    const bookings = await Booking.find()
        .populate("customer", "name email phone")
        .populate("vehicle")
        .populate("mechanic", "name email");

    return res.status(200).json(
        new ApiResponse(
            200,
            bookings,
            "All bookings fetched successfully"
        )
    );

});

// ==============================
// Admin - Assign Mechanic
// ==============================
export const assignMechanic = asyncHandler(async (req, res) => {

    console.log("Booking ID:", req.params.id);
    console.log("Mechanic ID:", req.body.mechanicId);

    const { mechanicId } = req.body;

    const booking = await Booking.findById(req.params.id);

    console.log("Booking:", booking);

    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    const mechanic = await User.findById(mechanicId);

    console.log("Mechanic:", mechanic);

    if (!mechanic) {
        throw new ApiError(404, "Mechanic not found");
    }

    console.log("Role:", mechanic.role);

    if (mechanic.role !== "mechanic") {
        throw new ApiError(400, "Selected user is not a mechanic");
    }

    booking.mechanic = mechanic._id;
    booking.status = "Accepted";

    await booking.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            booking,
            "Mechanic assigned successfully"
        )
    );
});

// ==============================
// Mechanic - Get Assigned Bookings
// ==============================
export const getAssignedBookings = asyncHandler(async (req, res) => {

    const bookings = await Booking.find({
        mechanic: req.user._id
    })
    .populate("customer", "name phone email")
    .populate("vehicle");

    return res.status(200).json(
        new ApiResponse(
            200,
            bookings,
            "Assigned bookings fetched successfully"
        )
    );

});

// ==============================
// Mechanic - Update Booking Status
// ==============================
export const updateBookingStatus = asyncHandler(async (req, res) => {

    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    // Check if this booking belongs to the logged-in mechanic
    if (
        !booking.mechanic ||
        booking.mechanic.toString() !== req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "You are not assigned to this booking"
        );
    }

    const allowedStatus = [
        "Accepted",
        "In Progress",
        "Completed"
    ];

    if (!allowedStatus.includes(status)) {
        throw new ApiError(
            400,
            "Invalid booking status"
        );
    }

    booking.status = status;

    await booking.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            booking,
            "Booking status updated successfully"
        )
    );

});