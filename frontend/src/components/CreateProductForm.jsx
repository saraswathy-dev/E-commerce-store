import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
const categories = [
  "jean",
  "t-shirt",
  "shoe",
  "glasses",
  "jacket",
  "suit",
  "bag",
];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
    image: "",
  });
  const handleSubmit=(e)=>{


  }
  return (
    <motion.div
      className="bg-gray-300 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-2xl text-center text-blue-800 font-bold sm:text-4xl mb-4">
        Create Product
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-800">Product Name</label>
            <input type="text" id="name" name="name" value={newProduct.name} onChange={(e)=>setNewProduct({...newProduct,name:e.target.value})}
            className="mt-1 block w-full bg-gray-200 border-gray-400 border rounded-md shadow-sm py-2 px-3 text-white
            focus:outline-none focus:ring-2 focus:ring-blue-500 focs:border-blue-500" required></input>
        </div>
         <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-800 mt-1">Description</label>
            <textarea type="text" id="description" name="description" value={newProduct.description} rows='3'  onChange={(e)=>setNewProduct({...newProduct,description:e.target.value})}
            className="mt-1 block w-full  bg-gray-200  border-gray-400 border rounded-md shadow-sm py-2 px-3 text-white
            focus:outline-none focus:ring-2 focus:ring-blue-500 focs:border-blue-500" required></textarea>
        </div>
         <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-800 mt-1">Price</label>
            <input type="number" id="price" name="price" value={newProduct.price} step='0.01' onChange={(e)=>setNewProduct({...newProduct,price:e.target.value})}
            className="mt-1 block w-full  bg-gray-200  border-gray-400 border rounded-md shadow-sm py-2 px-3 text-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focs:border-blue-500" required></input>
        </div>
         <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-800 mt-1">Category</label>
            <select type="text" id="category" name="category" value={newProduct.category} step='0.01' onChange={(e)=>setNewProduct({...newProduct,category:e.target.value})}
            className="mt-1 block w-full  bg-gray-200  border-gray-400 border rounded-md shadow-sm py-2 px-3 text-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focs:border-blue-500" required>
                <option value=''>Select a category</option>
                {categories.map((category)=>(<option key={category} value={category}>{category}</option>))}
            </select>
        </div>
         <div className="mt-1 flex items-center">
            <input type="file" id="image" className="sr-only" accept="image/*"></input>
            <label htmlFor="image" className="cursor-pointer bg-blue-700 py-2 px-3 border border-gray-300">Image</label>
           
        </div>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
