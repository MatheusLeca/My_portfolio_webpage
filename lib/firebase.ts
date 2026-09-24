/**
 * Firebase client init (Analytics only).
 *
 * Client-only: `firebase/analytics` needs `window`, so this module must
 * only load from a `"use client"` component inside `useEffect`. `isSupported`
 * guard skips SSR, non-browser contexts, and browsers blocking analytics.
 * Config ships via NEXT_PUBLIC_* env so no secret lands in git.
 */

import { getApp, getApps, initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import {
  getFunctions,
  httpsCallable,
  type Functions,
  type HttpsCallable,
} from "firebase/functions";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import type { ContactPayload } from "@/lib/contact";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const FIREBASE_REGION = "us-central1";
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

let analytics: Analytics | null = null;
let initStarted = false;
let appCheckStarted = false;
let functions: Functions | null = null;
let contactSender: HttpsCallable<ContactPayload, { ok: true }> | null = null;

function getFirebaseApp() {
  if (getApps().length === 0) initializeApp(firebaseConfig);
  return getApp();
}

/** Idempotent: safe to call from StrictMode double-effect. */
export async function initFirebaseAnalytics(): Promise<void> {
  if (initStarted || typeof window === "undefined") return;
  initStarted = true;
  if (!firebaseConfig.apiKey || !firebaseConfig.appId) return;
  if (getApps().length === 0) initializeApp(firebaseConfig);
  if ((await isSupported()) === false) return;
  analytics = getAnalytics();
}

/**
 * Initializes App Check before callable requests when a site key is configured.
 * Without a site key every enforced call is rejected server-side, so warn loudly.
 */
export function initFirebaseAppCheck(): void {
  if (appCheckStarted || typeof window === "undefined") return;
  appCheckStarted = true;
  if (!RECAPTCHA_SITE_KEY) {
    console.warn(
      "[firebase] NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set; App Check cannot initialize and contact submissions will be rejected.",
    );
    return;
  }
  initializeAppCheck(getFirebaseApp(), {
    provider: new ReCaptchaV3Provider(RECAPTCHA_SITE_KEY),
    isTokenAutoRefreshEnabled: true,
  });
}

export function getFirebaseFunctions(): Functions {
  if (functions) return functions;
  functions = getFunctions(getFirebaseApp(), FIREBASE_REGION);
  return functions;
}

/** Memoized callable for the contact function; uses limited-use App Check tokens. */
export function getContactSender(): HttpsCallable<ContactPayload, { ok: true }> {
  if (contactSender) return contactSender;
  contactSender = httpsCallable<ContactPayload, { ok: true }>(
    getFirebaseFunctions(),
    "sendContactMessage",
    { limitedUseAppCheckTokens: true },
  );
  return contactSender;
}

export function getFirebaseAnalytics(): Analytics | null {
  return analytics;
}
