import { motion } from 'framer-motion';
import { drawLine, inView } from '@/lib/motion';

type SVGProps = React.SVGProps<SVGSVGElement>;

const deco = { 'aria-hidden': true, focusable: 'false' } as const;

/* ------------------------------------------------------------------ */
/* Mandala / rangoli line art                                          */
/* ------------------------------------------------------------------ */
const C = 100; // every mandala part shares this exact centre

/** Radial tick marks between two radii — always concentric with the centre. */
function ticks(from: number, to: number, count: number, phase = 0) {
  return Array.from({ length: count }, (_, i) => {
    const a = ((i / count) * 360 + phase) * (Math.PI / 180);
    return (
      <line
        key={`t${from}-${i}`}
        x1={C + Math.cos(a) * from}
        y1={C + Math.sin(a) * from}
        x2={C + Math.cos(a) * to}
        y2={C + Math.sin(a) * to}
      />
    );
  });
}

/** Lotus petal ring nested between `inner` and `outer` radii. */
function petalRing(count: number, inner: number, outer: number, phase = 0) {
  const w = ((outer - inner) * 0.42).toFixed(2);
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * 360 + phase;
    const mid = inner + (outer - inner) / 2;
    return (
      <path
        key={`p${i}`}
        d={`M${C} ${C - outer} C${C + Number(w)} ${C - mid} ${C + Number(w)} ${C - mid + (outer - inner) * 0.3} ${C} ${C - inner} C${C - Number(w)} ${C - mid + (outer - inner) * 0.3} ${C - Number(w)} ${C - mid} ${C} ${C - outer} Z`}
        transform={`rotate(${a} ${C} ${C})`}
      />
    );
  });
}

/**
 * MandalaLine — concentric rangoli line art.
 * Rings, tick bands and petal rings are nested so nothing crosses anything else.
 */
export function MandalaLine({
  petals = 16,
  strokeWidth = 0.7,
  ...props
}: SVGProps & { petals?: number }) {
  return (
    <svg viewBox="0 0 200 200" {...deco} {...props}>
      <g fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round">
        {/* outer band */}
        <circle cx={C} cy={C} r="97" strokeDasharray="1 5" />
        <circle cx={C} cy={C} r="90" />
        {ticks(90, 97, petals * 2)}
        {/* mirror-work dot ring */}
        {Array.from({ length: petals }, (_, i) => (
          <circle key={`d${i}`} cx={C} cy={C - 85} r="1.4" transform={`rotate(${(360 / petals) * i} ${C} ${C})`} />
        ))}
        {/* petal band */}
        <circle cx={C} cy={C} r="80" />
        {petalRing(petals, 34, 78)}
        {/* inner band */}
        <circle cx={C} cy={C} r="30" />
        {ticks(22, 28, petals, 180 / petals)}
        <circle cx={C} cy={C} r="20" />
        {petalRing(8, 6, 18)}
        <circle cx={C} cy={C} r="4" />
      </g>
    </svg>
  );
}

/**
 * MandalaBackdrop — a perfectly concentric, multi-layer mandala for hero and
 * page-header backgrounds.
 *
 * Every layer lives in one square box and is inset symmetrically, so the layers
 * can never drift out of alignment with each other or with the section centre,
 * at any viewport size.
 */
