import SampleBadge from "@/components/SampleBadge";
import { siteContent } from "@/lib/content";

/**
 * Renders a social media link when a URL is configured, or placeholder text if unconfigured.
 */
export function SocialEntry({ label, href, placeholder }: { label: string; href: string | null; placeholder: boolean }) {
  if (!href) {
    return (
      <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-muted uppercase xl:text-xs 2xl:text-[13px]">
        {label}
        <SampleBadge />
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-muted uppercase transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none xl:text-xs 2xl:text-[13px]"
    >
      {label}
      {placeholder ? <SampleBadge /> : null}
      <span className="sr-only">(opens in new tab)</span>
    </a>
  );
}

export default function SiteFooter() {
  const { brand, socials } = siteContent;

  return (
    <footer id="footer" className="scroll-mt-20 border-t border-line bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-4 sm:px-6 md:flex-row md:py-5 lg:px-8 xl:max-w-7xl xl:py-6 2xl:max-w-[96rem]">
        <p className="font-display text-sm font-bold tracking-[0.2em] text-foreground xl:text-base 2xl:text-lg">
          {brand.wordmark}
        </p>
        <nav aria-label="Social links">
          <ul role="list" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {socials.entries.map((entry) => (
              <li key={entry.label}>
                <SocialEntry {...entry} />
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-[11px] tracking-[0.14em] text-muted uppercase xl:text-xs 2xl:text-[13px]">
            © 2026 Matheus Leca
        </p>
      </div>
    </footer>
  );
}
