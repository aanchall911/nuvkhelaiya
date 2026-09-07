import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion language for NUV Khelaiya.
 * Everything is slow, weighted and ceremonial — no bouncing, no snapping.
 */

export const EASE_SILK = [0.22, 0.61, 0.36, 1] as const;
export const EASE_OUT_SOFT = [0.16, 1, 0.3, 1] as const;

export const tSilk: Transition = { duration: 0.9, ease: EASE_SILK };
export const tSilkSlow: Transition = { duration: 1.3, ease: EASE_SILK };

/** Standard in-view trigger: fires once, a little before the element is centred. */
export const inView = { once: true, amount: 0.25, margin: '0px 0px -12% 0px' } as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: tSilkSlow },
};

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: tSilk },
};

export const riseInSmall: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_SILK } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: tSilkSlow },
};

/** Gold ornament / divider draw-in. */
export const drawLine: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 1.1, ease: EASE_OUT_SOFT } },
};

/** Stagger container — use with any of the item variants above. */
export const stagger = (delayChildren = 0.08, staggerChildren = 0.12): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

/** Word-by-word / letter-by-letter headline reveal. */
export const textRevealItem: Variants = {
  hidden: { opacity: 0, y: '0.6em', rotateX: -35 },
  show: {
    opacity: 1,
    y: '0em',
    rotateX: 0,
    transition: { duration: 1, ease: EASE_OUT_SOFT },
  },
};

/** Curtain / "unveil" wipe used for photographs. */
export const unveil: Variants = {
  hidden: { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0, scale: 1.06 },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    scale: 1,
    transition: { duration: 1.35, ease: EASE_OUT_SOFT },
  },
};

/** Perpetual gentle bob for transparent PNG motifs (diya, toran, dandiya). */
export const floatLoop = (distance = 12, duration = 7, delay = 0) => ({
  y: [0, -distance, 0],
  transition: { duration, delay, repeat: Infinity, ease: 'easeInOut' as const },
});

export const swayLoop = (deg = 2.5, duration = 9, delay = 0) => ({
  rotate: [-deg, deg, -deg],
  transition: { duration, delay, repeat: Infinity, ease: 'easeInOut' as const },
});

/** Slow Ken Burns drift for hero / gallery photography. */
export const kenBurns = (scaleTo = 1.09, duration = 20) => ({
  scale: [1, scaleTo, 1],
  transition: { duration, repeat: Infinity, ease: 'easeInOut' as const },
});

/** Diya flame breathing glow. */
export const glowPulse = (duration = 4.5, delay = 0) => ({
  opacity: [0.5, 1, 0.5],
  scale: [1, 1.07, 1],
  transition: { duration, delay, repeat: Infinity, ease: 'easeInOut' as const },
});
