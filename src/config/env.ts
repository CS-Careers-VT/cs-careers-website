/**
 * Environment Variables Configuration
 *
 * Vite automatically loads the .env file and exposes variables that start with the `VITE_` prefix
 * via import.meta.env. This file defines an interface to provide type safety and exports an object
 * containing your environment variables.
 *
 * For example, if you have the following in your .env file:
 *   VITE_API_URL=https://api.example.com
 *   VITE_APP_TITLE=CS Careers Club
 *
 * You can then access these variables throughout your application.
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
interface ImportMetaEnv {
    readonly VITE_FB_API_KEY: string;
    readonly VITE_FB_AUTH_DOMAIN: string;
    readonly VITE_FB_PROJECT_ID: string;
    readonly VITE_FB_STORAGE_BUCKET: string;
    readonly VITE_FB_MESSAGING_SENDER_ID: string;
    readonly VITE_FB_APP_ID: string;
    readonly VITE_FB_MEASUREMENT_ID: string;
}


interface ImportMeta {
    readonly env: ImportMetaEnv;
}
/* eslint-enable @typescript-eslint/no-unused-vars */

const env = {
    fbApiKey: import.meta.env.VITE_FB_API_KEY,
    fbAuthDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
    fbProjectId: import.meta.env.VITE_FB_PROJECT_ID,
    fbStorageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
    fbMessagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
    fbAppId: import.meta.env.VITE_FB_APP_ID,
    fbMeasurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
}

export default env;