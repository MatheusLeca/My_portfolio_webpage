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
            className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            {skills.heading}
          </h2>
        </Reveal>
        <dl className="divide-y divide-line border-y border-line">
          {skills.groups.map((group) => (
            <div
              key={group.title}
              className="grid gap-2 py-3 sm:grid-cols-[180px_1fr] sm:gap-6"
            >
              <dt className="text-sm font-bold text-foreground">
                {group.title}
              </dt>
              <dd>
                <p className="text-[15px] font-bold leading-relaxed text-foreground">
                  {group.tags.join(" · ")}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-foreground">
                  {group.description}
                </p>
              </dd>
            </div>
          ))}
        </dl>
    </SectionShell>
  );
}
