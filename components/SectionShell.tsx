import type { ReactNode } from "react";

type SectionAlign = "center" | "start";
type SectionLayout = "stacked" | "split" | "split-lg";
type SectionSpacing = "default" | "compact";

interface SectionShellProps {
  id?: string;
  labelledBy?: string;
  align?: SectionAlign;
  layout?: SectionLayout;
  spacing?: SectionSpacing;
  children: ReactNode;
}

const OUTER_BASE =
  "relative isolate flex flex-col justify-center scroll-mt-16 xl:scroll-mt-20 2xl:scroll-mt-[5.5rem] min-h-[calc(100svh-4rem)] xl:min-h-[calc(100svh-5rem)] 2xl:min-h-[calc(100svh-5.5rem)]";

const INNER_BASE =
  "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl 2xl:max-w-[96rem]";

const OUTER_SPACING = "pt-6 pb-10 md:py-12 xl:py-16 2xl:py-20";

function layoutClass(
  layout: SectionLayout,
  align: SectionAlign,
  spacing: SectionSpacing,
): string {
  const items = align === "start" ? "md:items-start" : "md:items-center";
  const itemsLg = align === "start" ? "lg:items-start" : "lg:items-center";
  const gap =
    spacing === "compact"
      ? "gap-8 md:gap-12 xl:gap-16 2xl:gap-20"
      : "gap-12 xl:gap-16 2xl:gap-20";
  switch (layout) {
    case "split":
      return `grid ${gap} md:grid-cols-2 ${items}`;
    case "split-lg":
      return `grid ${gap} lg:grid-cols-[1.1fr_0.9fr] ${itemsLg}`;
    case "stacked":
    default:
      return "flex flex-col gap-8 xl:gap-10 2xl:gap-12";
  }
}

export default function SectionShell({
  id,
  labelledBy,
  align = "center",
  layout = "stacked",
  spacing = "default",
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={OUTER_BASE}
    >
      <div className={`${INNER_BASE} ${OUTER_SPACING}`}>
        <div className={layoutClass(layout, align, spacing)}>{children}</div>
      </div>
    </section>
  );
}
