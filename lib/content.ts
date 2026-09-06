/**
 * Central content seam.
 *
 * All owner-editable strings live here so that updating copy, links, or
 * placeholder content never requires touching layout components.
 * Slices 2+ extend this module with their own sections.
 */

export const siteContent = {
  brand: {
    wordmark: "MATHEUS LEÇA",
    homeHref: "#top",
  },
  nav: {
    links: [
      { label: "Work", href: "#work" },
      { label: "Expertise", href: "#expertise" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "HIRE ME", href: "#contact" },
  },
  hero: {
    eyebrow: "SOFTWARE ENGINEER",
    titleLines: [{ text: "MATHEUS LEÇA", accent: false }, { text: "& CODE THAT SHIPS", accent: true }],
    summary:
      "Software Engineer and MSc student in Electrical and Computer Engineering at the University of Calgary.",
    primaryCta: { label: "VIEW WORK", href: "#work" },
    // Placeholder until the owner provides the real resume file (Slice 5).
    resumeCta: { label: "RESUME — SOON", href: "#contact" },
    portraitPlaceholderLabel: "Profile photo placeholder",
    portraitInitials: "ML",
  },
} as const;

export type SiteContent = typeof siteContent;
