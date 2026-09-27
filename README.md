# Still at Home

A bilingual at-home wellness demonstration built on the existing Next.js App Router project. Its visual theme uses pine green as the single brand color, balanced with warm neutrals and original botanical studio imagery. The site includes an English and Bahasa Indonesia catalog, fictional therapist profiles, local favorites and recent views, coverage examples, FAQ search, and an eight-step booking request preview.

## Run locally

Requires Node.js 22.13 or later and npm.

```bash
npm ci
npm run dev
```

Open `http://127.0.0.1:3000`.

## Verify

```bash
npm run typecheck
npm run lint
npm test
npx playwright install chromium
npm run test:e2e
npm run build
```

The browser tests cover 360, 390, 430, 768, 1024, 1280, 1440, and 1920 pixel layouts; treatment and FAQ search; category filters; favorites; localized details and price changes; language persistence; demo availability; the complete booking flow; image loading; and the PNG sharing route.

## Demo data and business setup

The default configuration is a **demonstration**. Prices, therapists, ratings, session counts, coverage, time slots, promotions, testimonials, and example customer history are fictional. UI labels identify these as demo content. No certification, medical claim, real customer quote, or actual service coverage is asserted.

Real business settings live in `src/config/business.ts`. Typed demo collections live in `src/data/`. Bilingual interface copy lives in `src/locales/en.ts` and `src/locales/id.ts`. Treatment prices are stored in whole IDR units and vary by duration.

Set `NEXT_PUBLIC_ENABLE_DEMO_REVIEWS=false` to hide fictional testimonials. The `live` configuration mode starts with empty business collections so real listings must be supplied deliberately. Do not switch to live mode or publish without confirming the owner's offerings, coverage, prices, policies, and authorized WhatsApp number.

`whatsappNumber` is intentionally `null`. Visitors can complete the demonstration and copy a prepared message, but the site does not offer a WhatsApp handoff until an owner-authorized number is configured. Opening a WhatsApp link only prepares a message; it never confirms a booking or sends it automatically. The site has no payment processing, account system, or booking backend.

Language, favorite treatment IDs, and up to four recently viewed IDs are stored in browser local storage. Name, address, consent, and the unsent booking draft remain in page memory only.

## Project structure

- `src/app`: page composition, metadata, visual styles, and sharing image.
- `src/components/sections`: landing page sections and discovery interactions.
- `src/components/booking`: guided request, validation UI, and summary.
- `src/components/providers`: locale and local preference state.
- `src/config`: business settings, types, and image registry.
- `src/data`: fictional demonstration content.
- `src/lib`: pure catalog, availability, formatting, validation, persistence, and WhatsApp helpers.
- `public/images`: optimized original generated visuals.
- `tests`: unit, component, and browser checks.

Asset provenance and the generation brief are recorded in `docs/assets.md`.
