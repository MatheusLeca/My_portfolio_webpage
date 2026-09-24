import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionShell from "@/components/SectionShell";
import { siteContent } from "@/lib/content";

export default function Experience() {
  const { experience } = siteContent;

  return (
    <SectionShell id="experience" labelledBy="experience-heading">
        <Reveal>
          <h2
            id="experience-heading"
            className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            {experience.heading}
          </h2>
        </Reveal>
        <div className="space-y-16">
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
                  <p className="text-sm text-foreground">{company.location}</p>
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
                        <p className="text-sm text-foreground">{role.dates}</p>
                      </div>
                      <p className="mt-1 text-[11px] font-medium tracking-[0.14em] text-foreground uppercase">
                        {role.duration}
                      </p>
                      <p
                        aria-label={`${role.title} at ${company.name} technologies`}
                        className="mt-4 text-sm leading-relaxed text-foreground"
                      >
                        {role.tags.join(" · ")}
                      </p>
                      <ul role="list" className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground">
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
    </SectionShell>
  );
}
