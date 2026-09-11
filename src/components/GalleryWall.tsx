import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT_SOFT, inView } from '@/lib/motion';
import { GALLERY_FILM, GALLERY_ITEMS, type GalleryItem } from '@/data/gallery';
import { GujaratiQuote } from '@/components/InvitationBand';
import { MicroBrand } from '@/components/ui/Typography';
import { DiyaIcon, MandalaLine, RangoliCorner, ToranBorder } from '@/components/ornaments/Ornaments';

const CLIP: Record<GalleryItem['shape'], string | undefined> = {
  arch: 'url(#nk-arch)',
  leaf: 'url(#nk-leaf)',
  square: undefined,
};

/* ================================================================== */
/* The film — NUV Khelaiya 2025, at the centre of the mandala           */
/* ================================================================== */
function CentreFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={inView}
      transition={{ duration: 1.1, ease: EASE_OUT_SOFT }}
      /* only the circle lives here, so it stays dead centre of the mandala */
      className="relative aspect-square w-full"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-saffron/25 blur-3xl animate-diya-glow"
      />
      <span aria-hidden="true" className="absolute -inset-[7px] rounded-full border border-gold/70" />
      <span aria-hidden="true" className="absolute -inset-3 rounded-full border border-gold/25" />

      <div className="group relative h-full w-full overflow-hidden rounded-full ring-1 ring-gold/40">
        <video
          ref={video}
          src={GALLERY_FILM.src}
          poster={GALLERY_FILM.poster}
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="metadata"
          aria-label={`${GALLERY_FILM.title} highlights`}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="h-full w-full object-cover"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-plum-deep/55 via-transparent to-transparent"
        />

        {/* tap the film to pause or resume */}
        <button
          type="button"
          onClick={toggle}
          data-cursor-label={playing ? 'Pause' : 'Play'}
          aria-label={playing ? 'Pause the film' : 'Play the film'}
          className="absolute inset-0 grid place-items-center rounded-full"
        >
          <span
            className={`pulse-ring grid h-[24%] w-[24%] min-h-[48px] min-w-[48px] place-items-center rounded-full
              border border-saffron/70 bg-plum-deep/60 text-saffron transition-opacity duration-500 ${
                playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
              }`}
          >
            {playing ? (
              <svg viewBox="0 0 24 24" className="h-1/2 w-1/2" fill="currentColor" aria-hidden="true">
                <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="ml-[6%] h-1/2 w-1/2" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </span>
        </button>
      </div>

      {/* sound toggle, tucked under the rim */}
      <button
        type="button"
        onClick={() => {
          setMuted((m) => !m);
          if (video.current) video.current.muted = !muted;
        }}
        aria-pressed={!muted}
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 border border-gold/60 bg-plum-deep/80
          px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-ivory backdrop-blur-sm
          transition-colors duration-300 hover:border-saffron hover:text-saffron"
      >
        {muted ? 'Unmute' : 'Mute'}
      </button>
    </motion.div>
  );
}





/* ================================================================== */
/* A vertical toran strand — photographs threaded down a single cord    */
/* ================================================================== */
function ToranStrand({
  items,
  side,
  offset,
  onOpen,
  className = '',
}: {
  items: GalleryItem[];
  side: 'left' | 'right';
  /** index of the first item, so lightbox indices stay correct */
  offset: number;
  onOpen: (i: number) => void;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (!items.length) return null;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* the rail this strand hangs from */}
      <div aria-hidden="true" className="w-full">
        <span className="block h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
        <ToranBorder className="h-3.5 w-full text-gold/70" count={10} />
      </div>

      {/* the strand sways as one, from the rail */}
      <motion.ul
        className="flex origin-top flex-col items-center"
        animate={reduce ? undefined : { rotate: [-1.2, 1.2, -1.2] }}
        transition={{
          duration: side === 'left' ? 8.5 : 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {items.map((item, i) => {
          /* every photo hangs on its own length of string — one high, the next
             lower — and each string keeps lengthening and shortening */
          const base = side === 'left' ? [22, 62, 34, 74] : [58, 26, 70, 38];
          const cord = base[i % 4];
          const stretch = 18 + (i % 3) * 9;
          const lean = i % 2 === 0 ? -7 : 7;

          return (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, y: -18, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.7, ease: EASE_OUT_SOFT, delay: i * 0.12 }}
              className="flex flex-col items-center"
              style={{ marginLeft: lean }}
            >
              {/* the string itself grows and shrinks, so everything below it
                  rises and falls with it */}
              <motion.span
                aria-hidden="true"
                className="block w-px bg-gradient-to-b from-gold/80 to-gold/40"
                initial={{ height: cord }}
                animate={reduce ? { height: cord } : { height: [cord, cord + stretch, cord] }}
                transition={{
                  duration: 4.6 + (i % 4) * 1.1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.55 + (side === 'right' ? 0.9 : 0),
                }}
              />
              <span
                aria-hidden="true"
                className="mb-1.5 block h-2 w-2 rounded-full bg-saffron shadow-[0_0_10px_rgba(254,191,74,0.8)]"
              />

              <button
                type="button"
                onClick={() => onOpen(offset + i)}
                data-cursor-label="View"
                aria-label={`Open ${item.caption} — ${item.alt}`}
                className="group relative block w-[clamp(96px,14vw,168px)] border border-gold/45 p-[4px]
                  transition-colors duration-500 hover:border-saffron/80"
              >
                <RangoliCorner className="pointer-events-none absolute -left-px -top-px h-6 w-6 text-gold/60 transition-colors duration-500 group-hover:text-saffron" />
                <RangoliCorner className="pointer-events-none absolute -bottom-px -right-px h-6 w-6 rotate-180 text-gold/60 transition-colors duration-500 group-hover:text-saffron" />

                <div
                  className="relative aspect-[4/5] overflow-hidden bg-plum-deep/60 ring-1 ring-gold/20"
                  style={{ clipPath: CLIP[item.shape] }}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.09]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-deep/80 via-transparent to-transparent"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-x-full inset-y-0 -translate-x-full bg-gradient-to-r
                      from-transparent via-gold-light/45 to-transparent opacity-0 transition-all duration-[1100ms]
                      group-hover:translate-x-full group-hover:opacity-100"
                  />
                  <span className="absolute inset-x-0 bottom-0 p-2.5">
                    <span className="block translate-y-1 text-[9px] font-bold uppercase tracking-[0.2em] text-saffron opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      {item.category}
                    </span>
                  </span>
                </div>
              </button>
            </motion.li>
          );
        })}

        {/* the tassel at the bottom of the strand */}
        <li aria-hidden="true" className="flex flex-col items-center">
          <span className="block h-6 w-px bg-gradient-to-b from-gold/60 to-transparent" />
          <DiyaIcon className="h-4 w-4 text-saffron/80 animate-diya-glow" />
        </li>
      </motion.ul>
    </div>
  );
}

