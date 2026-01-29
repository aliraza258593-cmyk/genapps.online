import { headers } from 'next/headers';
import crypto from 'crypto';

export interface LemonSqueezyWebhookPayload {
    meta: {
        event_name: 'subscription_created' | 'subscription_updated' | 'subscription_cancelled' | 'order_created';
        custom_data?: {
            user_id?: string;
        };
    };
    data: {
        id: string;
        attributes: {
            user_email: string;
            variant_name: string;
            status: string;
            renews_at: string;
            ends_at: string | null;
        };
    };
}

export async function verifyWebhookSignature(req: Request, secret: string): Promise<boolean> {
    const hmac = crypto.createHmac('sha256', secret);
    const rawBody = await req.text();
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const signature = Buffer.from(req.headers.get('X-Signature') || '', 'utf8');

    if (digest.length !== signature.length) return false;
    return crypto.timingSafeEqual(digest, signature);
}

export const getPlanFromVariant = (variantName: string): 'FREE' | 'PRO' | 'PLUS' => {
    const name = variantName.toUpperCase();
    if (name.includes('PLUS')) return 'PLUS';
    if (name.includes('PRO')) return 'PRO';
    return 'FREE';
};
