"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SampleBadge from "@/components/SampleBadge";
import type { SiteContent } from "@/lib/content";

type Project = SiteContent["work"]["projects"][number];

const motionTransition = { duration: 0.25, ease: "easeOut" } as const;

const liftVariants = {
  rest: { y: 0 },
  active: { y: -4 },
};

const visualVariants = {
  rest: { scale: 1 },
  active: { scale: 1.05 },
};

const pillClass =
  "inline-flex items-center rounded-full border border-line px-2.5 py-1 text-[11px] font-bold tracking-[0.18em] text-muted uppercase xl:px-3 xl:text-xs 2xl:px-3.5 2xl:py-1.5 2xl:text-[13px]";

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
  const reduceMotion = useReducedMotion();
  const activeState = reduceMotion ? undefined : "active";
  const cardBody = (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover={activeState}
      whileFocus={activeState}
      variants={liftVariants}
      transition={motionTransition}
      className="relative flex flex-auto flex-col overflow-hidden rounded-3xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none"
    >
      <div aria-hidden="true" className="flex flex-auto flex-col blur-[3px] select-none">
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
            className="font-display text-5xl font-bold text-muted xl:text-6xl 2xl:text-7xl"
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
      <div className="flex flex-auto flex-col px-6 pt-5 pb-5 xl:px-7 xl:pt-6 xl:pb-6 2xl:px-8 2xl:pt-7 2xl:pb-7">
        <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-foreground xl:text-[1.75rem] 2xl:text-3xl">
          {project.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted xl:text-[15px] 2xl:mt-3 2xl:text-base">
          {project.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className={pillClass}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-3xl bg-background/45 p-4 backdrop-blur-[1px]">
        <p
          role="status"
          aria-label={`${project.name} coming soon`}
          className="font-display rounded-full border border-line bg-surface/85 px-6 py-3 text-xl font-extrabold tracking-tight text-foreground shadow-lg xl:px-7 xl:text-2xl 2xl:px-8 2xl:py-4 2xl:text-[1.75rem]"
        >
          Coming Soon...
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="work-card flex min-w-0 w-full flex-col rounded-3xl border border-line bg-surface">
      {reveal ? <Reveal delay={revealDelay}>{cardBody}</Reveal> : cardBody}
    </div>
  );
}
