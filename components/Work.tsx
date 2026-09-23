import Reveal from "@/components/Reveal";
import SampleBadge from "@/components/SampleBadge";
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
          // fills out the second row.
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {work.projects.map((project, projectIndex) => (
            <li
              key={project.name}
              className="group rounded-2xl border border-line bg-surface p-5 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:border-primary focus-within:border-primary motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_8px_32px_-8px_var(--primary)] motion-safe:focus-within:-translate-y-1 motion-safe:focus-within:shadow-[0_8px_32px_-8px_var(--primary)]"
            >
              <Reveal delay={Math.min(projectIndex, 2) * 70}>
                <a
                  href={project.liveUrl ?? "about:blank"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none"
                >
                  <div
                    role="img"
                    aria-label={project.thumbnailLabel}
                    className="relative flex aspect-video w-full items-center justify-center rounded-xl border border-line bg-background"
                  >
                    <span
                      aria-hidden="true"
                      className="font-display text-5xl font-bold text-muted"
                    >
                      {project.thumbnailInitials}
                    </span>
                    {project.placeholder ? (
                      <span className="absolute top-3 left-3">
                        <SampleBadge />
                      </span>
                    ) : null}
                  </div>
                  <div className="px-1 pt-5">
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>
                    <p className="mt-3 text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
                      {project.tags.join(" · ")}
                    </p>
                  </div>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
    </SectionShell>
  );
}
