/**
 * Central content seam.
 *
 * All owner-editable strings live here so that updating copy, links, or
 * placeholder content never requires touching layout components.
 * Slices 2+ extend this module with their own sections.
 */

export const siteContent = {
  brand: {
    wordmark: "MATHEUS LECA",
    homeHref: "#top",
  },
  nav: {
    links: [
      { label: "About", href: "#about" },
      { label: "Expertise", href: "#expertise" },
      { label: "Experience", href: "#experience" },
      { label: "Work", href: "#work" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "HIRE ME", href: "#contact" },
    socials: { label: "SOCIALS", href: "#footer" },
  },
  hero: {
    eyebrow: "SOFTWARE ENGINEER",
    titleLines: [{ text: "MATHEUS LECA", accent: false }, { text: "& CODE THAT SHIPS", accent: true }],
    summary:
      "Software Engineer and MSc student in Electrical and Computer Engineering at the University of Calgary.",
    primaryCta: { label: "VIEW WORK", href: "#work" },
    portraitSrc: "/images/portrait.jpg",
    portraitAlt: "Matheus Leca speaking into a microphone at a podium",
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
    portraitSrc: "/images/landing.jpeg",
    portraitAlt: "Matheus Leca outdoors wearing a winter jacket",
    portraitPlaceholderLabel: "Workspace photo placeholder",
    portraitInitials: "ML",
  },
  skills: {
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
  experience: {
    heading: "Career timeline.",
    companies: [
      {
        name: "University of Calgary",
        initials: "UC",
        logo: "/images/ucalgary.jpg",
        location: "Calgary, CAN",
        roles: [
          {
            title: "Software Engineer",
            dates: "Apr 2025 — Aug 2026",
            duration: "1 yr 5 mo",
            tags: ["Unity 6", "C#", "ASP.NET Core", "PostgreSQL", "Docker", "CI/CD"],
            bullets: [
              "Shipped a cross-platform Unity 6 / C# safety-training simulator for web, mobile, desktop, and Meta Quest VR with scoring, navigation, and 3D/360° hazard training.",
              "Beat a 100 MB WebGL hosting limit with a custom asset pipeline using automated splitting, parallel downloads, and client-side reassembly.",
              "Built an ASP.NET Core / .NET backend (Clean Architecture, EF Core, PostgreSQL) for level sharing, leaderboards, and submissions.",
              "Delivered via Docker on DigitalOcean with GitHub Actions CI/CD and Spaces + CDN media serving.",
            ],
          },
          {
            title: "Teaching Assistant",
            dates: "Sep 2024 — Apr 2026",
            duration: "1 yr 8 mo",
            tags: ["Java", "Spring Boot", "Python", "MongoDB"],
            bullets: [
              "Taught software architecture and design patterns (microservices, modular monoliths) across 6 undergraduate and graduate courses.",
              "Coached courses spanning programming, databases, software design, and web development.",
              "Strengthened OOP and data-structures skills through Python labs with individualized feedback.",
            ],
          },
        ],
      },
      {
        name: "LogAp I.T. Solutions",
        initials: "LA",
        logo: "/images/logap.jpeg",
        logoFit: "cover",
        location: "BRA",
        roles: [
          {
            title: "Software Engineer",
            dates: "Feb 2023 — Aug 2024",
            duration: "1 yr 7 mo",
            tags: ["Java", "Spring Boot", ".NET", "Angular", "Ionic", "MSSQL"],
            bullets: [
              "Delivered enterprise web and mobile apps for government partners, digitizing public services.",
              "Cut operational costs 18% (SGNF) and 27% (BDGA) with Spring microservices; BDGA placed first in Regulatory Impacts at EGAESE.",
              "Drove 32% Q1 revenue growth at Águas Brasil via REST integrations with RabbitMQ messaging and Kafka event exchange.",
              "Cut API latency 80% and turnaround 60% (ALIEN, HidroObserva) with Java/Hibernate optimization and SOLID design.",
            ],
          },
        ],
      },
      {
        name: "Reciprev",
        initials: "RE",
        logo: "/images/reciprev.png",
        location: "BRA",
        roles: [
          {
            title: "Software Engineer",
            dates: "Oct 2021 — Feb 2023",
            duration: "1 yr 5 mo",
            tags: ["React", "Node.js", "MongoDB", "AWS"],
            bullets: [
              "Cut accounting software costs 36% in year one by digitizing processes with React, Node.js/Express, and MongoDB.",
              "Deployed reliably on AWS EC2 with Amazon RDS persistence.",
              "Practiced TDD, unit/e2e testing, and Agile/Scrum with GitLab code reviews.",
            ],
          },
        ],
      },
      {
        name: "Federal University of Pernambuco",
        initials: "UF",
        logo: "/images/ufpe.jpg",
        location: "BRA",
        roles: [
          {
            title: "Teaching Assistant",
            dates: "Jul 2022 — Mar 2024",
            duration: "1 yr 9 mo",
            tags: ["TypeScript", "Node.js", "OpenAI API"],
            bullets: [
              "Built Turing Tutor, an OpenAI Assistants API Discord bot expanding AI-assisted learning access.",
              "Taught Theoretical Foundations of Computer Science with individualized guidance.",
              "Delivered lectures, coursework, grading, and weekly office hours in plain language.",
            ],
          },
        ],
      },
    ],
  },
  work: {
    heading: "Selected work.",
    // Placeholder entries: the first two point at real public repositories;
    // the third is a sample slot. The owner curates this list with real
    // projects, screenshots, and demo links over time.
    projects: [
      {
        name: "Easy Pokedex",
        description:
          "A convenient tool for accessing detailed Pokémon information without having to capture them.",
        tags: ["Python"],
        sourceUrl: "https://github.com/MatheusMarinhoLeca/Easy_Pokedex",
        liveUrl: null,
        thumbnailLabel: "Easy Pokedex project preview placeholder",
        thumbnailInitials: "EP",
        placeholder: false,
      },
      {
        name: "Crud APS",
        description: "CRUD application built as university coursework.",
        tags: ["TypeScript"],
        sourceUrl: "https://github.com/MatheusMarinhoLeca/Crud-APS",
        liveUrl: null,
        thumbnailLabel: "Crud APS project preview placeholder",
        thumbnailInitials: "CA",
        placeholder: false,
      },
      {
        name: "Sample Project",
        description: "A sample slot showing the card layout until a real project is added.",
        tags: ["Sample"],
        sourceUrl: "https://github.com/MatheusMarinhoLeca?tab=repositories",
        liveUrl: null,
        thumbnailLabel: "Sample project preview placeholder",
        thumbnailInitials: "••",
        placeholder: true,
      },
    ],
  },
  socials: {
    heading: "Elsewhere",
    // href: null marks a not-yet-provided destination. Registry entries
    // render as plain text (never dead links) until the owner adds the URL,
    // and adding a future network is a one-entry addition here.
    entries: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/matheus-marinho-b47500204/", placeholder: false },
      { label: "GitHub", href: "https://github.com/MatheusMarinhoLeca", placeholder: false },
      { label: "Medium", href: null, placeholder: true },
      { label: "YouTube", href: null, placeholder: true },
      { label: "X", href: null, placeholder: true },
    ],
  },
  resume: {
    label: "Resume",
    // Set href to the resume asset once the owner provides the file;
    // null renders the visibly-marked placeholder state.
    href: null,
    placeholder: true,
  },
  contact: {
    headingLines: ["Let's", "Work", "Together"],
    subcopy:
      "Have a role or project in mind? Send a message using the form or reach out directly by email.",
    // Provisional recipient from the owner's public profile.
    email: "matheusmarinho.dev@gmail.com",
    form: {
      title: "Contact form",
      placeholders: {
        name: "Enter your name",
        email: "Enter your email",
        subject: "What is this about?",
        message: "Tell me about your role or project",
      },
      submit: "Send message",
      sending: "Sending…",
      errorSummaryTitle: "Please fix the following before sending:",
      successTitle: "Message sent.",
      successBody: "Thanks for reaching out — I will get back to you soon.",
      failureTitle: "Message not sent.",
      failureBody: "Something went wrong while sending. Please try again or email directly:",
      mailtoFallback: "email me directly",
    },
  },
} as const;

export type SiteContent = typeof siteContent;
