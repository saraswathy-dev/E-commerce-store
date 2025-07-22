import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import {useProductStore} from "../stores/useProductStore"
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
    const {createProduct,loading}=useProductStore();
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
    image: "",
    category:""
  });
  const handleSubmit = async(e) => {
    e.preventDefault();
    await createProduct(newProduct)
    setNewProduct({name: "",
    description: "",
    price: "",
    countInStock: "",
    image: "",
    category:""})
  };
  const handleImageChange=(e)=>{
    const file=e.target.files[0];
    if(file){
        const reader=new FileReader();
        reader.onloadend=()=>{
            setNewProduct({...newProduct,image:reader.result});
        }
        reader.readAsDataURL(file)
    }
  }
  return (
    <motion.div
      className="bg-gray-300 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-2xl text-center text-gray-800 font-bold sm:text-4xl mb-4">
        Create Product
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-800"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="mt-1 block w-full bg-gray-200 border-gray-400 border rounded-md shadow-sm py-2 px-3 text-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          ></input>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-800 mt-1"
          >
            Description
          </label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={newProduct.description}
            rows="3"
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="mt-1 block w-full  bg-gray-200  border-gray-400 border rounded-md shadow-sm py-2 px-3 text-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-800 mt-1"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            step="0.01"
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="mt-1 block w-full  bg-gray-200  border-gray-400 border rounded-md shadow-sm py-2 px-3 text-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          ></input>
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-800 mt-1"
          >
            Category
          </label>
          <select
            
            id="category"
            name="category"
            value={newProduct.category}
            step="0.01"
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="mt-1 block w-full  bg-gray-200  border-gray-400 border rounded-md shadow-sm py-2 px-3 text-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-1 flex items-center">
          <input
            type="file"
            id="image"
           
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          ></input>
          <label
            htmlFor="image"
            className="mt-2 cursor-pointer bg-gray-600 py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Upload className="h-5 w-5 inline-block mr-2"/>Upload Image
          </label>
         {newProduct.image && (
  <img
    src={newProduct.image}
    alt="Preview"
    className="ml-3 w-16 h-16 object-cover rounded shadow"
  />
)}

        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm
        font-medium text-gray-800 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2
        focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50" disabled={loading}>
            {loading ? (<>
            <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden='true'>Loading</Loader></>):(<>
            <PlusCircle className="mr-2 h-5 w-5"/>Create Product</>)}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
