import { motion, useReducedMotion } from 'framer-motion';

const ORBS = [
  { c: 'bg-saffron/[0.16]', s: 'h-[46vmax] w-[46vmax]', x: '-12%', y: '4%', d: 34 },
  { c: 'bg-burgundy/[0.22]', s: 'h-[38vmax] w-[38vmax]', x: '68%', y: '18%', d: 42 },
  { c: 'bg-teal-muted/[0.20]', s: 'h-[42vmax] w-[42vmax]', x: '22%', y: '62%', d: 50 },
  { c: 'bg-gold/[0.12]', s: 'h-[30vmax] w-[30vmax]', x: '74%', y: '70%', d: 38 },
];

/**
 * Ambient festival glow — large, very soft orbs drifting behind the whole site.
 * Fixed to the viewport so the atmosphere stays consistent while scrolling.
 */
export function AmbientGlows() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      {ORBS.map((o, i) => (
        <motion.span
          key={i}
          className={`absolute rounded-full blur-[90px] ${o.c} ${o.s}`}
          style={{ left: o.x, top: o.y }}
          animate={
            reduce
              ? undefined
              : {
                  x: ['0%', '9%', '-6%', '0%'],
                  y: ['0%', '-7%', '5%', '0%'],
                  scale: [1, 1.12, 0.95, 1],
                }
          }
          transition={{ duration: o.d, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
        />
      ))}
    </div>
  );
}
