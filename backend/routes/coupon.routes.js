 import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getCoupons, validateCoupons } from "../controllers/coupon.controller.js";

 const router = express.Router();

 router.get("/",protectRoute,getCoupons);
 router.get("/",protectRoute,validateCoupons);