import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { JWT_TOKEN } from "../components/constant";
import { useLocalStorage } from "./useLocalstorage";
import { getLocalstorageData } from "../utils/localStorageHelper";

type AuthContextType = {
  user: string | null;
  token: string | null;
  login: any;
  logout: any;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: null,
  logout: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage(JWT_TOKEN, null);

  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data: any) => {
    const { token, email } = data;
    const bCode = getLocalstorageData("bucode");
    setUser(email);
    setToken(token);
    if (bCode) {
      navigate(`/${bCode}`);
    } else {
      navigate("/");
    }
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    setToken(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
