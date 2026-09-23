import Reveal from "@/components/Reveal";
import SampleBadge from "@/components/SampleBadge";
import type { SiteContent } from "@/lib/content";

type Project = SiteContent["work"]["projects"][number];

/**
 * Single Selected-work card. Visual focus behavior (sibling dim/blur, active
 * scale-up, neon glow) lives in the `.work-cards`/`.work-card` block in
 * globals.css so the interaction stays CSS-only: no client JS, keyboard
 * focus-within parity, and no hover dependency on touch devices.
 */
export default function ProjectCard({
  project,
  revealDelay = 0,
}: {
  project: Project;
  revealDelay?: number;
}) {
  return (
    <li className="work-card rounded-2xl border border-line bg-surface p-5">
      <Reveal delay={revealDelay}>
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
  );
}
