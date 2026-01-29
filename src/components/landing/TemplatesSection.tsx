'use client';

import React, { useState } from 'react';
import { Search, Sparkles, Layout, Monitor, Smartphone, Globe } from 'lucide-react';

interface Template {
    id: string;
    name: string;
    category: string;
    description: string;
    prompt: string;
    icon: React.ReactNode;
}

const templates: Template[] = [
    {
        id: 'saas-landing',
        name: 'SaaS Landing Page',
        category: 'Business',
        description: 'High-conversion landing page for startups with pricing and features.',
        prompt: 'Create a modern SaaS landing page with a dark theme, hero section with 3D elements, features grid, pricing tables, and testimonials. Use a blue and purple color scheme.',
        icon: <Monitor className="w-6 h-6" />,
    },
    {
        id: 'portfolio-creative',
        name: 'Creative Portfolio',
        category: 'Portfolio',
        description: 'Minimalist showcase for designers and artists.',
        prompt: 'Build a minimalist creative portfolio with a masonry grid gallery, large typography, about section, and contact form. Use a black and white color scheme with subtle animations.',
        icon: <Layout className="w-6 h-6" />,
    },
    {
        id: 'ecommerce-store',
        name: 'Luxury E-commerce',
        category: 'E-commerce',
        description: 'Premium online store layout for high-end products.',
        prompt: 'Design a luxury e-commerce store with full-width hero image, product carousel, category grid, and cart drawer. Use a gold and charcoal color palette with serif fonts.',
        icon: <Globe className="w-6 h-6" />,
    },
    {
        id: 'mobile-app',
        name: 'Mobile App Showcase',
        category: 'Business',
        description: 'App download page with device mockups.',
        prompt: 'Create a mobile app landing page with phone mockups, feature carousel, download buttons, and FAQ section. Use vibrant gradients and rounded corners.',
        icon: <Smartphone className="w-6 h-6" />,
    },
    {
        id: 'dashboard-analytics',
        name: 'Analytics Dashboard',
        category: 'Dashboard',
        description: 'Data visualization admin panel.',
        prompt: 'Build an analytics dashboard with sidebar navigation, line charts, bar graphs, data tables, and user profile widget. Use a glassmorphism design style.',
        icon: <Layout className="w-6 h-6" />,
    },
    {
        id: 'blog-modern',
        name: 'Modern Blog',
        category: 'Content',
        description: 'Clean reading experience for writers.',
        prompt: 'Design a modern blog with featured post slider, article grid, newsletter signup, and author bio. Use a clean, whitespace-heavy layout with good typography.',
        icon: <Layout className="w-6 h-6" />,
    },
    {
        id: 'restaurant',
        name: 'Restaurant & Food',
        category: 'Business',
        description: 'Menu and reservation site for dining.',
        prompt: 'Create a restaurant website with parallax scrolling, menu section with images, reservation form, and map integration. Use warm, appetizing colors.',
        icon: <Globe className="w-6 h-6" />,
    },
    {
        id: 'real-estate',
        name: 'Real Estate Listings',
        category: 'Business',
        description: 'Property search and listing display.',
        prompt: 'Build a real estate website with property search filters, massive image sliders, agent cards, and virtual tour integration. Use a professional blue and white theme.',
        icon: <Monitor className="w-6 h-6" />,
    },
];

interface TemplatesSectionProps {
    onTemplateSelect?: (prompt: string) => void;
}

export default function TemplatesSection({ onTemplateSelect }: TemplatesSectionProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))];

    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <section id="templates" className="relative py-32 bg-[#050507]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="container relative z-10 px-6">
                {/* Header */}
                <div className="text-center space-y-6 mb-20 animate-slide-up">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-blue-300">Curated Inspiration</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold">
                        Start with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Template</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Don't start from scratch. Choose from our professional templates to jumpstart your next project.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 max-w-5xl mx-auto glass-card p-2 rounded-2xl animate-fade-in">
                    <div className="relative w-full md:w-auto md:min-w-[300px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Find a template..."
                            className="w-full bg-transparent border-none outline-none pl-10 pr-4 py-2 text-white placeholder:text-gray-500"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === category
                                        ? 'bg-white text-black'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {filteredTemplates.map((template, index) => (
                        <button
                            key={template.id}
                            onClick={() => onTemplateSelect?.(template.prompt)}
                            onMouseEnter={() => setHoveredId(template.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="group relative text-left h-full"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative h-full glass-card rounded-3xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 group-hover:-translate-y-1 flex flex-col gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                    <div className="text-white/80 group-hover:text-white transition-colors">
                                        {template.icon}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">{template.category}</span>
                                        {hoveredId === template.id && (
                                            <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
                                        )}
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{template.name}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        {template.description}
                                    </p>
                                </div>

                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center text-xs font-medium text-gray-500 group-hover:text-white transition-colors">
                                    <span>Use Template</span>
                                    <svg className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
