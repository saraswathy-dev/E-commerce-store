import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllProducts = async (req, res) => {
  try {
    // Assuming you have a Product model imported
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};
export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.status(200).json(JSON.parse(featuredProducts));
    }
    // If not found in Redis, fetch from mongoDB
    // .Lean() is used to return plain JavaScript objects instead of Mongoose documents
    // which is more efficient for read operations
    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }
    //store in redis for futurer quick access
    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.status(200).json(featuredProducts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching featured products", error });
  }
};
export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 3}, // Randomly select 10 products
  }, {$project: {
    _id: 1,
        name: 1,
        price: 1,
        description: 1,
        image: 1,
      
      }
    }]);
    res.json(products);
   
  } catch (error) {
    console.error("Error fetching recommended products:", error);
    res.status(500).json({ message: "Error fetching recommended products", error });
};}
// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, category } = req.body;

    let cloudinaryResponse = null;
    if (image) {
      // Upload image to Cloudinary
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }
    const product = new Product({
      name,
      price,
      description,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : null,
      category,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
   
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
   if(product.image) {
      // Delete image from Cloudinary
      const publicId = product.image.split("/").pop().split(".")[0];//id of the image
      try {
      await cloudinary.uploader.destroy(`products/${publicId}`);
      console.log("Image deleted from Cloudinary");
      }
      catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
      }
      
      // Invalidate the cache for featured products
  } await Product.deleteOne({ _id: req.params.id });
      return res.status(200).json({ message: "Product deleted successfully" });}
    

  catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error });
  }
  
}
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found in this category" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Error fetching products by category", error });
  }
};
export const toggleFeaturedProduct = async (req, res) => {
  try{
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductsCache();
res.json(updatedProduct);
    }
    else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error toggling featured product:", error);
    res.status(500).json({ message: "Error toggling featured product", error });
  }
}
async function updateFeaturedProductsCache() {
  try {
    //lean() is used to return plain JavaScript objects instead of Mongoose documents
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (featuredProducts.length > 0) {
      await redis.set("featured_products", JSON.stringify(featuredProducts));
    } 
  } catch (error) {
    console.error("Error updating featured products cache:", error);
  }
}