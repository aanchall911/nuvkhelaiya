import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT_SOFT, inView, riseIn, stagger } from '@/lib/motion';
import { COMMITTEE, COMMITTEE_COUNT, PHOTO_COUNT, type Portfolio, type Shot } from '@/data/committee';
import { MicroBrand } from '@/components/ui/Typography';
import {
  DiyaIcon,
  InstrumentRail,
  MandalaLine,
  OrnamentDivider,
  RangoliCorner,
  ToranBorder,
} from '@/components/ornaments/Ornaments';

const LEAD_STEP = 0.36; // s between portraits arriving
const LEADS_MS = 1900; // extra hold once they have all landed
const SHIMMER_MS = 1400;
const TOGETHER_MS = 4400;

type Phase = 'leads' | 'shimmer' | 'together';

/** Roles that are already plural read better without the word "Team". */
const PLURAL_ROLES = new Set(['Presidents', 'Treasurers']);
const teamTitle = (role: string) => (PLURAL_ROLES.has(role) ? `The ${role}` : `The ${role} Team`);

/* ------------------------------------------------------------------ */
/* A vertical portrait, sliding in from the left or the right          */
/* ------------------------------------------------------------------ */
function LeadCard({ shot, index }: { shot: Shot; index: number }) {
  const fromLeft = index % 2 === 0;
  const rank = Math.floor(index / 2);
  const distance = 300 + rank * 120;
  const delay = index * LEAD_STEP;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: fromLeft ? -distance : distance, rotate: fromLeft ? -6 : 6, scale: 0.88 }}
      animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
      transition={{ duration: 1, ease: EASE_OUT_SOFT, delay }}
      className="group relative w-[clamp(104px,15vw,158px)] shrink-0"
      data-cursor="hover"
    >
      {/* double gold frame with a toran hanging over the top */}
      <div className="relative border border-gold/40 p-[3px] transition-colors duration-500 group-hover:border-saffron/80">
        <div className="relative border border-gold/60 p-[3px] pt-4">
          <ToranBorder className="absolute inset-x-0 top-0 h-4 w-full text-gold" count={12} />
          <RangoliCorner className="pointer-events-none absolute -left-px -top-px h-5 w-5 text-gold/70 transition-colors duration-500 group-hover:text-saffron" />
          <RangoliCorner className="pointer-events-none absolute -right-px -top-px h-5 w-5 scale-x-[-1] text-gold/70 transition-colors duration-500 group-hover:text-saffron" />
          <RangoliCorner className="pointer-events-none absolute -bottom-px -left-px h-5 w-5 scale-y-[-1] text-gold/70 transition-colors duration-500 group-hover:text-saffron" />
          <RangoliCorner className="pointer-events-none absolute -bottom-px -right-px h-5 w-5 scale-[-1] text-gold/70 transition-colors duration-500 group-hover:text-saffron" />

          <div className="relative aspect-[3/4] overflow-hidden bg-plum-deep/60 ring-1 ring-gold/25">
            <img
              src={shot.src}
              alt={shot.name ?? 'Committee lead at NUV Yuva 2026'}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-deep/70 via-transparent to-transparent"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-full inset-y-0 -translate-x-full
                bg-gradient-to-r from-transparent via-gold-light/45 to-transparent opacity-0
                transition-all duration-[1100ms] group-hover:translate-x-full group-hover:opacity-100"
            />
          </div>
        </div>
      </div>

      {shot.name && (
        <motion.p
          initial={{ opacity: 0, y: 9 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_SOFT, delay: delay + 0.45 }}
          className="mt-2 border border-gold/35 bg-plum-deep/75 px-1.5 py-1 text-center font-display
            text-[clamp(0.66rem,1.3vw,0.84rem)] font-medium leading-tight text-ivory backdrop-blur-sm"
        >
          {shot.name}
        </motion.p>
      )}
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */
/* Golden shimmer, played after every portrait has landed             */
/* ------------------------------------------------------------------ */
function ShimmerSweep() {
  const ease = [0.42, 0, 0.58, 1] as const;
  const duration = SHIMMER_MS / 1000;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* wide warm haze */}
      <motion.span
        initial={{ x: '-70%' }}
        animate={{ x: '170%' }}
        transition={{ duration, ease }}
        className="absolute inset-y-0 left-0 w-[60%] -skew-x-12
          bg-gradient-to-r from-transparent via-saffron/30 to-transparent blur-3xl"
      />
      {/* antique-gold body */}
      <motion.span
        initial={{ x: '-60%' }}
        animate={{ x: '180%' }}
        transition={{ duration, ease, delay: 0.05 }}
        className="absolute inset-y-0 left-0 w-[26%] -skew-x-12
          bg-gradient-to-r from-transparent via-gold/55 to-transparent blur-xl"
      />
      {/* bright gold core */}
      <motion.span
        initial={{ x: '-50%' }}
        animate={{ x: '190%' }}
        transition={{ duration, ease, delay: 0.1 }}
        className="absolute inset-y-0 left-0 w-[7%] -skew-x-12
          bg-gradient-to-r from-transparent via-gold-light to-transparent"
      />
      {/* travelling gold hairline, top and bottom */}
      {['top-0', 'bottom-0'].map((edge) => (
        <motion.span
          key={edge}
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration, ease }}
          className={`absolute ${edge} left-0 h-px w-[45%] bg-gradient-to-r from-transparent via-saffron to-transparent`}
        />
      ))}
    </div>
  );
}

