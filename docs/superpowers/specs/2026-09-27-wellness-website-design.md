# Wellness Website Design

Date: 2026-09-27
Status: Approved on 2026-09-27; implementation in progress
Audience: The project owner and the engineers implementing the website

2026-09-28 amendment: The owner's later requests to replace the monochrome palette and avoid a template-like look supersede the neutral-only color and photo-grading directions in sections 4 and 5. The current site uses pine green as a single brand color with warm neutrals and botanical color edits of its original studio imagery.

## 1. Purpose and agreed direction

Build a complete, responsive, premium at-home massage, spa, and reflexology website. Visitors must be able to explore treatments, compare duration-dependent demonstration prices, check configured service areas, and prepare a booking request for the business through WhatsApp.

The user approved the design direction, then this written specification with “continue implementation.” The subsequent implementation plan was approved through ExitPlanMode. This specification remains the implementation's acceptance criteria.

The website is an original design, not a copy of Truly Home Massage. Its public interface, metadata, accessibility labels, documentation, filenames, and source identifiers are English. Currency remains Indonesian rupiah. No source-code comments, generated explanatory comments, commented-out code, or TODO annotations may be delivered in authored source files.

Success means a working application with reliable interactions and a polished responsive design, not a visual mockup. A missing business configuration must prevent outbound booking requests without preventing visitors from exploring the website.

## 2. Workspace and project boundary

The workspace is `/Users/rayh4ze/PROYEK UMUM`. The existing `KumaAnime-App` directory contains an unrelated Flutter application and must remain unchanged.

Create the new application in `wellness-website/`. Use Next.js App Router, React, strict TypeScript, Tailwind CSS, and npm. Resolve mutually compatible current stable versions when implementation begins and record exact resolved versions in the npm lockfile. Node.js 24.21.0 and npm 11.19.0 were available during discovery.

There is no Git repository at the workspace root or in the existing application. Do not initialize Git or create commits unless the user requests it. The design document stays in the new project's documentation directory.

## 3. Business facts and honest defaults

The public homepage at `https://trulyhomemassage.com/` was inspected on 2026-09-27. It describes visiting therapists providing at-home massage, spa, and reflexology. It publishes prices in Indonesian rupiah, several Indonesian service locations, and operating hours explicitly labeled WIB. Linked-page destinations, current availability, and business operations were not independently verified.

Those facts inform the business model, not the new brand's operational promises. Do not copy its phone numbers, identity, photography, reviews, certifications, transport promises, coverage claims, or policies.

Default configuration:

| Value | Default and public treatment |
| --- | --- |
| Brand | `Still at Home`, an editable demonstration identity, not a claim of affiliation or trademark clearance |
| Currency | `IDR`, formatted with the English interface locale and an unambiguous currency code |
| Business timezone | `Asia/Jakarta`; all requested dates and times explicitly use Jakarta time, WIB, UTC+07:00 |
| Pricing | Demonstration prices, labeled in the catalog and booking summary |
| WhatsApp number | Empty; requests cannot leave the site until an authorized number is configured |
| Service areas | Empty; show an honest unconfigured coverage state rather than borrowing reference coverage |
| Contact email and telephone | Empty; omit contact links until configured and explain that contact details are not configured |
| Operating hours | Unconfigured; display that hours are not yet provided, without inventing a schedule |
| Therapist preferences | Disabled; no preference field without supported business information |
| Testimonials | Empty; render no public testimonials section |
| Policy links | Empty; render only genuine configured policies with valid destinations |
| Public site URL | Unconfigured; omit canonical and absolute sharing URLs until a real origin is supplied |

The default site presents a restrained but clear demonstration notice: prices are examples and booking contact and service coverage need configuration. Do not hide this information in documentation alone. Unconfigured public states use visitor-facing language, not stack traces or internal environment-variable names.

## 4. Visual system

### Color and surfaces

Use white `#FFFFFF`, secondary background `#F5F5F7`, primary text `#1D1D1F`, secondary text `#6E6E73`, a subtle neutral border such as `#D2D2D7`, and near-black primary controls. Define reusable tokens rather than scattering raw values throughout components.

Keep the intended website white and soft gray regardless of the operating system's dark preference. Set its color scheme explicitly. WhatsApp buttons, errors, icons, and focus indicators remain monochrome; errors use text and shape rather than color alone.

