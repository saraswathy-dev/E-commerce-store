import { useUserStore } from "../stores/useUserStore";
import { Navigate } from "react-router-dom";
import { Loader } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const { user, checkingAuth } = useUserStore();

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin w-20 h-20 text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
