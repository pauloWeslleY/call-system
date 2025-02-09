import { Fragment } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loading from "../_components/loading";

export default function PrivateRoute({ children }) {
  const { userAuthenticated, loadingAuth } = useAuth();

  if (loadingAuth) {
    return <Loading message="Carregando..." />;
  }

  return userAuthenticated ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Navigate to="/" />
  );
}
