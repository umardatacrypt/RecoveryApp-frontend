import React, { useEffect } from "react";
import LoginPage from "../components/LoginPage";
import { useUser } from "../context/UserContext";

const Login: React.FC = () => {
  const { email, loggedIn } = useUser();
  useEffect(() => {
    console.log(email);
  }, []);
  return <LoginPage />;
};

export default Login;
