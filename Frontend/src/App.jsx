import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import SharedLayout from "./components/Layout/SharedLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./Pages/Auth";
import AuthTabs from "./components/AuthTabs";
import GeneratorTimeTable from "./Pages/GeneratorTimeTable";
import HeroDashboard from "./components/Dashboard/HeroDashboard";
import UpdatesDashboard from "./components/Dashboard/UpdatesDashboard";
import MaterialUpload from "./components/Dashboard/MaterialUpload";
import UploadData from "./components/Dashboard/UploadData";
// import ResultDashboard from "./components/Dashboard/ResultDashboard";
axios.defaults.baseURL = "http://localhost:5000/api/v1";
const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    children: [
      {
        path: "dashboard",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <HeroDashboard />,
          },
          // {
          //   path: "results",
          //   element: <ResultDashboard />,
          // },
          {
            path: "updates",
            element: <UpdatesDashboard />,
          },
          {
            path: "timetable",
            element: <GeneratorTimeTable />,
          },
          {
            path: "materialUpload",
            element: <MaterialUpload />,
          },
          {
            path: "uploadData",
            element: <UploadData />,
          },
        ],
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "auth/:role",
        element: <AuthTabs />,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
