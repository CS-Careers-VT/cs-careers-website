import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import env from '@config/env';

const firebaseConfig = {
    apiKey: env.fbApiKey,
    authDomain: env.fbAuthDomain,
    projectId: env.fbProjectId,
    storageBucket: env.fbStorageBucket,
    messagingSenderId: env.fbMessagingSenderId,
    appId: env.fbAppId,
    measurementId: env.fbMeasurementId,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };