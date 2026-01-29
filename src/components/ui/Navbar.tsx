'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, User, LogOut } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, signInWithGoogle, signOut } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-lg border-b border-white/5' : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="relative">
                            <Sparkles className="w-8 h-8 text-blue-500 animate-pulse" />
                            <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            GenApps.online
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="#templates" className="text-gray-400 hover:text-white transition-colors">
                            Templates
                        </Link>
                        <Link href="#features" className="text-gray-400 hover:text-white transition-colors">
                            Features
                        </Link>
                        <Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                            Pricing
                        </Link>
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center space-x-3 hover:opacity-80 transition-opacity focus:outline-none"
                                >
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={user.displayName || 'User'} className="w-9 h-9 rounded-full border border-white/10" />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                                            <span className="text-blue-400 font-medium">{user.email?.[0].toUpperCase()}</span>
                                        </div>
                                    )}
                                    <span className="text-sm font-medium text-white">{user.displayName || 'User'}</span>
                                </button>

                                {/* Dropdown */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-4 w-48 glass rounded-xl border border-white/10 shadow-2xl overflow-hidden animate-fade-in py-1">
                                        <Link href="/dashboard" className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                            <User className="w-4 h-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                        <button
                                            onClick={signOut}
                                            className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 transition-colors text-left"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={signInWithGoogle}
                                    className="text-gray-300 hover:text-white font-medium transition-colors"
                                >
                                    Log In
                                </button>
                                <button
                                    onClick={signInWithGoogle}
                                    className="group relative px-6 py-2.5 rounded-xl bg-white text-black font-semibold overflow-hidden transition-all hover:scale-105"
                                >
                                    <span className="relative z-10">Get Started</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden glass border-t border-white/5 absolute top-20 left-0 right-0 p-6 animate-fade-in">
                    <div className="flex flex-col space-y-4">
                        <Link href="#templates" className="text-gray-400 hover:text-white py-2" onClick={() => setIsMobileMenuOpen(false)}>Templates</Link>
                        <Link href="#features" className="text-gray-400 hover:text-white py-2" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
                        <Link href="#pricing" className="text-gray-400 hover:text-white py-2" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>

                        <div className="border-t border-white/10 pt-4 space-y-3">
                            {user ? (
                                <>
                                    <div className="flex items-center space-x-3 mb-4">
                                        {user.photoURL && <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full" />}
                                        <span className="text-white font-medium">{user.displayName}</span>
                                    </div>
                                    <Link href="/dashboard" className="block text-center w-full py-3 rounded-xl bg-white/5 text-white border border-white/10">
                                        Dashboard
                                    </Link>
                                    <button onClick={signOut} className="block text-center w-full py-3 rounded-xl text-red-400 hover:bg-red-500/10">
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={signInWithGoogle} className="block w-full py-3 rounded-xl border border-white/10 text-white hover:bg-white/5">
                                        Log In
                                    </button>
                                    <button onClick={signInWithGoogle} className="block w-full py-3 rounded-xl bg-white text-black font-bold">
                                        Get Started Free
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
