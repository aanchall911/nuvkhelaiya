import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT_SOFT, inView, riseIn, stagger } from '@/lib/motion';
import {
  GALLERY_CATEGORIES,
  GALLERY_FILM,
  GALLERY_ITEMS,
  type GalleryCategory,
  type GalleryItem,
} from '@/data/gallery';
import { MicroBrand } from '@/components/ui/Typography';
import { DiyaIcon, MandalaLine, RangoliCorner, ToranBorder } from '@/components/ornaments/Ornaments';

const CLIP: Record<GalleryItem['shape'], string | undefined> = {
  arch: 'url(#nk-arch)',
  leaf: 'url(#nk-leaf)',
  square: undefined,
};

/* ================================================================== */
/* The film — NUV Khelaiya 2025, framed like a temple arch             */
/* ================================================================== */
const CENTRE_MS = 3600;

/**
 * The garbo at the centre of the circle — the Khelaiya artwork first, then the
 * rest of the set, crossfading on their own.
 */
function CentreShowcase({ items, onOpen }: { items: GalleryItem[]; onOpen: (i: number) => void }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => setI(0), [items.length]);

  useEffect(() => {
    if (reduce || paused || items.length < 2) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % items.length), CENTRE_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, items.length]);

  const current = items[i];
  if (!current) return null;

  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={inView}
      transition={{ duration: 1.1, ease: EASE_OUT_SOFT }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative flex flex-col items-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-saffron/25 blur-3xl animate-diya-glow"
      />

      <div className="relative aspect-square w-full">
        <span aria-hidden="true" className="absolute -inset-[7px] rounded-full border border-gold/70" />
        <span aria-hidden="true" className="absolute -inset-3 rounded-full border border-gold/25" />

        <button
          type="button"
          onClick={() => onOpen(i)}
          data-cursor-label="View"
          aria-label={`Open ${current.caption}`}
          className="group relative block h-full w-full overflow-hidden rounded-full ring-1 ring-gold/40"
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={current.id}
              src={current.src}
              alt={current.alt}
              loading="eager"
              decoding="async"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 1.3, ease: EASE_OUT_SOFT }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-plum-deep/60 via-transparent to-transparent"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-full inset-y-0 -translate-x-full
              bg-gradient-to-r from-transparent via-gold-light/45 to-transparent opacity-0
              transition-all duration-[1200ms] group-hover:translate-x-full group-hover:opacity-100"
          />
        </button>
      </div>

      <figcaption className="mt-5 max-w-[24ch] text-center">
        <p className="font-display text-[clamp(1.05rem,2.2vw,1.4rem)] font-light text-shimmer-gold">
          NUV Khelaiya 2025
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="mt-1 text-[11.5px] leading-relaxed text-ivory/65"
          >
            {current.caption}
          </motion.p>
        </AnimatePresence>
      </figcaption>

      {/* which frame we are on */}
      {items.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {items.map((it, idx) => (
            <button
              key={it.id}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Show ${it.caption}`}
              aria-current={idx === i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === i ? 'w-6 bg-saffron' : 'w-1.5 bg-gold/50 hover:bg-saffron/70'
              }`}
            />
          ))}
        </div>
      )}
    </motion.figure>
  );
}

