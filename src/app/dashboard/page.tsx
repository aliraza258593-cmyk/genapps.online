'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { Sparkles, Zap, Clock, Download, ExternalLink, Plus } from 'lucide-react';

export default function DashboardPage() {
    const { user, userPlan, credits, loading } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    // Mock data for history (replace with real Firestore data)
    const history = [
        { id: 1, title: 'E-commerce Store', date: '2 mins ago', preview: '🛒' },
        { id: 2, title: 'Portfolio Site', date: '1 day ago', preview: '💼' },
        { id: 3, title: 'SaaS Landing Page', date: '2 days ago', preview: '🚀' },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container px-6 pt-32 pb-20">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back, {user.displayName}</p>
                    </div>

                    <Link
                        href="/"
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        <span>New Project</span>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Plan Card */}
                    <div className="p-6 glass rounded-2xl border border-border space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Current Plan</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${userPlan === 'pro' ? 'bg-primary/20 text-primary' :
                                    userPlan === 'plus' ? 'bg-amber-500/20 text-amber-500' :
                                        'bg-muted text-muted-foreground'
                                }`}>
                                {userPlan}
                            </span>
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="text-2xl font-bold capitalize">{userPlan} Plan</div>
                            {userPlan === 'free' && (
                                <Link href="/#pricing" className="text-sm text-primary hover:underline">
                                    Upgrade &rarr;
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Credits Card */}
                    <div className="p-6 glass rounded-2xl border border-border space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Daily Credits</span>
                            <Zap className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold">{credits} / 5</div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-yellow-500 rounded-full transition-all"
                                    style={{ width: `${(credits / 5) * 100}%` }}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">Resets at midnight UTC</p>
                        </div>
                    </div>

                    {/* Projects Card */}
                    <div className="p-6 glass rounded-2xl border border-border space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Total Projects</span>
                            <Sparkles className="w-5 h-5 text-purple-500" />
                        </div>
                        <div className="text-3xl font-bold">{history.length}</div>
                        <p className="text-xs text-muted-foreground">Generated websites</p>
                    </div>
                </div>

                {/* Recent Projects */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold">Recent Projects</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {history.map((project) => (
                            <div key={project.id} className="group glass p-6 rounded-2xl border border-border hover:border-primary transition-all">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="text-4xl">{project.preview}</div>
                                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 hover:bg-muted rounded-lg" title="Download">
                                            <Download className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-muted rounded-lg" title="Open">
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {project.date}
                                </div>
                            </div>
                        ))}

                        {/* Create New Placeholder */}
                        <Link
                            href="/"
                            className="flex flex-col items-center justify-center p-6 rounded-2xl border border-dashed border-border hover:border-primary hover:bg-muted/50 transition-all text-muted-foreground hover:text-primary space-y-2"
                        >
                            <Plus className="w-8 h-8" />
                            <span className="font-medium">Create New Website</span>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
