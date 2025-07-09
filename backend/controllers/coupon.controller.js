import Coupon from "../models/coupon.model.js";


export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({ userId: req.user._id,isActive: true });
        res.status(200).json(coupons || null);
  } catch (error) {
    res.status(500).json({ message: "Error fetching coupons", error: error.message });
  }
}
export const validateCoupons = async (req, res) => {
 
  try {
     const { couponCode } = req.body;
    const coupon = await Coupon.findOne({ code: couponCode,userId:req.user._id ,isActive: true });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found or inactive" });
    }
    if( coupon.expiryDate < new Date()) {
        coupon.isActive = false;
        await coupon.save();
      return res.status(400).json({ message: "Coupon has expired" });
    }
    res.status(200).json({code:coupon.code, message: "Coupon is valid" ,discountPercentage:coupon.discountPercentage});
  } catch (error) {
    res.status(500).json({ message: "Error validating coupon", error: error.message });
  }
}