import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    partName: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
    },

    supplier: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Inventory", inventorySchema);