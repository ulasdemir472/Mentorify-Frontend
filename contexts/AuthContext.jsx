"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value) => {},
  user: {},
  setUser: (value) => {},
  loading: true,
  setLoading: (value) => {},
  token: "",
  setToken: (value) => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(
    Cookies.get("session-user") !== undefined
      ? JSON.parse(Cookies.get("session-user"))
      : {}
  );
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = Cookies.get("session-user");
    const storedToken = Cookies.get("token");
    if ((storedUser && storedToken) !== undefined) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setToken(storedToken);
      setIsAuthenticated(true);
      console.log("AUTH USER: ", user);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        token,
        setToken,
        loading,
        setLoading,
      }}
    >
      {loading ? <></> : children}
    </AuthContext.Provider>
  );
};
