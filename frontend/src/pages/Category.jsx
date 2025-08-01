import { useProductStore } from "../stores/useProductStore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const Category = () => {
  const { fetchProductsByCategory, products } = useProductStore();
  const {category} = useParams(); 
  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory]);

  console.log(products);

  return (
    <div className="min-h-screen ">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          className="text-2xl  text-center text-blue-800 font-bold sm:text-4xl mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)} 
        </motion.h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {products.length === 0 && (
            <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">No Products found</h2>
          )}
          {products.map((product) => (
           <ProductCard key={product._id} product={product}></ProductCard>
          ))}
          
        </motion.div>
        </div>
        </div>
  );
};

export default Category;
