import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import SectionShell from "@/components/SectionShell";
import { siteContent } from "@/lib/content";

export default function Work() {
  const { work } = siteContent;

  return (
    <SectionShell id="work" labelledBy="work-heading">
        <Reveal>
          <h2
            id="work-heading"
            className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            {work.heading}
          </h2>
        </Reveal>
        <ul
          role="list"
          // Three across on desktop while the list is short; the staggered
          // offset from the reference can return once a fourth project
          // fills out the second row. Hover-reveal focus styles for
          // .work-cards/.work-card live in globals.css.
          className="work-cards grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {work.projects.map((project, projectIndex) => (
            <ProjectCard
              key={project.name}
              project={project}
              revealDelay={Math.min(projectIndex, 2) * 70}
            />
          ))}
        </ul>
    </SectionShell>
  );
}
