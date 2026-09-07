export type GalleryCategory = 'Garba' | 'Dandiya' | 'Moments' | 'People' | 'Culture';

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  /** ornamental frame shape — cycled to build a temple-wall rhythm */
  shape: 'arch' | 'leaf' | 'square';
  caption: string;
};

const g = '/assets/gallery';

/** NUV Khelaiya 2025 — the film reel. */
export const GALLERY_FILM = {
  src: `${g}/nk25-film.mp4`,
  poster: `${g}/nk25-03.jpg`,
  title: 'NUV Khelaiya 2025',
  caption: 'From endless garba rounds to countless memories.',
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'nk25-01',
    src: `${g}/nk25-01.jpg`,
    alt: 'Khelaiyas mid-Garba during NUV Khelaiya 2025',
    category: 'Garba',
    shape: 'arch',
    caption: 'The first round',
  },
  {
    id: 'nk25-02',
    src: `${g}/nk25-02.jpg`,
    alt: 'Dandiya raas partners on the ground at NUV Khelaiya 2025',
    category: 'Dandiya',
    shape: 'leaf',
    caption: 'Sticks and rhythm',
  },
  {
    id: 'nk25-03',
    src: `${g}/nk25-03.jpg`,
    alt: 'The crowd gathered under festival lights at NUV Khelaiya 2025',
    category: 'Moments',
    shape: 'square',
    caption: 'Under the lights',
  },
  {
    id: 'nk25-04',
    src: `${g}/nk25-04.jpg`,
    alt: 'Students in traditional chaniya choli and kediyu at NUV Khelaiya 2025',
    category: 'People',
    shape: 'arch',
    caption: 'Dressed for nine nights',
  },
  {
    id: 'nk25-05',
    src: `${g}/nk25-05.jpg`,
    alt: 'Garba circle widening across the ground at NUV Khelaiya 2025',
    category: 'Garba',
    shape: 'leaf',
    caption: 'The circle widens',
  },
  {
    id: 'nk25-06',
    src: `${g}/nk25-06.jpg`,
    alt: 'Traditional aarti and decor detail from NUV Khelaiya 2025',
    category: 'Culture',
    shape: 'square',
    caption: 'Devotion in the detail',
  },
];

export const GALLERY_CATEGORIES: ('All' | GalleryCategory)[] = [
  'All',
  'Garba',
  'Dandiya',
  'Moments',
  'People',
  'Culture',
];
