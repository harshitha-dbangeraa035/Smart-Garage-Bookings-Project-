import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
    createPayment,
    getMyPayments,
    downloadInvoice
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", protect, createPayment);

router.get("/my-payments", protect, getMyPayments);

router.get("/:paymentId/invoice", protect, downloadInvoice);

export default router;