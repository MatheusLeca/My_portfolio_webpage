import About from "@/components/About";
import Hero from "@/components/Hero";
import SiteNav from "@/components/SiteNav";
import { siteContent } from "@/lib/content";

export default function Home() {
  return (
    <div id="top">
      <SiteNav />
      {/* Remaining section anchors (expertise, work, contact) land
          with Slices 3–6; nav hrefs already target them. */}
      <main id="main">
        <Hero />
        <About />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
          <p className="font-display text-xs font-bold tracking-[0.2em] text-foreground">
            {siteContent.brand.wordmark}
          </p>
          <p className="text-[11px] tracking-[0.14em] text-muted uppercase">
            © 2026 Matheus de Morais Leça
          </p>
        </div>
      </footer>
    </div>
  );
}
