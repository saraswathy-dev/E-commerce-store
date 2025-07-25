import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
  const { products,toggleFeaturedProduct ,deleteProduct} = useProductStore();
  useEffect(() => {
    console.log("products", products);
  }, [products]);

  return (
    <div>
      <motion.div
        className="bg-gray-300 shadow-lg rounded-lg p-8 mb-8  overflow-x-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl text-center text-gray-800 font-bold sm:text-4xl mb-4">
          Product
        </h1>
        <table className="min-w-full divide-y divide-gray-700 rounded-lg ">
          <thead className="bg-gray-200 ">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                Product
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                Category
              </th>
             
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                Featured
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y divide-gray-700 ">
            {products?.map((product) => (
              <tr key={product._id} className=" group hover:bg-gray-700 ">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex item-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={product.image}
                        alt={product.name}
                      ></img>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-700 group-hover:text-white capitalize">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex item-center">
                    <div className="text-sm font-medium text-gray-700 group-hover:text-white">
                      {product.price.toFixed(2)}
                    </div>
                  </div>
                </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex item-center">
                    <div className="text-sm font-medium text-gray-700 group-hover:text-white capitalize">
                      {product.category}
                    </div>
                  </div>
                </td>
                
                  <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex item-center">
                    <button onClick={()=>{toggleFeaturedProduct(product._id)}} className={`p-1 rounded-full ${product.isFeatured ? 
                    "bg-yellow-400 text-gray-900":"bg-gray-600 text-gray-300"} hover:bg-yellow-500 transition-colors duration-200`}><Star className="h-5 w-5"/></button>
                  </div>
                </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={()=>{deleteProduct(product._id)}} className="text-red-500 hover:text-red-300"><Trash className="h-5 w-5 "/></button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default ProductsList;
