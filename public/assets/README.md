# Artwork drop-in guide

Every image on the site is animated through two components:

- `<FestiveImage />` — photographs. Scroll unveil, Ken Burns drift, hover zoom/tilt,
  gold/toran/arch framing, blur-up loading.
- `<MotifPng />` — transparent decorative PNGs. Perpetual float / sway / spin / pulse,
  scroll parallax, saffron diya halo, optional gold-ink recolour.

Drop files at these exact paths and they light up automatically. Missing files are safe:
photos show an animated mandala plate, motifs hide themselves.

## Transparent PNG motifs → `public/assets/motifs/`

| File | Suggested art |
| --- | --- |
| `mandala.png` | Full gold line-art mandala |
| `mandala-half.png` | Half mandala, for section edges |
| `rangoli.png` | Rangoli geometry, top-down |
| `toran.png` | Traditional door toran |
| `diya.png` | Single lit diya |
| `diya-row.png` | Row of diyas |
| `dandiya.png` | Crossed dandiya sticks |
| `garba-dancer.png` | Single dancer silhouette |
| `garba-circle.png` | Ring of dancers |
| `peacock.png` | Peacock / mor motif |
| `floral-corner.png` | Gujarati floral corner flourish |
| `bandhani-strip.png` | Bandhani border strip |
| `dhol.png` | Dhol / percussion |
| `chaniya-choli.png` | Chaniya choli illustration |

Tips for motif PNGs:

- Transparent background, trimmed tight to the artwork.
- Export at 2x the largest on-screen size (most sit between 240px and 900px wide).
- Line art reads best in `#C99A3D` or `#FEBF4A`. Flat dark line art also works —
  pass `goldInk` to recolour it.

## Photographs → `public/assets/photos/`

`hero-backdrop.jpg`, `garba-circle.jpg`, `dandiya-night.jpg`, `crowd.jpg`,
`aarti.jpg`, `food.jpg`, `live-music.jpg`, `tradition.jpg`, `about-garba.jpg`

- Landscape 1920x1280 or portrait 1200x1500, quality ~80, under ~350 KB each.
- Warm-toned frames sit best against the plum / saffron / teal palette.

## Brand → `public/assets/brand/`

`nuv-khelaiya-logo.png` (horizontal lockup), `nuv-khelaiya-mark.png` (square mark).

Paths are declared once in `src/lib/assets.ts` — rename there if you prefer other filenames.
