import { LogOut, CheckSquare } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ThemeToggle";

export const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 transition-all duration-300">
      <header className="sticky top-0 z-40 glass border-b animate-fade-in">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <CheckSquare className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
            <h1 className="text-xl font-bold text-foreground">TaskFlow</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-accent/50 backdrop-blur text-sm text-muted-foreground hidden sm:block hover:bg-accent transition-all duration-300">
              {user?.name || user?.email}
            </div>
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={logout}
              className="gap-2 hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
            >
              <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        {children}
      </main>
    </div>
  );
};
