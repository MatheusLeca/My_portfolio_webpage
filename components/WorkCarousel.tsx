"use client";

import { useReducedMotion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/interfaces-carousel";
import type { SiteContent } from "@/lib/content";

type Project = SiteContent["work"]["projects"][number];

/**
 * Selected Work carousel: heading + a responsive prev/next control pair,
 * then the Embla track of ProjectCards.
 *
 * - Controls: below lg the pair sits in the header row ("static" +
 *   translate-none! neutralize the vendored absolute -left-12/-right-12
 *   offsets); on lg+ the header pair hides and a second pair straddles the
 *   track edges, vertically centered on the cards (reference-style
 *   chevrons). Both pairs share one Embla context — state, keyboard, and
 *   swipe stay in sync — and display:none keeps the hidden pair out of the
 *   hit-test and the accessibility tree.
 * - The flanking pair's -left-6/-right-6 outset equals the section
 *   container's 24px (sm:px-6) side padding, so the buttons hang into the
 *   padding without ever causing horizontal overflow — verified down to
 *   the 1024px lg edge, where there is no outer margin to borrow from.
 * - align "start" + slidesToScroll 1 + containScroll "trimSnaps": cards
 *   step one at a time from the left edge and the track stops flush with
 *   the last slide (no overscroll blank space with only 3 projects).
 * - Slide widths step down per breakpoint (84% → 60% → 44% → 34%) so the
 *   next card peeks into view as an affordance and cards stay compact at
 *   100% browser zoom (34% of the max-w-6xl track ≈ 375px wide); 34%
 *   (not 32%) keeps the controls enabled with exactly 3 projects.
 * - Each slide is a flex container so every card stretches to the track's
 *   tallest card: all cards share one exact width and height, with the
 *   footer row pinned to the bottom (mt-auto) regardless of how many
 *   description lines its content has.
 * - duration 0 under reduced motion: Embla still scrolls, but jumps
 *   instantly instead of animating.
 */
export default function WorkCarousel({
  heading,
  projects,
}: {
  heading: string;
  projects: readonly Project[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: 1,
        containScroll: "trimSnaps",
        duration: reduceMotion ? 0 : 25,
      }}
      className="flex flex-col gap-8 xl:gap-10 2xl:gap-12"
      aria-label="Selected work projects"
    >
      <div className="flex items-end justify-between gap-4">
        <Reveal>
          <h2
            id="work-heading"
            className="font-display text-[clamp(2.25rem,1.75rem+2.5vw,3rem)] font-bold tracking-tight text-foreground xl:text-[3.5rem] 2xl:text-[3.75rem]"
          >
            {heading}
          </h2>
        </Reveal>
        {/* Below lg the pair flows in the header row: "static" + an
         * important translate reset neutralize the vendored absolute
         * -left-12/-right-12 offsets (twMerge makes them win). On lg+ this
         * pair hides and the flanking chevrons beside the track take over. */}
        <div className="flex gap-2 lg:hidden">
          <CarouselPrevious className="static translate-none!" />
          <CarouselNext className="static translate-none!" />
        </div>
      </div>
      {/* Positioning context for the desktop (lg+) chevrons. They render
       * before the track so controls precede card links in tab order —
       * same order as the header-row pair below lg — and z-10 keeps them
       * painted above a hovered card's transformed, glowing edge. The
       * -left-6/-right-6 outset (twMerge overrides the vendored -left-12)
       * equals the section container's 24px padding: each button straddles
       * the track edge (24px outside over the padding, 16px across the
       * card's border and full-bleed visual edge) and never reaches past the
       * viewport,
       * even at the 1024px lg edge. */}
      <div className="relative">
        <CarouselPrevious className="hidden -left-6 z-10 lg:inline-flex" />
        <CarouselNext className="hidden -right-6 z-10 lg:inline-flex" />
        <CarouselContent className="-ml-6 xl:justify-center">
          {projects.map((project, index) => (
            <CarouselItem
              key={project.name}
              aria-label={`${index + 1} of ${projects.length}`}
              className="flex basis-[84%] pl-6 sm:basis-[60%] md:basis-[44%] lg:basis-[34%] xl:basis-[30%] 2xl:basis-[24%]"
            >
              {/* Slides live in a horizontal track, so the per-card scroll
               * reveal is disabled — it would fade cards in mid-swipe. The
               * whole track block could be wrapped in one Reveal instead;
               * cards appear with the section as before. */}
              <ProjectCard project={project} reveal={false} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  );
}
