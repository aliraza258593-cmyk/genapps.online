'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Zap, Code } from 'lucide-react';

interface HeroSectionProps {
    onGenerate?: (prompt: string) => void;
}

export default function HeroSection({ onGenerate }: HeroSectionProps) {
    const [inputVal, setInputVal] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputVal.trim()) {
            onGenerate?.(inputVal);
        }
    };

    const examples = [
        "Portfolio for a photographer",
        "SaaS landing page like Linear",
        "E-commerce store for sneakers"
    ];

    if (!mounted) return null;

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-32 gap-6">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-subtle" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-subtle delay-1000" />
            </div>

            <div className="container relative z-10 px-4 text-center mt-12">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 animate-fade-in backdrop-blur-sm">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs font-medium text-white/80 tracking-wide uppercase">AI Website Builder V2.2</span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-slide-up leading-normal">
                    Build <span className="gradient-text">Stunning Websites</span> <br />
                    In Seconds with AI
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '200ms' }}>
                    Describe your dream website and watch it come to life instantly.
                    Production-ready code, zero configuration.
                </p>

                {/* Input Area */}
                <div className="w-full max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '400ms' }}>
                    <form onSubmit={handleSubmit} className="relative group z-20">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-70 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative flex items-center bg-[#0a0a0f] border border-white/10 rounded-xl p-2 shadow-2xl">
                            <input
                                type="text"
                                value={inputVal}
                                onChange={(e) => setInputVal(e.target.value)}
                                placeholder="Describe your website (e.g. 'A futuristic landing page for a crypto startup')..."
                                className="flex-1 bg-transparent border-none outline-none text-white px-4 py-4 text-lg placeholder:text-gray-500"
                            />
                            <button
                                type="submit"
                                disabled={!inputVal.trim()}
                                className="bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium px-8 py-4 rounded-lg flex items-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <Zap className="w-5 h-5 fill-current" />
                                Build
                            </button>
                        </div>
                    </form>

                    {/* Examples */}
                    <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-gray-400">
                        <span>Try:</span>
                        {examples.map((ex, i) => (
                            <button
                                key={i}
                                onClick={() => setInputVal(ex)}
                                className="hover:text-white transition-colors border-b border-dashed border-gray-600 hover:border-white pb-0.5"
                            >
                                "{ex}"
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3D Visual/Demo Area */}
                <div className="mt-20 relative w-full max-w-5xl mx-auto aspect-[16/9] animate-float">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl -z-10" />
                    <div className="w-full h-full glass-card rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
                        {/* Mock Browser Header */}
                        <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            <div className="flex-1 text-center text-xs text-white/30 font-mono">genapps.online/preview</div>
                        </div>
                        {/* Mock Content */}
                        <div className="flex-1 bg-[#050507] p-8 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1 opacity-[0.03]">
                                {Array.from({ length: 400 }).map((_, i) => (
                                    <div key={i} className="aspect-square bg-white" />
                                ))}
                            </div>
                            <div className="text-center space-y-4 z-10">
                                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                                    <Code className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Production Ready Code</h3>
                                <p className="text-gray-400 max-w-sm mx-auto">
                                    Generate React components, Tailwind styles, and fully responsive layouts instantly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
