# Visual asset provenance

The photographic assets below were generated for this project with Codex's built-in image generation tool, then optimized to local WebP files with Sharp. No third-party stock photography is included. All therapist portraits represent fictional demonstration profiles. The images do not verify a person's identity, credentials, or availability.

| File | Purpose | Output size |
| --- | --- | --- |
| `public/images/hero-botanical.webp` | Active hero, oil, and shared treatment image with sage and amber color | 1600 × 900 |
| `public/images/stones-botanical.webp` | Active massage stone image with warm cream and golden oil | 960 × 960 |
| `public/images/towels-diffuser-botanical.webp` | Active linen and diffuser image with olive and amber color | 960 × 960 |
| `public/images/scrub-botanical.webp` | Active scrub image with deep pine and copper color | 960 × 960 |
| `public/images/hero-studio.webp` | Wide wellness product composition for hero, oil, and shared treatment cards | 1600 × 900 |
| `public/images/stones-studio.webp` | Massage stones and oil bowl for treatments and closing CTA | 960 × 960 |
| `public/images/towels-diffuser-studio.webp` | Linen, diffuser, and oil for treatment cards | 960 × 960 |
| `public/images/scrub-studio.webp` | Dark mineral scrub composition for treatments and editorial section | 960 × 960 |
| `public/images/therapist-maya.webp` | Fictional demo profile portrait | 640 × 640 |
| `public/images/therapist-sarah.webp` | Fictional demo profile portrait | 640 × 640 |
| `public/images/therapist-dina.webp` | Fictional demo profile portrait | 640 × 640 |
| `public/images/therapist-rina.webp` | Fictional demo profile portrait | 640 × 640 |

The image registry in `src/config/assets.ts` maps the botanical variants to current visual placements. The initial studio files remain as source references. The hero is eagerly loaded; other placements load when needed and use responsive sizes. Total active unique WebP asset weight is under 500 KB.

## Generation prompt set

The initial prompts requested original premium editorial studio imagery with restrained neutral colors, realistic material texture, soft directional lighting, and no text, logos, watermarks, neon, gradients, or cartoon styling.

- Hero: smooth charcoal massage stones, an unbranded smoked-glass oil bottle, folded ivory linen, and a pale ceramic sculptural form on a clean wide studio backdrop.
- Stones: three charcoal basalt stones beside a shallow ceramic oil bowl on a pale stone studio surface.
- Towels and diffuser: thick folded ivory spa towels, a matte black essential oil bottle, and a white ceramic diffuser on a pale gray studio surface.
- Scrub: mineral body scrub in a dark ceramic bowl, charcoal linen, a clear oil vial, and a pale pebble on a near-black studio backdrop.
- Portraits: four distinct, fictional Indonesian women in simple charcoal spa uniforms, photographed head and shoulders against pale gray studio backgrounds with natural light and respectful styling.

The original SVG icon and sharing artwork use the same pine green palette as the interface. No asset is presented as a licensed third-party photograph.

The WhatsApp contact control uses the WhatsApp SVG mark from [Simple Icons](https://github.com/simple-icons/simple-icons/blob/develop/icons/whatsapp.svg), stored as a local React component in `src/components/ui/whatsapp-mark.tsx`.

## Botanical palette edits

The four active botanical images were edited from their corresponding studio images with the built-in image generation tool. The edit prompts preserved each composition and object arrangement while introducing pale sage backdrops, olive foliage, amber oils, warm cream stone, and deep pine and copper tones in the scrub. They required photorealistic texture and excluded text, logos, watermarks, extra objects, gradients, and strong saturation. The outputs were optimized to local WebP files with Sharp; the original studio versions remain available for provenance.
