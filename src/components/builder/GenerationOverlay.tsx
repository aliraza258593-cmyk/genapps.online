'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, Zap, Code, Rocket, Terminal, Cpu, Layout } from 'lucide-react';

interface GenerationOverlayProps {
    isOpen: boolean;
    onComplete?: (html: string) => void;
    onError?: (error: string) => void;
}

const statusMessages = [
    { icon: Sparkles, text: 'Analyzing your prompt...', progress: 10, detail: "Deconstructing requirements..." },
    { icon: Terminal, text: 'Architecting solution...', progress: 20, detail: "Planning component structure..." },
    { icon: Code, text: 'Writing semantics...', progress: 40, detail: "Generating HTML5 boilerplate..." },
    { icon: Layout, text: 'Designing layout...', progress: 60, detail: "Calculating responsive grid..." },
    { icon: Zap, text: 'Applying polish...', progress: 80, detail: "Injecting Tailwind utilities..." },
    { icon: Rocket, text: 'Finalizing build...', progress: 95, detail: "Optimizing assets & scripts..." },
];

export default function GenerationOverlay({ isOpen, onComplete, onError }: GenerationOverlayProps) {
    const [progress, setProgress] = useState(0);
    const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        if (!isOpen) {
            setProgress(0);
            setCurrentStatusIndex(0);
            setLogs([]);
            return;
        }

        // Add log entry helper
        const addLog = (msg: string) => {
            setLogs(prev => [...prev.slice(-4), `[${new Date().toLocaleTimeString().split(' ')[0]}] ${msg}`]);
        };

        const duration = 30000; // 30 seconds
        const interval = 100;
        const steps = duration / interval;
        const increment = 100 / steps;

        let currentProgress = 0;

        addLog("Initializing LongCat AI engine...");

        const timer = setInterval(() => {
            currentProgress += increment;

            if (currentProgress >= 100) {
                setProgress(100);
                clearInterval(timer);
                addLog("Build complete. Rendering preview...");
                setTimeout(() => {
                    if (onComplete) {
                        onComplete('<html>...</html>');
                    }
                }, 800);
            } else {
                setProgress(currentProgress);

                const nextIndex = statusMessages.findIndex(
                    (msg, idx) => {
                        const nextMsg = statusMessages[idx + 1];
                        return currentProgress >= msg.progress && (!nextMsg || currentProgress < nextMsg.progress);
                    }
                );

                if (nextIndex !== -1 && nextIndex !== currentStatusIndex) {
                    setCurrentStatusIndex(nextIndex);
                    addLog(statusMessages[nextIndex].detail);
                }
            }
        }, interval);

        return () => clearInterval(timer);
    }, [isOpen, currentStatusIndex, onComplete]);

    if (!isOpen) return null;

    const CurrentIcon = statusMessages[currentStatusIndex]?.icon || Sparkles;

    return (
        <div className="fixed inset-0 z-[9999] bg-[#050507]/95 backdrop-blur-2xl flex items-center justify-center">
            <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
            </div>

            <div className="relative z-10 w-full max-w-xl mx-4">
                <div className="glass-card rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl overflow-hidden relative">
                    {/* Top Shine */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <div className="flex flex-col items-center text-center space-y-8">
                        {/* Icon */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full" />
                            <div className="relative w-20 h-20 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-center backdrop-blur-md">
                                <CurrentIcon className="w-10 h-10 text-white animate-pulse" />
                            </div>
                        </div>

                        {/* Text */}
                        <div className="space-y-2">
                            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                                {statusMessages[currentStatusIndex]?.text || 'Generating...'}
                            </h2>
                            <p className="text-sm font-mono text-blue-400">
                                {logs[logs.length - 1] || "Waiting for context..."}
                            </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full space-y-2">
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-100 ease-out relative"
                                    style={{ width: `${progress}%` }}
                                >
                                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]" />
                                </div>
                            </div>
                            <div className="flex justify-between text-xs text-white/30 font-mono">
                                <span>{Math.round(progress)}%</span>
                                <span>{Math.max(0, 30 - Math.round(progress * 0.3))}s remaining</span>
                            </div>
                        </div>

                        {/* Terminal Logs (Mini) */}
                        <div className="w-full bg-black/50 rounded-lg p-3 text-xs font-mono text-left space-y-1 h-24 overflow-hidden border border-white/5 text-gray-400">
                            {logs.map((log, i) => (
                                <div key={i} className="animate-fade-in text-white/70">
                                    <span className="text-green-500">➜</span> {log}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