/* ================================================================== */
/* Lightbox                                                            */
/* ================================================================== */
function Lightbox({
  items,
  index,
  onClose,
  onStep,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const item = items[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onStep]);

  if (!item) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.caption}. Image ${index + 1} of ${items.length}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[80] grid place-items-center bg-plum-deep/95 p-4 backdrop-blur-md sm:p-8"
    >
      <MandalaLine className="pointer-events-none absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 text-saffron/[0.07] animate-spin-slower" />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery viewer"
        className="absolute right-4 top-4 grid h-12 w-12 place-items-center border border-gold/50 text-ivory transition-colors hover:border-saffron hover:text-saffron sm:right-8 sm:top-8"
      >
        <span className="text-xl leading-none">×</span>
      </button>

      <motion.figure
        key={item.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: EASE_OUT_SOFT }}
        className="relative max-h-[82vh] w-full max-w-3xl"
      >
        <div className="relative border border-gold/50 p-[6px]">
          <ToranBorder className="absolute inset-x-0 -top-px h-4 w-full text-gold" count={24} />
          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[68vh] w-full object-contain ring-1 ring-gold/20"
          />
        </div>
        <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 text-ivory/75">
          <span className="font-display text-lg text-ivory">{item.caption}</span>
          <span className="text-[10px] uppercase tracking-[0.24em] text-gold">
            {item.category} · {index + 1} / {items.length}
          </span>
        </figcaption>
      </motion.figure>

      {/* prev / next */}
      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-4 sm:bottom-10">
        <button
          type="button"
          onClick={() => onStep(-1)}
          aria-label="Previous image"
          className="btn-outline !min-h-[44px] !px-6"
        >
          ← Prev
        </button>
        <button
          type="button"
          onClick={() => onStep(1)}
          aria-label="Next image"
          className="btn-outline !min-h-[44px] !px-6"
        >
          Next →
        </button>
      </div>
    </motion.div>
  );
}

/* ================================================================== */
/* Gallery                                                             */
/* ================================================================== */
export function GalleryWall() {
  const [open, setOpen] = useState<number | null>(null);

  const visible = GALLERY_ITEMS;

  /* split the set into the two flanking strands */
  const half = Math.ceil(visible.length / 2);
  const leftStrand = visible.slice(0, half);
  const rightStrand = visible.slice(half);

  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((cur) => (cur === null ? null : (cur + dir + visible.length) % visible.length)),
    [visible.length],
  );

  return (
    <section className="relative overflow-hidden pb-14 pt-6 sm:pb-20" aria-label="Gallery">

      <div className="container-editorial relative">
        {/* ===== toran strands flank the mandala, left and right ===== */}
        <div className="grid grid-cols-2 items-start gap-x-6 gap-y-12 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-10">
          {/* the middle stays exactly as it was */}
          <div className="order-1 col-span-2 lg:order-2 lg:col-span-1">
            <div className="relative mx-auto aspect-square w-full max-w-[460px]">
              <MandalaLine
                petals={20}
                className="absolute inset-0 h-full w-full text-gold/25 animate-spin-slower"
              />
              <div className="absolute inset-[30%]">
                <MandalaLine petals={8} className="h-full w-full text-saffron/18 animate-spin-slow" />
              </div>

              {/* the film sits dead centre of the mandala */}
              <div className="absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2">
                <CentreFilm />
              </div>
            </div>

            {/* fills the quiet stretch below the film */}
            <GujaratiQuote
              text="એ હાલો સૌ ગરબા રમવા હાલો"
              translation="Come along, everyone — let’s go play garba."
              className="mt-10"
            />
          </div>

          <AnimatePresence mode="popLayout">
            <ToranStrand
              key="left"
              side="left"
              items={leftStrand}
              offset={0}
              onOpen={setOpen}
              className="order-2 lg:order-1"
            />
            <ToranStrand
              key="right"
              side="right"
              items={rightStrand}
              offset={leftStrand.length}
              onOpen={setOpen}
              className="order-3"
            />
          </AnimatePresence>
        </div>

        <div className="mt-16 flex items-center justify-center gap-3 text-gold/70">
          <DiyaIcon className="h-5 w-5 animate-diya-glow" />
          <p className="text-[11px] uppercase tracking-[0.24em]">
            2025 Highlights · More after 24 October 2026
          </p>
          <DiyaIcon className="h-5 w-5 animate-diya-glow" />
        </div>

        <MicroBrand className="mt-10 text-center" />
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox
            items={visible}
            index={open}
            onClose={() => setOpen(null)}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
