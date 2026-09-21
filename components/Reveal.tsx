"use client";

import { useEffect, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";

// Layout effect on the client only: runs before paint, so hiding below-fold
// content never flashes. Falls back to a passive effect during SSR.
const useClientLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Scroll reveal wrapper. Renders visible by default so content never gets
 * stuck hidden when scripts fail; only hides (then reveals on scroll) when
 * an observer is available and motion is allowed. Reduced-motion and no-JS
 * fallbacks live in global CSS.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useClientLayoutEffect(() => {
    const el = ref.current;
    if (
      !el ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    el.dataset.reveal = "hidden";
    // Flush the hidden state before observing so in-view elements animate
    // from hidden instead of flashing visible first.
    void el.offsetHeight;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "visible";
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal="visible"
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={className}
    >
      {children}
    </div>
  );
}
