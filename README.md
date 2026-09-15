# Portfolio

Personal site for Charles Liggins, built from the
[Figma design](https://www.figma.com/design/7Hp2L2twe5tMTcF7sYAFgW/portfolio?node-id=231-96).
Next.js 16 (App Router, Turbopack) and Tailwind CSS v4, prerendered as a single
static page.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Layout of the code

| Path | What's in it |
| --- | --- |
| `app/page.tsx` | Composes the three sections |
| `app/globals.css` | Design tokens plus the work-experience scatter rules |
| `components/Hero.tsx` | Intro copy, portrait and the hand-drawn marks |
| `components/WorkExperience.tsx` | The three tilted role cards |
| `components/Projects.tsx` | Project carousel (the only client component) |
| `components/RoughFilter.tsx` | SVG filter that roughens card borders |
| `lib/data.ts` | All copy, links and image references |
| `assets/` | Images, statically imported so `next/image` infers dimensions |
| `public/doodles/` | Decorative SVGs, served as-is |

Content lives in `lib/data.ts` — edit the `jobs` and `projects` arrays to change
what the page says. Nothing is fetched at runtime.

## How the design translates

The Figma file is a fixed 1512×2951 canvas of absolutely positioned, rotated
layers. Two ideas carry that to the browser:

- **Percentage stages.** The work-experience section and the hero portrait each
  become a fixed-aspect-ratio box whose children are placed by percentage, so
  the arrangement scales instead of reflowing. Below `lg` the work cards drop
  out of that stage and stack, at half tilt so corners stay on screen.
- **Roughened borders.** Cards in the design have a hand-drawn stroke rather
  than a clean rectangle. A turbulence filter displaces a bare border element
  layered over each image, leaving the artwork itself sharp.
- **A carousel measured in `cqw`.** The featured panel is a CSS container, and
  the borders, gaps and padding inside it are sized in `cqw` — 1% of the panel's
  own width. Fixed pixel borders don't scale with the panel, so at some browser
  zoom levels the three Resell phones no longer fit and were clipped; in
  container units the layout is identical at every zoom level.

- **A liquid-glass slab.** The featured panel is frosted rather than flat: a
  `backdrop-filter` blur with a specular gradient, a lit rim and inset edge
  highlights. The peek thumbnails sit behind it in the same stacking context,
  so they blur and refract through the glass instead of being flatly covered.
  A `@supports` fallback keeps the design's solid slab where `backdrop-filter`
  is unavailable.

> **Careful with `backdrop-filter`.** Author it *unprefixed only*. If you also
> hand-write `-webkit-backdrop-filter`, Lightning CSS (which Turbopack uses)
> drops the standard property and emits just the prefixed one, and the effect
> silently stops working. Left alone it emits both prefixes itself.

Only the out-of-frame projects are dimmed, via `brightness(0.55)` on the peek
thumbnails. The images in `assets/projects/` are the **undimmed originals**
pulled from Figma with `download_assets` — the copies that `get_design_context`
hands back already have the design's dimming baked in, so re-exporting that way
would make the featured project look washed out.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```
