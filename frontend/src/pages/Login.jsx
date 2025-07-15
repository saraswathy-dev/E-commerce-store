import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader,LogIn } from "lucide-react";
import { motion } from "framer-motion";
import {useUserStore} from "../stores/useUserStore.js"
import { Navigate } from "react-router-dom";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login,loading,user}=useUserStore();

  const handleSubmit = async(e) => {
    e.preventDefault();
    await login({email,password});
    
  };
   if (user) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl px-4 sm:px-6 rounded-lg shadow-lg py-10 mt-10 min-h-screen mx-auto">

      <motion.div
        className="text-center w-full max-w-md mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl  text-blue-800 font-bold sm:text-4xl">
          Enter the details
        </h1>
      </motion.div>

      <motion.div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md" 
       initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 ,delay:0.2}}>

     <form
  className="mt-10 bg-gray-300 p-8 rounded-lg w-full max-w-* sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-4 sm:px-6"
  onSubmit={handleSubmit}
>
       
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="📧 your@example.com"
            aria-label="Email address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="🔒 ••••••••"
            aria-label="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
       
        <div className="mb-6">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center text-sm sm:text-base
 bg-blue-600 rounded py-2 px-2 w-full font-semibold hover:bg-blue-700 transition "
          >
            {loading ?( <>
            <Loader className="animate-spin " aria-hidden="true"></Loader>Loading<span className="ml-1 animate-pulse">• • •</span> </>):(<>
            <LogIn className="mr-2 h-5 w-5" aria-hidden="true"/>Login</>)}
            
          </button>
        </div>
      </form>
      <p className="text-center pt-5 text-black">
        Don't have an account?{" "}
        <Link className="text-blue-700" to="/signup">
      signup here
        </Link>
      </p>
      </motion.div>
    </div>
  );
};

export default Login;
