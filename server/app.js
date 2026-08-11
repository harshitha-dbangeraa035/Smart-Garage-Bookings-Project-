import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";

import userRoutes from "./routes/userRoutes.js";

import vehicleRoutes from "./routes/vehicleRoutes.js";

import errorHandler from "./middleware/errorMiddleware.js";

import bookingRoutes from "./routes/bookingRoutes.js";

import paymentRoutes from "./routes/paymentRoutes.js";

import reviewRoutes from "./routes/reviewRoutes.js";

import dashboardRoutes from "./routes/dashboardRoutes.js";

import inventoryRoutes from "./routes/inventoryRoutes.js";

const app = express();

// Security Middleware
app.use(helmet());

// Logging
app.use(morgan("dev"));

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚗 Smart Garage Booking API Running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/vehicles", vehicleRoutes);



app.use("/api/bookings", bookingRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/inventory", inventoryRoutes);

app.use(errorHandler);

export default app;