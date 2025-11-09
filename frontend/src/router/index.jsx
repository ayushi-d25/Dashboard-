import { Routes, Route, Navigate } from "react-router-dom";
import { UserProtectedWrapper } from "../components/wrappers/UserProtectedWrapper";
import { AuthLayout } from "../components/layout/AuthLayout";
import AuthPage from "../pages/Auth/AuthPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import { ROUTES } from "../utils/constants";

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.AUTH}
        element={
          <AuthLayout>
            <AuthPage />
          </AuthLayout>
        }
      />

      <Route element={<UserProtectedWrapper />}>
        <Route path={ROUTES.HOME} element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
};
