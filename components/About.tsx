import Image from "next/image";
import Reveal from "@/components/Reveal";
import SampleBadge from "@/components/SampleBadge";
import SectionShell from "@/components/SectionShell";
import { siteContent } from "@/lib/content";

export default function About() {
  const { about } = siteContent;

  return (
    <SectionShell id="about" labelledBy="about-heading" layout="split-lg" align="center" spacing="compact">
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
