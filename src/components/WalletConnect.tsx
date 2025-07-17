
import React, { useState } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Wallet, Copy, ExternalLink, ChevronDown, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const NETWORK_NAMES: { [key: string]: string } = {
  '1': 'Ethereum Mainnet',
  '137': 'Polygon',
  '56': 'BSC',
  '43114': 'Avalanche',
  '250': 'Fantom',
  '11155111': 'Sepolia Testnet',
  '80001': 'Mumbai Testnet',
};

export const WalletConnect: React.FC = () => {
  const { wallet, isConnecting, connectWallet, disconnectWallet, isWalletConnected, switchNetwork } = useWeb3();
  const { toast } = useToast();
  const [showFullAddress, setShowFullAddress] = useState(false);

  const formatAddress = (address: string) => {
    if (showFullAddress) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Address copied to clipboard",
    });
  };

  const openInExplorer = (address: string, chainId: string) => {
    const explorers: { [key: string]: string } = {
      '1': 'https://etherscan.io/address/',
      '137': 'https://polygonscan.com/address/',
      '56': 'https://bscscan.com/address/',
      '11155111': 'https://sepolia.etherscan.io/address/',
    };

    const baseUrl = explorers[chainId] || 'https://etherscan.io/address/';
    window.open(`${baseUrl}${address}`, '_blank');
  };

  if (!isWalletConnected) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </CardTitle>
          <CardDescription>
            Connect your Web3 wallet to access blockchain features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={connectWallet} 
            disabled={isConnecting}
            className="w-full bg-renegade-green hover:bg-renegade-green/80 text-black"
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Supports MetaMask, WalletConnect, and other Web3 wallets
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Connected
          </span>
          <Badge variant="secondary" className="bg-renegade-green/20 text-renegade-green">
            {NETWORK_NAMES[wallet?.chainId || '1'] || `Chain ${wallet?.chainId}`}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Address</label>
          <div className="flex items-center justify-between p-2 bg-muted rounded-md">
            <span 
              className="font-mono text-sm cursor-pointer"
              onClick={() => setShowFullAddress(!showFullAddress)}
            >
              {formatAddress(wallet?.address || '')}
            </span>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(wallet?.address || '')}
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openInExplorer(wallet?.address || '', wallet?.chainId || '1')}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Balance</label>
          <div className="p-2 bg-muted rounded-md">
            <span className="font-mono text-sm">
              {parseFloat(wallet?.balance || '0').toFixed(4)} ETH
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-1">
                Switch Network
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Select Network</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Object.entries(NETWORK_NAMES).map(([chainId, name]) => (
                <DropdownMenuItem
                  key={chainId}
                  onClick={() => switchNetwork(chainId)}
                  disabled={wallet?.chainId === chainId}
                >
                  {name}
                  {wallet?.chainId === chainId && (
                    <Badge variant="secondary" className="ml-2 text-xs">Current</Badge>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            onClick={disconnectWallet}
            variant="outline"
            className="flex-1"
          >
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
