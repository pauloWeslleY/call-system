import { Navigate, Outlet, useLocation } from "react-router";
import Header from "../../_components/header";
import styles from "./styles.module.scss";

export default function DashboardLayout() {
  const { pathname } = useLocation();

  if (["/dashboard"].includes(pathname)) {
    return <Navigate to="/dashboard/home" />;
  }

  return (
    <div className={styles.dashboardContainer}>
      <Header />

      <main className={styles.dashboardMain}>
        <Outlet />
      </main>
    </div>
  );
}
