import { Navigate, useLocation } from "react-router";
import { AuthProvider } from "./contexts/authentication-context";
import { RoutesApp } from "./routes/routes";

function App() {
  const { pathname } = useLocation();

  if (["/"].includes(pathname)) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <AuthProvider>
      <RoutesApp />
    </AuthProvider>
  );
}

export default App;
