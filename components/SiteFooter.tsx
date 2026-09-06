import SampleBadge from "@/components/SampleBadge";
import { siteContent } from "@/lib/content";

/**
 * Renders one social registry entry as a secure new-tab link. Entries
 * without a destination stay out of the public render entirely (never a
 * dead link) and appear automatically once the owner adds their URL.
 */
export function SocialEntry({ label, href, placeholder }: { label: string; href: string | null; placeholder: boolean }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-muted uppercase transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
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
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-4 py-8 sm:px-6 md:flex-row">
        <p className="font-display text-sm font-bold tracking-[0.2em] text-foreground">
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
        <p className="text-[11px] tracking-[0.14em] text-muted uppercase">
          © 2026 Matheus de Morais Leça
        </p>
      </div>
    </footer>
  );
}
