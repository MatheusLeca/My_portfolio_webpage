"use client";

import { useEffect, useRef } from "react";

type VantaEffect = {
  destroy: () => void;
  /** Normalized clock Vanta advances (~60 units per wall-clock second). */
  t?: number;
  onUpdate?: () => void;
  starsGeometry?: {
    attributes: {
      position: {
        array: Float32Array;
        needsUpdate: boolean;
      };
    };
    computeVertexNormals?: () => void;
  };
  linesMesh?: {
    rotation: { x: number; y: number; z: number };
  };
  camera: {
    position: {
      set: (x: number, y: number, z: number) => void;
      x: number;
      y: number;
      z: number;
    };
    lookAt?: (x: number, y: number, z: number) => void;
    tx: number;
    ty: number;
    tz: number;
  };
};

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
 * Vanta DOTS drives its idle motion with fixed per-frame increments (dot
 * bob `y += 0.1 * sin(...)`, line rotations `+= 0.002`, camera lerp `0.003`),
 * so a 120/144Hz panel applies ~2x the increments per second of a 60Hz
 * panel and the field visibly rushes on high-refresh — typically
 * high-resolution — displays. Rewriting the motion as a pure function of
 * Vanta's normalized clock (`t` advances ~60 units per wall-clock second at
 * any refresh rate) keeps one second of motion identical on every display
 * while staying smooth on fast panels.
 */
function makeSpeedResolutionIndependent(effect: VantaEffect) {
  const geometry = effect.starsGeometry;
  if (!geometry) return;
  const position = geometry.attributes.position;
  const live = position.array;
  const base = Float32Array.from(live);
  const lines = effect.linesMesh;
  const linesBase = lines
    ? { x: lines.rotation.x, y: lines.rotation.y, z: lines.rotation.z }
    : null;
  // Baseline the normalized clock at install so the absolute formulas below
  // continue from the exact live pose: zero visible jump on mount or theme
  // re-init (the constructor already ran one stock frame before we patch).
  const t0 = effect.t ?? 0;
  let prevT = t0;

  effect.onUpdate = () => {
    const t = effect.t ?? 0;
    const dt = Math.max(0, t - prevT);
    prevT = t;
    for (let e = 0; e < live.length; e += 3) {
      const phase = 0.02 * base[e + 2] + 0.015 * base[e];
      // Closed form of the stock cumulative `y += 0.1 * sin(phase + .02t)`:
      // same ~5-unit bob, continuous from the install pose, purely
      // time-driven so 60Hz and 144Hz agree exactly.
      live[e + 1] =
        base[e + 1] +
        5 * (Math.cos(phase + 0.02 * t0) - Math.cos(phase + 0.02 * t));
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals?.();
    if (lines && linesBase) {
      lines.rotation.z = linesBase.z + 0.002 * (t - t0);
      lines.rotation.x = linesBase.x + 0.0008 * (t - t0);
      lines.rotation.y = linesBase.y + 0.0005 * (t - t0);
    }
    // Frame-rate-independent exponential approach (no-op while snapped with
    // mouse controls off; kept exact for future option changes).
    const camera = effect.camera;
    const k = dt > 0 ? 1 - Math.pow(1 - 0.003, dt) : 0;
    camera.position.x += (camera.tx - camera.position.x) * k;
    camera.position.y += (camera.ty - camera.position.y) * k;
    camera.position.z += (camera.tz - camera.position.z) * k;
    camera.lookAt?.(0, 0, 0);
  };
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
      const created = DOTS({
        el,
        THREE,
        ...DOT_OPTIONS,
        ...THEMES[currentTheme()],
      }) as VantaEffect;
      effect = created;
      // Fixed per-frame increments run faster on fast panels: re-drive the
      // idle motion from Vanta's normalized clock so speed is identical at
      // 60Hz, 120Hz, 144Hz+ and on any pixel density.
      makeSpeedResolutionIndependent(created);
      // Skip the multi-second camera dolly-in: the intro ease factor is
      // hardcoded in Vanta, while the dot shimmer is independent idle
      // motion. Snapping to the target starts at the final composition
      // with the idle animation untouched.
      created.camera.position.set(
        created.camera.tx,
        created.camera.ty,
        created.camera.tz,
      );
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
