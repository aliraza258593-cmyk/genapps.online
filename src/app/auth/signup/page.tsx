'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Github, Zap } from 'lucide-react';

export default function SignupPage() {
    const { signInWithGoogle, signInWithGithub, user } = useAuth();
    const router = useRouter();
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleGithubLogin = async () => {
        try {
            await signInWithGithub();
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="w-full max-w-md p-8 glass rounded-2xl border border-border relative z-10 animate-fade-in">
                <div className="text-center space-y-4 mb-8">
                    <Link href="/" className="inline-flex items-center space-x-2">
                        <Zap className="w-8 h-8 text-primary" />
                        <span className="text-2xl font-bold gradient-text">GenApps.online</span>
                    </Link>
                    <h1 className="text-2xl font-bold">Create Account</h1>
                    <p className="text-muted-foreground">Join thousands of creators building with AI</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg text-error text-sm">
                        {error}
                    </div>
                )}

                {/* Free Credits Badge */}
                <div className="mb-6 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20 flex items-center justify-center space-x-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Get 5 free credits daily</span>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-white text-black hover:bg-gray-100 rounded-xl transition-all font-medium"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span>Sign up with Google</span>
                    </button>

                    <button
                        onClick={handleGithubLogin}
                        className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-[#24292F] text-white hover:bg-[#24292F]/90 rounded-xl transition-all font-medium"
                    >
                        <Github className="w-5 h-5" />
                        <span>Sign up with GitHub</span>
                    </button>
                </div>

                <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                    <p>
                        Already have an account?{' '}
                        <Link href="/auth/login" className="text-primary hover:underline font-medium">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
