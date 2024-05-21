import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Siderbar from "./Sidebar";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = () => {
  const user = useSelector((state) => state.user?.userInfo);

  return user ? (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <Siderbar />
      <div className="flex-1 overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/auth" />
  );
};

export default ProtectedRoute;
