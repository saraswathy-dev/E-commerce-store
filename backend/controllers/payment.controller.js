import Coupon from "../models/coupon.model.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/order.model.js";
import { createNewCoupon } from "../utils/coupon.utils.js";
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
        products: JSON.stringify(products.map((p)=>({
            id: p._id,
            price: p.price,
            quantity: p.quantity,
            
        })),
     ) // Store products in metadata
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

export const checkoutSucess = async (req, res) => {
  try {
 const {sessionId} = req.body;
 const session =await Stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
if(session.metadata.couponCode) {
    await Coupon.findOneAndUpdate(
      { code: session.metadata.couponCode, userId: req.user._id },
      { isActive: false },
      
    );
    }

    const products = JSON.parse(session.metadata.products);
    const newOrder= new Order({
        user: session.metadata.userId,
        products: products.map((p) => ({
          product: p.id,
          price: p.price,
          quantity: p.quantity,
        })),
        totalAmount: session.amount_total / 100, // Convert to dollars
      
        stripeSessionId: session.id,
    })
    await newOrder.save();
    return res.status(200).json({ message: "Payment successful and order created.",orderId:newOrder._id,success:true });


  }} catch (error) {
    console.error("Error retrieving checkout session:", error);
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