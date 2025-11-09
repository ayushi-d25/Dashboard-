import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { getErrorMessage } from "../../utils/validators";
import { CheckSquare } from "lucide-react";

export default function AuthPage() {
  const { login, signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    const emailError = getErrorMessage("Email", loginForm.email);
    const passwordError = getErrorMessage("Password", loginForm.password);
    
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    try {
      await login(loginForm);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    const nameError = getErrorMessage("Name", signupForm.name);
    const emailError = getErrorMessage("Email", signupForm.email);
    const passwordError = getErrorMessage("Password", signupForm.password);
    
    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    try {
      await signup(signupForm);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/30 via-primary/10 to-primary/5 hover:scale-110 transition-all duration-500 hover:rotate-6 cursor-pointer shadow-2xl hover:shadow-primary/30 group">
            <CheckSquare className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700">
              TaskFlow
            </h1>
            <p className="text-muted-foreground animate-in fade-in slide-in-from-bottom-3 duration-700 delay-100">
              Manage your tasks with elegance
            </p>
          </div>
        </div>

        <Card className="glass-card border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200">
          <CardHeader className="space-y-3 pb-6">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription className="text-base">Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50 backdrop-blur-sm">
                <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-300"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

            <TabsContent value="login" className="mt-6">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    disabled={isLoading}
                    className="h-11 transition-all duration-300"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-300">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-sm font-medium">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    disabled={isLoading}
                    className="h-11 transition-all duration-300"
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-300">{errors.password}</p>
                  )}
                </div>

                {errors.submit && (
                  <p className="text-sm text-destructive text-center animate-in fade-in slide-in-from-top-1 duration-300">{errors.submit}</p>
                )}

                <Button type="submit" className="w-full h-11 text-base shadow-lg hover:shadow-xl transition-all duration-300" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-6">
              <form onSubmit={handleSignup} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-sm font-medium">Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={signupForm.name}
                    onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                    disabled={isLoading}
                    className="h-11 transition-all duration-300"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-300">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                    disabled={isLoading}
                    className="h-11 transition-all duration-300"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-300">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    disabled={isLoading}
                    className="h-11 transition-all duration-300"
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-300">{errors.password}</p>
                  )}
                </div>

                {errors.submit && (
                  <p className="text-sm text-destructive text-center animate-in fade-in slide-in-from-top-1 duration-300">{errors.submit}</p>
                )}

                <Button type="submit" className="w-full h-11 text-base shadow-lg hover:shadow-xl transition-all duration-300" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
