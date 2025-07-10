import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createCheckoutSession, checkoutSucess } from "../controllers/payment.controller.js";

const router = express.Router();


router.post("/create-checkout-session", protectRoute, createCheckoutSession)
router.post("/Checkout-session", protectRoute, checkoutSucess)


export default router;
