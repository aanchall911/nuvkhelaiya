/** Single source of truth for event facts, pricing and the registration link. */

export const EVENT = {
  name: 'NUV Khelaiya',
  edition: '2026',
  /** Garba is a single night. */
  dateLong: '24 October 2026',
  dateShort: '24 Oct 2026',
  day: 'Saturday',
  time: '6:00 PM onwards',
  venue: 'NUV Grounds, Vadodara',
  venueFull: 'Navrachana University Grounds, Vasna–Bhayli Road, Vadodara',
} as const;

/**
 * Where "Get Pass" sends people. Swap this for the real registration or
 * ticketing URL — the button opens it in a new tab.
 */
export const REGISTRATION_URL = 'https://forms.gle/';

export type PassTier = {
  id: string;
  name: string;
  gujarati: string;
  price: number;
  /** struck-through original, when the tier is discounted */
  was?: number;
  note: string;
  perks: string[];
  featured?: boolean;
};

/**
 * Placeholder pricing — confirm with the committee before going live.
 */
export const PASS_TIERS: PassTier[] = [
  {
    id: 'early',
    name: 'Early Khelaiya',
    gujarati: 'વહેલા ખેલૈયા',
    price: 299,
    was: 399,
    note: 'Limited quantity',
    perks: ['Entry from 6:00 PM', 'Garba & Dandiya ground access', 'Welcome aarti'],
  },
  {
    id: 'general',
    name: 'General Pass',
    gujarati: 'સામાન્ય પ્રવેશ',
    price: 399,
    note: 'Most popular',
    perks: [
      'Entry from 6:00 PM',
      'Garba & Dandiya ground access',
      'Live folk performances',
      'Food stalls open all night',
    ],
    featured: true,
  },
  {
    id: 'couple',
    name: 'Couple Pass',
    gujarati: 'યુગલ પ્રવેશ',
    price: 699,
    was: 798,
    note: 'Two entries',
    perks: ['Two entries', 'Ground access for both', 'Priority gate lane'],
  },
  {
    id: 'vip',
    name: 'VIP Khelaiya',
    gujarati: 'વી.આઈ.પી.',
    price: 999,
    note: 'Front of the circle',
    perks: [
      'Priority gate lane',
      'Reserved viewing near the stage',
      'Seating lounge access',
      'Complimentary refreshment',
    ],
  },
];

export const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;
