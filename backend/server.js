import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import productsRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Required for parsing JSON in POST requests
app.use(cookieParser()); // Middleware to parse cookies
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart",cartRoutes);

// Start Server
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
