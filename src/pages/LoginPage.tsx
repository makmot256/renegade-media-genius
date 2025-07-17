
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useWeb3 } from "@/contexts/Web3Context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogIn, AlertCircle, Wallet } from "lucide-react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, loginWithWallet } = useAuth();
  const { connectWallet, isConnecting, isWalletConnected } = useWeb3();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWalletLogin = async () => {
    try {
      if (!isWalletConnected) {
        await connectWallet();
        // loginWithWallet will be called automatically after wallet connects
      } else {
        await loginWithWallet();
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Failed to connect wallet. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4 py-12">
      <div className="w-full max-w-md">
        <Card className="cyber-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials or connect your wallet to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {/* Wallet Login Section */}
            <div className="mb-6">
              <Button
                onClick={handleWalletLogin}
                disabled={isConnecting}
                className="w-full bg-renegade-green hover:bg-renegade-green/80 text-black mb-4"
                variant="default"
              >
                {isConnecting ? (
                  <div className="flex items-center">
                    <span className="animate-pulse">Connecting Wallet...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Wallet className="mr-2 h-4 w-4" />
                    {isWalletConnected ? 'Sign In with Wallet' : 'Connect Wallet'}
                  </div>
                )}
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-renegade-green/30" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="bg-renegade-dark border-renegade-green/30 focus:border-renegade-green focus:ring-renegade-green/20"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-renegade-green hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-renegade-dark border-renegade-green/30 focus:border-renegade-green focus:ring-renegade-green/20"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-renegade-green hover:bg-renegade-green/80 text-black"
                disabled={isSubmitting}
                variant="outline"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <span className="animate-pulse">Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" /> Sign In with Email
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-renegade-green hover:underline">
                Sign up
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-renegade-green/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="w-full">Google</Button>
              <Button variant="outline" className="w-full">GitHub</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
