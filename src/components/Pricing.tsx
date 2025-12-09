import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for trying out your first companion',
      features: [
        'One companion character',
        'Basic focus timer',
        'Task tracking (up to 10 tasks)',
        'Daily mood check-ins',
        'Community access',
      ],
      cta: 'Try for Free',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$8',
      period: '/ month',
      description: 'For serious productivity enthusiasts',
      features: [
        'Unlimited companion characters',
        'Advanced focus modes & analytics',
        'Unlimited tasks & projects',
        'Custom companion personalities',
        'Priority support',
        'Exclusive companion accessories',
        'Export your data anytime',
      ],
      cta: 'Start 14-day Free Trial',
      popular: true,
    },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-gradient-to-br from-[#F5F1E8]/30 to-[#A78BFA]/5">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you're ready. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-1 border-2 ${
                plan.popular
                  ? 'border-[#A78BFA]'
                  : 'border-border/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <Button
                size="lg"
                className={`w-full rounded-full mb-8 ${
                  plan.popular
                    ? 'shadow-lg hover:shadow-xl bg-[#A78BFA] hover:bg-[#9678E8]'
                    : ''
                }`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                {plan.cta}
              </Button>

              <div className="space-y-4">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.popular ? 'bg-[#A78BFA]/20' : 'bg-[#5EEAD4]/20'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.popular ? 'text-[#A78BFA]' : 'text-[#5EEAD4]'}`} />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          All plans include a 14-day money-back guarantee. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
