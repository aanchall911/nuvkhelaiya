import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * A hairline progress indicator across the top of the viewport, drawn in the
 * signature plum → saffron → teal gradient.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-plum-deep/30"
    >
      <motion.div
        style={{ scaleX: width }}
        className="h-full w-full origin-left bg-signature shadow-[0_0_12px_rgba(254,191,74,0.7)]"
      />
    </div>
  );
}
