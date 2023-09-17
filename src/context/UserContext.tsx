import React, { createContext, useContext, useEffect, useState } from "react";
import { isLoggedIn } from "../utils/jwtHelper";
import { getLocalstorageData } from "../utils/localStorageHelper";
import { JWT_TOKEN } from "../components/constant";
import jwtDecode from "jwt-decode";

type UserContextType = {
  email: string | null;
  loggedIn: boolean;
};

// Create a context for user data.
const UserContext = createContext<UserContextType>({
  email: null,
  loggedIn: false,
});

// Custom hook for accessing user context data.
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // Use the web3 context.

  // Initialize user state to hold user's account information.
  const [email, setEmail] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const checkUserLoggedIn = () => {
    if (isLoggedIn()) {
      const token = getLocalstorageData(JWT_TOKEN);
      const { email }: any = jwtDecode(token);
      console.log(email, token);
      if (email) {
        setEmail(email);
        setLoggedIn(true);
      }
    }
  };
  useEffect(() => {
    checkUserLoggedIn();
  }, []);
  return (
    <UserContext.Provider value={{ email: email, loggedIn: loggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