The sticky navigation and booking dialog may use a neutral translucent-white surface with restrained backdrop blur. Supply a solid-white fallback. Main sections use solid backgrounds. Avoid excessive shadows, stacked glass cards, colorful accents, gradients, glows, and decorative emoji.

### Typography and spacing

Use a native system font stack headed by Apple system fonts when available, with Segoe UI and standard sans-serif fallbacks. Do not download proprietary Apple typefaces.

Use fluid headline sizing, a consistent type scale, slightly tightened display lettering, comfortable body line height, and restrained uppercase utility labels. Keep reading measures near 60 to 70 characters. Use a maximum content width around 1200 pixels, at least 20-pixel phone gutters, and a coherent spacing scale.

Use generous section spacing, thin dividers, modest image corner radii, and accessible controls with at least 44-pixel touch targets. Avoid giving every section a card border or shadow.

### Photography and motion

Use properly licensed wellness photography acquired independently of the reference website. Store optimized assets locally and record each source, creator, and license in project documentation. Do not hotlink reference assets or rely on missing external images.

Use neutral or black-and-white grading consistently. Provide intrinsic dimensions, appropriate responsive image sizes, and meaningful alt text. Load the hero eagerly with the framework's supported priority mechanism; lazy-load below-the-fold photography.

Use short opacity and transform transitions for interaction feedback. Content remains visible without animation or JavaScript-driven reveal effects. Honor reduced-motion preferences. No scroll hijacking, autoplay, parallax, or continuously animated blur.

## 5. Landing-page composition

### Header and navigation

A compact sticky header contains the editable wordmark, Treatments, How It Works, Service Areas, About, and Book a Session. Anchor targets account for the sticky header. The wordmark links to the top of the page.

Desktop navigation becomes an accessible mobile menu when space is insufficient. The menu button exposes its expanded state and controlled region. Escape closes the menu and restores focus to the toggle. Choosing an anchor closes the menu. No hidden menu links remain keyboard-focusable.

### Hero

Use an editorial text-and-image layout with generous negative space. The heading is `Your moment of calm. Delivered.` Supporting text introduces thoughtfully selected at-home treatments without unsupported clinical or operational promises.

Book a Session opens booking. Explore Treatments moves to the catalog. On phones, text and image stack without truncating the heading or pushing the controls outside the viewport.

### Treatments

Provide five explicitly requested demonstration offerings: Full Body Massage, Reflexology, Hot Stone Massage, Body Scrub, and Sports Massage. Do not add other services without supplied or verified information.

Use meaningful categories: All Treatments, Massage, Reflexology, and Body Care. Full Body Massage, Hot Stone Massage, and Sports Massage belong to Massage; Reflexology and Body Scrub use their respective categories.

Every card contains photography, English title, concise non-medical description, a duration selector, the corresponding price, and a booking action. The selected duration is local to that card. Changing category does not create invalid selections. Selecting a treatment opens booking with that treatment and duration preselected.

Proposed demonstration data, not reference-business prices:

| Treatment | Durations and indicative demonstration prices |
| --- | --- |
| Full Body Massage | 60 minutes: IDR 250,000; 90 minutes: IDR 350,000; 120 minutes: IDR 450,000 |
| Reflexology | 45 minutes: IDR 180,000; 60 minutes: IDR 230,000 |
| Hot Stone Massage | 90 minutes: IDR 420,000; 120 minutes: IDR 520,000 |
| Body Scrub | 45 minutes: IDR 220,000; 60 minutes: IDR 280,000 |
| Sports Massage | 60 minutes: IDR 300,000; 90 minutes: IDR 420,000 |

Prices and duration options exist only in typed configuration data. No component independently hardcodes them.

### How It Works

Show a true three-step sequence: choose a treatment; share a preferred location and time; send a request for confirmation. Explain that a request does not reserve a therapist or time slot.

### Why Choose Us

Use a restrained editorial layout focused on the intended convenience of at-home care, thoughtful treatment selection, and a clear request process. Do not assert certifications, experience counts, hygiene guarantees, medical benefits, or punctuality promises.

### Service Areas

Render searchable configured locations. Search is case-insensitive and tolerates surrounding whitespace. Each result can open booking with the location preselected. A no-match state differs from an unconfigured-coverage state. Search remains usable when configuration is empty, with clear explanatory text.

Never infer coverage from the reference business. Do not include a pretend interactive map or request visitor geolocation. Coverage selection is a request detail, not a guarantee of address-level service.

