"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SampleBadge from "@/components/SampleBadge";
import type { SiteContent } from "@/lib/content";

type Project = SiteContent["work"]["projects"][number];

/* Offer-card choreography (#29): short ease-out transitions on transform
 * only — compositor-friendly, no layout shift. Variants propagate from the
 * link to the visual child; "active" is shared by hover and keyboard focus
 * so pointer and keyboard users get identical feedback. */
const motionTransition = { duration: 0.25, ease: "easeOut" } as const;

const liftVariants = {
  rest: { y: 0 },
  active: { y: -4 },
};

const visualVariants = {
  rest: { scale: 1 },
  active: { scale: 1.05 },
};

/* Tag chips: outlined pills carry the project's stack under the description
 * in the site's micro-label voice (uppercase, wide tracking, hairline
 * border, no fill). One shared constant keeps every card's pill row
 * identical; Tailwind still sees the literals verbatim in source. */
const pillClass =
  "inline-flex items-center rounded-full border border-line px-2.5 py-1 text-[11px] font-bold tracking-[0.18em] text-muted uppercase";

/**
 * Single Selected-work card in the Offer-card visual language (#29),
 * reconciled with the reference design: a full-bleed visual (16:9, top
 * corners rounded to the card's radius, flush to the card edges — no
 * card padding, exactly like the offer-card reference), an oversized
 * extrabold headline, a muted description, and the project's stack as
 * outlined tag pills directly under the copy. The text block carries its
 * own inset (px-6) since the root no longer pads.
 *
 * The card *is* the call to action: the whole surface is one link to the
 * project (live URL when present, otherwise the source repo), so there is
 * no footer brand row, no circular arrow button, and no URL/host text to
 * tab through — the hover lift plus the CSS neon glow are the affordance.
 * Dropping that footer also makes the card much shorter than the earlier
 * avatar/slug/host version: the copy block ends after the pill row and the
 * trailing padding closes the card.
 *
 * Uniform sizing: the slide is a flex container, the root stretches to the
 * track's tallest card, and the link/content grow with flex-auto (auto
 * bases keep intrinsic heights honest) so every card in the carousel
 * shares one exact width and height. A card with shorter copy keeps its
 * leftover height below the pills, where no divider or footer reveals the
 * difference.
 *
 * The neon glow stays CSS-only in the `.work-card` block in globals.css;
 * the sibling de-emphasis retired with the carousel. The hover/focus
 * choreography (lift and visual zoom) animates inner elements via Framer
 * Motion, so the transforms never conflict. The root is a plain div so it
 * can live inside a carousel slide without list-item semantics;
 * `reveal={false}` opts out of the scroll reveal for horizontal-track
 * usage.
 */
export default function ProjectCard({
  project,
  revealDelay = 0,
  reveal = true,
}: {
  project: Project;
  revealDelay?: number;
  /** Set false inside the Work carousel: slides sit in a horizontal track,
   *  so per-card scroll reveals would fire mid-swipe. Default true keeps
   *  the staggered standalone usage unchanged. */
  reveal?: boolean;
}) {
  /* Reduced-motion users keep the static card: no lift and no zoom.
   * The CSS neon glow is separately gated in globals.css. */
  const reduceMotion = useReducedMotion();
  const activeState = reduceMotion ? undefined : "active";
  const link = (
    <motion.a
      href={project.liveUrl ?? project.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial="rest"
      animate="rest"
      whileHover={activeState}
      whileFocus={activeState}
      variants={liftVariants}
      transition={motionTransition}
      className="flex flex-auto flex-col rounded-3xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none"
    >
      <div
        role="img"
        aria-label={project.thumbnailLabel}
        className="relative aspect-video w-full overflow-hidden rounded-t-3xl bg-background"
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
      <div className="flex flex-auto flex-col px-6 pt-5 pb-5">
        <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-foreground">
          {project.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        {/* Stack as pills: the list sits directly under the copy — no
         * icon-led metadata row above the headline, no divider, no
         * footer row. Wraps so multi-tag projects still read cleanly. */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className={pillClass}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.a>
  );

  return (
    /* Plain div root: in the carousel the slide wrapper (role="group",
     * aria-roledescription="slide") provides the semantics, and the old
     * <ul>/<li> grid is gone — an <li> outside a list would be invalid. */
    /* w-full + min-w-0: as the slide's flex item the card must take exactly
     * the slide's content width — the implicit min-width:auto floor would
     * otherwise let a long unbreakable token (a project name or a stack
     * tag) widen its card past its siblings on narrow viewports. */
    <div className="work-card flex min-w-0 w-full flex-col rounded-3xl border border-line bg-surface">
      {reveal ? <Reveal delay={revealDelay}>{link}</Reveal> : link}
    </div>
  );
}
