import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
    console.log("AuthProvider: ", axios.defaults.headers)
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children 
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};




export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;