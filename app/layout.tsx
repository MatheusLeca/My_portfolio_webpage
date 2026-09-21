import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const SITE_NAME = "Matheus Leca — Software Engineer";
const SITE_DESCRIPTION =
  "Portfolio of Matheus Leca, Software Engineer and MSc student in Electrical and Computer Engineering at the University of Calgary.";

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  authors: [{ name: "Matheus Leca" }],
  keywords: [
    "Software Engineer",
    "Portfolio",
    "TypeScript",
    "React",
    "Next.js",
    "Web Development",
    "University of Calgary",
  ],
  robots: { index: true, follow: true },
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? { alternates: { canonical: "/" } }
    : {}),
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

// Structured Person metadata for search engines. No custom domain yet, so
// no canonical URL field until NEXT_PUBLIC_SITE_URL is configured.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Matheus Leca",
  jobTitle: "Software Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Calgary",
  },
  sameAs: [
    "https://github.com/MatheusMarinhoLeca",
    "https://www.linkedin.com/in/matheus-marinho-b47500204/",
  ],
};

// Applies a stored theme choice before first paint so the toggle never
// flashes the wrong mode. Runs before React hydrates; keep it dependency-free.
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // The pre-paint theme script sets data-theme before hydration, which
      // React would otherwise flag as an attribute mismatch.
      suppressHydrationWarning
      // Smooth scrolling comes from the reduced-motion-guarded rule in
      // globals.css, never from an unconditional utility class.
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-full focus:bg-action focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-on-action"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
