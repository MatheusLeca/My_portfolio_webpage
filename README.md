# Landing Page — personal portfolio

Single-page portfolio of Matheus Leca, Software Engineer.
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

| Variable                         | Where                     | Purpose                                                        |
| -------------------------------- | ------------------------- | -------------------------------------------------------------- |
| `RESEND_API_KEY`                 | Worker secret             | Resend API key used by the contact Worker to send mail         |
| `CONTACT_TO`                     | Worker secret             | Recipient address for contact messages                         |
| `CONTACT_FROM`                   | Worker secret             | Verified Resend sender address                                  |
| `NEXT_PUBLIC_CONTACT_ENDPOINT`   | Build time                | Contact Worker URL (e.g. `https://landing-page-contact.<account>.workers.dev`) |
| `NEXT_PUBLIC_FIREBASE_*`         | Build time                | Public Firebase web app configuration                          |
| `NEXT_BASE_PATH`                 | Build time, optional      | Sub-path prefix when serving from a project page                |
| `NEXT_PUBLIC_SITE_URL`           | Build time, optional      | Public origin for canonical URLs, sitemap, and robots metadata |

Never put secrets in `NEXT_PUBLIC_*` variables or commit them.

For the optional Firebase Cloud Function backend (requires Blaze plan) the
secrets move to Firebase Secret Manager (`firebase functions:secrets:set
RESEND_API_KEY` etc.) and `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is added for App
Check.

## Contact delivery

The form POSTs JSON to `NEXT_PUBLIC_CONTACT_ENDPOINT` (default
`/api/contact` for server-capable hosts). The primary backend is a free
Cloudflare Worker (`worker/contact.ts`): it validates via the shared
validator (`functions/src/contact.ts`), applies a honeypot and best-effort
rate limit, and sends through Resend.

One-time Worker setup:

```bash
npx wrangler login
npm run deploy:worker
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put CONTACT_TO
npx wrangler secret put CONTACT_FROM
```

Verify the Resend sender domain before deploying. Then build the site with
`NEXT_PUBLIC_CONTACT_ENDPOINT` set to the Worker URL.

The Firebase callable (`functions/src/index.ts`, App Check enforced) is kept
as an optional backend for a Blaze-enabled deployment:
`npm run deploy:functions`. The Next.js `/api/contact` route serves
server-capable hosts (Vercel) and is not part of static Firebase Hosting.

## Deployment

- **Primary host (Firebase Hosting + Cloudflare Worker, free tier):** deploy the Worker with `npm run deploy:worker`, then deploy static output with `NEXT_PUBLIC_CONTACT_ENDPOINT=<worker-url> npm run build:static && firebase deploy --only hosting`.
- **Optional Cloud Function (Blaze plan):** `npm run deploy:functions` — callable with App Check enforcement; switch the form's endpoint wiring to the callable.
- **Server fallback (Vercel):** import this repo in the Vercel dashboard; default endpoint `/api/contact` needs no configuration.
- **GitHub Pages fallback:** the `Deploy static export to GitHub Pages` workflow builds `npm run build:static` with `NEXT_BASE_PATH=/Landing-Page` and publishes `out/`.

## Testing

| Command        | Description                                                 |
| -------------- | ----------------------------------------------------------- |
| `npm test`     | Run unit tests (Vitest): validation, Worker/function, UI    |

App Check enforcement (optional Cloud Function only) is verified against
the deployed function: a call without a valid App Check token must be
rejected. Run that check after each function deployment.

## Content
Owner-editable strings live behind a single content seam (`lib/content`),
so copy, links, and placeholder content update without touching layout.
Placeholders (portrait, stats, projects, resume, some social URLs) are
explicit entries replaced with real content in later slices.
