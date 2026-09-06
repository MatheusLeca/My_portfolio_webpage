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
  about: {
    eyebrow: "ABOUT",
    heading: "The engineer behind the code.",
    paragraphs: [
      "Software Engineer and Computer Scientist passionate about tackling complex problems with technology.",
      "MSc student in Electrical and Computer Engineering at the University of Calgary, balancing technical depth with project coordination and agile development practices.",
      "Deeply interested in Web and Mobile Development, CI/CD, Cloud Computing, Artificial Intelligence and Machine Learning.",
    ],
    // Sample metrics: layout placeholders only. The owner replaces these
    // with verified numbers before any public launch.
    stats: [
      { value: "08+", label: "Years experience", placeholder: true },
      { value: "120", label: "Projects shipped", placeholder: true },
    ],
    portraitPlaceholderLabel: "Workspace photo placeholder",
    portraitInitials: "ML",
  },
  skills: {
    eyebrow: "EXPERTISE",
    heading: "Core competencies.",
    groups: [
      {
        title: "Languages",
        description: "Core languages used across backend, web, and scripting work.",
        tags: ["C#", "Java", "Python", "JavaScript", "TypeScript"],
      },
      {
        title: "Frameworks & Libraries",
        description: "Frameworks and libraries used to build web applications and services.",
        tags: [".NET", "Spring", "Node.js", "React", "Angular", "Ionic"],
      },
      {
        title: "Databases",
        description: "Relational and document stores used for persistence.",
        tags: ["SQL Server", "PostgreSQL", "MongoDB"],
      },
      {
        title: "Cloud & DevOps",
        description: "Platforms and delivery practices, including ongoing cloud study.",
        tags: ["AWS", "Azure", "Terraform", "Jenkins", "Docker", "CI/CD"],
      },
      {
        title: "Tools & Testing",
        description: "Testing and workflow tooling around everyday development.",
        tags: ["Git", "Jasmine", "JUnit"],
      },
    ],
  },
} as const;

export type SiteContent = typeof siteContent;
