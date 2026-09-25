# Landing Page — personal portfolio

Single-page portfolio of Matheus Leca, Software Engineer.
**Live:** [matheusleca.dev](https://matheusleca.dev)

## About

A single-page portfolio presenting Matheus Leca's background, skills, experience,
and selected work, with a contact form for roles and project inquiries.
All copy is edited in `lib/content.ts`.

## Features

- Light/dark theme toggle persisted in `localStorage`
- Typewriter hero, scroll progress bar, scroll-reveal sections
- Vanta DOTS hero background that follows the theme and skips reduced-motion
- Embla work carousel with keyboard and swipe support
- Responsive layout from mobile to wide desktop
- Contact form with validation, spam protection, and mailto fallback

![Portfolio demo](public/gifs/portfolio.gif)
![Portfolio on mobile](public/images/mobile.jpeg)

## Contents

- [About](#about)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Setup](#setup)
- [Commands](#commands)

## Tech stack

| | |
|---|---|
| Framework | Next.js 16, React 19, TypeScript 5 |
| Styling | Tailwind CSS 4 plus hand-written CSS for themes, animations, and motion guards |
| Contact | Cloudflare Worker (primary), optional Firebase callable, Resend via HTTPS |
| Tooling | ESLint, Vitest + Testing Library, Wrangler |
| Hosting | Firebase Hosting static export |

## Setup

```bash
npm ci
npm run dev
```

Copy is edited in `lib/content.ts`.

## Commands

| Command | Description |
| ------- | ----------- |
| `npm test` | Run the test suite |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Type check |
| `npm run build:static` | Static export into `out/` |
| `npm run deploy:worker` | Deploy the contact Worker |
| `npm run deploy:functions` | Build + deploy the Cloud Function (Blaze plan) |
