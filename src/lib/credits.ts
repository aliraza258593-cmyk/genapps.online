import { doc, getDoc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export const DAILY_FREE_CREDITS = 5;

/**
 * Check if user has enough credits to generate
 */
export async function checkCredits(userId: string): Promise<boolean> {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) return false;

        const data = userSnap.data();

        // Check for Pro/Plus plan
        if (data.plan === 'pro' || data.plan === 'plus') {
            return true; // Unlimited generations
        }

        // Check last reset time for free credits
        const lastReset = data.lastCreditReset?.toDate();
        const now = new Date();

        // Reset credits if it's a new day (UTC)
        if (!lastReset || !isSameDay(lastReset, now)) {
            await updateDoc(userRef, {
                credits: DAILY_FREE_CREDITS,
                lastCreditReset: serverTimestamp(),
            });
            return true;
        }

        return (data.credits || 0) > 0;
    } catch (error) {
        console.error('Error checking credits:', error);
        return false;
    }
}

/**
 * Deduct one credit from user
 */
export async function deductCredit(userId: string): Promise<void> {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) return;

        const data = userSnap.data();

        // Don't deduct for paid plans
        if (data.plan === 'pro' || data.plan === 'plus') return;

        await updateDoc(userRef, {
            credits: increment(-1),
        });
    } catch (error) {
        console.error('Error deducting credit:', error);
    }
}

/**
 * Helper to check if two dates are same day (UTC)
 */
function isSameDay(d1: Date, d2: Date): boolean {
    return (
        d1.getUTCDate() === d2.getUTCDate() &&
        d1.getUTCMonth() === d2.getUTCMonth() &&
        d1.getUTCFullYear() === d2.getUTCFullYear()
    );
}
