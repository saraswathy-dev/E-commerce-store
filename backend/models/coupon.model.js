import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
    discountPercenatge: {
    type: Number,
    required: true,
    min:0,
    max:100,
  },
    expiryDate: {
        type: Date,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique:true
    },
}, {
  timestamps: true,
});

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
