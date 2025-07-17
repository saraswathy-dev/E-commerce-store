import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { redis } from "../lib/redis.js";
dotenv.config();

const generateToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};
const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refreshToken:${userId}`,
    refreshToken,
    "EX",
    60 * 60 * 24 * 7
  ); // Store for 7 days
};
const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,           // true in production, false in dev
  sameSite: isProduction ? "Strict" : "Lax", // ✅ Lax for dev so cross-origin cookies work
  path: "/",
};

const setCookies = (res, refreshToken, accessToken) => {
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000, // 15 mins
  });
};


export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create new user
    const user = await User.create({ name, email, password });

    //authentication logic - generating a token
    const { accessToken, refreshToken } = generateToken(user._id);
    await storeRefreshToken(user._id, refreshToken);
    // Set the refresh token in a cookie
    setCookies(res, refreshToken, accessToken);

    res
      .status(201)
      .json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        message: "User created successfully",
      });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
   if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateToken(user._id);
      await storeRefreshToken(user._id, refreshToken);
      // Set the refresh token in a cookie
      setCookies(res, refreshToken, accessToken);
      res.status(200).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        
        message: "Login successful",
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }}
export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    await redis.del(`refreshToken:${decoded.userId}`); // Remove the refresh token from Redis
    res.clearCookie("refreshToken"); // Clear the cookie
    res.clearCookie("accessToken"); // Clear the access token cookie
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error",error: error.message });
  }
  
}
export const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    const userId = decoded.userId;
    const storedRefreshToken = await redis.get(`refreshToken:${userId}`);
    if (storedRefreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    // Generate new access token
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error during token refresh:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { _id, name, email, role } = req.user;

    res.status(200).json({
      user: {
        _id,
        name,
        email,
        role,
      },
    }); // ✅ wrap in `user` object
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