/** Antique-gold corner brackets, drawn around the whole stage. */
function StageFrame() {
  const corners = [
    'left-0 top-0',
    'right-0 top-0 scale-x-[-1]',
    'bottom-0 left-0 scale-y-[-1]',
    'bottom-0 right-0 scale-[-1]',
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {corners.map((c) => (
        <svg
          key={c}
          viewBox="0 0 80 80"
          className={`absolute ${c} h-12 w-12 text-gold/60 sm:h-16 sm:w-16`}
        >
          <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
            <path d="M2 30 V10 Q2 2 10 2 H30" />
            <path d="M8 34 V16 Q8 8 16 8 H34" strokeDasharray="2 3" />
            <circle cx="12" cy="12" r="2.2" />
            <path d="M22 2 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 z" />
          </g>
        </svg>
      ))}
      <span className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent" />
      <span className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The together shot — sits beside the leads, never on top of them     */
/* ------------------------------------------------------------------ */
function TogetherShot({ photo, role }: { photo: string; role: string }) {
  const words = teamTitle(role).split(' ');

  return (
    <motion.figure
      layout
      initial={{ opacity: 0, x: 90, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1, ease: EASE_OUT_SOFT }}
      className="relative w-[clamp(200px,26vw,300px)] shrink-0"
    >
      <span
        aria-hidden="true"
        className="absolute -inset-5 rounded-full bg-saffron/18 blur-3xl animate-diya-glow"
      />

      <div className="relative border border-gold/50 p-[3px]">
        <div className="relative border border-gold/70 p-[4px] pt-5">
          <ToranBorder className="absolute inset-x-0 top-0 h-5 w-full text-gold" count={18} />
          <RangoliCorner className="pointer-events-none absolute -left-px -top-px h-7 w-7 text-gold" />
          <RangoliCorner className="pointer-events-none absolute -right-px -top-px h-7 w-7 scale-x-[-1] text-gold" />
          <RangoliCorner className="pointer-events-none absolute -bottom-px -left-px h-7 w-7 scale-y-[-1] text-gold" />
          <RangoliCorner className="pointer-events-none absolute -bottom-px -right-px h-7 w-7 scale-[-1] text-gold" />

          <motion.div
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1, ease: EASE_OUT_SOFT, delay: 0.15 }}
            className="relative aspect-[3/4] overflow-hidden ring-1 ring-gold/30"
          >
            <motion.img
              src={photo}
              alt={`${teamTitle(role)} at NUV Yuva 2026`}
              loading="lazy"
              decoding="async"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 4.2, ease: 'easeOut' }}
              className="h-full w-full object-cover object-top"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-deep/80 via-transparent to-transparent"
            />
          </motion.div>
        </div>
      </div>

      <motion.figcaption
        variants={stagger(0.45, 0.1)}
        initial="hidden"
        animate="show"
        className="mt-4 text-center font-display text-[clamp(1.1rem,2.6vw,1.6rem)] font-light leading-tight"
      >
        {words.map((w, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
              show: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.7, ease: EASE_OUT_SOFT },
              },
            }}
            className="mr-[0.24em] inline-block text-shimmer-gold"
          >
            {w}
          </motion.span>
        ))}
      </motion.figcaption>
    </motion.figure>
  );
}

