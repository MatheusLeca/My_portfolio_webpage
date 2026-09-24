/**
 * Contact-form validation shared by the client (instant feedback) and the
 * server route (authoritative). Single source of truth lives in
 * `functions/src/contact.ts` so the deployed Cloud Function bundles it
 * without reaching outside its source directory; this module re-exports
 * it for the app (`@/lib/contact`).
 */

export * from "../functions/src/contact";
