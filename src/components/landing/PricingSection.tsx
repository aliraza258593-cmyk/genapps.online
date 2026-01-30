'use client';

import React from 'react';
import { Check, Zap, Crown, Sparkles } from 'lucide-react';

interface Plan {
    id: string;
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    icon: React.ReactNode;
    popular?: boolean;
    ctaText: string;
    gradient: string;
}

const plans: Plan[] = [
    {
        id: 'free',
        name: 'Free',
        price: '$0',
        period: 'forever',
        description: 'Perfect for trying out GenApps',
        features: [
            '5 daily free credits',
            '1 generation per session',
            'LongCat-Flash-Chat model',
            'Basic templates access',
            'Watermark included',
            'Community support',
        ],
        icon: <Sparkles className="w-6 h-6" />,
        ctaText: 'Get Started Free',
        gradient: 'from-gray-500 to-gray-600',
    },
    {
        id: 'pro',
        name: 'Pro',
        price: '$9',
        period: '/month',
        description: 'For serious creators and developers',
        features: [
            'Unlimited UI generations',
            'Advanced AI models (Thinking)',
            'No watermark',
            'Faster generation speed',
            'GitHub integration',
            'Instant deployment',
            'Priority support',
            'All templates',
        ],
        icon: <Zap className="w-6 h-6" />,
        popular: true,
        ctaText: 'Upgrade to Pro',
        gradient: 'from-primary to-secondary',
    },
    {
        id: 'plus',
        name: 'Plus',
        price: '$29',
        period: '/month',
        description: 'For teams and power users',
        features: [
            'Everything in Pro',
            'Highest priority queue',
            'Fastest builds (Thinking-2601)',
            'Advanced templates',
            'Custom domain export',
            'API access',
            'Team collaboration',
            'Dedicated support',
            'White-label option',
        ],
        icon: <Crown className="w-6 h-6" />,
        ctaText: 'Upgrade to Plus',
        gradient: 'from-amber-500 to-orange-600',
    },
];

export default function PricingSection() {
    return (
        <section id="pricing" className="relative py-24">
            <div className="container px-6">
                {/* Header */}
                <div className="text-center space-y-4 mb-16 animate-fade-in">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-border">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Simple Pricing</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold">
                        Choose Your <span className="gradient-text">Plan</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Start free, upgrade when you need more power. No hidden fees.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={plan.id}
                            className={`relative rounded-3xl p-8 border transition-all hover:scale-105 animate-fade-in ${plan.popular
                                ? 'glass border-primary shadow-2xl shadow-primary/20'
                                : 'glass border-border'
                                }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <div className="px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            <div className="space-y-6">
                                {/* Icon & Name */}
                                <div className="space-y-4">
                                    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${plan.gradient}`}>
                                        <div className="text-white">{plan.icon}</div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="flex items-baseline">
                                    <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                                    <span className="ml-2 text-muted-foreground">{plan.period}</span>
                                </div>

                                {/* CTA Button */}
                                <button
                                    className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular
                                        ? 'bg-gradient-to-r from-primary to-secondary text-white hover:scale-105'
                                        : 'bg-muted text-foreground hover:bg-muted/80'
                                        }`}
                                >
                                    {plan.ctaText}
                                </button>

                                {/* Features */}
                                <div className="space-y-3 pt-6 border-t border-border">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-start space-x-3">
                                            <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-muted-foreground">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ or Additional Info */}
                <div className="mt-16 text-center">
                    <p className="text-muted-foreground">
                        All plans include access to our core AI generation features.{' '}
                        <a href="#" className="text-primary hover:underline">
                            View detailed comparison
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