### About and testimonials

Pair an independent wellness photograph with a concise introduction to the demonstration brand's intended at-home wellness experience. Avoid invented history, staff credentials, customer counts, or claims of established operations.

Provide a reusable typed testimonials component that returns no public section when its genuine-testimonial data array is empty. Do not create sample identities, review text, star ratings, or review counts.

### FAQ

Use accessible native details/summary elements or an equally accessible accordion. Cover how to request a booking, preparation questions, checking service areas, choosing duration, and how confirmation works. Suggest asking the business about preparation or access requirements rather than inventing what a therapist supplies.

Do not publish invented cancellation, refund, medical, or satisfaction policies. Any booking guidance must remain consistent with the missing-contact configuration state.

### Closing CTA and footer

Provide a spacious final invitation to open booking. The footer repeats useful section links, the wordmark, and configured contact information, operating hours, and policy links. Missing details use honest text or omission as specified above, never dead anchors or placeholder policies presented as final.

## 6. Booking experience

### Interaction model

Use one accessible native modal dialog opened from the navigation, hero, treatment cards, location results, and closing CTA. A small booking provider owns open state and the current draft; unrelated server-rendered sections remain independent of booking internals.

A general Book a Session action uses the first configured treatment and its first duration. Card and location actions override only their relevant selections. Retain other unsent draft fields while navigating the current page. Do not persist personal information in local storage, cookies, analytics, or a server.

Use a single form with clear groups and a live summary rather than an unnecessary multi-step checkout. Desktop can show form and summary in two columns; mobile uses one scrollable column with all controls reachable.

### Fields

Required: full name, configured service city, configured treatment, an available duration for that treatment, preferred date, preferred time, service address, and consent to share details with the business for the request.

Optional: notes. Therapist preference appears only when supported and explicitly enabled with configured options; it is disabled and absent by default.

All controls have explicit visible labels, stable IDs, appropriate autocomplete hints, and associated error messages. A city with no configured choices cannot be submitted. Treatment changes preserve the existing duration only if supported by the new treatment; otherwise choose that treatment's first valid duration.

### Validation and timezone

Use pure, independently testable validation functions. Validate selected IDs against the current configuration rather than trusting option strings from the UI. Validate finite duration values, treatment-duration membership, required trimmed text, consent, calendar-valid dates, 24-hour time syntax, and configured preference membership where applicable.

Use reasonable explicit length limits: full name 100 characters, address 500 characters, and notes 1000 characters. Do not impose a two-word-name requirement or reject legitimate international names. Reject malformed or impossible dates rather than letting date parsing normalize them.

Display the configured business timezone next to date/time inputs and in the summary. Calculate the minimum date and current local date/time in that IANA timezone using a shared utility. Reject past dates and same-day times that have already passed. Recheck current time during submission; the initial page-render time is not authoritative.

Preferred time is an input, not a list of supposedly available slots. Operating hours describe the configured business schedule and are not automatically treated as appointment availability. Do not fabricate unavailable/available therapist states.

The initial target timezone is Asia/Jakarta. Any later support for zones with daylight-saving transitions must explicitly handle ambiguous and nonexistent local times before enabling them as business configuration.

### Summary and submission

Derive the summary from validated configuration lookups: treatment, duration, city, preferred date/time, and indicative price. Never maintain a second independent price state. Identify the price as a demonstration estimate, not a confirmed total.

The final action is labeled Continue to WhatsApp. A nearby explanation states that the business handles availability, final price, and confirmation.

Before opening an external conversation, validate the whole form and the WhatsApp configuration. Normalize an owner-supplied international phone number to the digits required by `wa.me`; reject malformed configuration rather than guessing a country prefix or recipient.

Create the message in a pure function using validated values and the current configuration. Include brand, full name, city, treatment, duration, date, preferred time and business timezone, full address, optional notes and any supported preference, indicative price with its demonstration label, and a statement that this is a request awaiting confirmation.

Build the URL with proper percent encoding so ampersands, plus signs, non-Latin text, line breaks, and other user input cannot alter URL structure. Open WhatsApp only from the deliberate user submission. Do not send any network request containing personal data before this action.

Do not show success or booking-confirmed feedback merely because WhatsApp was opened. If an outbound-navigation status is shown, say only that the request is not yet confirmed and that the visitor must send the message in WhatsApp.

