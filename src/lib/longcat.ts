// LongCat API Client for GenApps.online

interface LongCatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface LongCatRequest {
    model: string;
    messages: LongCatMessage[];
    temperature?: number;
    max_tokens?: number;
    stream?: boolean;
}

interface LongCatResponse {
    choices: Array<{
        message: {
            content: string;
        };
    }>;
}

/**
 * Get model based on user plan
 */
export function getModelForPlan(plan: 'free' | 'pro' | 'plus'): string {
    switch (plan) {
        case 'free':
            return 'LongCat-Flash-Chat';
        case 'pro':
            return 'LongCat-Flash-Thinking';
        case 'plus':
            return 'LongCat-Flash-Thinking-2601';
        default:
            return 'LongCat-Flash-Chat';
    }
}

/**
 * System prompt that MUST be prepended to every request
 */
const SYSTEM_PROMPT = `You are a world-class frontend website generator AI. Your ONLY task is to generate complete, production-ready, visually stunning HTML websites.

CRITICAL RULES:
1. Generate ONLY frontend UI code (HTML + Tailwind CSS + vanilla JavaScript)
2. NO backend code, NO server-side logic, NO API endpoints
3. Output must be a SINGLE, complete HTML file
4. Use Tailwind CSS via CDN for styling
5. Include all JavaScript inline in <script> tags
6. Make it visually STUNNING, modern, and ultra-professional
7. Ensure mobile responsiveness
8. Use proper semantic HTML
9. Add smooth animations and micro-interactions
10. Follow modern design trends (glassmorphism, gradients, etc.)

OUTPUT FORMAT:
- Start with <!DOCTYPE html>
- Include complete <head> with meta tags, Tailwind CDN, fonts
- Well-structured <body> with semantic HTML
- Inline <script> for interactivity
- Complete, ready-to-use website

QUALITY STANDARDS:
- Professional SaaS-level quality
- Pixel-perfect layouts
- Beautiful color palettes
- Smooth transitions
- Production-ready code`;

/**
 * Auto-enhancement prompt that's appended to user input
 */
const ENHANCEMENT_PROMPT = `

RENDERING REQUIREMENTS:
- Generate a stunning, visually appealing, ultra professional website
- Beautiful modern design with premium aesthetics
- Interactive and responsive across all devices
- Production-ready complete frontend UI only
- NO backend code whatsoever
- Use Tailwind CSS for all styling
- Include smooth animations and transitions
- Make it look like a million-dollar startup website`;

/**
 * Call LongCat API to generate website
 */
export async function generateWebsite(
    userPrompt: string,
    userPlan: 'free' | 'pro' | 'plus' = 'free'
): Promise<string> {
    const model = getModelForPlan(userPlan);

    // Combine prompts
    const enhancedPrompt = userPrompt + ENHANCEMENT_PROMPT;

    const apiKeys = [
        process.env.LONGCAT_API_KEY,
        process.env.LLM_API_KEY_1,
        process.env.LLM_API_KEY_2,
        process.env.LLM_API_KEY_3,
        process.env.LLM_API_KEY_4,
        process.env.LLM_API_KEY_5,
    ].filter(Boolean);

    if (apiKeys.length === 0) {
        throw new Error('No API keys configured');
    }

    const baseUrl = process.env.LONGCAT_BASE_URL || 'https://api.longcat.chat/openai/v1/chat/completions';

    // Try each API key until one works
    for (let i = 0; i < apiKeys.length; i++) {
        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKeys[i]}`,
                },
                body: JSON.stringify({
                    model,
                    messages: [
                        {
                            role: 'system',
                            content: SYSTEM_PROMPT,
                        },
                        {
                            role: 'user',
                            content: enhancedPrompt,
                        },
                    ],
                    temperature: 0.7,
                    max_tokens: 16000,
                } as LongCatRequest),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`API key ${i + 1} failed:`, errorText);
                continue; // Try next key
            }

            const data = await response.json() as LongCatResponse;
            const generatedCode = data.choices[0]?.message?.content;

            if (!generatedCode) {
                throw new Error('No content in response');
            }

            return generatedCode;
        } catch (error) {
            console.error(`Error with API key ${i + 1}:`, error);
            if (i === apiKeys.length - 1) {
                // Last key failed, throw error
                throw new Error('All API keys failed. Please try again later.');
            }
            // Continue to next key
        }
    }

    throw new Error('Failed to generate website');
}

/**
 * Extract HTML from code blocks if present
 */
export function extractHTML(content: string): string {
    // Remove markdown code blocks if present
    const codeBlockRegex = /```html\n?([\s\S]*?)```/;
    const match = content.match(codeBlockRegex);

    if (match) {
        return match[1].trim();
    }

    // If no code block, check if it starts with <!DOCTYPE or <html
    if (content.trim().startsWith('<!DOCTYPE') || content.trim().startsWith('<html')) {
        return content.trim();
    }

    // Otherwise return as-is
    return content;
}
