import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * ParallaxLayer — wraps any content (SVG ornament, PNG, pattern block) and
 * drifts it as the section scrolls past. Disabled under reduced-motion.
 */
export function ParallaxLayer({
  children,
  distance = 60,
  scale = 0,
  rotate = 0,
  className = '',
}: {
  children: React.ReactNode;
  /** px of vertical travel across the viewport pass. */
  distance?: number;
  /** extra scale gained across the pass, e.g. 0.08 */
  scale?: number;
  /** degrees of rotation across the pass */
  rotate?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [distance, -distance]), {
    stiffness: 55,
    damping: 20,
  });
  const s = useTransform(scrollYProgress, [0, 1], [1, 1 + scale]);
  const r = useTransform(scrollYProgress, [0, 1], [-rotate, rotate]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { y, scale: scale ? s : undefined, rotate: rotate ? r : undefined }}
    >
      {children}
    </motion.div>
  );
}
