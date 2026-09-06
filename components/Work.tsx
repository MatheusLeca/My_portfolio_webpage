import SampleBadge from "@/components/SampleBadge";
import { siteContent } from "@/lib/content";

export default function Work() {
  const { work } = siteContent;

  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-16">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="flex items-end justify-between gap-6">
          <h2
            id="work-heading"
            className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            {work.heading}
          </h2>
          <a
            href={work.archive.href}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-[11px] font-bold tracking-[0.2em] text-muted uppercase transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            {work.archive.label} <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in new tab)</span>
          </a>
        </div>
        <ul
          role="list"
          className="mt-14 grid gap-6 md:grid-cols-2 lg:pb-12"
        >
          {work.projects.map((project) => (
            <li
              key={project.name}
              className="group rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-primary md:even:translate-y-12"
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
              <div className="flex items-start justify-between gap-4 px-1 pt-5">
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <p className="mt-3 text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
                    {project.tags.join(" · ")}
                  </p>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-[11px] font-bold tracking-[0.2em] text-primary uppercase hover:text-primary-strong focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none"
                    >
                      Live demo <span aria-hidden="true">↗</span>
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                  ) : null}
                </div>
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} source code (opens in new tab)`}
                  className="mt-1 shrink-0 rounded-full border border-line p-2.5 text-muted transition-colors group-hover:border-primary group-hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none"
                >
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
