import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocalStorage } from "../context/useLocalstorage";
import { setLocalstorageData } from "../utils/localStorageHelper";

export const ProtectedRoute = ({ children }: { children: any }) => {
  const { user } = useAuth();
  const location = useLocation();
  const bucode = location.pathname.replace("/", "");

  console.log(user);
  if (!user) {
    if (bucode) {
      setLocalstorageData({ key: "bucode", value: bucode });
    }

    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
