import express from "express";

import {
    getAllUsers,
    getAllMechanics
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
    "/",
    protect,
    authorize("admin"),
    getAllUsers
);

router.get(
    "/mechanics",
    protect,
    authorize("admin"),
    getAllMechanics
);

export default router;