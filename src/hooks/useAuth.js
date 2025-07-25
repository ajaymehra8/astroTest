"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    console.log(isLoggedIn);
    setLoading(false);
  }, []);
 
  const login = (token) => {
    localStorage.setItem("token", token);
    console.log("working");
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access context
export const useAuth = () => useContext(AuthContext);
