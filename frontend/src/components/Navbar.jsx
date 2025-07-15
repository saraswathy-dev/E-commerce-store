import React from "react";
import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";

const Navbar = () => {
  const {user,logout} = useUserStore(); // Replace with actual user state management
  const isAdmin = user?.role === "admin"; // Replace with actual admin state management
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-gray-800 ">
        <div className="container mx-auto px-2 py-4 flex justify-between items-center   ">
          <Link
            to="/"
            className="text-xl  sm:text-2xl    font-bold text-white items-center space-x-2 flex hover:text-blue-300 transition-colors duration-300 "
          >
            E-Commerce
          </Link>
          {/* Hamburger button*/}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="text-white md:hidden"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <nav className="hidden md:flex  items-center  space-x-4">
            <Link
              to="/"
              className="text-white hover:text-blue-800 transition-colors duration-300"
            >
              Home
            </Link>

            {user && (
              <Link
                to="/cart"
                className="relative text-white hover:text-blue-900 transition-colors duration-300 flex items-center"
              >
                <div className="relative">
                  <ShoppingCart className="inline-block" size={24} />
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                    3
                  </span>
                </div>
                <span className="ml-2">Cart</span>
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
              >
                <Lock className="inline-block mr-1" size={18}></Lock>
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}
            {user ? (
              <button className="bg-gray-500 text-white px-2 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300 flex items-center" onClick={logout}>
                <LogOut className="inline-block" size={24} />
                <span className="ml-2">Logout</span>
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300 flex items-center"
                >
                  <UserPlus className="inline-block" size={24} />
                  <span className="ml-2">Signup</span>
                </Link>
                <Link
                  to="/login"
                  className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300 flex items-center ml-2"
                >
                  <LogIn className="inline-block" size={24} />
                  <span className="ml-2">Login</span>
                </Link>
              </>
            )}
          </nav>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <Link to="/" className="block text-white hover:text-blue-800">
              Home
            </Link>
            {user && (
              <Link
                to="/cart"
                className="block text-white hover:text-blue-900 flex items-center"
              >
                <ShoppingCart size={24} />
                <span className="ml-2">Cart</span>
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/admin"
                className="block bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <Lock className="inline-block mr-1" size={18} />
                Dashboard
              </Link>
            )}

            {user ? (
              <button className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center" onClick={logout}>
                <LogOut size={24} />
                <span className="ml-2">Logout</span>
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="block bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                  <UserPlus size={24} className="inline-block" />
                  <span className="ml-2">Signup</span>
                </Link>
                <Link
                  to="/login"
                  className="block bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                  <LogIn size={24} className="inline-block" />
                  <span className="ml-2">Login</span>
                </Link>
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
