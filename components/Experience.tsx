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
            className="font-display text-[clamp(2.25rem,1.75rem+2.5vw,3rem)] font-bold tracking-tight text-foreground xl:text-[3.5rem] 2xl:text-[3.75rem]"
          >
            {experience.heading}
          </h2>
        </Reveal>
        <div className="space-y-10 md:space-y-16 xl:space-y-20 2xl:space-y-24">
          {experience.companies.map((company) => {
            // Widened so the monogram fallback stays valid for future
            // companies without a logo file.
            const logo: string | undefined = company.logo;
            // Only companies with full-bleed artwork set logoFit.
            const cover = "logoFit" in company && company.logoFit === "cover";
            return (
            <div key={company.name} data-company={company.name}>
              <Reveal>
                <div className="flex items-center gap-4 xl:gap-5">
                {logo ? (
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-line bg-white xl:h-14 xl:w-14 2xl:h-[4.5rem] 2xl:w-[4.5rem]">
                    <Image
                      src={logo}
                      alt={`${company.name} logo`}
                      fill
                      sizes="(max-width: 1280px) 48px, (max-width: 1536px) 56px, 72px"
                      className={cover ? "object-cover" : "object-contain p-1"}
                    />
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    className="font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-sm font-bold text-primary xl:h-14 xl:w-14 xl:text-base 2xl:h-[4.5rem] 2xl:w-[4.5rem] 2xl:text-xl"
                  >
                    {company.initials}
                  </span>
                )}
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold text-foreground xl:text-2xl 2xl:text-[1.75rem]">
                    {company.name}
                  </h3>
                  <p className="text-sm text-foreground xl:text-base 2xl:text-lg">{company.location}</p>
                </div>
                </div>
              </Reveal>
              <div className="relative mt-6">
                <span
                  aria-hidden="true"
                  className="absolute top-3 bottom-3 left-6 w-px bg-line xl:left-7 2xl:left-9"
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
                    <span aria-hidden="true" className="flex w-12 shrink-0 justify-center xl:w-14 2xl:w-[4.5rem]">
                      <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-primary xl:h-3 xl:w-3 2xl:h-3.5 2xl:w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <h4 className="font-display text-lg font-bold text-foreground xl:text-xl 2xl:text-2xl">
                          {role.title}
                        </h4>
                        <p className="text-sm text-foreground xl:text-base 2xl:text-lg">{role.dates}</p>
                      </div>
                      <p className="mt-1 text-[11px] font-medium tracking-[0.14em] text-foreground uppercase xl:text-xs 2xl:text-[13px]">
                        {role.duration}
                      </p>
                      <p
                        aria-label={`${role.title} at ${company.name} technologies`}
                        className="mt-4 text-sm leading-relaxed text-foreground xl:mt-5 xl:text-base 2xl:mt-6 2xl:text-lg"
                      >
                        {role.tags.join(" · ")}
                      </p>
                      <ul role="list" className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground xl:text-base 2xl:mt-5 2xl:space-y-3 2xl:text-lg">
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
