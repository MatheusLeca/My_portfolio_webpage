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
        tags: ["Java", "C#", "Python", "JavaScript", "TypeScript"],
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
            tags: ["Unity 6", "C#", "HTML", "CSS", "JavaScript", ".NET", "EF Core", "PostgreSQL", "Git", "GitHub", "GitHub Actions", "Docker", "DigitalOcean", "Unity WebGL"],
            bullets: [
              "Led the development of a cross-platform safety-training simulator using Unity 6, C#, HTML, CSS, and JavaScript to train employees to identify workplace hazards through immersive 3D and 360° scenarios across web, mobile, desktop, and Meta Quest VR.",
              "Built an online training backend using .NET, EF Core, and PostgreSQL to manage training level creation and availability, sharing, leaderboards, and employee submissions with Clean Architecture.",
              "Automated deployments, database migrations, and testing using Git, GitHub, GitHub Actions, Docker, and DigitalOcean, applying Test-Driven Development to support reliable delivery.",
              "Engineered a custom Unity WebGL asset pipeline with automated asset splitting, parallel downloads, and client-side reassembly to overcome the 100 MB hosting limit and enable deployment of the full simulator.",
            ],
          },
          {
            title: "Teaching Assistant",
            dates: "Sep 2024 — Apr 2026",
            duration: "1 yr 8 mo",
            tags: ["Java", "Spring", "Spring Boot", "HTML", "CSS", "JavaScript", "Python", "MySQL", "MongoDB"],
            bullets: [
              "Improved students' understanding of software architecture and design patterns using Java, Spring, Spring Boot, HTML, CSS, and JavaScript through lectures and practical instruction on microservices and modular monoliths.",
              "Strengthened students' object-oriented programming and data structures skills using Python, MySQL, and MongoDB by providing individualized guidance and feedback on labs, assignments, and projects.",
              "Supported programming, databases, software design, architecture, and web development instruction across six undergraduate and graduate courses, helping students develop practical skills in these areas.",
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
            tags: ["Java", "Spring Boot", "Angular", "Kafka", "Ionic", "REST APIs", "RabbitMQ", "AWS", "C#", ".NET", "HTML", "CSS", "JavaScript", "Git", "GitHub", "GitHub Actions", "Linux", "Unix"],
            bullets: [
              "Led the development of an enterprise application using Java, Spring Boot, microservices, Angular, and Kafka to manage inventory and predict repositioning needs, streamlining government workflows and reducing operational costs while collaborating with stakeholders to refine requirements and deliver requested features.",
              "Digitized electricity-service operations using Ionic, REST APIs, RabbitMQ, and AWS to monitor service availability and requests and automate asynchronous data exchange, improving operational efficiency and supporting revenue growth.",
              "Developed and optimized a flood-monitoring application using C#, .NET, HTML, CSS, and JavaScript to collect real-time water-level data and support emergency-service responses.",
              "Improved application maintainability by applying SOLID principles and supported reliable delivery using Git, GitHub, and GitHub Actions for automated CI/CD and testing across Linux and Unix environments throughout the Software Development Life Cycle (SDLC), following Agile/Scrum practices and conducting code reviews.",
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
            tags: ["React", "Vue", "jQuery", "HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB", "AWS", "Git", "GitLab"],
            bullets: [
              "Developed React, Vue, jQuery, HTML, CSS, and JavaScript workflows to digitize and streamline social-security accounting processes, reducing software costs by collaborating with stakeholders to refine functional and non-functional requirements.",
              "Enabled reliable cloud deployment using Node.js, Express, MongoDB, and AWS, supporting scalable application hosting, backend services, and persistent application data.",
              "Improved software reliability using Git, GitLab, Test-Driven Development, Agile/Scrum and code reviews throughout the SDLC, supporting consistent and reliable feature delivery.",
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
            tags: ["JavaScript", "TypeScript", "Node.js", "OpenAI Assistants API"],
            bullets: [
              "Enhanced undergraduate learning using JavaScript, TypeScript, Node.js, and OpenAI Assistants API to develop an AI tutoring application integrated with Discord, providing accessible, on-demand academic support.",
              "Strengthened students' understanding of Theoretical Foundations of Computer Science through individualized explanations, feedback, and academic guidance.",
              "Improved learning and assessment by delivering lectures, creating and grading coursework, and holding weekly office hours to explain technical concepts in plain language and provide individualized support.",
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
        sourceUrl: "https://github.com/MatheusLeca/Easy_Pokedex",
        liveUrl: null,
        thumbnailLabel: "Easy Pokedex project preview placeholder",
        thumbnailInitials: "EP",
        placeholder: false,
      },
      {
        name: "Crud APS",
        description: "CRUD application built as university coursework.",
        tags: ["TypeScript"],
        sourceUrl: "https://github.com/MatheusLeca/Crud-APS",
        liveUrl: null,
        thumbnailLabel: "Crud APS project preview placeholder",
        thumbnailInitials: "CA",
        placeholder: false,
      },
      {
        name: "Sample Project",
        description: "A sample slot showing the card layout until a real project is added.",
        tags: ["Sample"],
        sourceUrl: "https://github.com/MatheusLeca?tab=repositories",
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
      { label: "LinkedIn", href: "https://www.linkedin.com/in/matheus-leca/", placeholder: false },
      { label: "GitHub", href: "https://github.com/MatheusLeca", placeholder: false },
      // Hidden until real destinations exist (owner request, 2026-09):
      // { label: "Medium", href: null, placeholder: true },
      // { label: "YouTube", href: null, placeholder: true },
      // { label: "X", href: null, placeholder: true },
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