When the number is missing, show a visible configuration-required message and a non-submittable final action. Do not generate a link to any test, reference, placeholder, or unrelated number. The rest of the form and preview remain usable.

### Dialog accessibility

Use modal semantics and an accessible name and description. Focus moves inside on open, remains inside while open, and returns to the triggering element after close. Provide an always-reachable close button and Escape handling. Lock background scrolling without losing the original scroll position. Ensure tab order, error-focus behavior, and mobile dialog scrolling work with long content.

Native dialog supplies background inertness and modal behavior; add only the focus management and scroll-lock logic needed and test actual browser behavior. Do not assume visual overlays alone implement a focus trap.

## 7. Component and module boundaries

Suggested organization:

- `src/app/`: layout, page composition, global design tokens and styles, page metadata, and original icon/sharing-image support.
- `src/config/`: shared business types, business identity/contact settings, service-area data, treatment data, optional testimonials, and optional genuine policy links.
- `src/components/ui/`: focused shared controls and icons only where reuse warrants them.
- `src/components/sections/`: header, hero, treatment catalog, process, value proposition, service areas, about, testimonials, FAQ, closing CTA, and footer.
- `src/components/booking/`: booking context, dialog, form field groups, and derived summary.
- `src/lib/`: configuration lookups, currency formatting, business-time calculations, form validation, and WhatsApp message/URL generation.
- `public/images/`: optimized, independently licensed photography with meaningful filenames.
- `tests/`: unit tests and browser interaction tests with isolated test-only configuration fixtures.
- `docs/`: specification, implementation plan, asset licensing, and launch configuration guidance.

Prefer server components for static content and narrowly scoped client components for interactive state. Avoid a page-sized client component, unsafe casts, `any`, duplicated pricing logic, unnecessary effects, and generic abstractions that obscure a small application.

Use semantic landmarks, one page H1, logical heading nesting, stable data IDs as React keys, and accurate metadata. Do not publish fabricated review/rating structured data or a made-up canonical domain. Sharing artwork must be original and consistent with the demonstration identity.

## 8. Verification and acceptance

### Automated logic checks

- Every configured treatment has unique IDs and usable duration/price options.
- Changing duration selects exactly the configured corresponding price.
- Category filtering returns the intended treatments.
- Unknown treatment, city, duration, or preference values are rejected.
- Required fields, consent, length limits, impossible dates, past dates, and past same-day times are rejected with useful English messages.
- Business-timezone calculations are tested around UTC/local-day boundaries using an injected clock.
- WhatsApp message generation preserves special characters and complete details after decoding.
- Missing or malformed WhatsApp configuration never produces an outbound URL.
- Empty testimonial data produces no public review content.

### Browser checks

Verify widths of 360, 390, 768, 1024, and 1440 pixels. Check horizontal overflow, clipped text, control collisions, sticky-header anchor offsets, image loading, and dialog scrolling.

Exercise category filters, duration pricing, treatment preselection, configured-location preselection, service-area search and both empty states, mobile navigation, FAQ controls, required-field errors, focus trapping, Escape dismissal, focus restoration, and reduced-motion behavior.

Use test-only injected business configuration to exercise configured cities and successful URL generation without publishing invented coverage or a recipient. Intercept outbound navigation so browser tests never contact a business or messaging service. Verify the real default application separately in its unconfigured state.

Run strict TypeScript checking, ESLint, unit tests, browser tests, and a Next.js production build. Record exact commands and outcomes. Fix detected issues; disclose any checks that cannot run. Inspect authored source for forbidden comments.

### Delivery

Deliver the implemented project in `wellness-website/` with exact npm setup, development, test, and production commands. Document where to set authorized contact details, real prices, supported locations, operating hours, optional policies, and the real deployment origin.

The final handover must distinguish a working implementation from launch readiness: outbound WhatsApp booking remains unavailable until the owner supplies the authorized number and coverage. Do not deploy or publish the business website to an external host without explicit authorization.

## 9. Out of scope

No payment processing, authentication, fabricated availability, reservation database, pretend backend, automated therapist assignment, map mockup, analytics that capture booking details, or copied reference assets.

No changes to the existing Flutter application, no Git commits, and no external deployment are included.

## 10. Approval record

The specification and implementation plan were approved on 2026-09-27. Implementation is authorized within the project boundary above. Runtime verification, independent review, and licensed photography remain acceptance gates; source files alone do not establish completion.
