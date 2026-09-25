import SectionShell from "@/components/SectionShell";
import WorkCarousel from "@/components/WorkCarousel";
import { siteContent } from "@/lib/content";

export default function Work() {
  const { work } = siteContent;

  return (
    <SectionShell id="work" labelledBy="work-heading">
      <WorkCarousel heading={work.heading} projects={work.projects} />
    </SectionShell>
  );
}

