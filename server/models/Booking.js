import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    mechanic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    serviceType: {
      type: String,
      required: true,
      enum: [
        "General Service",
        "Oil Change",
        "Brake Service",
        "Engine Repair",
        "Wheel Alignment",
        "Car Wash",
      ],
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    bookingTime: {
      type: String,
      required: true,
    },

    problemDescription: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "In Progress",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

    estimatedCost: {
      type: Number,
      default: 0,
    },

    finalCost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Booking", bookingSchema);