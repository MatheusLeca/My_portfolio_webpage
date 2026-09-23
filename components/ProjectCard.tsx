"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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

const arrowVariants = {
  rest: { rotate: 0 },
  active: { rotate: 45 },
};

/**
 * Single Selected-work card in the Offer-card visual language (#29): an
 * upper visual area in an overflow-hidden rounded frame, then a structured
 * content area (tag pill, name, description, hairline divider, metadata row
 * with a circular arrow action). Sibling de-emphasis and the neon glow stay
 * CSS-only in the `.work-cards`/`.work-card` block in globals.css; the
 * hover/focus choreography (lift, zoom, arrow rotation) animates inner
 * elements via Framer Motion, so the transforms never conflict. The whole
 * card is one link; the arrow is decorative so assistive tech announces a
 * single actionable element.
 */
export default function ProjectCard({
  project,
  revealDelay = 0,
}: {
  project: Project;
  revealDelay?: number;
}) {
  const [primaryTag, ...restTags] = project.tags;
  /* Reduced-motion users keep the static card: no lift, zoom, or rotation.
   * The CSS sibling de-emphasis is separately gated in globals.css. */
  const reduceMotion = useReducedMotion();
  const activeState = reduceMotion ? undefined : "active";

  return (
    <li className="work-card rounded-2xl border border-line bg-surface p-5">
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
          className="block rounded-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none"
        >
          <div
            role="img"
            aria-label={project.thumbnailLabel}
            className="relative aspect-video w-full overflow-hidden rounded-xl border border-line bg-background"
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
          <div className="px-1 pt-5">
            <p className="inline-block rounded-full border border-line px-2.5 py-0.5 text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
              {primaryTag}
            </p>
            <h3 className="mt-3 font-display text-lg font-bold text-foreground">
              {project.name}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {project.description}
            </p>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
              {restTags.length > 0 ? (
                <p className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
                  {restTags.join(" · ")}
                </p>
              ) : null}
              <motion.span
                aria-hidden="true"
                variants={arrowVariants}
                transition={motionTransition}
                className="work-card-arrow ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted"
              >
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
              </motion.span>
            </div>
          </div>
        </motion.a>
      </Reveal>
    </li>
  );
}
