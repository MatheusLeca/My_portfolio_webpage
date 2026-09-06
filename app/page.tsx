import About from "@/components/About";
import Hero from "@/components/Hero";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import Skills from "@/components/Skills";
import Work from "@/components/Work";

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
      <SiteFooter />
    </div>
  );
}
