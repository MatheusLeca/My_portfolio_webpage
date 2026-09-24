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
    titleLines: [{ text: "Hello, World!", accent: false, typed: true }, { text: "I'm Matheus Leca", accent: true }],
    // Short pitch rendered as stacked paragraphs under the hero title. A
    // paragraph may carry a `bold` lead-in segment (rendered emphasized)
    // before its regular `text`.
    summary: [
      { text: "I build software that turns complex ideas into reliable, useful experiences." },
      {
        text: "From full-stack web applications and backend systems to mobile apps, cloud infrastructure, and immersive experiences, I enjoy solving challenging problems and bringing them to life through code.",
      },
      {
        bold: "Software Engineer and M.Sc. in Electrical and Computer Engineering from the University of Calgary",
        text: ", with experience across enterprise, government, academic, and personal projects.",
      },
    ],
    // Single hero CTA is the resume download (see `resume` below); the
    // outline "View Work" button was removed from the Hero.
    portraitSrc: "/images/portrait.jpg",
    portraitAlt: "Matheus Leca speaking into a microphone at a podium",
    portraitPlaceholderLabel: "Profile photo placeholder",
    portraitInitials: "ML",
  },
  about: {
    heading: "The engineer behind the code",
    subheading: "Curious about the problem. Serious about the solution.",
    // Each paragraph is a list of segments; a segment with `bold: true` is
    // rendered emphasized. This supports bold spans anywhere in a paragraph
    // (unlike the hero's lead-in-only `bold` field).
    paragraphs: [
      [
        {
          text: "I enjoy going beyond the obvious to understand what makes a problem worth solving and what makes a solution work well.",
        },
      ],
      [
        {
          text: "Good engineering, to me, is about asking the right questions, making thoughtful decisions, and finding the balance between simplicity, reliability, and real-world needs. I like digging into the details, challenging assumptions, and continuously looking for better ways to build.",
        },
      ],
      [
        {
          text: "I am at my best when I can learn something new, work through a difficult problem, and turn that understanding into something useful.",
        },
      ],
      [
        {
          text: "Outside of software, I enjoy exploring new places, spending time in nature, and finding new things to learn.",
        },
      ],
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
    heading: "Core competencies",
    groups: [
      {
        title: "Languages",
        description:
          "The languages I use across backend services, web and mobile applications, automation, and data-driven software.",
        tags: ["Java", "C#", "Python", "JavaScript", "TypeScript", "SQL"],
      },
      {
        title: "Backend & APIs",
        description:
          "Building backend services, APIs, integrations, and business logic with a focus on clean, maintainable solutions.",
        tags: ["Spring", "Spring Boot", ".NET", "ASP.NET Core", "Node.js", "Express", "REST APIs"],
      },
      {
        title: "Frontend & Mobile",
        description:
          "Developing responsive web and mobile experiences across modern frontend frameworks and native Apple platforms.",
        tags: ["React", "Angular", "Ionic", "HTML", "CSS", "Swift", "SwiftUI"],
      },
      {
        title: "Databases",
        description:
          "Working with relational and document databases to design and support reliable application data.",
        tags: ["PostgreSQL", "SQL Server", "MongoDB"],
      },
      {
        title: "Cloud & DevOps",
        description:
          "Building, testing, and deploying software with cloud platforms, containers, version control, and automated delivery workflows.",
        tags: ["AWS", "Docker", "Git", "GitHub Actions", "CI/CD"],
      },
      {
        title: "Software Engineering",
        description:
          "Applying engineering practices that support reliable software, maintainable architectures, and effective collaboration throughout the development lifecycle.",
        tags: ["Clean Architecture", "SOLID", "Microservices", "TDD", "Unit Testing", "Integration Testing", "Agile/Scrum"],
      },
    ],
  },
  experience: {
    heading: "Career timeline",
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
    heading: "Selected work",
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
    // PDF asset in public/files; Hero prefixes NEXT_BASE_PATH at build
    // time so the link also works on the sub-path static fallback host.
    href: "/files/Matheus_Leca_Resume_Java_Engineer.pdf",
    placeholder: false,
  },
  contact: {
    headingLines: ["Let's", "Work", "Together"],
    subcopy:
      "Have a role or project in mind? Send a message using the form or reach out directly by email.",
    // Owner's public contact address.
    email: "contact@matheusleca.dev",
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
