import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { AdminPage } from "./pages/AdminPage.jsx";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./App.css";
import { useEffect } from "react";

function App() {
  const {user,checkAuth,checkingAuth}=useUserStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth])
   if (checkingAuth) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <p>Checking session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* background gradient */}
    <div className="absolute inset-0 overflow-hidden">
  <div className="absolute inset-0">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(at_50%_75%,#ffffff,#f3f4f6,#e5e7eb)]"></div>
  </div>
</div>

      {/* main content */}
      <div className="relative z-10 px-10 py-15">
        <Navbar />
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/signup" element={!user ? <Signup /> :<Navigate to="/"></Navigate> } />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/secret-dashboard" element={user?.role === "admin" ? <AdminPage></AdminPage> : <Login></Login>}/>

        </Routes>
      </div>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
