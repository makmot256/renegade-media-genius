
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useToast } from "@/components/ui/use-toast";

declare global {
  interface Window {
    ethereum?: any;
  }
}

type WalletInfo = {
  address: string;
  balance: string;
  chainId: string;
  provider: ethers.BrowserProvider;
};

type Web3ContextType = {
  wallet: WalletInfo | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isWalletConnected: boolean;
  switchNetwork: (chainId: string) => Promise<void>;
};

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  // Check if wallet was previously connected
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            await updateWalletInfo(provider);
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };

    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length === 0) {
          setWallet(null);
          toast({
            title: "Wallet Disconnected",
            description: "Your wallet has been disconnected",
          });
        } else {
          const provider = new ethers.BrowserProvider(window.ethereum);
          await updateWalletInfo(provider);
        }
      };

      const handleChainChanged = async () => {
        if (wallet) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          await updateWalletInfo(provider);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [wallet, toast]);

  const updateWalletInfo = async (provider: ethers.BrowserProvider) => {
    try {
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();

      setWallet({
        address,
        balance: ethers.formatEther(balance),
        chainId: network.chainId.toString(),
        provider,
      });
    } catch (error) {
      console.error('Error updating wallet info:', error);
      throw error;
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast({
        title: "Wallet Not Found",
        description: "Please install MetaMask or another Web3 wallet",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      await updateWalletInfo(provider);

      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected",
      });
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  const switchNetwork = async (targetChainId: string) => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${parseInt(targetChainId).toString(16)}` }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        toast({
          title: "Network Not Added",
          description: "Please add this network to your wallet manually",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Network Switch Failed",
          description: error.message || "Failed to switch network",
          variant: "destructive",
        });
      }
    }
  };

  const value = {
    wallet,
    isConnecting,
    connectWallet,
    disconnectWallet,
    isWalletConnected: !!wallet,
    switchNetwork,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};
