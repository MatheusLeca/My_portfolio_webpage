"use client";

import { useEffect, useRef, useState } from "react";
import { siteContent } from "@/lib/content";

const LINK_CLASS =
  "text-[11px] font-medium tracking-[0.18em] text-muted uppercase transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-nav focus-visible:outline-none";

export default function SiteNav() {
  const { brand, nav } = siteContent;
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open ]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-nav/95 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <a
          href={brand.homeHref}
          className="font-display text-sm font-bold tracking-[0.2em] text-foreground"
        >
          {brand.wordmark}
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={LINK_CLASS}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={nav.cta.href}
          className="hidden items-center rounded-full bg-primary px-5 py-2 text-[11px] font-bold tracking-[0.18em] text-white uppercase transition-colors hover:bg-primary-strong focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-nav focus-visible:outline-none md:inline-flex"
        >
          {nav.cta.label}
        </a>
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-foreground md:hidden"
        >
          <span aria-hidden="true" className="font-display text-lg font-bold">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </nav>
      {open ? (
        <nav aria-label="Mobile" id="mobile-menu" className="border-t border-line md:hidden">
          <ul role="list" className="space-y-1 px-4 py-4 sm:px-6">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-3 ${LINK_CLASS}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={nav.cta.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-full bg-primary px-5 py-3 text-[11px] font-bold tracking-[0.18em] text-white uppercase"
              >
                {nav.cta.label}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
