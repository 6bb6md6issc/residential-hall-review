import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";
import { useEffect } from "react";

const LogoutPage = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    handleLogout()
  }, [])

  return (
    <>
      LogoutPage
      <div className="h-screen bg-amber-200"></div>
    </>
  );
};

export default LogoutPage;