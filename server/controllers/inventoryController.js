import Inventory from "../models/Inventory.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

// ==============================
// Add Inventory Item
// ==============================
export const addInventory = asyncHandler(async (req, res) => {

    const item = await Inventory.create(req.body);

    return res.status(201).json(

        new ApiResponse(

            201,

            item,

            "Inventory item added successfully"

        )

    );

});

// ==============================
// Get All Inventory Items
// ==============================
export const getInventory = asyncHandler(async (req, res) => {

    const items = await Inventory.find().sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            items,
            "Inventory fetched successfully"
        )
    );

});

// ==============================
// Update Inventory Item
// ==============================
export const updateInventory = asyncHandler(async (req, res) => {

    const item = await Inventory.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!item) {
        return res.status(404).json(
            new ApiResponse(
                404,
                null,
                "Inventory item not found"
            )
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            item,
            "Inventory updated successfully"
        )
    );

});

// ==============================
// Delete Inventory Item
// ==============================
export const deleteInventory = asyncHandler(async (req, res) => {

    const item = await Inventory.findById(req.params.id);

    if (!item) {
        return res.status(404).json(
            new ApiResponse(
                404,
                null,
                "Inventory item not found"
            )
        );
    }

    await item.deleteOne();

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Inventory deleted successfully"
        )
    );

});

// ==============================
// Low Stock Items
// ==============================
export const getLowStockItems = asyncHandler(async (req, res) => {

    const items = await Inventory.find({
        quantity: { $lt: 10 }
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            items,
            "Low stock items fetched successfully"
        )
    );

});