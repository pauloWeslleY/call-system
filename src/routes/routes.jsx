import { Navigate, useRoutes } from "react-router";
import { useAuth } from "../hooks/useAuth";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";
import Dashboard from "../pages/dashboard";
import Profile from "../pages/profile";
import PrivateRoute from "./private.routes";
import DashboardLayout from "../layout/dashboard-layout";
import Customers from "../pages/customers";
import CreateTicket from "../pages/create-ticket";
import UpdateTicket from "../pages/update-ticket";

export function RoutesApp() {
  const { userAuthenticated } = useAuth();

  const routes = [
    {
      path: "/sign-in",
      element: <SignIn />,
      index: true,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      ),
      children: [
        {
          path: "home",
          element: <Dashboard />,
        },
        {
          path: "create-ticket",
          element: <CreateTicket />,
        },
        {
          path: "update-ticket/:ticketId",
          element: <UpdateTicket />,
        },
        {
          path: "customers",
          element: <Customers />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to={userAuthenticated ? "/dashboard" : "/"} replace />,
    },
  ];

  return useRoutes(routes);
}
