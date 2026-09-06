# Landing Page — personal portfolio

Single-page portfolio of Matheus de Morais Leça, Software Engineer.
Next.js (App Router) + TypeScript + Tailwind CSS v4.

## Commands

| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start the development server             |
| `npm run build`      | Production build (primary server host)   |
| `npm run build:static` | Fully static export into `out/` (fallback host) |
| `npm run lint`       | Run ESLint                               |

`npm ci` works everywhere out of the box: `.npmrc` pins legacy peer
resolution for the React 19 type packages (see the comment inside).

## Environment

| Variable                        | Where               | Purpose                                                              |
| ------------------------------- | ------------------- | -------------------------------------------------------------------- |
| `RESEND_API_KEY`                | Server only (Vercel)| Sending contact mail through the Resend API                          |
| `CONTACT_TO`                    | Server only (Vercel)| Recipient address for contact messages                               |
| `CONTACT_FROM`                  | Server only (Vercel)| Verified sender address (or onboarding address for testing)          |
| `NEXT_PUBLIC_CONTACT_ENDPOINT`  | Build time, optional| Overrides the form target; set to an external form-service URL for fully static hosting |
| `NEXT_BASE_PATH`                | Build time, optional| Sub-path prefix (e.g. `/Landing-Page`) when serving from a project page |
| `NEXT_PUBLIC_SITE_URL`          | Build time, optional| Public origin (e.g. `https://example.com`) enabling canonical URLs, sitemap entries, and the sitemap reference in robots |

Without the Resend variables the contact API answers `503` and the form
shows its failure state with a direct-email fallback — no message is lost
silently. Never put secrets in `NEXT_PUBLIC_*` variables or commit them.

## Deployment

- **Primary host (Vercel):** import this repo in the Vercel dashboard —
  zero config, framework auto-detected. Connects to `main` with preview
  environments per pull request.
- **Fallback host (GitHub Pages):** the `Deploy static export to GitHub
  Pages` workflow builds `npm run build:static` with
  `NEXT_BASE_PATH=/Landing-Page` and publishes `out/` on every push to
  `main`. Needs one-time setup: repo Settings → Pages → Source
  “GitHub Actions”.

## Content

Owner-editable strings live behind a single content seam (`lib/content`),
so copy, links, and placeholder content update without touching layout.
Placeholders (portrait, stats, projects, resume, some social URLs) are
explicit entries replaced with real content in later slices.
