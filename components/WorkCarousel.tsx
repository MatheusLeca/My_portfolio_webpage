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
 * Project showcase carousel with responsive controls and equal-height cards.
 * Uses Embla for touch swipe, keyboard navigation, and reduced-motion support.
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
        <div className="flex gap-2 lg:hidden">
          <CarouselPrevious className="static translate-none!" />
          <CarouselNext className="static translate-none!" />
        </div>
      </div>
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
              <ProjectCard project={project} reveal={false} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  );
}
