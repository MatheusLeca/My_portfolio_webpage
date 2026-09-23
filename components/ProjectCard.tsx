"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Tag } from "lucide-react";
import Reveal from "@/components/Reveal";
import SampleBadge from "@/components/SampleBadge";
import type { SiteContent } from "@/lib/content";

type Project = SiteContent["work"]["projects"][number];

/* Offer-card choreography (#29): short ease-out transitions on transform
 * only — compositor-friendly, no layout shift. Variants propagate from the
 * link to the visual and arrow children; "active" is shared by hover and
 * keyboard focus so pointer and keyboard users get identical feedback. */
const motionTransition = { duration: 0.25, ease: "easeOut" } as const;

const liftVariants = {
  rest: { y: 0 },
  active: { y: -4 },
};

const visualVariants = {
  rest: { scale: 1 },
  active: { scale: 1.05 },
};

/* Reference design: the footer action arrow points right (→) at rest and
 * rotates up-right (↗) on hover/focus — a -45° turn of the same glyph. */
const arrowVariants = {
  rest: { rotate: 0 },
  active: { rotate: -45 },
};

/* Footer "brand" row from the project's real source URL: the repo slug is
 * the bold line and the host is the muted handle, mirroring the reference
 * design's brand/handle pair without inventing data. Returns null when the
 * URL cannot be parsed, in which case the row hides gracefully. */
function parseSource(sourceUrl: string) {
  try {
    const url = new URL(sourceUrl);
    const segments = url.pathname.split("/").filter(Boolean);
    const slug = segments.length > 0 ? segments[segments.length - 1] : null;
    return { host: url.hostname.replace(/^www\./, ""), slug };
  } catch {
    return null;
  }
}

/**
 * Single Selected-work card in the Offer-card visual language (#29),
 * reconciled with the reference design: an inset unframed visual (~3:2,
 * rounded) on a dark surface, a tag-icon metadata row, an oversized
 * extrabold headline, a muted description, a hairline divider, and a footer
 * brand row (initials avatar, repo slug, host) with a filled circular arrow
 * action. Sibling de-emphasis and the neon glow stay CSS-only in the
 * `.work-cards`/`.work-card` block in globals.css; the hover/focus
 * choreography (lift, zoom, arrow rotation) animates inner elements via
 * Framer Motion, so the transforms never conflict. The whole card is one
 * link; the arrow is decorative so assistive tech announces a single
 * actionable element.
 */
export default function ProjectCard({
  project,
  revealDelay = 0,
}: {
  project: Project;
  revealDelay?: number;
}) {
  /* Reduced-motion users keep the static card: no lift, zoom, or rotation.
   * The CSS sibling de-emphasis is separately gated in globals.css. */
  const reduceMotion = useReducedMotion();
  const activeState = reduceMotion ? undefined : "active";
  const source = parseSource(project.sourceUrl);

  return (
    <li className="work-card rounded-3xl border border-line bg-surface p-3.5">
      <Reveal delay={revealDelay}>
        <motion.a
          href={project.liveUrl ?? "about:blank"}
          target="_blank"
          rel="noopener noreferrer"
          initial="rest"
          animate="rest"
          whileHover={activeState}
          whileFocus={activeState}
          variants={liftVariants}
          transition={motionTransition}
          className="block rounded-2xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none"
        >
          <div
            role="img"
            aria-label={project.thumbnailLabel}
            className="relative aspect-3/2 w-full overflow-hidden rounded-2xl bg-background"
          >
            <motion.div
              variants={visualVariants}
              transition={motionTransition}
              className="work-card-visual flex h-full w-full items-center justify-center"
            >
              <span
                aria-hidden="true"
                className="font-display text-5xl font-bold text-muted"
              >
                {project.thumbnailInitials}
              </span>
            </motion.div>
            {project.placeholder ? (
              <span className="absolute top-3 left-3">
                <SampleBadge />
              </span>
            ) : null}
          </div>
          <div className="px-4 pt-6 pb-2">
            <p className="flex items-center gap-2 text-sm font-medium text-muted">
              <Tag aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
              {project.tags.join(" · ")}
            </p>
            <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-foreground">
              {project.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {project.description}
            </p>
            <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-background font-display text-xs font-bold text-foreground"
              >
                {project.thumbnailInitials}
              </span>
              {source?.slug ? (
                <p className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-foreground">
                    {source.slug}
                  </span>
                  <span className="block truncate text-xs text-muted">
                    {source.host}
                  </span>
                </p>
              ) : null}
              <motion.span
                aria-hidden="true"
                variants={arrowVariants}
                transition={motionTransition}
                className="work-card-arrow ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-line text-foreground"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </motion.span>
            </div>
          </div>
        </motion.a>
      </Reveal>
    </li>
  );
}
