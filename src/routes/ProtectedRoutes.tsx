import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }: { children: any }) => {
  const { user } = useAuth();
  console.log(user);
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
