import { siteContent } from "@/lib/content";

export default function Skills() {
  const { skills } = siteContent;

  return (
    <section id="expertise" aria-labelledby="skills-heading" className="scroll-mt-16">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold tracking-[0.3em] text-muted">
            {skills.eyebrow}
          </p>
          <h2
            id="skills-heading"
            className="font-display mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            {skills.heading}
          </h2>
        </div>
        <ul
          role="list"
          // With five groups the last card would orphan: it spans the row on
          // small screens and centers on large ones. Revisit when a sixth
          // group lands (then the plain grid is balanced again).
          className="mt-14 grid gap-6 sm:grid-cols-2 sm:[&>li:last-child]:col-span-2 lg:grid-cols-3 lg:[&>li:last-child]:col-span-1 lg:[&>li:last-child]:col-start-2"
        >
          {skills.groups.map((group, index) => (
            <li
              key={group.title}
              className="rounded-2xl border border-line bg-surface p-7"
            >
              <p
                aria-hidden="true"
                className="font-display text-sm font-bold tracking-[0.2em] text-mint"
              >
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-3 text-xl font-bold text-foreground">
                {group.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {group.description}
              </p>
              <ul role="list" aria-label={`${group.title} technologies`} className="mt-5 flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 text-[11px] font-medium tracking-wide text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
