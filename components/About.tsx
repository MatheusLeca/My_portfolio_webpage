import Image from "next/image";
import SampleBadge from "@/components/SampleBadge";
import { siteContent } from "@/lib/content";

export default function About() {
  const { about } = siteContent;

  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-16">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <p className="text-[11px] font-bold tracking-[0.3em] text-muted">
            {about.eyebrow}
          </p>
          <h2
            id="about-heading"
            className="font-display mt-4 text-4xl leading-tight font-bold tracking-tight text-balance text-foreground sm:text-5xl"
          >
            {about.heading}
          </h2>
          <div className="mt-6 max-w-xl space-y-4 text-[15px] leading-relaxed text-muted">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
            {about.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="order-2 mt-1 text-[11px] font-medium tracking-[0.18em] text-muted uppercase">
                  {stat.label}
                </dt>
                <dd className="order-1 flex items-center gap-2">
                  <span className="font-display text-3xl font-bold text-mint">
                    {stat.value}
                  </span>
                  {stat.placeholder ? <SampleBadge /> : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm">
            <div
              aria-hidden="true"
              className="absolute -inset-0 translate-x-4 translate-y-4 rounded-2xl border border-line"
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-surface">
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
        </div>
      </div>
    </section>
  );
}
