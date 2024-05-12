import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import SharedLayout from "./components/Layout/SharedLayout";
import Home from "./Pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./Pages/Auth";
import AuthTabs from "./components/AuthTabs";
axios.defaults.baseURL = "http://localhost:5000/api/v1";
const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "",
        element: <ProtectedRoute />,
        children: [
          {
            path: "classes",
            // element: <ClassPage />,
          },
          {
            path: "class/:id",
            // element: <IndividualClass />,
          },
          {
            path: "account",
            // element: <AccountPage />,
          },
        ],
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
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
