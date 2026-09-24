"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll progress bar: fixed mint bar at the very top (above the sticky nav)
 * that grows 0 → 100% as the page scrolls top → bottom.
 *
 * rAF-throttled scroll/resize listener with a transform-only update
 * (compositor-driven, no layout shift). Renders at scaleX(0) until the first
 * measurement so short pages never flash a partial bar. Reduced-motion keeps
 * it hidden; JS-disabled pages omit it entirely (no empty element).
 */
export default function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = el;
    let raf = 0;
    function update() {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`;
    }
    function schedule() {
      if (!raf) raf = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="progress-bar" />;
}
