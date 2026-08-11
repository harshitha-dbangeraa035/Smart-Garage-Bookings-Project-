import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

import {
    addInventory,
    getInventory,
    updateInventory,
    deleteInventory,
    getLowStockItems
} from "../controllers/inventoryController.js";

const router = express.Router();

router.post(
    "/",
    protect,
    authorize("admin"),
    addInventory
);

router.get(
    "/",
    protect,
    authorize("admin"),
    getInventory
);

router.get(
    "/low-stock",
    protect,
    authorize("admin"),
    getLowStockItems
);

router.put(
    "/:id",
    protect,
    authorize("admin"),
    updateInventory
);

router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteInventory
);

export default router;