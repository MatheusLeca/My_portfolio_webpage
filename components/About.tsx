import Image from "next/image";
import Reveal from "@/components/Reveal";
import SampleBadge from "@/components/SampleBadge";
import SectionShell from "@/components/SectionShell";
import { siteContent } from "@/lib/content";

export default function About() {
  const { about } = siteContent;

  return (
    <SectionShell id="about" labelledBy="about-heading" layout="split" align="start">
      {/* Same shell + spacing as Skills/Experience/Work/Contact: identical
          scroll-mt-20 anchor and py-10 / md:py-16, so "The engineer behind the
          code." exits at 120px mobile / 144px desktop like every other h2.
          Photo above the text on mobile (requested: photos lead on small
          screens), text left / photo right from md up. */}
        <Reveal>
          <h2
            id="about-heading"
            className="font-display text-4xl font-bold tracking-tight text-balance text-foreground sm:text-5xl"
          >
            {about.heading}
          </h2>
          <div className="mt-6 max-w-xl space-y-4 text-[15px] leading-relaxed text-muted">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
        {/* Photo top locks to the grid top via md:items-start on the shell;
            no offsets, so it starts flush with the title block. order-first
            puts the photo above the text in the single-column mobile stack;
            md:order-none restores DOM order on the two-column desktop grid. */}
        <Reveal delay={90} className="order-first flex justify-center md:order-none md:justify-end">
          <div className="relative w-full max-w-sm">
            <div
              aria-hidden="true"
              className="absolute -inset-0 translate-x-4 translate-y-4 rounded-2xl border border-line"
            />
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-surface md:aspect-[4/5]">
              {about.portraitSrc ? (
                <Image
                  src={about.portraitSrc}
                  alt={about.portraitAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 24rem"
                  className="object-cover object-top"
                />
              ) : (
                <div
                  role="img"
                  aria-label={about.portraitPlaceholderLabel}
                  className="flex h-full w-full items-center justify-center"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-7xl font-bold text-muted"
                  >
                    {about.portraitInitials}
                  </span>
                  <span className="absolute top-4 left-4">
                    <SampleBadge />
                  </span>
                </div>
              )}
            </div>
          </div>
        </Reveal>
    </SectionShell>
  );
}
