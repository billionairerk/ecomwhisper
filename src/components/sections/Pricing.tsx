
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, X, Crown, Zap, Building, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annually: number;
  };
  savings?: number;
  features: PlanFeature[];
  icon: React.ReactNode;
  popular?: boolean;
  cta: string;
  badge?: string;
}

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  const plans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'For early-stage businesses and startups with limited needs',
      price: {
        monthly: 19.99,
        annually: 199,
      },
      savings: 40,
      features: [
        { name: 'Product research', included: true },
        { name: 'Basic competitor tracking', included: true },
        { name: 'Basic analytics dashboard', included: true },
        { name: '50 research queries / month', included: true },
        { name: 'Competitor alerts', included: true },
        { name: 'Advanced analytics', included: false },
        { name: 'API access', included: false },
        { name: 'Custom reports', included: false },
      ],
      icon: <Sparkles className="w-5 h-5" />,
      cta: 'Start Free Trial',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For growing businesses requiring more comprehensive tools',
      price: {
        monthly: 49.99,
        annually: 499,
      },
      savings: 100,
      features: [
        { name: 'Everything in Basic', included: true },
        { name: 'Full competitor analysis', included: true },
        { name: 'Detailed market insights', included: true },
        { name: 'Basic automation tools', included: true },
        { name: '200 research queries / month', included: true },
        { name: 'Content monitoring', included: true },
        { name: 'API access', included: false },
        { name: 'Custom reports', included: false },
      ],
      icon: <Zap className="w-5 h-5" />,
      popular: true,
      cta: 'Get Started',
      badge: 'Most Popular',
    },
    {
      id: 'advanced',
      name: 'Advanced',
      description: 'For scaling businesses that need comprehensive tools',
      price: {
        monthly: 99.99,
        annually: 999,
      },
      savings: 200,
      features: [
        { name: 'Everything in Pro', included: true },
        { name: 'Unlimited research queries', included: true },
        { name: 'Full competitor tracking', included: true },
        { name: 'In-depth customer insights', included: true },
        { name: 'Advanced marketing automation', included: true },
        { name: 'Ad campaign tracking', included: true },
        { name: 'API access', included: true },
        { name: 'Custom reports', included: false },
      ],
      icon: <Crown className="w-5 h-5" />,
      cta: 'Upgrade Now',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Tailored for large businesses with specialized needs',
      price: {
        monthly: 249.99,
        annually: 2499,
      },
      savings: 600,
      features: [
        { name: 'Everything in Advanced', included: true },
        { name: 'Unlimited everything', included: true },
        { name: 'Custom reports', included: true },
        { name: 'Priority support', included: true },
        { name: 'Personalized consulting', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'SLA guarantees', included: true },
      ],
      icon: <Building className="w-5 h-5" />,
      cta: 'Contact Sales',
      badge: 'Enterprise',
    },
  ];

  const addOns = [
    {
      id: 'analytics',
      name: 'Advanced Analytics',
      description: 'Get deeper insights into your market and competitors',
      price: 19.99,
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 21H3V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 7L14 14L10 10L3 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    },
    {
      id: 'insights',
      name: 'Business Insights',
      description: 'Personalized recommendations for your specific business',
      price: 49.99,
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16V21M12 16L18 20M12 16L6 20M12 3V8M12 8L6 4M12 8L18 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    },
    {
      id: 'automation',
      name: 'Marketing Automation',
      description: 'Automate marketing tasks based on market insights',
      price: 29.99,
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 6V4M10 6V4M8 14H12M16 14H14M8 10H16M3 10V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V10M3 10V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V10M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    },
  ];

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };
  
  return (
    <section id="pricing" className="py-20 px-6 md:px-10 relative overflow-hidden dark">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0,transparent_70%)] z-0"></div>
      <div className="absolute inset-0 bg-noise opacity-30 z-0"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full filter blur-[100px] animate-pulse-soft"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-violet-600/10 rounded-full filter blur-[120px] animate-pulse-soft animation-delay-1000"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/30 text-blue-400 mb-6"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Flexible Pricing</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold font-display mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-violet-400">
              Choose Your Competitive Edge
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-zinc-300 mb-8 max-w-3xl mx-auto"
          >
            Simple, transparent pricing that grows with you. No hidden fees. Cancel anytime.
          </motion.p>
          
          {/* Billing Toggle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center mb-10 space-x-4"
          >
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-zinc-400'}`}>
              Monthly
            </span>
            <div className="relative">
              <Switch
                checked={billingCycle === 'annually'}
                onCheckedChange={(checked) => setBillingCycle(checked ? 'annually' : 'monthly')}
                className="bg-zinc-800 data-[state=checked]:bg-blue-600"
              />
              <span className="absolute -top-6 right-0 transform translate-x-5 bg-blue-600 text-xs font-bold text-white px-2 py-1 rounded-full">
                Save up to 20%
              </span>
            </div>
            <span className={`text-sm font-medium ${billingCycle === 'annually' ? 'text-white' : 'text-zinc-400'}`}>
              Annually
            </span>
          </motion.div>
        </div>
        
        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={variants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="flex flex-col h-full"
            >
              <Card className={`relative overflow-hidden h-full ${
                plan.popular 
                  ? 'border-blue-500/50 bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-lg shadow-blue-500/10' 
                  : 'border-zinc-800 bg-zinc-900/90'
              }`}>
                {plan.badge && (
                  <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-md">
                    {plan.badge}
                  </span>
                )}
                
                <CardHeader className="pt-8 pb-4">
                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-full mr-3 ${
                      plan.popular ? 'bg-blue-600/20 text-blue-500' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {plan.icon}
                    </div>
                    <CardTitle className="text-xl font-display">{plan.name}</CardTitle>
                  </div>
                  <CardDescription className="text-sm text-zinc-400 min-h-[40px]">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pb-4">
                  <div className="mb-6">
                    <div className="flex items-end">
                      <span className="text-3xl font-bold">$</span>
                      <span className="text-5xl font-bold">
                        {billingCycle === 'monthly' 
                          ? Math.floor(plan.price.monthly) 
                          : Math.floor(plan.price.annually / 12)}
                      </span>
                      <span className="text-xl text-zinc-400 mb-1">
                        {billingCycle === 'monthly' 
                          ? `.${(plan.price.monthly % 1).toFixed(2).substring(2)}`
                          : ''}
                      </span>
                      <span className="text-lg text-zinc-400 ml-1 mb-1">/mo</span>
                    </div>
                    
                    {billingCycle === 'annually' && (
                      <div className="mt-1 flex items-center text-sm text-zinc-400">
                        <span className="line-through mr-2">${plan.price.monthly.toFixed(2)}/mo</span>
                        <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                          Save ${plan.savings}
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-zinc-500 mr-3 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-zinc-300' : 'text-zinc-500'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="pt-4 mt-auto">
                  <Button 
                    className={`w-full gap-2 ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-glow shadow-blue-600/20' 
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                    }`}
                  >
                    {plan.cta}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Add-ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold font-display mb-6 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              Power Up With Add-ons
            </span>
          </h3>
          <p className="text-center text-zinc-400 mb-10 max-w-2xl mx-auto">
            Customize your plan with powerful add-ons that give you exactly what you need
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addOns.map((addon, i) => (
              <motion.div
                key={addon.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={variants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <Card className="border-zinc-800 bg-zinc-900/90 hover:border-zinc-700 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full mr-3 bg-zinc-800 text-zinc-400">
                          {addon.icon}
                        </div>
                        <CardTitle className="text-lg">{addon.name}</CardTitle>
                      </div>
                      <div className="text-lg font-bold">
                        ${addon.price}<span className="text-sm text-zinc-400">/mo</span>
                      </div>
                    </div>
                    <CardDescription className="mt-2 text-zinc-400">
                      {addon.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800 text-zinc-300">
                      Add to Plan
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-bold font-display mb-6 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              Frequently Asked Questions
            </span>
          </h3>
          
          <div className="space-y-6 mt-8">
            {[
              {
                q: "Can I change plans later?",
                a: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes to your subscription will take effect immediately."
              },
              {
                q: "Is there a free trial?",
                a: "Yes, we offer a 14-day free trial on all plans. No credit card required to start."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
              },
              {
                q: "Can I get a refund?",
                a: "We offer a 30-day money-back guarantee if you're not satisfied with our service."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-lg"
              >
                <h4 className="text-lg font-medium mb-2">{item.q}</h4>
                <p className="text-zinc-400">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
