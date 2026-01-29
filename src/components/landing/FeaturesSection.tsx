'use client';

import React from 'react';
import { Zap, Code, Rocket, Shield, Globe, Sparkles } from 'lucide-react';

const features = [
    {
        icon: <Zap className="w-6 h-6" />,
        title: 'Lightning Fast',
        description: 'Generate complete websites in 30 seconds or less with our optimized AI pipeline.',
        gradient: 'from-yellow-500 to-orange-500',
    },
    {
        icon: <Code className="w-6 h-6" />,
        title: 'Production Ready',
        description: 'Clean, semantic HTML/CSS/JS code that\'s ready to deploy instantly.',
        gradient: 'from-blue-500 to-cyan-500',
    },
    {
        icon: <Rocket className="w-6 h-6" />,
        title: 'One-Click Deploy',
        description: 'Push to GitHub and deploy to Vercel in one click. No configuration needed.',
        gradient: 'from-purple-500 to-pink-500',
    },
    {
        icon: <Shield className="w-6 h-6" />,
        title: 'Secure & Private',
        description: 'Your prompts and generated code are encrypted and never shared.',
        gradient: 'from-green-500 to-emerald-500',
    },
    {
        icon: <Globe className="w-6 h-6" />,
        title: 'Fully Responsive',
        description: 'Every website is mobile-first and looks perfect on all devices.',
        gradient: 'from-indigo-500 to-purple-500',
    },
    {
        icon: <Sparkles className="w-6 h-6" />,
        title: 'AI-Powered',
        description: 'Advanced AI models understand context and generate pixel-perfect designs.',
        gradient: 'from-pink-500 to-rose-500',
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="relative py-24 bg-muted/30">
            <div className="container px-6">
                {/* Header */}
                <div className="text-center space-y-4 mb-16 animate-fade-in">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-border">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Why Choose Us</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold">
                        Powerful <span className="gradient-text">Features</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to build stunning websites with AI, from concept to deployment.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="relative group glass rounded-2xl p-8 hover:border-primary transition-all animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative space-y-4">
                                {/* Icon */}
                                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.gradient}`}>
                                    <div className="text-white">{feature.icon}</div>
                                </div>

                                {/* Content */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-foreground">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
