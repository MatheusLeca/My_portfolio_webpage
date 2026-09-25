import Reveal from "@/components/Reveal";
import SectionShell from "@/components/SectionShell";
import { siteContent } from "@/lib/content";

export default function Skills() {
  const { skills } = siteContent;

  return (
    <SectionShell id="expertise" labelledBy="skills-heading">
        <Reveal>
          <h2
            id="skills-heading"
            className="font-display text-[clamp(2.25rem,1.75rem+2.5vw,3rem)] font-bold tracking-tight text-foreground xl:text-[3.5rem] 2xl:text-[3.75rem]"
          >
            {skills.heading}
          </h2>
        </Reveal>
        <dl className="divide-y divide-line border-y border-line">
          {skills.groups.map((group) => (
            <div
              key={group.title}
              className="grid gap-3 py-3 sm:grid-cols-[180px_1fr] sm:gap-6 xl:grid-cols-[220px_1fr] xl:py-4 2xl:grid-cols-[260px_1fr] 2xl:py-5"
            >
              <dt className="text-sm font-bold text-foreground xl:text-base 2xl:text-lg">
                {group.title}
              </dt>
              <dd>
                <p className="text-[15px] font-bold leading-relaxed text-foreground xl:text-base 2xl:text-lg">
                  {group.tags.join(" · ")}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-foreground xl:text-sm 2xl:mt-2 2xl:text-base">
                  {group.description}
                </p>
              </dd>
            </div>
          ))}
        </dl>
    </SectionShell>
  );
}
