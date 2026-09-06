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
