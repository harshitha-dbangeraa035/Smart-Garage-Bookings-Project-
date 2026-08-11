import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

import {
    createBooking,
    getMyBookings,
    getBookingById,
    cancelBooking,
    getAllBookings,
    assignMechanic,
    getAssignedBookings,
    updateBookingStatus
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", protect, createBooking);

router.get("/", protect, getMyBookings);

router.get("/admin/all", protect, authorize("admin"), getAllBookings);

router.put("/:id/assign-mechanic", protect, authorize("admin"), assignMechanic);

router.get("/mechanic/my-bookings", protect, authorize("mechanic"), getAssignedBookings);

router.put("/:id/status", protect, authorize("mechanic"), updateBookingStatus);

router.get("/:id", protect, getBookingById);

router.put("/:id/cancel", protect, cancelBooking);
export default router;