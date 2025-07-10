import mongoose from "mongoose";

const mongooseSchema = mongoose.Schema;

const orderSchema = new mongooseSchema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
    products: [
        {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
      
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    shippingAddress: {
        type: String,
        unique: true,
    },
}, {
    timestamps: true,
});
const Order = mongoose.model("Order", orderSchema);
export default Order;
   