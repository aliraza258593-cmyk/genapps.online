'use client';

import React, { useState } from 'react';
import { ExternalLink, Download, Share2, X, Github, Loader2 } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';

interface PreviewFrameProps {
    html: string;
    isOpen: boolean;
    onClose?: () => void;
    showWatermark?: boolean;
}

export default function PreviewFrame({ html, isOpen, onClose, showWatermark = false }: PreviewFrameProps) {
    const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const [isDeploying, setIsDeploying] = useState(false);
    const { user } = useAuth();

    if (!isOpen) return null;

    const handleOpenInNewTab = () => {
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    };

    const handleDownload = () => {
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'generated-website.html';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleGitHubDeploy = async () => {
        if (!user) {
            alert('Please login to publish to GitHub');
            return;
        }

        const accessToken = prompt("Please enter your GitHub Personal Access Token (Repo scope):");
        if (!accessToken) return;

        setIsDeploying(true);
        try {
            const idToken = await user.getIdToken();
            const repoName = `genapps-${Date.now()}`;

            const res = await fetch('/api/github/deploy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({
                    repoName,
                    htmlContent: html,
                    accessToken
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Deployment failed');

            alert(`Successfully published to GitHub! \nRepo: ${data.repoUrl}`);
            window.open(data.repoUrl, '_blank');

        } catch (error) {
            console.error(error);
            alert(error instanceof Error ? error.message : 'Failed to deploy');
        } finally {
            setIsDeploying(false);
        }
    };

    const handleShare = () => {
        // TODO: Implement share functionality
        alert('Share functionality coming soon!');
    };

    const viewportSizes = {
        desktop: 'w-full',
        tablet: 'w-[768px]',
        mobile: 'w-[375px]',
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-[#050507]/95 backdrop-blur-xl animate-fade-in">
            <div className="h-full flex flex-col">
                {/* Toolbar */}
                <div className="glass border-b border-white/10 p-4">
                    <div className="container mx-auto flex items-center justify-between">
                        {/* Left: View Mode Toggles */}
                        <div className="flex items-center space-x-2 bg-white/5 p-1 rounded-lg border border-white/5">
                            {(['desktop', 'tablet', 'mobile'] as const).map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === mode
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        } capitalized`}
                                >
                                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Center: Title */}
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-semibold text-white">Preview</h2>
                        </div>

                        {/* Right: Action Buttons */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleGitHubDeploy}
                                disabled={isDeploying}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#24292e] hover:bg-[#2f363d] text-white transition-colors border border-white/10"
                                title="Publish to GitHub"
                            >
                                {isDeploying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />}
                                <span className="text-sm font-medium">Publish</span>
                            </button>

                            <div className="w-px h-6 bg-white/10 mx-2" />

                            <button
                                onClick={handleOpenInNewTab}
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                title="Open in new tab"
                            >
                                <ExternalLink className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleDownload}
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                title="Download HTML"
                            >
                                <Download className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleShare}
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                title="Share"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors ml-2"
                                title="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview Area */}
                <div className="flex-1 overflow-auto bg-[#0a0a0f] p-8 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-[radial-gradient(#1f1f2e_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

                    <div className={`${viewportSizes[viewMode]} transition-all duration-500 ease-in-out h-full max-h-[90vh]`}>
                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-white/10 h-full">
                            {/* Browser Mockup Header */}
                            <div className="h-8 bg-[#f1f3f5] border-b border-[#e1e4e8] flex items-center px-4 gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <div className="bg-white text-[10px] text-gray-500 px-3 py-1 rounded w-64 text-center border border-[#e1e4e8] shadow-sm font-mono truncate">
                                        genapps-preview.vercel.app
                                    </div>
                                </div>
                            </div>

                            <iframe
                                srcDoc={html}
                                className="w-full h-[calc(100%-32px)] bg-white"
                                title="Generated Website Preview"
                                sandbox="allow-scripts allow-forms allow-popups allow-same-origin"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
