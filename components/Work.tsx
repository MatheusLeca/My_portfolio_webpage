import SampleBadge from "@/components/SampleBadge";
import { siteContent } from "@/lib/content";

export default function Work() {
  const { work } = siteContent;

  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-16">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <h2
          id="work-heading"
          className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        >
          {work.heading}
        </h2>
        <ul
          role="list"
          // Even grid while the list is short; the staggered offset from the
          // reference can return once a fourth project fills the second row.
          className="mt-14 grid gap-6 md:grid-cols-2"
        >
          {work.projects.map((project) => (
            <li
              key={project.name}
              className="group rounded-2xl border border-line bg-surface p-5 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:border-primary focus-within:border-primary motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_8px_32px_-8px_var(--primary)] motion-safe:focus-within:-translate-y-1 motion-safe:focus-within:shadow-[0_8px_32px_-8px_var(--primary)]"
            >
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
