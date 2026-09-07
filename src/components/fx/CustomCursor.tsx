import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

type CursorState = { active: boolean; label: string | null; size: number };

/**
 * Desktop-only interactive cursor: a precise centre dot plus a soft circle that
 * trails behind on a spring.
 *
 * Context-aware — any element can drive it:
 *   data-cursor="hover"                → circle grows
 *   data-cursor-label="View"           → circle grows and shows the label
 *
 * Hidden on touch devices and under reduced-motion, where the native cursor is
 * left completely alone.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>({ active: false, label: null, size: 36 });
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 200, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 200, damping: 26, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        '[data-cursor-label], [data-cursor], a, button, [role="button"]',
      );

      if (!el) {
        setState((s) => (s.active || s.label ? { active: false, label: null, size: 36 } : s));
        return;
      }

      const label = el.dataset.cursorLabel ?? null;
      const size = label ? 84 : 62;
      setState((s) =>
        s.label === label && s.size === size ? s : { active: true, label, size },
      );
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70]">
      {/* trailing ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute left-0 top-0"
      >
        <motion.div
          animate={{ width: state.size, height: state.size }}
          transition={{ type: 'spring', stiffness: 240, damping: 24 }}
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-300 ${
            state.active
              ? 'border-saffron/80 bg-saffron/10 backdrop-blur-[1px]'
              : 'border-gold/55 bg-transparent'
          }`}
        />
        <AnimatePresence>
          {state.label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.22 }}
              className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap
                text-[9px] font-bold uppercase tracking-[0.22em] text-saffron"
            >
              {state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* precise dot */}
      <motion.span
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0, scale: state.active ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute left-0 top-0 block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2
          rounded-full bg-saffron shadow-[0_0_10px_rgba(254,191,74,0.9)]"
      />
    </div>
  );
}
