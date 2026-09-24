import Image from "next/image";
import Reveal from "@/components/Reveal";
import SampleBadge from "@/components/SampleBadge";
import SectionShell from "@/components/SectionShell";
import { siteContent } from "@/lib/content";

export default function About() {
  const { about } = siteContent;

  return (
    <SectionShell id="about" labelledBy="about-heading" layout="split" align="start" spacing="compact">
      {/* One outer rhythm page-wide (see SectionShell): pt-6 (24px) above the
          photo on mobile — the same space as above every section title and
          the Hero photo — pb-10 bottom, md:py-12 from md up; scroll-mt-16
          lands the section flush at the nav bottom on mobile anchor jumps.
          spacing="compact" tightens the mobile grid gap so photo -> heading
          is 32px instead of 48px; md+ keeps the standard gap-12. Photo above
          the text on mobile (requested: photos lead on small screens), text
          left / photo right from md up. */}
        <Reveal>
          <h2
            id="about-heading"
            className="font-display text-4xl font-bold tracking-tight text-balance text-foreground sm:text-5xl"
          >
            {about.heading}
          </h2>
          <p className="mt-4 max-w-xl font-display text-lg font-semibold tracking-tight text-balance text-foreground">
            {about.subheading}
          </p>
          <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-foreground">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph[0].text.slice(0, 24)}>
                {paragraph.map((segment) =>
                  "bold" in segment && segment.bold ? (
                    <strong key={segment.text} className="font-semibold">
                      {segment.text}
                    </strong>
                  ) : (
                    segment.text
                  ),
                )}
              </p>
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