export function MandalaBackdrop({
  className = '',
  size = 'min(800px, 80vmin)',
  tone = 'saffron',
}: {
  className?: string;
  /** any CSS length — the box stays square and centred */
  size?: string;
  tone?: 'saffron' | 'ivory' | 'gold';
}) {
  const base =
    tone === 'ivory' ? 'text-ivory' : tone === 'gold' ? 'text-gold' : 'text-saffron';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 grid place-items-center overflow-hidden ${className}`}
    >
      <div className="relative aspect-square" style={{ width: size }}>
        {/* Two layers only — the outer ring and one nested ring. Kept faint so
            the artwork reads as texture behind the type, never as clutter. */}
        <MandalaLine
          petals={24}
          strokeWidth={0.4}
          className={`absolute inset-0 h-full w-full ${base} opacity-[0.105] animate-spin-slower`}
        />
        <MandalaLine
          petals={12}
          strokeWidth={0.55}
          className={`absolute inset-[19%] h-auto w-auto ${base} opacity-[0.085] animate-spin-slow`}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Rangoli corner ornament                                             */
/* ------------------------------------------------------------------ */
export function RangoliCorner(props: SVGProps) {
  return (
    <svg viewBox="0 0 120 120" {...deco} {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        <path d="M0 22 C34 22 58 46 58 80" />
        <path d="M0 40 C26 40 40 54 40 80" strokeDasharray="2 4" />
        <path d="M6 6 C6 6 30 8 34 34 C10 30 6 6 6 6 Z" />
        <path d="M0 62 C14 62 20 68 20 80" />
        <circle cx="46" cy="46" r="3" />
        <circle cx="70" cy="24" r="2" />
        <circle cx="24" cy="70" r="2" />
        <path d="M62 10 l4 8 8 4 -8 4 -4 8 -4 -8 -8 -4 8 -4 z" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Toran (door hanging) border                                         */
/* ------------------------------------------------------------------ */
export function ToranBorder({ count = 14, ...props }: SVGProps & { count?: number }) {
  const step = 100 / count;
  return (
    <svg viewBox="0 0 100 14" preserveAspectRatio="none" {...deco} {...props}>
      <line x1="0" y1="1" x2="100" y2="1" stroke="currentColor" strokeWidth="0.4" />
      {Array.from({ length: count }, (_, i) => {
        const x = i * step + step / 2;
        return (
          <g key={i} stroke="currentColor" strokeWidth="0.35" fill="none">
            <path d={`M${x - step / 2.6} 1 Q${x} ${i % 2 ? 9 : 11} ${x + step / 2.6} 1`} />
            <circle cx={x} cy={i % 2 ? 9.6 : 11.6} r="0.7" fill="currentColor" stroke="none" />
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Diya (oil lamp)                                                     */
/* ------------------------------------------------------------------ */
export function DiyaIcon(props: SVGProps) {
  return (
    <svg viewBox="0 0 64 64" {...deco} {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M10 40 Q32 54 54 40 Q46 46 32 46 Q18 46 10 40 Z" fill="currentColor" opacity="0.18" />
        <path d="M8 38 Q32 52 56 38" />
        <path d="M8 38 Q32 44 56 38" />
        <path d="M32 36 V30" />
        <path
          d="M32 28 C36 22 34 17 32 12 C30 17 28 22 32 28 Z"
          fill="currentColor"
          opacity="0.55"
          stroke="none"
        />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Dandiya sticks                                                      */
/* ------------------------------------------------------------------ */
export function DandiyaPair(props: SVGProps) {
  return (
    <svg viewBox="0 0 64 64" {...deco} {...props}>
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M14 52 L44 14" />
        <path d="M20 14 L50 52" />
        <circle cx="14" cy="52" r="2.4" />
        <circle cx="44" cy="14" r="2.4" />
        <circle cx="20" cy="14" r="2.4" />
        <circle cx="50" cy="52" r="2.4" />
        <path d="M22 44 L26 48" strokeWidth="1" />
        <path d="M38 22 L42 26" strokeWidth="1" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Garba dancer silhouette (single figure, folk-styled)                 */
/* ------------------------------------------------------------------ */
export function GarbaSilhouette(props: SVGProps) {
  return (
    <svg viewBox="0 0 120 200" {...deco} {...props}>
      <g fill="currentColor">
        <circle cx="58" cy="26" r="11" />
        <path d="M58 38 q10 2 12 14 l4 20 -8 3 -3 -14 -1 26 h-16 l-1-26 -3 14 -8-3 4-20 q2-12 12-14 z" />
        <path d="M44 88 q14 -6 30 0 l16 84 q-31 10 -62 0 z" />
        <path d="M70 52 q14 -10 26 -4 l-3 7 q-10 -4 -21 3 z" />
        <path d="M48 52 q-14 -10 -26 -4 l3 7 q10 -4 21 3 z" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Ornamental divider  ✦ ─── ✦                                         */
/* ------------------------------------------------------------------ */
export function OrnamentDivider({
  className = '',
  tone = 'gold',
}: {
  className?: string;
  tone?: 'gold' | 'ivory' | 'plum';
}) {
  const color =
    tone === 'ivory' ? 'text-ivory/70' : tone === 'plum' ? 'text-plum/50' : 'text-gold';
  return (
    <motion.div
      variants={drawLine}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={`flex items-center justify-center gap-3 ${color} ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-current opacity-40 sm:w-24" />
      <svg viewBox="0 0 40 16" className="h-4 w-10" {...deco}>
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M20 2 l3.4 5.8 L20 14 l-3.4 -6.2 z" />
          <circle cx="8" cy="8" r="1.6" />
          <circle cx="32" cy="8" r="1.6" />
          <path d="M11 8 h4" />
          <path d="M25 8 h4" />
        </g>
      </svg>
      <span className="h-px w-16 bg-current opacity-40 sm:w-24" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Mirror-work sparkle field                                           */
/* ------------------------------------------------------------------ */
export function SparkleField({
  count = 26,
  className = '',
}: {
  count?: number;
  className?: string;
}) {
  const seeds = Array.from({ length: count }, (_, i) => {
    const golden = 0.6180339887;
    const x = ((i * golden * 100) % 100).toFixed(2);
    const y = ((i * 37.7) % 100).toFixed(2);
    return { x, y, d: 2.4 + (i % 5) * 0.6, delay: (i % 7) * 0.5, s: 2 + (i % 3) };
  });
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {seeds.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-saffron/70 animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            animationDuration: `${s.d}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Temple arch clip-path definition (for framed imagery)               */
/* ------------------------------------------------------------------ */
export function ArchClipDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <clipPath id="nk-arch" clipPathUnits="objectBoundingBox">
          <path d="M0,1 L0,0.42 C0,0.16 0.22,0 0.5,0 C0.78,0 1,0.16 1,0.42 L1,1 Z" />
        </clipPath>
        <clipPath id="nk-leaf" clipPathUnits="objectBoundingBox">
          <path d="M0.5,0 C0.85,0.16 1,0.34 1,0.5 C1,0.7 0.8,0.9 0.5,1 C0.2,0.9 0,0.7 0,0.5 C0,0.34 0.15,0.16 0.5,0 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Folk instruments — dhol, shehnai, manjira, nagara                   */
/* ------------------------------------------------------------------ */
export function Dhol(props: SVGProps) {
  return (
    <svg viewBox="0 0 64 64" {...deco} {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        {/* barrel */}
        <path d="M16 20 q16 -6 32 0 v24 q-16 6 -32 0 z" />
        <ellipse cx="32" cy="20" rx="16" ry="5.5" />
        <ellipse cx="32" cy="44" rx="16" ry="5.5" />
        {/* lacing */}
        <path d="M19 22 L45 42M45 22 L19 42" strokeWidth="0.7" />
        <path d="M26 21 v22M38 21 v22" strokeWidth="0.7" />
        {/* strap */}
        <path d="M16 26 q-8 6 0 14" strokeWidth="1" />
        {/* sticks */}
        <path d="M50 14 l9 -7M52 50 l9 6" strokeWidth="2" />
      </g>
    </svg>
  );
}

export function Shehnai(props: SVGProps) {
  return (
    <svg viewBox="0 0 64 64" {...deco} {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M22 8 l6 0 l8 34 l-10 0 z" />
        <path d="M26 44 q6 12 16 12 q-8 -6 -6 -12 z" />
        <path d="M24 16 h4M25 22 h4M26 28 h4M27 34 h4" strokeWidth="0.8" />
        <path d="M22 8 q3 -4 6 0" />
      </g>
    </svg>
  );
}

export function Manjira(props: SVGProps) {
  return (
    <svg viewBox="0 0 64 64" {...deco} {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="22" cy="32" r="11" />
        <circle cx="22" cy="32" r="4" />
        <circle cx="42" cy="32" r="11" />
        <circle cx="42" cy="32" r="4" />
        <path d="M22 21 v-8M42 21 v-8" strokeWidth="0.9" />
      </g>
    </svg>
  );
}

export function Nagara(props: SVGProps) {
  return (
    <svg viewBox="0 0 64 64" {...deco} {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M14 26 q18 -8 36 0 q-2 20 -18 22 q-16 -2 -18 -22 z" />
        <ellipse cx="32" cy="26" rx="18" ry="6" />
        <path d="M20 30 q12 4 24 0" strokeWidth="0.8" />
        <path d="M46 12 l6 -5M52 20 l7 -3" strokeWidth="2" />
      </g>
    </svg>
  );
}

/**
 * A ribbon of folk instruments used down the sides of a section — dhol,
 * shehnai, manjira and nagara, each keeping its own gentle beat.
 */
export function InstrumentRail({
  side = 'left',
  className = '',
}: {
  side?: 'left' | 'right';
  className?: string;
}) {
  const items = [Dhol, Shehnai, Manjira, Nagara];
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 ${
        side === 'left' ? 'left-0' : 'right-0 scale-x-[-1]'
      } flex w-16 flex-col items-center justify-center gap-10 ${className}`}
    >
      <span className="h-16 w-px bg-gradient-to-b from-transparent to-gold/50" />
      {items.map((Ins, i) => (
        <span
          key={i}
          className="text-gold/50 animate-float"
          style={{ animationDuration: `${5 + i * 1.3}s`, animationDelay: `${i * 0.6}s` }}
        >
          <Ins className="h-8 w-8" />
        </span>
      ))}
      <span className="h-16 w-px bg-gradient-to-t from-transparent to-gold/50" />
    </div>
  );
}
