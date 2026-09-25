import Image from "next/image";
import Reveal from "@/components/Reveal";
import SampleBadge from "@/components/SampleBadge";
import Typewriter from "@/components/Typewriter";
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
      className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden xl:min-h-[calc(100svh-5rem)] 2xl:min-h-[calc(100svh-5.5rem)]"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 pt-6 pb-20 sm:px-6 md:pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:px-8 lg:py-12 xl:max-w-7xl xl:gap-16 xl:py-16 2xl:max-w-[96rem] 2xl:gap-20 2xl:py-20">
        <Reveal className="flex flex-col lg:self-center">
          <h1
            id="hero-heading"
            className="order-1 font-display text-[clamp(1.7rem,7.5vw,3.25rem)] leading-[1.02] font-bold tracking-tight text-balance text-foreground uppercase xl:text-[4rem] 2xl:text-[4.5rem]"
          >
            {hero.titleLines.map((line) => (
              <span key={line.text} className="block">
                {"typed" in line && line.typed ? (
                  <Typewriter text={line.text} />
                ) : line.accent ? (
                  <span className="text-primary">{line.text}</span>
                ) : (
                  line.text
                )}
              </span>
            ))}
          </h1>
          <div className="order-3 mt-6 max-w-xl space-y-4 text-base leading-relaxed text-foreground lg:order-2 xl:mt-8 xl:max-w-2xl xl:space-y-5 xl:text-lg 2xl:max-w-3xl 2xl:text-xl">
            {hero.summary.map((paragraph) => (
              <p key={paragraph.text}>
                {"bold" in paragraph ? (
                  <strong className="font-semibold text-foreground">{paragraph.bold}</strong>
                ) : null}
                {paragraph.text}
              </p>
            ))}
          </div>
          <div className="order-2 mt-8 flex flex-wrap items-center gap-4 lg:order-3">
            {resumeHref ? (
              <a
                href={resumeHref}
                download
                className="inline-flex items-center rounded-full bg-action px-6 py-3 text-[11px] font-bold tracking-[0.2em] text-on-action uppercase transition-colors hover:bg-action-strong focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none xl:px-7 xl:py-3.5 xl:text-xs 2xl:px-8 2xl:py-4 2xl:text-[13px]"
              >
                {resume.label}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                  className="ml-2 h-3.5 w-3.5 xl:h-4 xl:w-4 2xl:h-[18px] 2xl:w-[18px]"
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
        <Reveal delay={90} className="order-first flex justify-center lg:order-none lg:self-center lg:justify-end">
          <div className="relative w-full max-w-sm xl:max-w-md 2xl:max-w-lg">
            <div
              aria-hidden="true"
              className="absolute -inset-0 translate-x-4 translate-y-4 rounded-2xl border border-line"
            />
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-surface md:aspect-[4/5]">
              {hero.portraitSrc ? (
                <Image
                  src={hero.portraitSrc}
                  alt={hero.portraitAlt}
                  fill
                  sizes="(max-width: 1024px) min(100vw - 2rem, 24rem), (max-width: 1280px) 24rem, (max-width: 1536px) 28rem, 32rem"
                  className="object-cover object-top"
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
                    className="font-display text-7xl font-bold text-muted xl:text-8xl 2xl:text-[6rem]"
                  >
                    {hero.portraitInitials}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
