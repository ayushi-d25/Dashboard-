import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Spinner } from "../ui/Spinner";
import { ROUTES } from "../../utils/constants";

export const UserProtectedWrapper = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  return <Outlet />;
};
