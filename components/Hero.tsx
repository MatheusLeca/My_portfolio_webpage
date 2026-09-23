import Image from "next/image";
import Reveal from "@/components/Reveal";
import SampleBadge from "@/components/SampleBadge";
import { siteContent } from "@/lib/content";

export default function Hero() {
  const { hero, resume } = siteContent;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden lg:justify-start"
    >
      {/* Desktop: top-aligned like SectionShell sections so the title lands at
          the same 144px (64px nav + 80px pt) as every other section when
          navigating. Mobile keeps the original centered layout. */}
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-20 lg:pb-28">
        <Reveal className="lg:self-start">
          <h1
            id="hero-heading"
            // Fluid size: fits the longest line inside one column at every
            // viewport instead of overflowing small screens.
            className="font-display text-[clamp(1.7rem,7.5vw,3.25rem)] leading-[1.02] font-bold tracking-tight text-balance text-foreground uppercase"
          >
            {hero.titleLines.map((line) => (
              <span key={line.text} className="block">
                {line.accent ? (
                  <span className="text-primary">{line.text}</span>
                ) : (
                  line.text
                )}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            {hero.summary}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-[11px] font-bold tracking-[0.2em] text-foreground uppercase transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              {hero.primaryCta.label}
              <span aria-hidden="true">→</span>
            </a>
            {resume.href ? (
              <a
                href={resume.href}
                download
                className="inline-flex items-center rounded-full bg-surface px-6 py-3 text-[11px] font-bold tracking-[0.2em] text-foreground uppercase transition-colors hover:border hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                {resume.label}
                <span aria-hidden="true" className="ml-2">
                  ↓
                </span>
              </a>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-surface px-6 py-3 text-[11px] font-bold tracking-[0.2em] text-muted uppercase">
                {resume.label} — Soon
                <SampleBadge />
              </span>
            )}
          </div>
        </Reveal>
        {/* Photo position lock: the photo must NOT move. With the section now
            top-aligned at lg, `lg:mt-[90px]` restores the photo to its exact
            previous top offset (236px from viewport top at 1440x900). */}
        <Reveal delay={90} className="flex justify-center lg:mt-[90px] lg:self-start lg:justify-end">
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-surface">
            {hero.portraitSrc ? (
              <Image
                src={hero.portraitSrc}
                alt={hero.portraitAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 24rem"
                className="object-cover"
                priority
              />
            ) : (
              <div
                role="img"
                aria-label={hero.portraitPlaceholderLabel}
                className="flex h-full w-full items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-7xl font-bold text-muted"
                >
                  {hero.portraitInitials}
                </span>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
