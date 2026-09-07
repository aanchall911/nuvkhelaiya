/**
 * Central asset registry.
 *
 * Drop your artwork into `public/assets/…` using the filenames below and every
 * animation on the site picks it up automatically. Anything still missing
 * degrades gracefully: photographs fall back to an animated mandala plate,
 * decorative PNG motifs simply hide themselves.
 */

const base = '/assets';

export const ART = {
  /* Transparent PNG motifs — decorative, animated via <MotifPng /> */
  motif: {
    mandala: `${base}/motifs/mandala.png`,
    mandalaHalf: `${base}/motifs/mandala-half.png`,
    rangoli: `${base}/motifs/rangoli.png`,
    toran: `${base}/motifs/toran.png`,
    diya: `${base}/motifs/diya.png`,
    diyaRow: `${base}/motifs/diya-row.png`,
    dandiya: `${base}/motifs/dandiya.png`,
    garbaDancer: `${base}/motifs/garba-dancer.png`,
    garbaCircle: `${base}/motifs/garba-circle.png`,
    peacock: `${base}/motifs/peacock.png`,
    floral: `${base}/motifs/floral-corner.png`,
    bandhaniStrip: `${base}/motifs/bandhani-strip.png`,
    dhol: `${base}/motifs/dhol.png`,
    chaniyaCholi: `${base}/motifs/chaniya-choli.png`,
  },
  /**
   * Photography — animated via <FestiveImage />.
   * These point at the real NUV Khelaiya 2025 shoot in `assets/gallery/`.
   * Swap any entry for a dedicated file in `assets/photos/` when you have one.
   */
  photo: {
    heroBackdrop: `${base}/gallery/nk25-03.jpg`,
    garbaCircle: `${base}/gallery/nk25-05.jpg`,
    dandiyaNight: `${base}/gallery/nk25-02.jpg`,
    crowd: `${base}/gallery/nk25-04.jpg`,
    aarti: `${base}/gallery/nk25-06.jpg`,
    food: `${base}/gallery/nk25-03.jpg`,
    liveMusic: `${base}/gallery/nk25-02.jpg`,
    tradition: `${base}/gallery/nk25-06.jpg`,
    about: `${base}/gallery/nk25-01.jpg`,
  },
  brand: {
    logo: `${base}/brand/nuv-khelaiya-logo.png`,
    logoMark: `${base}/brand/nuv-khelaiya-mark.png`,
    /** Durga Maa mark used as the navbar emblem. */
    durga: `${base}/brand/durgamaa.png`,
  },
} as const;

export const MICRO_BRAND = 'Celebrate • Dance • Devotion';
