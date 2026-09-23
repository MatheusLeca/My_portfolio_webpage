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
  /** Full-viewport hero-style sections: min height of the viewport minus the
   *  4rem sticky nav, content centered vertically. */
  fullHeight?: boolean;
  children: ReactNode;
}

/**
 * Shared portfolio section shell.
 *
 * One outer spacing system for every section so header-to-content distance,
 * horizontal padding, max width, and footer rhythm stay identical:
 * - Outer: `relative isolate` + `scroll-mt-20` anchor offset for the 4rem
 *   sticky nav. `fullHeight` adds `min-h-[calc(100svh-4rem)]` and centers
 *   content vertically; every other section flows naturally from the top.
 * - Inner: `max-w-6xl px-4 sm:px-6` centered container shared with SiteNav/Footer.
 * - `align` only controls cross-axis items in split layouts, never vertical centering.
 * - `layout="split"` = md 2-col, `split-lg` = lg 2-col, `stacked` = single.
 * - `spacing="compact"` = tighter mobile top padding for tall sections; both
 *   variants converge to the same desktop rhythm.
 */
const OUTER_BASE = "relative isolate flex scroll-mt-20 flex-col";

const INNER_BASE = "mx-auto w-full max-w-6xl px-4 sm:px-6";

const SPACING_CLASS: Record<SectionSpacing, string> = {
  // Single top rhythm at every breakpoint so nav-to-title is identical.
  // Compact only tightens the split grid gap on small screens (Contact zoom
  // hotfix), never the outer top padding.
  default: "py-10 md:py-16",
  compact: "py-10 md:py-16",
};

function layoutClass(
  layout: SectionLayout,
  align: SectionAlign,
  spacing: SectionSpacing,
): string {
  const items = align === "start" ? "md:items-start" : "md:items-center";
  const itemsLg = align === "start" ? "lg:items-start" : "lg:items-center";
  // Compact keeps the Contact zoom hotfix as a system variant: tighter grid
  // gap on small screens, converging to the standard gap-12 from md up.
  const gap = spacing === "compact" ? "gap-8 md:gap-12" : "gap-12";
  switch (layout) {
    case "split":
      return `grid ${gap} md:grid-cols-2 ${items}`;
    case "split-lg":
      return `grid ${gap} lg:grid-cols-[1.1fr_0.9fr] ${itemsLg}`;
    case "stacked":
    default:
      // Single column: heading block + content block with one shared gap so
      // title-to-content (e.g. "Core competencies." -> rows,
      // "Career timeline." -> timeline, "Selected work." -> cards) is
      // identical everywhere (32px = the original mt-8 rhythm).
      // Content elements must NOT add their own mt.
      return "flex flex-col gap-8";
  }
}

export default function SectionShell({
  id,
  labelledBy,
  align = "center",
  layout = "stacked",
  spacing = "default",
  fullHeight = false,
  children,
}: SectionShellProps) {
  // Full-viewport sections center their content vertically; all other
  // sections are natural flow, so nav-to-title never shifts with content
  // length.
  const outer = fullHeight
    ? `${OUTER_BASE} min-h-[calc(100svh-4rem)] justify-center`
    : `${OUTER_BASE} justify-start`;

  return (
    <section id={id} aria-labelledby={labelledBy} className={outer}>
      <div className={`${INNER_BASE} ${SPACING_CLASS[spacing]}`}>
        <div className={layoutClass(layout, align, spacing)}>{children}</div>
      </div>
    </section>
  );
}