/* ================================================================== */
/* One photograph seated on the circle around the film                 */
/* ================================================================== */
function OrbitPhoto({
  item,
  index,
  count,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  count: number;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  const angle = -90 + (360 / count) * index;
  const rad = (angle * Math.PI) / 180;
  const left = 50 + Math.cos(rad) * 41;
  const top = 50 + Math.sin(rad) * 41;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.4 }}
      transition={{ duration: 0.7, ease: EASE_OUT_SOFT, delay: index * 0.08 }}
      style={{ left: `${left}%`, top: `${top}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -9, 0] }}
        transition={{ duration: 6 + (index % 4), repeat: Infinity, ease: 'easeInOut' }}
      >
        <button
          type="button"
          onClick={onOpen}
          data-cursor-label="View"
          aria-label={`Open ${item.caption} — ${item.alt}`}
          className="group relative block"
        >
          <span
            aria-hidden="true"
            className="absolute -inset-[5px] rounded-full border border-gold/55 transition-colors duration-500 group-hover:border-saffron"
          />
          <span
            aria-hidden="true"
            className="absolute -inset-2 rounded-full bg-saffron/25 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"
          />

          <span className="relative block h-[clamp(74px,13vw,146px)] w-[clamp(74px,13vw,146px)] overflow-hidden rounded-full ring-1 ring-gold/30">
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.12]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-plum-deep/70 via-transparent to-transparent"
            />
          </span>

          <span className="mt-2 block text-center font-display text-[clamp(0.66rem,1.3vw,0.85rem)] font-light text-ivory/85">
            {item.caption}
          </span>
        </button>
      </motion.div>
    </motion.li>
  );
}

/* ================================================================== */
/* One hanging photograph                                             */
/* ================================================================== */
function ToranTile({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  const drop = [0, 46, 22, 62, 12, 38][index % 6];
  const cord = [56, 34, 48, 28, 60, 40][index % 6];

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.85, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}
      style={{ marginTop: drop }}
      className="flex flex-col items-center"
    >
      <motion.div
        className="flex origin-top flex-col items-center"
        animate={
          reduce
            ? undefined
            : { rotate: [-1.1, 1.1, -1.1] }
        }
        transition={{ duration: 7 + (index % 4), repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* cord + bead */}
        <span aria-hidden="true" className="block w-px bg-gradient-to-b from-gold/80 to-gold/40" style={{ height: cord }} />
        <span aria-hidden="true" className="mb-2 block h-2 w-2 rounded-full bg-saffron shadow-[0_0_10px_rgba(254,191,74,0.8)]" />

        <button
          type="button"
          onClick={onOpen}
          data-cursor-label="View"
          className="group relative block w-full border border-gold/40 p-[5px] transition-colors duration-500 hover:border-saffron/80"
          aria-label={`Open ${item.caption} — ${item.alt}`}
        >
          <RangoliCorner className="pointer-events-none absolute -left-px -top-px h-7 w-7 text-gold/60 transition-colors duration-500 group-hover:text-saffron" />
          <RangoliCorner className="pointer-events-none absolute -bottom-px -right-px h-7 w-7 rotate-180 text-gold/60 transition-colors duration-500 group-hover:text-saffron" />

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
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-deep/85 via-transparent to-transparent"
            />
            {/* shimmer sweep */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-full inset-y-0 -translate-x-full bg-gradient-to-r
                from-transparent via-gold-light/45 to-transparent opacity-0 transition-all duration-[1100ms]
                group-hover:translate-x-full group-hover:opacity-100"
            />
            <span className="absolute inset-x-0 bottom-0 p-3">
              <span className="block translate-y-1 text-[10px] font-bold uppercase tracking-[0.2em] text-saffron opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {item.category}
              </span>
            </span>
          </div>
        </button>
      </motion.div>

      <p className="mt-3 text-center font-display text-[15px] font-light text-ivory/85">
        {item.caption}
      </p>
    </motion.li>
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
  const [filter, setFilter] = useState<'All' | GalleryCategory>('All');
  const [open, setOpen] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === filter)),
    [filter],
  );

  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((cur) => (cur === null ? null : (cur + dir + visible.length) % visible.length)),
    [visible.length],
  );

  return (
    <section className="relative overflow-hidden pb-24 pt-12 sm:pb-28" aria-label="Gallery">
      <div aria-hidden="true" className="absolute inset-0 texture-mirrorwork opacity-40" />

      <div className="container-editorial relative">
        {/* filters */}
        <motion.div
          variants={stagger(0.06, 0.06)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          role="group"
          aria-label="Filter photographs by category"
          className="mt-10 flex flex-wrap items-center justify-center gap-2.5"
        >
          {GALLERY_CATEGORIES.map((c) => {
            const active = filter === c;
            return (
              <motion.button
                key={c}
                variants={riseIn}
                type="button"
                onClick={() => {
                  setFilter(c);
                  setOpen(null);
                }}
                aria-pressed={active}
                className={`min-h-[44px] border px-5 text-[10.5px] font-bold uppercase tracking-[0.2em] transition-all duration-400 ${
                  active
                    ? 'border-saffron bg-saffron text-plum-deep'
                    : 'border-gold/40 text-ivory/80 hover:border-saffron hover:text-saffron'
                }`}
              >
                {c}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ---------- the circle: film at the centre, photos around it ---------- */}
        <div className="relative mx-auto mt-12 hidden aspect-square w-full max-w-[820px] sm:block">
          <MandalaLine
            petals={Math.max(12, visible.length * 3)}
            className="absolute inset-0 h-full w-full text-gold/20 animate-spin-slower"
          />
          <MandalaLine petals={8} className="absolute inset-[32%] text-saffron/15 animate-spin-slow" />

          {/* the Khelaiya artwork, dead centre, rotating on its own */}
          <div className="absolute left-1/2 top-1/2 w-[38%] -translate-x-1/2 -translate-y-1/2">
            <CentreShowcase items={visible} onOpen={setOpen} />
          </div>

          <ul className="absolute inset-0">
            <AnimatePresence mode="popLayout">
              {visible.map((item, i) => (
                <OrbitPhoto
                  key={item.id}
                  item={item}
                  index={i}
                  count={visible.length}
                  onOpen={() => setOpen(i)}
                />
              ))}
            </AnimatePresence>
          </ul>
        </div>

        {/* ---------- mobile: film on top, hanging toran below ---------- */}
        <div className="sm:hidden">
          <div className="mx-auto mt-12 w-[74%]">
            <CentreShowcase items={visible} onOpen={setOpen} />
          </div>

          <div className="relative mt-14">
            <div aria-hidden="true" className="relative">
              <span className="block h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
              <ToranBorder className="h-4 w-full text-gold/70" count={22} />
            </div>

            <motion.ul layout className="mt-2 grid grid-cols-2 gap-x-4 gap-y-8">
              <AnimatePresence mode="popLayout">
                {visible.map((item, i) => (
                  <ToranTile key={item.id} item={item} index={i} onOpen={() => setOpen(i)} />
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-center gap-3 text-gold/70">
          <DiyaIcon className="h-5 w-5 animate-diya-glow" />
          <p className="text-[11px] uppercase tracking-[0.24em]">
            More from 24 October 2026
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
