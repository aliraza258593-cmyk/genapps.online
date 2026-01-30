import { initializeApp, getApps, cert, getApp, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

let app: App | undefined;

export const initAdmin = () => {
    if (!app) {
        if (getApps().length) {
            app = getApp();
        } else if (serviceAccount.projectId && serviceAccount.privateKey) {
            app = initializeApp({
                credential: cert(serviceAccount)
            });
        }
    }
    return app;
}

export const getAdminDb = () => {
    const app = initAdmin();
    if (!app) throw new Error("Firebase Admin not initialized: Missing credentials");
    return getFirestore(app);
}

export const getAdminAuth = () => {
    const app = initAdmin();
    if (!app) throw new Error("Firebase Admin not initialized: Missing credentials");
    return getAuth(app);
}
