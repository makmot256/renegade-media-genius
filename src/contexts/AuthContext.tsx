
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useWeb3 } from './Web3Context';

type User = {
  principal: any; // required
  id: string;
  name: string;
  email: string;
  avatar: string;
  walletAddress?: string;
  authMethod: 'email' | 'wallet';
};


type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;                    // ✅ Add this
  setIsAuthenticated: (auth: boolean) => void;             // ✅ Add this
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithWallet: () => Promise<void>;
  logout: () => void;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const { wallet, isWalletConnected } = useWeb3();

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('renegade-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('renegade-user');
      }
    }
    setIsLoading(false);
  }, []);

  // Auto-login with wallet if connected and no other user
  useEffect(() => {
    if (isWalletConnected && wallet && !user) {
      loginWithWallet();
    }
  }, [isWalletConnected, wallet, user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      // In a real app, this would be an API call to validate credentials
      // For this demo, we'll simulate a successful login with a mock user
      if (email && password.length > 3) {
        const mockUser = {
          principal: null, // Replace with real principal if available
          id: crypto.randomUUID(), // Or hash of email, or backend-assigned
          name: email.split('@')[0],
          email,
          avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${email}`,
          authMethod: 'email' as const,
        };


        // Save user to localStorage for persistence
        localStorage.setItem('renegade-user', JSON.stringify(mockUser));
        setUser(mockUser);
        toast({
          title: "Login Successful",
          description: `Welcome back, ${mockUser.name}!`,
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithWallet = async () => {
    if (!wallet) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create user from wallet address
      const walletUser = {
        principal: null, // placeholder value
        id: `wallet_${wallet.address}`,
        name: `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`,
        email: '',
        avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${wallet.address}`,
        walletAddress: wallet.address,
        authMethod: 'wallet' as const,
      };


      // Save user to localStorage for persistence
      localStorage.setItem('renegade-user', JSON.stringify(walletUser));
      setUser(walletUser);

      toast({
        title: "Wallet Login Successful",
        description: `Welcome, ${walletUser.name}!`,
      });
    } catch (error) {
      toast({
        title: "Wallet Login Failed",
        description: "Failed to authenticate with wallet",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('renegade-user');
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  // Add setIsAuthenticated implementation
  const setIsAuthenticated = (auth: boolean) => {
    if (!auth) {
      logout();
    } else if (!user) {
      // Optionally, you could trigger a login flow here
      // For now, do nothing if user is not set
    }
  };

  const value = {
    user,
    setUser,                         // ✅ Add this
    isAuthenticated: !!user,
    setIsAuthenticated,              // ✅ Add this
    isLoading,
    login,
    loginWithWallet,
    logout,
  };


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
