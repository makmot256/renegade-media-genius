
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useWeb3 } from "@/contexts/Web3Context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Check, Zap, Crown, Wallet, CreditCard } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const PricingPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { isWalletConnected, wallet } = useWeb3();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState<string | null>(null);

  const plans = [
    {
      id: "free",
      name: "Free Plan",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      icon: Zap,
      features: [
        "5 AI content generations per month",
        "Basic analytics",
        "Standard support",
        "Basic deepfake detection"
      ],
      popular: false,
      buttonText: "Current Plan",
      disabled: true
    },
    {
      id: "monthly",
      name: "Monthly Pro",
      price: "$15",
      period: "per month",
      description: "For regular content creators",
      icon: Crown,
      features: [
        "Unlimited AI content generation",
        "Advanced analytics & insights",
        "Priority support",
        "Advanced deepfake detection",
        "AR content creation",
        "Content scheduling",
        "Social media integration"
      ],
      popular: true,
      buttonText: "Start Monthly Plan",
      disabled: false
    },
    {
      id: "yearly",
      name: "Yearly Pro",
      price: "$150",
      period: "per year",
      originalPrice: "$180",
      savings: "Save $30",
      description: "Best value for professionals",
      icon: Crown,
      features: [
        "Everything in Monthly Pro",
        "2 months free",
        "Advanced API access",
        "Custom integrations",
        "Dedicated account manager",
        "White-label options"
      ],
      popular: false,
      buttonText: "Start Yearly Plan",
      disabled: false
    }
  ];

  const handlePayment = async (planId: string, paymentMethod: 'card' | 'wallet') => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to subscribe to a plan",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === 'wallet' && !isWalletConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to pay with crypto",
        variant: "destructive",
      });
      return;
    }

    setLoading(planId);

    try {
      if (paymentMethod === 'card') {
        // Stripe payment integration
        const { data, error } = await supabase.functions.invoke('create-subscription', {
          body: { 
            planId,
            priceId: planId === 'monthly' ? 'price_monthly_15' : 'price_yearly_150'
          }
        });

        if (error) throw error;

        if (data?.url) {
          window.open(data.url, '_blank');
        }
      } else {
        // Wallet payment integration
        const amount = planId === 'monthly' ? '0.01' : '0.1'; // ETH equivalent
        
        if (wallet?.provider) {
          const signer = await wallet.provider.getSigner();
          const tx = await signer.sendTransaction({
            to: '0x742d35Cc6635C0532925a3b8D6C2f94AD0e4B16b', // Your payment wallet
            value: parseFloat(amount) * 1e18, // Convert to wei
          });
          
          toast({
            title: "Payment Initiated",
            description: `Transaction hash: ${tx.hash}`,
          });
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 neon-text">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Unlock the full potential of AI-powered content creation with our flexible pricing plans
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.id} className={`cyber-card relative ${plan.popular ? 'border-renegade-green shadow-lg shadow-renegade-green/20' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-renegade-green text-black">
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-renegade-green/20 rounded-full w-fit">
                <plan.icon className="h-8 w-8 text-renegade-green" />
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-base">{plan.description}</CardDescription>
              
              <div className="mt-4">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                {plan.originalPrice && (
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-sm text-muted-foreground line-through">{plan.originalPrice}</span>
                    <Badge variant="secondary" className="text-xs">{plan.savings}</Badge>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-renegade-green flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.disabled ? (
                <Button disabled className="w-full">
                  {plan.buttonText}
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button
                    onClick={() => handlePayment(plan.id, 'card')}
                    disabled={loading === plan.id}
                    className="w-full bg-renegade-green hover:bg-renegade-green/80 text-black"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    {loading === plan.id ? "Processing..." : "Pay with Card"}
                  </Button>
                  
                  <Button
                    onClick={() => handlePayment(plan.id, 'wallet')}
                    disabled={loading === plan.id}
                    variant="outline"
                    className="w-full border-renegade-green/50 text-renegade-green hover:bg-renegade-green/10"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Pay with Wallet
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
          <div>
            <h3 className="font-semibold mb-2">Can I change my plan anytime?</h3>
            <p className="text-sm text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time from your dashboard.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-sm text-muted-foreground">We accept all major credit cards and cryptocurrency payments through Web3 wallets.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Is there a free trial?</h3>
            <p className="text-sm text-muted-foreground">Our free plan gives you access to basic features. No credit card required to get started.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
            <p className="text-sm text-muted-foreground">Yes, you can cancel your subscription at any time. No long-term commitments required.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
