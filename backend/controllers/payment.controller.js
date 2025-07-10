import Coupon from "../models/coupon.model.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ error: "Products array is required and cannot be empty." });
    }
    let totalAmount = 0;

    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100);
      totalAmount += amount * product.quantity;
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity,
      };
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });
      if (coupon) {
        totalAmount = Math.round(totalAmount * (1 - coupon.discount / 100));
      } else {
        return res.status(400).json({ error: "Invalid coupon code." });
      }
    }
    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      discounts: coupon
        ? [
            {
              coupon: await createStripeCoupons(coupon.discountPercentage), // Assuming you store the Stripe coupon ID in your Coupon model
            },
          ]
        : [],
      metadata: {
        userId: req.user._id.tostring(),
        couponCode: couponCode || "", // Store the coupon ID if used
      },
    });
    if (totalAmount >= 20000) {
      await createNewCoupon(req.user._id);
    }
    res.status(200).json({
      sessionId: session.id,
      totalAmount: totalAmount / 100, // Convert to dollars
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
async function createStripeCoupons(discountPercentage) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
 
    const coupon = await stripe.coupons.create({
      percent_off: discountPercentage,
      duration: "once",
    });
    return coupon.id; 
}// Return the Stripe coupon ID
async function createNewCoupon(userId) {
  const createNewCoupons = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10, // Example discount percentage
    expieryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    userId: userId,
  });
  await createNewCoupons.save();
  return newCoupon;
}