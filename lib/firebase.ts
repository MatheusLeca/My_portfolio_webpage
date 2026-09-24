/**
 * Firebase client init (Analytics only).
 *
 * Client-only: `firebase/analytics` needs `window`, so this module must
 * only load from a `"use client"` component inside `useEffect`. `isSupported`
 * guard skips SSR, non-browser contexts, and browsers blocking analytics.
 * Config ships via NEXT_PUBLIC_* env so no secret lands in git.
 */

import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let analytics: Analytics | null = null;
let initStarted = false;

/** Idempotent: safe to call from StrictMode double-effect. */
export async function initFirebaseAnalytics(): Promise<void> {
  if (initStarted || typeof window === "undefined") return;
  initStarted = true;
  if (!firebaseConfig.apiKey || !firebaseConfig.appId) return;
  if (getApps().length === 0) initializeApp(firebaseConfig);
  if ((await isSupported()) === false) return;
  analytics = getAnalytics();
}

export function getFirebaseAnalytics(): Analytics | null {
  return analytics;
}
