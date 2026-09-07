import { TEAM_FOLDERS } from '@/data/teamManifest';

/**
 * NUV Khelaiya 2026 organising committee.
 *
 * Everything here is derived from the photographs themselves. Names come from
 * the source filenames, so what you see on screen is exactly what is written on
 * the file — no guessing, no pairing.
 *
 * To change a name, rename the photo (e.g. `Vedant Khatri.JPG`) and re-run
 * `tools/build-team-photos.ps1`.
 *
 *   <Person Name>.jpg → name-<person-name>.jpg → labelled portrait
 *   team.jpg          → group-NN.jpg           → the together shot
 *   IMG_1234.jpg      → p-NN.jpg               → shown, never labelled
 */

export type Shot = { src: string; name?: string };

export type Portfolio = {
  role: string;
  slug: string;
  /** individual portraits, labelled where the filename told us the name */
  leads: Shot[];
  /** together shots for the finale */
  group: string[];
  /** every name we know for this portfolio, in display order */
  names: string[];
};

const titleCase = (kebab: string) =>
  kebab
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

export const COMMITTEE: Portfolio[] = TEAM_FOLDERS.map(({ slug, role, files }) => {
  const dir = `/assets/team/${slug}`;
  const leads: Shot[] = [];
  const group: string[] = [];
  const extras: string[] = [];

  for (const f of files) {
    if (f.startsWith('group-')) {
      group.push(`${dir}/${f}`);
    } else if (f.startsWith('name-')) {
      leads.push({ src: `${dir}/${f}`, name: titleCase(f.slice(5).replace(/\.jpg$/, '')) });
    } else {
      // no name on the file — never shown as a lead, kept as a candidate
      // together-shot so nothing appears with a missing or wrong label
      extras.push(`${dir}/${f}`);
    }
  }

  return {
    role,
    slug,
    leads,
    group: group.length ? group : extras,
    names: leads.map((l) => l.name as string),
  };
});

export const COMMITTEE_COUNT = COMMITTEE.reduce((n, p) => n + p.names.length, 0);
export const PHOTO_COUNT = COMMITTEE.reduce((n, p) => n + p.leads.length + p.group.length, 0);

/** Derive avatar initials from a name, e.g. "Vedant Khatri" → "VK". */
export const initialsOf = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

export const TESTIMONIALS = [
  {
    quote:
      'NUV Khelaiya 2025 was an unforgettable experience! The energy, the performances, and the overall vibe were absolutely electric. Can’t wait for this year!',
    author: 'Attendee, NUV Khelaiya 2025',
  },
];
