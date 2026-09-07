import { useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { EASE_OUT_SOFT, inView, kenBurns, unveil, riseIn, fadeIn } from '@/lib/motion';
import { MandalaLine, RangoliCorner, ToranBorder } from '@/components/ornaments/Ornaments';

export type RevealStyle = 'unveil' | 'rise' | 'fade' | 'none';
export type IdleStyle = 'still' | 'kenburns' | 'float';
export type HoverStyle = 'none' | 'zoom' | 'lift' | 'tilt';
export type FrameStyle = 'none' | 'gold' | 'toran' | 'arch' | 'leaf';

export interface FestiveImageProps {
  src: string;
  /** Required — describe the photograph for screen readers. */
  alt: string;
  /** Optional 2x / alternate source set. */
  srcSet?: string;
  sizes?: string;
  /** Tailwind aspect utility, e.g. "aspect-[4/5]". Omit for intrinsic height. */
  aspect?: string;
  reveal?: RevealStyle;
  idle?: IdleStyle;
  hover?: HoverStyle;
  frame?: FrameStyle;
  /** Warm diya-style halo behind the artwork. */
  glow?: boolean;
  /** Load immediately instead of lazily (use for above-the-fold art). */
  priority?: boolean;
  /** object-fit behaviour — `contain` is right for transparent PNG artwork. */
  fit?: 'cover' | 'contain';
  className?: string;
  imgClassName?: string;
  /** Caption rendered under the frame. */
  caption?: string;
  /** Plum→teal wash over the photo, for text legibility. */
  scrim?: boolean;
  rounded?: string;
  delay?: number;
}

const FRAME_CLIP: Record<FrameStyle, string | undefined> = {
  none: undefined,
  gold: undefined,
  toran: undefined,
  arch: 'url(#nk-arch)',
  leaf: 'url(#nk-leaf)',
};

/**
 * FestiveImage — the single component every PNG / JPG on the site goes through.
 *
 * Handles: scroll reveal, perpetual idle motion, hover interaction, ornamental
 * framing, blur-up loading, reduced-motion preferences, and a decorative
 * fallback so a missing asset never collapses the layout.
 */
export function FestiveImage({
  src,
  alt,
  srcSet,
  sizes,
  aspect,
  reveal = 'unveil',
  idle = 'kenburns',
  hover = 'zoom',
  frame = 'gold',
  glow = false,
  priority = false,
  fit = 'cover',
  className = '',
  imgClassName = '',
  caption,
  scrim = false,
  rounded = 'rounded-[4px]',
  delay = 0,
}: FestiveImageProps) {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  /* ---- pointer tilt ------------------------------------------------ */
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const transform = useMotionTemplate`perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`;

  const onMove = (e: React.MouseEvent) => {
    if (hover !== 'tilt' || reduce) return;
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const revealVariants =
    reveal === 'unveil' ? unveil : reveal === 'rise' ? riseIn : reveal === 'fade' ? fadeIn : undefined;

  const idleAnimation =
    reduce || !loaded
      ? undefined
      : idle === 'kenburns'
        ? kenBurns(1.08, 22)
        : idle === 'float'
          ? { y: [0, -10, 0], transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' as const } }
          : undefined;

  const hoverProps =
    reduce || hover === 'none' || hover === 'tilt'
      ? {}
      : hover === 'lift'
        ? { whileHover: { y: -8 }, transition: { duration: 0.5, ease: EASE_OUT_SOFT } }
        : { whileHover: { scale: 1.045 }, transition: { duration: 0.7, ease: EASE_OUT_SOFT } };

  return (
    <figure className={`group relative ${className}`}>
      {/* diya glow */}
      {glow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-saffron/25 blur-3xl animate-diya-glow"
        />
      )}

      <motion.div
        ref={wrap}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={hover === 'tilt' && !reduce ? { transform } : undefined}
        variants={revealVariants}
        initial={revealVariants ? 'hidden' : undefined}
        whileInView={revealVariants ? 'show' : undefined}
        viewport={inView}
        transition={delay ? { delay } : undefined}
        className={`relative overflow-hidden ${rounded} ${
          frame === 'gold' ? 'border border-gold/45 p-[6px]' : ''
        } ${frame === 'toran' ? 'border border-gold/35 pt-5 px-[6px] pb-[6px]' : ''} ${
          idle === 'float' ? '' : 'will-animate'
        }`}
      >
        {/* toran hanging along the top edge of the frame */}
        {frame === 'toran' && (
          <ToranBorder className="absolute left-0 top-0 h-5 w-full text-gold" />
        )}

        <div
          className={`relative overflow-hidden ${rounded} ${aspect ?? ''} ${
            frame === 'gold' || frame === 'toran' ? 'ring-1 ring-gold/25' : ''
          }`}
          style={{ clipPath: FRAME_CLIP[frame] }}
        >
          {/* blur-up placeholder / skeleton */}
          <div
            aria-hidden="true"
            className={`absolute inset-0 bg-gradient-to-br from-plum/25 via-cream to-teal/20 transition-opacity duration-700 ${
              loaded && !failed ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {failed ? (
            <ImageFallback label={alt} />
          ) : (
            <motion.img
              src={src}
              srcSet={srcSet}
              sizes={sizes}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
              animate={idleAnimation}
              {...hoverProps}
              className={`h-full w-full ${
                fit === 'contain' ? 'object-contain' : 'object-cover'
              } transition-[filter,opacity] duration-[900ms] ${
                loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
              } ${imgClassName}`}
            />
          )}

          {scrim && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-deep/80 via-plum/25 to-transparent"
            />
          )}

          {/* mirror-work shimmer sweep on hover */}
          {!reduce && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-1/2 inset-y-0 -translate-x-full
                bg-gradient-to-r from-transparent via-gold-light/45 to-transparent opacity-0
                transition-all duration-[1100ms] ease-out group-hover:translate-x-full group-hover:opacity-100"
            />
          )}
        </div>

        {/* gold corner rangoli */}
        {(frame === 'gold' || frame === 'toran') && (
          <>
            <RangoliCorner className="pointer-events-none absolute -left-px -top-px h-8 w-8 text-gold/70" />
            <RangoliCorner className="pointer-events-none absolute -right-px -top-px h-8 w-8 scale-x-[-1] text-gold/70" />
            <RangoliCorner className="pointer-events-none absolute -bottom-px -left-px h-8 w-8 scale-y-[-1] text-gold/70" />
            <RangoliCorner className="pointer-events-none absolute -bottom-px -right-px h-8 w-8 scale-[-1] text-gold/70" />
          </>
        )}
      </motion.div>

      {caption && (
        <figcaption className="mt-3 text-center font-sans text-[11px] uppercase tracking-[0.22em] text-plum/60">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Ornamental stand-in shown when an image asset is missing or fails to load. */
export function ImageFallback({ label }: { label?: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-cream texture-patola">
      <MandalaLine className="h-2/3 w-2/3 max-h-40 max-w-40 text-gold/45 animate-spin-slower" />
      <span className="sr-only">{label ? `Image unavailable: ${label}` : 'Image unavailable'}</span>
    </div>
  );
}
