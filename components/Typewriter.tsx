"use client";

import { useEffect, useState } from "react";

// Terminal-style typewriter for the hero's first title line. Types one
// character at a time behind a blinking block caret (--primary mint), then
// retires the caret shortly after the line completes so the hero settles
// into a static state. Reduced-motion users get the full line instantly
// with no caret; screen readers and crawlers always see the complete text
// via the sr-only copy (the visual span is aria-hidden).
const START_DELAY_MS = 550; // Lands just as the hero Reveal fade finishes.
const CHAR_MS = 90;
const CARET_RETIRE_MS = 1800;

export default function Typewriter({ text }: { text: string }) {
  const [count, setCount] = useState(0);
  const [caretGone, setCaretGone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Deferred a tick so state never sets synchronously inside an effect.
      const skip = setTimeout(() => {
        setCount(text.length);
        setCaretGone(true);
      }, 0);
      return () => clearTimeout(skip);
    }
    let interval: ReturnType<typeof setInterval> | undefined;
    let retire: ReturnType<typeof setTimeout> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            clearInterval(interval);
            retire = setTimeout(() => setCaretGone(true), CARET_RETIRE_MS);
            return c;
          }
          return c + 1;
        });
      }, CHAR_MS);
    }, START_DELAY_MS);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
      if (retire) clearTimeout(retire);
    };
  }, [text]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {/* Zero-width space holds the line box open before the first
            character so the second title line never shifts. */}
        {count === 0 ? "​" : text.slice(0, count)}
        <span
          className={`ml-[0.08em] inline-block h-[0.8em] w-[0.14em] translate-y-[0.05em] bg-primary align-baseline ${
            caretGone ? "opacity-0 transition-opacity duration-700" : "caret-blink"
          }`}
        />
      </span>
    </>
  );
}