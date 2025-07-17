
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useWeb3 } from "@/contexts/Web3Context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, LogOut, User, Settings, Wallet } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { wallet, isWalletConnected, disconnectWallet } = useWeb3();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    if (isWalletConnected) {
      disconnectWallet();
    }
  };

  return (
    <nav className="sticky top-0 bg-renegade-dark/95 backdrop-blur-md border-b border-renegade-green/30 z-50 light:bg-white/95 light:border-renegade-green/20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl text-renegade-green neon-text">RENEGADE</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="nav-text text-foreground hover:text-renegade-green transition-colors font-medium">
            Home
          </Link>
          <Link to="/features" className="nav-text text-foreground hover:text-renegade-green transition-colors font-medium">
            Features
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="nav-text text-foreground hover:text-renegade-green transition-colors font-medium">
              Dashboard
            </Link>
          )}
          <Link to="/about" className="nav-text text-foreground hover:text-renegade-green transition-colors font-medium">
            About
          </Link>
          
          {/* Add Theme Toggle */}
          <ThemeToggle />

          {/* Wallet Status */}
          {isWalletConnected && (
            <Badge variant="secondary" className="bg-renegade-green/20 text-renegade-green">
              <Wallet className="mr-1 h-3 w-3" />
              {wallet?.address.slice(0, 6)}...{wallet?.address.slice(-4)}
            </Badge>
          )}

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9 border border-renegade-green/50">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-renegade-green/20 text-renegade-green">
                      {user?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dropdown-content w-56" align="end">
                <DropdownMenuLabel className="dropdown-item">My Account</DropdownMenuLabel>
                {user?.authMethod === 'wallet' && (
                  <>
                    <DropdownMenuSeparator />
                    <div className="px-2 py-1.5 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Wallet className="h-3 w-3" />
                        <span className="font-mono">{user.walletAddress?.slice(0, 8)}...{user.walletAddress?.slice(-6)}</span>
                      </div>
                    </div>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="dropdown-item" onClick={() => window.location.href = '/profile'}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="dropdown-item" onClick={() => window.location.href = '/dashboard'}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="dropdown-item" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="space-x-2">
              <Link to="/login">
                <Button variant="outline" className="border-renegade-green/50 text-renegade-green hover:bg-renegade-green/10 font-medium">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-renegade-green text-black hover:bg-renegade-green/80 font-medium">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground hover:bg-background"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            <Link to="/" className="nav-text p-2 hover:bg-secondary rounded-md font-medium" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/features" className="nav-text p-2 hover:bg-secondary rounded-md font-medium" onClick={() => setMobileMenuOpen(false)}>
              Features
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="nav-text p-2 hover:bg-secondary rounded-md font-medium" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
            )}
            <Link to="/about" className="nav-text p-2 hover:bg-secondary rounded-md font-medium" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            
            {isAuthenticated ? (
              <Button
                variant="outline"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="border-renegade-green/50 text-renegade-green font-medium"
              >
                Log out
              </Button>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-renegade-green/50 text-renegade-green font-medium">Login</Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-renegade-green text-black font-medium">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
