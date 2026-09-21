"use client";

import { useEffect, useRef } from "react";

type VantaEffect = { destroy: () => void };
type DotsInit = (opts: Record<string, unknown>) => VantaEffect;

const DOT_OPTIONS = {
  mouseControls: false,
  touchControls: false,
  gyroControls: false,
  showLines: false,
  size: 3.0,
  spacing: 35.0,
  scale: 1.0,
  scaleMobile: 1.0,
  minHeight: 200.0,
  minWidth: 200.0,
  backgroundAlpha: 0,
} as const;

// Dot colors follow the theme tokens (primary + strong). The canvas is
// transparent so the themed page background shows through untouched.
const THEMES = {
  dark: { color: 0x5eead4, color2: 0x2dd4bf },
  light: { color: 0x0e7490, color2: 0x155e75 },
} as const;

function currentTheme(): keyof typeof THEMES {
  if (typeof document === "undefined") return "dark";
  const stored = document.documentElement.dataset.theme;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function motionAllowed(): boolean {
  return (
    typeof window !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Full-page Vanta DOTS field behind all content. Transparent canvas over the
 * themed page background; destroyed and recreated with the matching palette
 * whenever the theme changes. Never initializes under reduced motion.
 */
export default function AnimatedBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let effect: VantaEffect | null = null;
    let cancelled = false;
    let seq = 0;

    async function init() {
      const my = ++seq;
      // Tearing down first covers the runtime reduced-motion switch:
      // enabling it mid-visit must stop, not just skip, the effect.
      effect?.destroy();
      effect = null;
      if (!motionAllowed()) return;
      // three rides a dynamic import so ~600KB stays out of the initial
      // bundle. UMD default import: `import *` shakes out to an interop
      // wrapper with no PerspectiveCamera.
      // Sequential awaits are load-bearing: Vanta captures window.THREE
      // when its module first evaluates, so the global must be set BEFORE
      // the vanta import below runs. Promise.all would race evaluation.
      const { default: THREE } = await import("three/build/three.min.js");
      (window as unknown as { THREE: unknown }).THREE = THREE;
      const { default: DOTS } = await import("vanta/dist/vanta.dots.min");
      if (cancelled || my !== seq) return;
      effect = (DOTS as DotsInit)({
        el,
        THREE,
        ...DOT_OPTIONS,
        ...THEMES[currentTheme()],
      });
    }

    init();
    const observer = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.attributeName === "data-theme")) init();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onSystemChange = () => init();
    media.addEventListener("change", onSystemChange);
    motion.addEventListener("change", onSystemChange);
    return () => {
      cancelled = true;
      observer.disconnect();
      media.removeEventListener("change", onSystemChange);
      motion.removeEventListener("change", onSystemChange);
      effect?.destroy();
      delete (window as unknown as { THREE?: unknown }).THREE;
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
