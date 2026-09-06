import { siteContent } from "@/lib/content";

export default function Hero() {
  const { hero } = siteContent;

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 pt-16 pb-20 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:pt-24 md:pb-28">
        <div>
          <p className="text-[11px] font-bold tracking-[0.3em] text-muted">
            {hero.eyebrow}
          </p>
          <h1
            id="hero-heading"
            className="font-display mt-4 text-5xl leading-[1.02] font-bold tracking-tight text-balance text-foreground uppercase sm:text-6xl"
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
            <a
              href={hero.resumeCta.href}
              aria-disabled="true"
              title="Resume file coming soon"
              className="inline-flex cursor-not-allowed items-center rounded-full bg-surface px-6 py-3 text-[11px] font-bold tracking-[0.2em] text-muted uppercase"
            >
              {hero.resumeCta.label}
            </a>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div
            role="img"
            aria-label={hero.portraitPlaceholderLabel}
            className="flex aspect-[4/5] w-full max-w-sm items-center justify-center rounded-2xl border border-line bg-surface"
          >
            <span
              aria-hidden="true"
              className="font-display text-7xl font-bold text-muted"
            >
              {hero.portraitInitials}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
