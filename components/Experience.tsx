import Image from "next/image";
import Reveal from "@/components/Reveal";
import { siteContent } from "@/lib/content";

export default function Experience() {
  const { experience } = siteContent;

  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-16">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <p className="text-[11px] font-bold tracking-[0.3em] text-muted">
          {experience.eyebrow}
        </p>
        <h2
          id="experience-heading"
          className="font-display mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        >
          {experience.heading}
        </h2>
        <div className="mt-14 space-y-16">
          {experience.companies.map((company) => {
            // Widened so the monogram fallback stays valid for future
            // companies without a logo file.
            const logo: string | undefined = company.logo;
            // Only companies with full-bleed artwork set logoFit.
            const cover = "logoFit" in company && company.logoFit === "cover";
            return (
            <div key={company.name} data-company={company.name}>
              <Reveal>
                <div className="flex items-center gap-4">
                {logo ? (
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-line bg-white">
                    <Image
                      src={logo}
                      alt={`${company.name} logo`}
                      fill
                      sizes="48px"
                      className={cover ? "object-cover" : "object-contain p-1"}
                    />
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    className="font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-sm font-bold text-primary"
                  >
                    {company.initials}
                  </span>
                )}
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {company.name}
                  </h3>
                  <p className="text-sm text-muted">{company.location}</p>
                </div>
                </div>
              </Reveal>
              <div className="relative mt-6">
                <span
                  aria-hidden="true"
                  className="absolute top-3 bottom-3 left-6 w-px bg-line"
                />
                {company.roles.map((role, roleIndex) => (
                  <Reveal
                    key={`${role.title}-${role.dates}`}
                    delay={Math.min(roleIndex, 3) * 90}
                    className="pb-10 last:pb-0"
                  >
                    <div
                      data-role={`${role.title} at ${company.name}`}
                      className="relative flex gap-4 sm:gap-6"
                    >
                    <span aria-hidden="true" className="flex w-12 shrink-0 justify-center">
                      <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <h4 className="font-display text-lg font-bold text-foreground">
                          {role.title}
                        </h4>
                        <p className="text-sm text-muted">{role.dates}</p>
                      </div>
                      <p className="mt-1 text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
                        {role.duration}
                      </p>
                      <ul
                        role="list"
                        aria-label={`${role.title} at ${company.name} technologies`}
                        className="mt-4 flex flex-wrap gap-2"
                      >
                        {role.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-line px-3 py-1 text-[11px] font-medium tracking-wide text-muted"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <ul role="list" className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted">
                        {role.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
