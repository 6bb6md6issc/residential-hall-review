import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import HomePage from "../pages/HomePage";
import HallReviewPage from "../pages/HallReviewPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import RequestResetPage from "../pages/RequestResetPage";
import ResetPage from "../pages/ResetPage";
import VerifyEmailPage from "../pages/VerifyEmailPage";
import MyReviewPage from "../pages/MyReviewPage";
import ShareReviewPage from "../pages/ShareReviewPage";
import Layout from "../layout/Layout";
import LogoutPage from "../pages/auth/LogoutPage";
import ReviewHeader from "../component/review/ReviewHeader";
import AllBuildingsPage from "../pages/AllBuildingsPage";

const Routes = () => {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: "/all-buildings",
      element: <AllBuildingsPage />,
    },
    {
      path: "/rating",
      element: <ReviewHeader />,
    },
    {
      path: "/share",
      element: <ReviewHeader />,
    },
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/rating/:buildingId",
      element: <HallReviewPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/logout",
      element: <LogoutPage />,
    },
    {
      path: "/request-reset",
      element: <RequestResetPage />,
    },
    {
      path: "/reset-password/:code",
      element: <ResetPage />,
    },
    {
      path: "/verify-account",
      element: <VerifyEmailPage />,
    },
  ];  

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/my-review",
          element: <MyReviewPage />,
        },
        {
          path: "/share/:buildingId",
          element: <ShareReviewPage />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        ...routesForPublic,
        ...routesForAuthenticatedOnly,
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;