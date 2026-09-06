import { siteContent } from "@/lib/content";

export default function SiteNav() {
  const { brand, nav } = siteContent;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-nav/95 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <a
          href={brand.homeHref}
          className="font-display text-sm font-bold tracking-[0.2em] text-foreground"
        >
          {brand.wordmark}
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[11px] font-medium tracking-[0.18em] text-muted uppercase transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-nav focus-visible:outline-none"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={nav.cta.href}
          className="hidden items-center rounded-full bg-primary px-5 py-2 text-[11px] font-bold tracking-[0.18em] text-white uppercase transition-colors hover:bg-primary-strong focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-nav focus-visible:outline-none sm:inline-flex"
        >
          {nav.cta.label}
        </a>
        {/* Collapsed navigation lands in Slice 7; one anchor keeps mobile usable now. */}
        <a
          href={nav.cta.href}
          className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-[11px] font-bold tracking-[0.18em] text-white uppercase sm:hidden"
        >
          {nav.cta.label}
        </a>
      </nav>
    </header>
  );
}
