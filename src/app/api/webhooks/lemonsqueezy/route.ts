import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature, LemonSqueezyWebhookPayload, getPlanFromVariant } from '@/lib/lemonsqueezy';
import { adminDb } from '@/lib/firebase-admin'; // We need admin SDK for backend writes
import { headers } from 'next/headers';

// Note: You need to set up firebase-admin.ts if not already present
// For now, we will assume a placeholder or simple logic if admin SDK isn't ready.
// Actually, using Client SDK on server is tricky for privileged writes.
// Let's assume we will use a direct update or a separate admin helper.

export async function POST(req: NextRequest) {
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

    if (!secret) {
        return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    // Verify signature
    // Note: In Next.js, reading stream might consume it.
    // Ideally we clone it or handle it carefully. use clone()
    const valid = await verifyWebhookSignature(req.clone(), secret);
    if (!valid) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = await req.json() as LemonSqueezyWebhookPayload;
    const { event_name, custom_data } = payload.meta;
    const userId = custom_data?.user_id;

    if (!userId) {
        // If no user_id passed in custom_data during checkout, we can't link it easily.
        // We might try matching by email.
        return NextResponse.json({ message: 'No user_id found, skipping' }, { status: 200 });
    }

    // Logic to update user in DB
    try {
        if (event_name === 'subscription_created' || event_name === 'subscription_updated') {
            const plan = getPlanFromVariant(payload.data.attributes.variant_name);

            // TODO: Update Firebase User
            // await adminDb.collection('users').doc(userId).update({ plan, credits: 9999 }); 
            console.log(`[Webhook] Updating user ${userId} to plan ${plan}`);
        } else if (event_name === 'subscription_cancelled') {
            // await adminDb.collection('users').doc(userId).update({ plan: 'FREE' });
            console.log(`[Webhook] User ${userId} cancelled subscription`);
        }
    } catch (error) {
        console.error('Webhook processing error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    return NextResponse.json({ received: true });
}
