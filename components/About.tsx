import Image from "next/image";
import Reveal from "@/components/Reveal";
import SampleBadge from "@/components/SampleBadge";
import SectionShell from "@/components/SectionShell";
import { siteContent } from "@/lib/content";

export default function About() {
  const { about } = siteContent;

  return (
    <SectionShell id="about" labelledBy="about-heading" layout="split-lg" align="center" spacing="compact">
      {/* One outer rhythm page-wide (see SectionShell): pt-6 (24px) above the
          photo on mobile — the same space as above every section title and
          the Hero photo — pb-10 bottom, md:py-12 from md up; scroll-mt-16
          lands the section flush at the nav bottom on mobile anchor jumps.
          spacing="compact" tightens the mobile grid gap so photo -> heading
          is 32px instead of 48px; md+ keeps the standard gap-12. Photo above
          the text on mobile/tablet (photos lead on small screens), text
          left / photo right from lg up (split-lg). */}
        <Reveal>
          <h2
            id="about-heading"
            className="font-display text-[clamp(2.25rem,1.75rem+2.5vw,3rem)] font-bold tracking-tight text-balance text-foreground xl:text-[3.5rem] 2xl:text-[3.75rem]"
          >
            {about.heading}
          </h2>
          <p className="mt-4 max-w-xl font-display text-lg font-semibold tracking-tight text-balance text-foreground xl:mt-5 xl:max-w-2xl xl:text-xl 2xl:max-w-3xl 2xl:text-2xl">
            {about.subheading}
          </p>
          <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-foreground xl:mt-8 xl:max-w-2xl xl:space-y-5 xl:text-lg 2xl:max-w-3xl 2xl:text-xl">
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
        {/* Photo centers against the text column via lg:items-center on the
            shell (split-lg, align="center") + lg:self-center here — same rule
            as the Hero photo, so the portrait sits mid-text instead of pinned
            to the title (which read as top-heavy on smaller desktops where
            the text runs taller than the image). order-first puts the photo
            above the text in the single-column mobile/tablet stack;
            lg:order-none restores DOM order (text left, photo right) on the
            two-column desktop grid. Identical box to the Hero portrait. */}
        <Reveal delay={90} className="order-first flex justify-center lg:order-none lg:self-center lg:justify-end">
          <div className="relative w-full max-w-sm xl:max-w-md 2xl:max-w-lg">
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
                  sizes="(max-width: 1024px) min(100vw - 2rem, 24rem), (max-width: 1280px) 24rem, (max-width: 1536px) 28rem, 32rem"
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
                    className="font-display text-7xl font-bold text-muted xl:text-8xl 2xl:text-[6rem]"
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
