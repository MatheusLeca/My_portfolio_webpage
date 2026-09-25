import SectionShell from "@/components/SectionShell";
import WorkCarousel from "@/components/WorkCarousel";
import { siteContent } from "@/lib/content";

export default function Work() {
  const { work } = siteContent;

  return (
    <SectionShell id="work" labelledBy="work-heading">
      {/* WorkCarousel renders the heading + controls row and the Embla
       * track as one stacked block, preserving the section's gap-8 rhythm
       * the grid had. */}
      <WorkCarousel heading={work.heading} projects={work.projects} />
    </SectionShell>
  );
}

