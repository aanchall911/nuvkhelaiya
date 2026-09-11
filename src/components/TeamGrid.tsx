import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT_SOFT, inView, riseIn, stagger } from '@/lib/motion';
import { COMMITTEE, COMMITTEE_COUNT, PHOTO_COUNT, type Portfolio, type Shot } from '@/data/committee';
import { MicroBrand } from '@/components/ui/Typography';
import {
  DiyaIcon,
  MandalaLine,
  OrnamentDivider,
  RangoliCorner,
  ToranBorder,
} from '@/components/ornaments/Ornaments';

const AUTO_MS = 5000; // ms a team is shown before auto-advancing

const teamTitle = (role: string) =>
  ['Presidents', 'Treasurers'].includes(role) ? `The ${role}` : `The ${role} Team`;

/* ------------------------------------------------------------------ */
/* A single lead portrait — slides in from alternating sides           */
/* ------------------------------------------------------------------ */
function LeadCard({ shot, index }: { shot: Shot; index: number }) {
  const fromLeft = index % 2 === 0;
  const delay = index * 0.1;

  return (
    <motion.li
      initial={{ opacity: 0, x: fromLeft ? -80 : 80, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, y: -30, scale: 0.92 }}
      transition={{ duration: 0.65, ease: EASE_OUT_SOFT, delay }}
      className="group relative w-[clamp(100px,13vw,148px)] shrink-0"
      data-cursor="hover"
    >
      <div className="relative border border-gold/40 p-[3px] transition-colors duration-500 group-hover:border-saffron/80">
        <div className="relative border border-gold/60 p-[3px] pt-4">
          <ToranBorder className="absolute inset-x-0 top-0 h-4 w-full text-gold" count={11} />
          <RangoliCorner className="pointer-events-none absolute -left-px -top-px h-5 w-5 text-gold/70 transition-colors group-hover:text-saffron" />
          <RangoliCorner className="pointer-events-none absolute -right-px -top-px h-5 w-5 scale-x-[-1] text-gold/70 transition-colors group-hover:text-saffron" />
          <RangoliCorner className="pointer-events-none absolute -bottom-px -left-px h-5 w-5 scale-y-[-1] text-gold/70 transition-colors group-hover:text-saffron" />
          <RangoliCorner className="pointer-events-none absolute -bottom-px -right-px h-5 w-5 scale-[-1] text-gold/70 transition-colors group-hover:text-saffron" />

          <div className="relative aspect-[3/4] overflow-hidden bg-plum-deep/60 ring-1 ring-gold/25">
            <img
              src={shot.src}
              alt={shot.name ?? 'Committee lead'}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-[1100ms] group-hover:scale-[1.08]"
            />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-deep/70 via-transparent to-transparent" />
            <span aria-hidden="true"
              className="pointer-events-none absolute -inset-x-full inset-y-0 -translate-x-full bg-gradient-to-r
                from-transparent via-gold-light/45 to-transparent opacity-0
                transition-all duration-[1100ms] group-hover:translate-x-full group-hover:opacity-100"
            />
          </div>
        </div>
      </div>

      {shot.name && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT_SOFT, delay: delay + 0.35 }}
          className="mt-2 border border-gold/35 bg-plum-deep/75 px-1.5 py-1 text-center font-display
            text-[clamp(0.64rem,1.2vw,0.82rem)] font-medium leading-tight text-ivory backdrop-blur-sm"
        >
          {shot.name}
        </motion.p>
      )}
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */
/* The together / group shot                                           */
/* ------------------------------------------------------------------ */
function TogetherShot({ photo, role }: { photo: string; role: string }) {
  const words = teamTitle(role).split(' ');

  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -20 }}
      transition={{ duration: 0.75, ease: EASE_OUT_SOFT }}
      className="relative mx-auto w-full max-w-[min(520px,88vw)]"
    >
      <span aria-hidden="true" className="absolute -inset-6 rounded-full bg-saffron/15 blur-3xl animate-diya-glow" />

      <div className="relative border border-gold/55 p-[4px]">
        <div className="relative border border-gold/75 p-[5px] pt-5">
          <ToranBorder className="absolute inset-x-0 top-0 h-5 w-full text-gold" count={20} />
          <RangoliCorner className="pointer-events-none absolute -left-px -top-px h-7 w-7 text-gold" />
          <RangoliCorner className="pointer-events-none absolute -right-px -top-px h-7 w-7 scale-x-[-1] text-gold" />
          <RangoliCorner className="pointer-events-none absolute -bottom-px -left-px h-7 w-7 scale-y-[-1] text-gold" />
          <RangoliCorner className="pointer-events-none absolute -bottom-px -right-px h-7 w-7 scale-[-1] text-gold" />

          <motion.div
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 0.85, ease: EASE_OUT_SOFT, delay: 0.1 }}
            className="relative aspect-video overflow-hidden ring-1 ring-gold/30"
          >
            <motion.img
              src={photo}
              alt={teamTitle(role)}
              loading="lazy"
              decoding="async"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 5, ease: 'easeOut' }}
              className="h-full w-full object-cover object-center"
            />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-deep/75 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>

      <motion.figcaption
        variants={stagger(0.25, 0.09)}
        initial="hidden"
        animate="show"
        className="mt-4 text-center font-display text-[clamp(1.3rem,3.8vw,2.3rem)] font-light leading-tight"
      >
        {words.map((w, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 14, filter: 'blur(5px)' },
              show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.65, ease: EASE_OUT_SOFT } },
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
/* Reduced-motion fallback                                             */
/* ------------------------------------------------------------------ */
function StaticRoster() {
  return (
    <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {COMMITTEE.map((p) => (
        <li key={p.slug} className="border border-gold/30 bg-plum-deep/40 p-5">
          <h3 className="font-display text-xl font-light text-shimmer-gold">{p.role}</h3>
          <ul className="mt-3 space-y-1.5">
            {p.names.map((n) => (
              <li key={n} className="text-[14px] text-ivory/80">{n}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

/* ================================================================== */
/* Committee                                                           */
/* ================================================================== */
export function TeamGrid() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  /** false = showing leads, true = showing team photo */
  const [showTeam, setShowTeam] = useState(false);
  const [paused, setPaused] = useState(false);
  const [live, setLive] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const p: Portfolio = COMMITTEE[idx];
  const leads = p.leads;
  const together = p.group[0];
  const total = COMMITTEE.length;

  const goNext = () => {
    clearTimeout(timer.current);
    setShowTeam(false);
    setIdx((v) => (v + 1) % total);
  };

  const goPrev = () => {
    clearTimeout(timer.current);
    setShowTeam(false);
    setIdx((v) => (v - 1 + total) % total);
  };

  const goIdx = (i: number) => {
    clearTimeout(timer.current);
    setShowTeam(false);
    setIdx(i);
  };

  /* auto-advance: leads → team pic → next team */
  useEffect(() => {
    if (reduce || paused || !live) return;
    clearTimeout(timer.current);

    if (!showTeam && together) {
      timer.current = setTimeout(() => setShowTeam(true), AUTO_MS);
    } else {
      timer.current = setTimeout(() => {
        setShowTeam(false);
        setIdx((v) => (v + 1) % total);
      }, AUTO_MS);
    }
    return () => clearTimeout(timer.current);
  }, [idx, showTeam, together, reduce, paused, live, total]);

  /* reset showTeam when team changes */
  useEffect(() => setShowTeam(false), [idx]);

  return (
    <section className="relative overflow-hidden pb-14 pt-6 sm:pb-20" aria-label="Committee members">
      <MandalaLine className="pointer-events-none absolute -right-40 top-1/3 h-[420px] w-[420px] text-gold/12 animate-spin-slower" />

      <div className="container-editorial relative">
        {/* stats */}
        <motion.dl
          variants={stagger(0.08, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto grid max-w-lg grid-cols-3 gap-3"
        >
          {[['Teams', String(total)], ['Leads', String(COMMITTEE_COUNT)], ['Photos', String(PHOTO_COUNT)]].map(([k, v]) => (
            <motion.div key={k} variants={riseIn}
              className="border border-gold/25 bg-plum-deep/40 px-3 py-3 text-center backdrop-blur-sm">
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
              className="relative mt-10 min-h-[clamp(300px,44vw,460px)]"
            >
              <AnimatePresence mode="wait">
                {!showTeam ? (
                  <motion.div
                    key={`leads-${idx}`}
                    className="absolute inset-0 flex items-start justify-center pt-4"
                  >
                    {leads.length ? (
                      <ul className="flex flex-wrap items-start justify-center gap-3 sm:gap-4">
                        {leads.map((s, i) => (
                          <LeadCard key={s.src} shot={s} index={i} />
                        ))}
                      </ul>
                    ) : (
                      <div className="flex flex-col items-center gap-3 pt-10 text-center">
                        <DiyaIcon className="h-9 w-9 text-saffron animate-diya-glow" />
                        <p className="text-[13px] text-ivory/60">Photographs on the way.</p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key={`team-${idx}`}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {together && <TogetherShot photo={together} role={p.role} />}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* role + member names */}
            <div className="mt-4 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE_OUT_SOFT }}
                >
                  <h3 className="font-display text-[clamp(1.6rem,4.2vw,2.6rem)] font-light leading-tight text-shimmer-gold">
                    {p.role}
                  </h3>
                  {p.names.length > 0 && (
                    <p className="mx-auto mt-2 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-1">
                      {p.names.map((n, i) => (
                        <span key={n} className="flex items-center gap-3">
                          {i > 0 && <span className="text-gold/50">✦</span>}
                          <span className="font-display text-[14px] text-ivory/85">{n}</span>
                        </span>
                      ))}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* navigation — prev / dots / next */}
            <div className="mt-7 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous team"
                className="grid h-10 w-10 place-items-center border border-gold/40 text-ivory/70
                  transition-colors duration-300 hover:border-saffron hover:text-saffron"
              >
                ←
              </button>

              <div className="flex flex-wrap items-center justify-center gap-1.5" role="tablist" aria-label="Team navigation">
                {COMMITTEE.map((c, i) => (
                  <button
                    key={c.slug}
                    type="button"
                    role="tab"
                    aria-selected={i === idx}
                    aria-label={c.role}
                    onClick={() => goIdx(i)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      i === idx ? 'w-8 bg-saffron' : 'w-2 bg-gold/45 hover:bg-saffron/70'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next team"
                className="grid h-10 w-10 place-items-center border border-gold/40 text-ivory/70
                  transition-colors duration-300 hover:border-saffron hover:text-saffron"
              >
                →
              </button>
            </div>

            {together && (
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowTeam((v) => !v)}
                  className="btn-ink !min-h-[36px] !border-gold/50 !px-5 !text-[10px] !text-ivory/80 hover:!text-saffron"
                >
                  {showTeam ? 'See Leads' : 'See Team Photo'}
                </button>
              </div>
            )}

            <p className="mt-3 text-center text-[9.5px] uppercase tracking-[0.24em] text-ivory/35">
              {paused ? 'Paused' : 'Auto-plays'} · Hover to pause
            </p>

            <div className="sr-only"><StaticRoster /></div>
          </>
        )}

        <OrnamentDivider className="mt-12" />
        <MicroBrand className="mt-6 text-center" />
      </div>
    </section>
  );
}
