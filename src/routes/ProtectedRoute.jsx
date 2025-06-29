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

  // Check if the user is authenticated
  if (!token || isTokenExpired(token)) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace/>;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};