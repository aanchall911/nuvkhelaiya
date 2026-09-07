import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

export interface MotifPngProps {
  src: string;
  /** Purely decorative by default; pass a label only if it carries meaning. */
  label?: string;
  className?: string;
  /** Perpetual motion style for transparent motif artwork. */
  idle?: 'float' | 'sway' | 'bob-sway' | 'spin' | 'pulse' | 'none';
  /** Scroll parallax strength in px. Negative moves against the scroll. */
  parallax?: number;
  /** Warm saffron halo, as if lit by a diya. */
  glow?: boolean;
  /** Recolour a flat dark motif into antique gold ink. */
  goldInk?: boolean;
  opacity?: number;
  duration?: number;
  delay?: number;
  /** Fade + scale in when it first scrolls into view. */
  reveal?: boolean;
}

/**
 * MotifPng — for transparent decorative PNGs (mandalas, diyas, toran, dandiya,
 * garba silhouettes, mirror-work flourishes).
 *
 * Decorative by default, self-hiding on load failure, and motion-safe.
 */
export function MotifPng({
  src,
  label,
  className = '',
  idle = 'float',
  parallax = 0,
  glow = false,
  goldInk = false,
  opacity = 1,
  duration = 8,
  delay = 0,
  reveal = true,
}: MotifPngProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);
  const y = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.6 });

  if (failed) return null;

  const loop = reduce
    ? undefined
    : idle === 'float'
      ? { y: [0, -14, 0] }
      : idle === 'sway'
        ? { rotate: [-3, 3, -3] }
        : idle === 'bob-sway'
          ? { y: [0, -12, 0], rotate: [-2.5, 2.5, -2.5] }
          : idle === 'spin'
            ? { rotate: [0, 360] }
            : idle === 'pulse'
              ? { scale: [1, 1.06, 1], opacity: [opacity * 0.75, opacity, opacity * 0.75] }
              : undefined;

  return (
    <motion.div
      ref={ref}
      aria-hidden={label ? undefined : true}
      style={{ y: parallax && !reduce ? y : undefined, opacity }}
      className={`pointer-events-none select-none ${className}`}
      initial={reveal ? { opacity: 0, scale: 0.9 } : undefined}
      whileInView={reveal ? { opacity, scale: 1 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
    >
      <motion.img
        src={src}
        alt={label ?? ''}
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => setFailed(true)}
        animate={loop}
        transition={
          loop
            ? {
                duration: idle === 'spin' ? duration * 12 : duration,
                repeat: Infinity,
                ease: idle === 'spin' ? 'linear' : 'easeInOut',
                delay,
              }
            : undefined
        }
        className={`h-full w-full object-contain ${glow ? 'png-halo' : 'png-halo-soft'} ${
          goldInk ? 'png-gold-ink' : ''
        }`}
      />
    </motion.div>
  );
}
