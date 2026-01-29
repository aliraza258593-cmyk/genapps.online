import { NextRequest, NextResponse } from 'next/server';
import { generateWebsite, extractHTML } from '@/lib/longcat';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

// Switch to Node.js runtime to support Firebase Admin SDK
// export const runtime = 'edge'; // REMOVED
export const maxDuration = 60;

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const idToken = authHeader.split('Bearer ')[1];

        // Verify User
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const userId = decodedToken.uid;

        // Fetch User Data from Firestore
        const userDoc = await adminDb.collection('users').doc(userId).get();
        const userData = userDoc.data();

        const userPlan = userData?.plan || 'free';
        const credits = userData?.credits || 0;

        // Credit/Plan Check Logic
        if (userPlan === 'free') {
            if (credits <= 0) {
                return NextResponse.json(
                    { error: 'Insufficient credits. Please upgrade to Pro.' },
                    { status: 403 }
                );
            }
        }

        const { prompt } = await request.json();

        if (!prompt || typeof prompt !== 'string') {
            return NextResponse.json(
                { error: 'Invalid prompt' },
                { status: 400 }
            );
        }

        console.log(`Generating website for user ${userId} (${userPlan}) - Credits: ${credits}`);

        // Generate website using LongCat API
        const rawContent = await generateWebsite(prompt, userPlan as 'free' | 'pro' | 'plus');

        // Extract clean HTML
        const htmlContent = extractHTML(rawContent);

        // Deduct Credit for Free Users
        if (userPlan === 'free') {
            await adminDb.collection('users').doc(userId).update({
                credits: credits - 1
            });
        }

        // Add watermark for free users
        let finalHTML = htmlContent;
        if (userPlan === 'free') {
            const watermark = `
<!-- Free User Watermark -->
<div style="position: fixed; bottom: 20px; right: 20px; z-index: 99999; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); padding: 8px 16px; border-radius: 8px; font-family: system-ui, -apple-system, sans-serif;">
  <a href="https://genapps.online" target="_blank" style="color: #fff; text-decoration: none; font-size: 12px; display: flex; align-items: center; gap: 6px;">
    <span>✨</span>
    <span>Built with GenApps.online</span>
  </a>
</div>
</body>`;
            finalHTML = htmlContent.replace('</body>', watermark);
        }

        return NextResponse.json({
            success: true,
            html: finalHTML,
            plan: userPlan,
            timestamp: new Date().toISOString(),
            remainingCredits: userPlan === 'free' ? credits - 1 : 'unlimited'
        });
    } catch (error) {
        console.error('Generation error:', error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Failed to generate website',
                details: error instanceof Error ? error.stack : undefined,
            },
            { status: 500 }
        );
    }
}
