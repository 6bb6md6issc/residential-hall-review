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

  // const checkAndRemoveExpiredToken = () => {
  //   try {
  //     if (!token) return false;

  //     const { exp } = jwtDecode(token);
  //     if (exp < Date.now() / 1000) {
  //       localStorage.removeItem("token");
  //       delete axios.defaults.headers.common["Authorization"];
  //       setToken(null);
  //       return true;
  //     }
  //     return false;
  //   } catch (error) {
  //     localStorage.removeItem("token");
  //     delete axios.defaults.headers.common["Authorization"];
  //     setToken(null);
  //     console.error("Invalid token:", error);
  //     return true;
  //   }
  // };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      // checkAndRemoveExpiredToken
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