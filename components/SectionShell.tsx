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
 * - Outer: `relative isolate` + anchor offset for the 4rem sticky nav:
 *   `scroll-mt-16` on mobile (sections land flush at the nav bottom, so the
 *   pt-6 above a title or photo is the only space — the Hero's 24px),
 *   `scroll-mt-20` from md up (80px offset + md:py-16 locks section tops
 *   144px from the viewport top, matching the Hero). `fullHeight` adds
 *   `min-h-[calc(100svh-4rem)]` and centers content vertically; every other
 *   section flows naturally from the top.
 * - Inner: `max-w-6xl px-4 sm:px-6` centered container shared with SiteNav/Footer.
 * - `align` only controls cross-axis items in split layouts, never vertical centering.
 * - `layout="split"` = md 2-col, `split-lg` = lg 2-col, `stacked` = single.
 * - `spacing="compact"` = tighter mobile grid gap for tall split sections
 *   (Contact zoom hotfix, About's photo-led stack); the outer rhythm is
 *   identical for every variant.
 */
const OUTER_BASE =
  "relative isolate flex flex-col scroll-mt-16 md:scroll-mt-20";

const INNER_BASE = "mx-auto w-full max-w-6xl px-4 sm:px-6";

// One outer rhythm for every section: pt-6 (24px) on mobile — the same space
// above a title as above the Hero/About photos — pb-10 bottom, converging to
// the standard md:py-16 from md up. Combined with the scroll-mt-16 anchor in
// OUTER_BASE, an anchor jump puts any title or photo exactly 24px below the
// nav on mobile; from md up scroll-mt-20 keeps the 144px viewport-top lock.
const OUTER_SPACING = "pt-6 pb-10 md:py-16";

function layoutClass(
  layout: SectionLayout,
  align: SectionAlign,
  spacing: SectionSpacing,
): string {
  const items = align === "start" ? "md:items-start" : "md:items-center";
  const itemsLg = align === "start" ? "lg:items-start" : "lg:items-center";
  // Compact keeps the Contact zoom hotfix as a system variant (also used by
  // About's photo-led stack): tighter grid gap on small screens, converging
  // to the standard gap-12 from md up.
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
      <div className={`${INNER_BASE} ${OUTER_SPACING}`}>
        <div className={layoutClass(layout, align, spacing)}>{children}</div>
      </div>
    </section>
  );
}
