import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* background gradient */}
    <div className="absolute inset-0 overflow-hidden">
  <div className="absolute inset-0">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(at_50%_75%,#ffffff,#f3f4f6,#e5e7eb)]"></div>
  </div>
</div>

      {/* main content */}
      <div className="relative z-10 p-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
