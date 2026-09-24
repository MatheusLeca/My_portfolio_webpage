import type { ReactNode } from "react";

type SectionAlign = "center" | "start";
type SectionLayout = "stacked" | "split" | "split-lg";
type SectionSpacing = "default" | "compact" | "photo-lead";

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
 *   sticky nav (photo-led sections use `scroll-mt-16` on mobile so the photo
 *   lands exactly the Hero's 24px below the nav after an anchor jump).
 *   `fullHeight` adds `min-h-[calc(100svh-4rem)]` and centers content
 *   vertically; every other section flows naturally from the top.
 * - Inner: `max-w-6xl px-4 sm:px-6` centered container shared with SiteNav/Footer.
 * - `align` only controls cross-axis items in split layouts, never vertical centering.
 * - `layout="split"` = md 2-col, `split-lg` = lg 2-col, `stacked` = single.
 * - `spacing="compact"` = tighter mobile grid gap for tall sections (Contact
 *   zoom hotfix); outer padding stays py-10 / md:py-16.
 * - `spacing="photo-lead"` = compact grid gap + Hero-matched pt-6 mobile top
 *   padding for sections whose photo leads the mobile stack; every variant
 *   converges to the same md:py-16 desktop rhythm.
 */
const OUTER_BASE = "relative isolate flex flex-col";

const INNER_BASE = "mx-auto w-full max-w-6xl px-4 sm:px-6";

const SPACING_CLASS: Record<SectionSpacing, string> = {
  // Single top rhythm at every breakpoint so nav-to-title is identical.
  // Compact only tightens the split grid gap on small screens (Contact zoom
  // hotfix), never the outer top padding.
  default: "py-10 md:py-16",
  compact: "py-10 md:py-16",
  // Photo-led sections (photo on top of the mobile stack) match the Hero's
  // tightened photo spacing: pt-6 (24px) above the photo on mobile instead of
  // 40px, same pb-10 bottom, converging to the standard md:py-16 from md up.
  "photo-lead": "pt-6 pb-10 md:py-16",
};

// Anchor landing below the 4rem sticky nav. Text-led sections keep 16px of
// slack (80px) so headings never butt against the nav after an anchor jump.
// Photo-led sections land flush at the nav bottom on mobile, so the space
// above the photo is exactly the Hero's pt-6 (24px); from md up they rejoin
// the shared 80px offset that locks section tops 144px from the viewport top.
const ANCHOR_OFFSET: Record<SectionSpacing, string> = {
  default: "scroll-mt-20",
  compact: "scroll-mt-20",
  "photo-lead": "scroll-mt-16 md:scroll-mt-20",
};

function layoutClass(
  layout: SectionLayout,
  align: SectionAlign,
  spacing: SectionSpacing,
): string {
  const items = align === "start" ? "md:items-start" : "md:items-center";
  const itemsLg = align === "start" ? "lg:items-start" : "lg:items-center";
  // The tight variants (compact = Contact zoom hotfix, photo-lead = photo on
  // top of the mobile stack) share the tighter mobile grid gap, converging
  // to the standard gap-12 from md up.
  const gap = spacing === "default" ? "gap-12" : "gap-8 md:gap-12";
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
    ? `${OUTER_BASE} ${ANCHOR_OFFSET[spacing]} min-h-[calc(100svh-4rem)] justify-center`
    : `${OUTER_BASE} ${ANCHOR_OFFSET[spacing]} justify-start`;

  return (
    <section id={id} aria-labelledby={labelledBy} className={outer}>
      <div className={`${INNER_BASE} ${SPACING_CLASS[spacing]}`}>
        <div className={layoutClass(layout, align, spacing)}>{children}</div>
      </div>
    </section>
  );
}
