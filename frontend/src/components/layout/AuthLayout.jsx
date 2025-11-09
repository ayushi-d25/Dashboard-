import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Spinner } from "../ui/Spinner";
import { ROUTES } from "../../utils/constants";
import { ThemeToggle } from "../ThemeToggle";

export const AuthLayout = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-accent/5">
        <Spinner size="lg" />
      </div>
    );
  }

  if (user) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 p-4 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm relative z-10 animate-scale-in">
        {children}
      </div>
    </div>
  );
};
