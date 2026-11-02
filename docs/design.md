# Design — GangaGuides
Hallmark stamp: macrostructure **Map / Diagram** (the home hero is a hand-drawn schematic of the ghats, Assi → Raj Ghat), editorial tone, custom theme "river at dawn, marigold, stone steps, ink". Nav N9 edge-aligned, footer Ft5 statement. Source of truth: `client/src/styles/tokens.css` — never inline a colour or font.

## Colour (OKLCH in code; hex for reference)
| Token | Hex | Use |
|---|---|---|
| `--color-paper` | #f9f5ec | page background |
| `--color-paper-2` / `-3` | #f1e8db / #e5d9c7 | tinted sections, hover, placeholders |
| `--color-ink` | #291c15 | text, borders, dark buttons, footer bg |
| `--color-ink-2` | #58463b | secondary text |
| `--color-saffron` / `-2` | #f19024 / #e57600 | primary button fill + hover (text on it = `--color-on-saffron` #26160e). Never as text colour |
| `--color-sindoor` | #9d3013 | links, accent words, focus ring |
| `--color-river` / `-2` / `-3` | #1a586d / #b4d8e1 / #d6edf1 | map water, time labels, river section bg |
| ok / err / todo | #196632 / #a9231e / #f8e8ab bg | form states, "To confirm" markers |

## Type
Display: **Young Serif** 400 (headings, map labels, prices). Body: **Mukta** 400/600 (Latin + Devanagari). Both via @fontsource (self-hosted). Headings always roman, never italic. Scale tokens `--text-xs … --text-display` (clamp). Body 17px / 1.6, measure 66ch.

## Space & shape
4pt scale `--space-1…8`, section rhythm `--space-section` (clamp 72–136px), gutter `--gutter`. Radius: 4px inputs, 10px panels, pill buttons. Rules: hairline `--rule-hair`, strong `--rule-ink` (list tops).

## Components
- **Button** `.btn` (saffron, ink border, pill) · `.btn--ghost` (transparent) · `.btn--ink` (dark). States: hover, focus-visible ring, active 1px press, disabled, aria-busy.
- **Index rows** (`.trip-row`, `.post-list`, `.map__legend`) instead of card grids.
- **Photo** slot: real `<picture>` (avif/webp, 3 widths) or a labelled striped placeholder. No stock, no AI images.
- **Aside** price box (sticky on desktop), **notice** (saffron left rule), **FAQ** details/summary.

## Motion
Only: map nodes ink-on (opacity, staggered), button press, header shadow on scroll. All collapse under `prefers-reduced-motion`. No carousels, no autoplay.

## Never
Dark-mode toggle · centred hero → 3 cards → CTA rhythm · italic headings · fake device chrome · invented stats/reviews.
