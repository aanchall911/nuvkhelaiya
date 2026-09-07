export type SponsorTier = 'title' | 'partner';

export type Sponsor = {
  name: string;
  tier: SponsorTier;
  /** drop a file at `public/assets/sponsors/<file>` and point here */
  logo?: string;
  url?: string;
  /** short label used on the gold plate when no logo file exists yet */
  wordmark?: string;
};

/**
 * NUV Khelaiya 2026 partners.
 *
 * Logos are optional. Add them at `public/assets/sponsors/` — transparent PNG or
 * SVG, roughly 400×200, and set `logo` below. Until then each plate shows an
 * engraved gold wordmark, so the ribbon always looks finished.
 */
export const SPONSORS: Sponsor[] = [
  { name: 'Kanan International', tier: 'title', wordmark: 'Kanan', url: 'https://kanan.co' },
  { name: 'IMS', tier: 'title', wordmark: 'IMS' },
  { name: 'Vision and Design', tier: 'partner', wordmark: 'V&D' },
  { name: 'Chaibugs Cafe & Resto', tier: 'partner', wordmark: 'Chaibugs' },
  { name: 'KRAFTON', tier: 'partner', wordmark: 'KRAFTON' },
  { name: 'Radio City', tier: 'partner', wordmark: 'Radio City' },
  { name: 'SSIP', tier: 'partner', wordmark: 'SSIP' },
];

export const TITLE_SPONSORS = SPONSORS.filter((s) => s.tier === 'title');
export const PARTNER_SPONSORS = SPONSORS.filter((s) => s.tier === 'partner');
