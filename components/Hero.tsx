import Image from "next/image";
import Reveal from "@/components/Reveal";
import SampleBadge from "@/components/SampleBadge";
import { siteContent } from "@/lib/content";

export default function Hero() {
  const { hero, resume } = siteContent;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-24 lg:pb-28">
        <Reveal>
          <p className="text-[11px] font-bold tracking-[0.3em] text-muted">
            {hero.eyebrow}
          </p>
          <h1
            id="hero-heading"
            // Fluid size: fits the longest line inside one column at every
            // viewport instead of overflowing small screens.
            className="font-display mt-4 text-[clamp(1.7rem,7.5vw,3.25rem)] leading-[1.02] font-bold tracking-tight text-balance text-foreground uppercase"
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
        <Reveal delay={90} className="flex justify-center lg:justify-end">
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
