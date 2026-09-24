"use client";

import { useEffect } from "react";
import { initFirebaseAnalytics } from "@/lib/firebase";

/** Mounts Firebase Analytics once, client-side only. No UI. */
export default function FirebaseAnalytics() {
  useEffect(() => {
    initFirebaseAnalytics();
  }, []);
  return null;
}
