import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import Skills from "@/components/Skills";
import Work from "@/components/Work";

export default function Home() {
  return (
    <div id="top">
      <SiteNav />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Work />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
