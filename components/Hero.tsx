import Image from "next/image";
import Reveal from "@/components/Reveal";
import SampleBadge from "@/components/SampleBadge";
import { siteContent } from "@/lib/content";

export default function Hero() {
  const { hero, resume } = siteContent;
  // Raw <a> hrefs are not basePath-prefixed by Next (unlike next/image);
  // prepend it here so the resume link resolves on the sub-path static host.
  const resumeHref = resume.href
    ? `${process.env.NEXT_BASE_PATH ?? ""}${resume.href}`
    : null;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-start overflow-hidden"
    >
      {/* Photo-top lock with About: same space above both photos at every
          breakpoint. Hero top padding + 4rem nav = About's scroll-mt-20 +
          py, so both photo tops land 120px (mobile: pt-14 56px + 64px) /
          144px (md+: pt-20 80px + 64px) from the viewport top. items-start +
          self-start, no offsets, keep the photo tops flush with the title. */}
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 pt-14 pb-20 sm:px-6 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:pb-28">
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
            {/* Single CTA: the resume download. Styled like the nav "Hire Me"
                button (filled --action pill) since it is now the only hero
                action. The "View Work" outline button was removed. */}
            {resumeHref ? (
              <a
                href={resumeHref}
                download
                className="inline-flex items-center rounded-full bg-action px-6 py-3 text-[11px] font-bold tracking-[0.2em] text-on-action uppercase transition-colors hover:bg-action-strong focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                {resume.label}
                {/* Bootstrap Icons "file-person-fill" (inline SVG: no icon-font
                    dependency for a single glyph). Takes the old arrow slot after
                    the label; currentColor inherits the button text color. */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                  className="ml-2 h-3.5 w-3.5"
                >
                  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11" />
                </svg>
              </a>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-surface px-6 py-3 text-[11px] font-bold tracking-[0.2em] text-muted uppercase">
                {resume.label} — Soon
                <SampleBadge />
              </span>
            )}
          </div>
        </Reveal>
        {/* Photo-top lock: pins to the grid top (lg:self-start), no pull-up
            offset, so its top is flush with the title — same rule as About.
            order-first puts the photo above the text in the single-column
            mobile stack; lg:order-none restores DOM order (text left, photo
            right) on the two-column desktop grid. */}
        <Reveal delay={90} className="order-first flex justify-center lg:order-none lg:self-start lg:justify-end">
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
