import About from "@/components/About";
import Hero from "@/components/Hero";
import SiteNav from "@/components/SiteNav";
import Skills from "@/components/Skills";
import Work from "@/components/Work";
import { siteContent } from "@/lib/content";

export default function Home() {
  return (
    <div id="top">
      <SiteNav />
      {/* Remaining section anchor (contact) lands
          with Slice 6; the nav href already targets it. */}
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Work />
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
