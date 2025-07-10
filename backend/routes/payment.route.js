import express from "express";
import { protectRoute,checkoutSucess } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/create-checkout-session", protectRoute, createCheckoutSession)
router.post("/Checkout-session", protectRoute, checkoutSucess)


export default router;
