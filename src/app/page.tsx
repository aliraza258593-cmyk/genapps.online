'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import HeroSection from '@/components/landing/HeroSection';
import TemplatesSection from '@/components/landing/TemplatesSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import PricingSection from '@/components/landing/PricingSection';
import GenerationOverlay from '@/components/builder/GenerationOverlay';
import PreviewFrame from '@/components/builder/PreviewFrame';
import { useAuth } from '@/components/auth/AuthProvider'; // Import Auth Context

export default function HomePage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHTML, setGeneratedHTML] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth(); // Get user from context

  const handleGenerate = async (userPrompt: string) => {
    // 1. Check if user is logged in
    if (!user) {
      // Scroll to pricing or open login modal
      // For now, simple alert or simpler UX: open login (but we don't have a modal yet).
      // Let's redirect to login or show error.
      setError('Please login or sign up to generate a website.');
      // Ideally, we can trigger the Navbar login flow or redirect.
      window.location.href = '/auth/login';
      return;
    }

    setPrompt(userPrompt);
    setIsGenerating(true);
    setError('');

    try {
      // 2. Get ID Token
      const idToken = await user.getIdToken();

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}` // Pass Token
        },
        body: JSON.stringify({
          prompt: userPrompt,
          // userPlan is now determined server-side from token
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate website');
      }

      // Wait for overlay animation to complete (30 seconds)
      setTimeout(() => {
        setGeneratedHTML(data.html);
        setIsGenerating(false);
        setShowPreview(true);
      }, 30000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsGenerating(false);
    }
  };

  const handleTemplateSelect = (templatePrompt: string) => {
    setPrompt(templatePrompt);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setGeneratedHTML('');
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection onGenerate={handleGenerate} />
      <TemplatesSection onTemplateSelect={handleTemplateSelect} />
      <FeaturesSection />
      <PricingSection />
      <Footer />

      {/* Generation Overlay */}
      <GenerationOverlay isOpen={isGenerating} />

      {/* Preview Frame */}
      <PreviewFrame
        html={generatedHTML}
        isOpen={showPreview}
        onClose={handleClosePreview}
        showWatermark={true} // Logic will verify based on server response usually, but for now true is safe default/fallback
      />

      {/* Error Display */}
      {error && (
        <div className="fixed bottom-8 right-8 z-[9999] glass border border-red-500/50 p-4 rounded-xl animate-slide-up shadow-2xl">
          <p className="text-red-400 font-medium">{error}</p>
        </div>
      )}
    </main>
  );
}
