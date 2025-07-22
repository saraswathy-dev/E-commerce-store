import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import productsRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173", // or your frontend domain
    credentials: true,               // allow cookies
  })); // Enable CORS for all origins
app.use(express.json({limit:"10mb"})); // Required for parsing JSON in POST requests
app.use(cookieParser()); // Middleware to parse cookies
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/coupons",couponRoutes)
app.use("/api/payments",paymentRoutes);
app.use("/api",analyticsRoutes);

// Start Server
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
