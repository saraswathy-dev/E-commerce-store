import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  price: {
    type: Number,
    min: [0, "Product price must be a positive number"],
    required: [true, "Product price is required"],
  },
  image: {
    type: String,
    required: [true, "Product image URL is required"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });
const Product = mongoose.model("Product", productSchema);
export default Product;