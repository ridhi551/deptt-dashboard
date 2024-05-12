import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = () => {
  const user = useSelector((state) => state.user?.userInfo);

  return user ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
