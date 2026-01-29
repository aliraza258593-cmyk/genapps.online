import { initializeApp, getApps, cert, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// You should place your service account JSON in a secure location or use env vars
// For Vercel, usage of specific env vars (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY) is common.

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // Handle private key newlines for Vercel/Env
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

export const initAdmin = () => {
    if (!getApps().length) {
        // Only initialize if we have the credentials. 
        // If not, we might be in a build step or missing config (handle gracefully or throw).
        if (serviceAccount.projectId && serviceAccount.privateKey) {
            initializeApp({
                credential: cert(serviceAccount)
            });
        } else {
            console.warn("Firebase Admin Service Account not found. Admin features will fail.");
        }
    }
    return getApp();
}

// Lazy load db/auth to ensure app is init first (usually calling initAdmin() at top of API route helps)
// But to be safe, we can export logic that inits on demand.
// Easier pattern: Just init at top level if possible, but Next.js hot reload can be tricky.

// Ensure init
const app = initAdmin();
const adminDb = getFirestore(app);
const adminAuth = getAuth(app);

export { adminDb, adminAuth };
