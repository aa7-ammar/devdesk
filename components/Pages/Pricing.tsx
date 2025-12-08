
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button'; 

export default function Pricing() {
  const tiers = [
    {
      name: "Hobby",
      price: "$0",
      period: "/mo",
      description: "Perfect for side projects and learning.",
      features: [
        "50 Code Snippets",
        "Basic Task Management",
        "Community Support",
        "7-day History"
      ],
      cta: "Start for Free",
      variant: "outline",
    },
    {
      name: "Pro",
      price: "$12",
      period: "/mo",
      description: "The standard for serious developers.",
      features: [
        "Unlimited Snippets",
        "AI Assistant Access (GPT-4)",
        "Priority Support",
        "Advanced Analytics",
        "Private Knowledge Base"
      ],
      cta: "Get Started",
      variant: "default", 
      popular: true,
    },
    {
      name: "Team",
      price: "Custom",
      period: "",
      description: "For organizations and large squads.",
      features: [
        "SSO (Okta/Google)",
        "Centralized Billing",
        "Dedicated Instance",
        "SLA Guarantee",
        "Audit Logs"
      ],
      cta: "Contact Sales",
      variant: "outline",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="pricing">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Fair pricing for developers.
          </h2>
          <p className="text-muted-foreground text-lg">
            Simple, transparent pricing. No hidden fees. 
            Upgrade as you scale.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {tiers.map((tier, index) => (
            <div 
              key={index}
              className={`
                relative flex flex-col rounded-2xl border p-8 shadow-sm transition-all duration-300
                ${tier.popular 
                  ? 'bg-background/80 border-indigo-500/50 shadow-[0_0_40px_rgba(99,102,241,0.15)] md:scale-105 z-10' 
                  : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'
                }
              `}
            >
              {/* "Most Popular" Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-500 text-white text-xs font-medium rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Card Header */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-foreground mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                  {tier.period && <span className="text-muted-foreground">{tier.period}</span>}
                </div>
                <p className="text-sm text-muted-foreground">
                  {tier.description}
                </p>
              </div>

              {/* Features List */}
              <ul className="flex-1 space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className={`
                      flex items-center justify-center h-5 w-5 rounded-full 
                      ${tier.popular ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/10 text-white/60'}
                    `}>
                      <Check className="h-3 w-3" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button 
                className={`w-full ${tier.popular ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
                variant={tier.variant as "default" | "outline"}
                size="lg"
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include a 14-day trial of Pro features. No credit card required to start.
          </p>
        </div>

      </div>
    </section>
  );
}