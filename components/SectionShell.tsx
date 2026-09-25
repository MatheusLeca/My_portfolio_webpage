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

/**
 * Shared portfolio section shell.
 *
 * Every section owns exactly one viewport when landed on: the shell's
 * min-height is recalculated by the browser from the live small viewport
 * (`100svh` minus the sticky nav height at the current breakpoint) and the
 * content is vertically centered (`justify-center`). Leftover space
 * (viewport − nav − content) is therefore split equally above/below by flex,
 * on every resize and browser zoom — no fixed px gaps, no JS, no
 * zoom-specific values. Short sections (About, Expertise, Work) never show
 * the next section peeking in; tall sections (Experience) simply grow past
 * the floor and scroll normally.
 * - Outer: `relative isolate` + anchor offset tracking the sticky nav height
 *   (`scroll-mt-16`, `xl:scroll-mt-20`, `2xl:scroll-mt-[5.5rem]`) so anchor
 *   jumps land flush at the nav bottom.
 * - Inner: `max-w-6xl px-4 sm:px-6` centered container shared with SiteNav/Footer,
 *   widening to `xl:max-w-7xl` and `2xl:max-w-[96rem]` (with `lg:px-8`).
 * - `align` only controls cross-axis items in split layouts, never vertical centering.
 * - `layout="split"` = md 2-col, `split-lg` = lg 2-col, `stacked` = single.
 * - `spacing="compact"` = tighter mobile grid gap for tall split sections
 *   (Contact zoom hotfix, About's photo-led stack); the outer rhythm is
 *   identical for every variant.
 */
const OUTER_BASE =
  "relative isolate flex flex-col justify-center scroll-mt-16 xl:scroll-mt-20 2xl:scroll-mt-[5.5rem] min-h-[calc(100svh-4rem)] xl:min-h-[calc(100svh-5rem)] 2xl:min-h-[calc(100svh-5.5rem)]";

const INNER_BASE =
  "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl 2xl:max-w-[96rem]";

// One outer rhythm for every section: pt-6 (24px) on mobile — the same space
// above a title as above the Hero/About photos — pb-10 bottom, converging to
// the standard md:py-12 from md up (equal space above and below on desktop).
// From xl up the rhythm opens up (xl:py-16, 2xl:py-20) so tall viewports keep
// proportional breathing room instead of compressing content into a thin band.
// Combined with the scroll-mt-16 anchor in OUTER_BASE, an anchor jump puts any
// title or photo exactly 24px below the nav on mobile and 48px below the nav
// from md up — the same gap as above the Hero title.
const OUTER_SPACING = "pt-6 pb-10 md:py-12 xl:py-16 2xl:py-20";

function layoutClass(
  layout: SectionLayout,
  align: SectionAlign,
  spacing: SectionSpacing,
): string {
  const items = align === "start" ? "md:items-start" : "md:items-center";
  const itemsLg = align === "start" ? "lg:items-start" : "lg:items-center";
  // Compact keeps the Contact zoom hotfix as a system variant (also used by
  // About's photo-led stack): tighter grid gap on small screens, converging
  // to the standard gap-12 from md up. From xl up the gap opens (xl:gap-16,
  // 2xl:gap-20) so two-column layouts breathe on wide desktops.
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
      // Single column: heading block + content block with one shared gap so
      // title-to-content (e.g. "Core competencies" -> rows,
      // "Career timeline" -> timeline, "Selected work" -> cards) is
      // identical everywhere (32px = the original mt-8 rhythm).
      // From xl up the stack opens slightly so tall viewports keep
      // proportional rhythm. Content elements must NOT add their own mt.
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
  // One viewport per section: the min-h floor makes the shell exactly fill
  // the anchor-landed viewport for short content (centered via
  // justify-center, so leftover space splits equally above/below), while
  // tall content grows past the floor and scrolls. 100svh + nav-relative
  // calc recalculate live on every resize/zoom — nothing is hardcoded.
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
