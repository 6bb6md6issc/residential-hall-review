import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  const isTokenExpired = (token) => {
    try {
      const { exp } = jwtDecode(token);
      return exp * 1000 < Date.now(); // `exp` is in seconds
    } catch (err) {
      return true; // Consider invalid token as expired
    }
  };

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace/>;
  }

  return <Outlet />;
};