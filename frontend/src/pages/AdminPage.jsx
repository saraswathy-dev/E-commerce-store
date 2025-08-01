import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useState ,useEffect} from "react";
import { motion } from "framer-motion";
import ProductsList from "../components/ProductsList";
import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import {useProductStore} from "../stores/useProductStore"



const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
];


export const AdminPage = () => {
  const {fetchAllProducts,products,fetchProductsByCategory}= useProductStore();

  useEffect(() => {
  fetchAllProducts();
  
  }, []);

  const [activeTabs, setActiveTabs] = useState("create");
  return (
    <div className="min-h-screen bg-gray-100 text-white relative ">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-2xl text-center text-blue-800 font-bold sm:text-4xl mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>
        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabs(tab.id)}
              className={`flex items-center  px-4 py-2 mx-2  rounded-md transition-colors duration-200 sm:text-base  ${
                activeTabs === tab.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-600"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5 "></tab.icon>
              {tab.label}
            </button>
          ))}
        </div>
        {activeTabs === "create" && <CreateProductForm></CreateProductForm>}
        {activeTabs === "products" && <ProductsList></ProductsList>}
        {activeTabs === "analytics" && <AnalyticsTab></AnalyticsTab>}
      </div>
    </div>
  );
};
