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

| Variable                         | Where                | Purpose                                                        |
| -------------------------------- | -------------------- | -------------------------------------------------------------- |
| `RESEND_API_KEY`                 | Firebase secret      | Resend API key used by Cloud Function to send contact mail     |
| `CONTACT_TO`                     | Firebase secret      | Recipient address for contact messages                         |
| `CONTACT_FROM`                   | Firebase secret      | Verified Resend sender address                                  |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Build time           | Firebase App Check reCAPTCHA site key for contact function     |
| `NEXT_PUBLIC_FIREBASE_*`         | Build time           | Public Firebase web app configuration                          |
| `NEXT_BASE_PATH`                 | Build time, optional | Sub-path prefix when serving from a project page                |
| `NEXT_PUBLIC_SITE_URL`           | Build time, optional | Public origin for canonical URLs, sitemap, and robots metadata |

Never put secrets in `NEXT_PUBLIC_*` variables or commit them.

## Contact delivery

The Firebase-hosted site uses a callable Cloud Function named `sendContactMessage`. It validates submissions, enforces App Check, applies a honeypot and a best-effort rate limit, then sends through Resend.

Set secrets before deploying:

```bash
firebase functions:secrets:set RESEND_API_KEY
firebase functions:secrets:set CONTACT_TO
firebase functions:secrets:set CONTACT_FROM
npm run deploy:functions
```

Set `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` in the static build environment after registering the site with Firebase App Check. Verify the Resend sender domain before deployment. Cloud Functions requires Firebase Blaze billing. Function and client both use region `us-central1` — keep them in sync if you ever move the function.

The existing Next.js `/api/contact` route is retained for server-capable hosts but is not deployed by Firebase static Hosting.

## Deployment

- **Primary host (Firebase Hosting + Cloud Functions):** deploy static output with `npm run build:static` and `firebase deploy --only hosting`; deploy backend with `npm run deploy:functions`.
- **Server fallback (Vercel):** import this repo in the Vercel dashboard. The Next.js `/api/contact` route remains available for server-capable deployments.
- **GitHub Pages fallback:** the `Deploy static export to GitHub Pages` workflow builds `npm run build:static` with `NEXT_BASE_PATH=/Landing-Page` and publishes `out/`.

## Testing

| Command        | Description                                       |
| -------------- | ------------------------------------------------- |
| `npm test`     | Run unit tests (Vitest): validation, function, UI |

App Check enforcement is verified against the deployed function: a call
without a valid App Check token must be rejected. Run that check after each
deployment (e.g. with the callable temporarily enforced in a staging project
or the Firebase emulator).

## Content
Owner-editable strings live behind a single content seam (`lib/content`),
so copy, links, and placeholder content update without touching layout.
Placeholders (portrait, stats, projects, resume, some social URLs) are
explicit entries replaced with real content in later slices.