/* ------------------------------------------------------------------ */
/* Reduced-motion / screen-reader roster                              */
/* ------------------------------------------------------------------ */
function StaticRoster() {
  return (
    <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {COMMITTEE.map((p) => (
        <li key={p.slug} className="border border-gold/30 bg-plum-deep/40 p-5">
          <h3 className="font-display text-xl font-light text-shimmer-gold">{p.role}</h3>
          <ul className="mt-3 space-y-1.5">
            {p.names.map((n) => (
              <li key={n} className="text-[14px] text-ivory/80">
                {n}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

/* ================================================================== */
/* Committee — leads arrive, gold shimmer, then the team joins them     */
/* ================================================================== */
export function TeamGrid() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('leads');
  const [paused, setPaused] = useState(false);
  const [live, setLive] = useState(false);

  const p: Portfolio = COMMITTEE[idx];
  const leads = p.leads;
  const together = p.group[0];

  useEffect(() => {
    if (reduce || paused || !live) return;

    const step = () => {
      if (phase === 'leads') {
        if (together) setPhase('shimmer');
        else {
          setIdx((v) => (v + 1) % COMMITTEE.length);
          setPhase('leads');
        }
      } else if (phase === 'shimmer') {
        setPhase('together');
      } else {
        setIdx((v) => (v + 1) % COMMITTEE.length);
        setPhase('leads');
      }
    };

    const ms =
      phase === 'leads'
        ? Math.max(leads.length, 1) * LEAD_STEP * 1000 + LEADS_MS
        : phase === 'shimmer'
          ? SHIMMER_MS
          : TOGETHER_MS;

    const id = window.setTimeout(step, ms);
    return () => window.clearTimeout(id);
  }, [phase, idx, leads.length, together, reduce, paused, live]);

  return (
    <section className="relative overflow-hidden pb-20 pt-12 sm:pb-24" aria-label="Committee members">
      <div aria-hidden="true" className="absolute inset-0 texture-bandhani opacity-35" />
      <MandalaLine className="pointer-events-none absolute -right-40 top-1/3 h-[420px] w-[420px] text-gold/12 animate-spin-slower" />

      {/* folk instruments down both sides */}
      <InstrumentRail side="left" className="hidden xl:flex" />
      <InstrumentRail side="right" className="hidden xl:flex" />

      <div className="container-editorial relative">
        <motion.dl
          variants={stagger(0.08, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto grid max-w-lg grid-cols-3 gap-3"
        >
          {[
            ['Teams', String(COMMITTEE.length)],
            ['Leads', String(COMMITTEE_COUNT)],
            ['Photos', String(PHOTO_COUNT)],
          ].map(([k, v]) => (
            <motion.div
              key={k}
              variants={riseIn}
              className="border border-gold/25 bg-plum-deep/40 px-3 py-3 text-center backdrop-blur-sm"
            >
              <dd className="font-display text-lg font-light text-ivory">{v}</dd>
              <dt className="mt-0.5 text-[8px] uppercase tracking-[0.24em] text-gold">{k}</dt>
            </motion.div>
          ))}
        </motion.dl>

        {reduce ? (
          <StaticRoster />
        ) : (
          <>
            <motion.div
              onViewportEnter={() => setLive(true)}
              viewport={{ amount: 0.25 }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="relative mt-12 px-6 py-10 sm:px-10"
            >
              <StageFrame />
              {/* the golden sweep crosses the entire stage */}
              {phase === 'shimmer' && <ShimmerSweep />}

              <AnimatePresence mode="wait">
                <motion.div
                  key={p.slug}
                  exit={{ opacity: 0, y: -16, transition: { duration: 0.4 } }}
                  className="flex min-h-[clamp(280px,38vw,400px)] items-center justify-center"
                >
                  {leads.length ? (
                    /* the row reflows so the team shot sits beside the leads,
                       never covering a face */
                    <motion.div
                      layout
                      className="relative flex flex-wrap items-center justify-center gap-x-4 gap-y-8 sm:gap-x-6 lg:gap-x-10"
                    >
                      <motion.ul
                        layout
                        animate={{ scale: phase === 'together' ? 0.94 : 1 }}
                        transition={{ duration: 0.8, ease: EASE_OUT_SOFT }}
                        className="relative flex items-start justify-center gap-2.5 sm:gap-3.5"
                      >
                        {leads.map((s, i) => (
                          <LeadCard key={s.src} shot={s} index={i} />
                        ))}
                      </motion.ul>

                      {phase === 'together' && together && (
                        <>
                          <motion.span
                            aria-hidden="true"
                            layout
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}
                            className="hidden h-40 w-px bg-gradient-to-b from-transparent via-gold to-transparent lg:block"
                          />
                          <TogetherShot photo={together} role={p.role} />
                        </>
                      )}
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-10 text-center">
                      <DiyaIcon className="h-9 w-9 text-saffron animate-diya-glow" />
                      <p className="text-[13px] text-ivory/60">Photographs on the way.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* role + the names we know */}
            <div className="mt-8 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE_OUT_SOFT }}
                >
                  <h3 className="font-display text-[clamp(1.7rem,4.6vw,2.7rem)] font-light leading-tight text-shimmer-gold">
                    {p.role}
                  </h3>
                  <p className="mx-auto mt-3 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
                    {p.names.map((n, i) => (
                      <span key={n} className="flex items-center gap-3">
                        {i > 0 && <span className="text-gold/50">✦</span>}
                        <span className="font-display text-[15px] text-ivory/85">{n}</span>
                      </span>
                    ))}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-1.5" aria-hidden="true">
              {COMMITTEE.map((c, i) => (
                <span
                  key={c.slug}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === idx ? 'w-8 bg-saffron' : 'w-3 bg-gold/40'
                  }`}
                />
              ))}
            </div>
            <p className="mt-4 text-center text-[9.5px] uppercase tracking-[0.24em] text-ivory/40">
              {paused ? 'Paused' : 'Plays automatically'} · Hover to pause
            </p>

            <div className="sr-only">
              <StaticRoster />
            </div>
          </>
        )}

        <OrnamentDivider className="mt-14" />
        <MicroBrand className="mt-7 text-center" />
      </div>
    </section>
  );
}
