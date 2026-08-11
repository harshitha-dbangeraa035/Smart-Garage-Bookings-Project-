import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    addReview,
    getAllReviews
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", protect, addReview);

router.get("/", getAllReviews);

export default router;