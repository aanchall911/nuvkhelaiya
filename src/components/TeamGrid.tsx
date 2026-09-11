import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT_SOFT, inView, riseIn, stagger } from '@/lib/motion';
import { COMMITTEE, COMMITTEE_COUNT, PHOTO_COUNT, type Portfolio, type Shot } from '@/data/committee';
import { MicroBrand } from '@/components/ui/Typography';
import { DiyaIcon, MandalaLine, OrnamentDivider, RangoliCorner, ToranBorder } from '@/components/ornaments/Ornaments';

const LEAD_STEP = 0.32;   // s between each portrait arriving
const LEADS_HOLD = 1800;  // ms after all have landed
const CURTAIN_MS = 2200;  // ms the team pic reveal plays
const TOGETHER_HOLD = 4000; // ms the team pic is held

type Phase = 'leads' | 'scatter' | 'together';

const teamTitle = (role: string) =>
  ['Presidents', 'Treasurers'].includes(role) ? `The ${role}` : `The ${role} Team`;

/* ------------------------------------------------------------------ */
/* A vertical lead portrait, arriving from its own direction           */
/* ------------------------------------------------------------------ */
function LeadCard({ shot, index, total, phase }: { shot: Shot; index: number; total: number; phase: Phase }) {
  const fromLeft = index % 2 === 0;
  const rank = Math.floor(index / 2);
  const entryX = fromLeft ? -(300 + rank * 110) : (300 + rank * 110);

  /* scatter: each card flies to a different random-ish exit vector */
  const exitAngle = ((index / total) * 360 - 90) * (Math.PI / 180);
  const exitX = Math.cos(exitAngle) * 520;
  const exitY = Math.sin(exitAngle) * 420;
  const exitR = (index % 2 === 0 ? -1 : 1) * (28 + (index % 3) * 16);

  return (
    <motion.li
      initial={{ opacity: 0, x: entryX, rotate: fromLeft ? -5 : 5, scale: 0.88 }}
      animate={
        phase === 'scatter'
          ? { opacity: 0, x: exitX, y: exitY, rotate: exitR, scale: 0.6 }
          : { opacity: 1, x: 0, rotate: 0, scale: 1 }
      }
      transition={
        phase === 'scatter'
          ? { duration: 0.9, ease: [0.4, 0, 1, 1], delay: index * 0.055 }
          : { duration: 0.95, ease: EASE_OUT_SOFT, delay: index * LEAD_STEP }
      }
      className="group relative w-[clamp(100px,14vw,152px)] shrink-0"
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
            <img src={shot.src} alt={shot.name ?? 'Committee lead'} loading="lazy" decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-[1100ms] group-hover:scale-[1.08]" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-deep/70 via-transparent to-transparent" />
            <span aria-hidden="true"
              className="pointer-events-none absolute -inset-x-full inset-y-0 -translate-x-full bg-gradient-to-r
                from-transparent via-gold-light/45 to-transparent opacity-0
                transition-all duration-[1100ms] group-hover:translate-x-full group-hover:opacity-100" />
          </div>
        </div>
      </div>

      {shot.name && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={phase === 'scatter' ? { opacity: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT_SOFT, delay: index * LEAD_STEP + 0.4 }}
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
/* Golden shimmer that fires while the leads are scattering            */
/* ------------------------------------------------------------------ */
function ScatterShimmer() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.span
        initial={{ x: '-130%' }}
        animate={{ x: '130%' }}
        transition={{ duration: 0.95, ease: [0.42, 0, 0.58, 1] }}
        className="absolute inset-y-0 left-0 w-[55%] -skew-x-12 bg-gradient-to-r from-transparent via-saffron/30 to-transparent blur-3xl"
      />
      <motion.span
        initial={{ x: '-140%' }}
        animate={{ x: '140%' }}
        transition={{ duration: 0.95, ease: [0.42, 0, 0.58, 1], delay: 0.08 }}
        className="absolute inset-y-0 left-0 w-[22%] -skew-x-12 bg-gradient-to-r from-transparent via-gold/55 to-transparent blur-xl"
      />
      <motion.span
        initial={{ x: '-150%' }}
        animate={{ x: '150%' }}
        transition={{ duration: 0.95, ease: [0.42, 0, 0.58, 1], delay: 0.14 }}
        className="absolute inset-y-0 left-0 w-[6%] -skew-x-12 bg-gradient-to-r from-transparent via-gold-light to-transparent"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The together shot — curtain wipe + slow zoom + word-by-word title   */
/* ------------------------------------------------------------------ */
function TogetherShot({ photo, role }: { photo: string; role: string }) {
  const words = teamTitle(role).split(' ');
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.82, rotate: -3 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.05, ease: EASE_OUT_SOFT }}
      className="relative mx-auto w-full max-w-[min(480px,88vw)]"
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
            transition={{ duration: 1.05, ease: EASE_OUT_SOFT, delay: 0.12 }}
            className="relative aspect-video overflow-hidden ring-1 ring-gold/30"
          >
            <motion.img src={photo} alt={teamTitle(role)} loading="lazy" decoding="async"
              initial={{ scale: 1.14 }}
              animate={{ scale: 1 }}
              transition={{ duration: CURTAIN_MS / 1000 + 1, ease: 'easeOut' }}
              className="h-full w-full object-cover object-center" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-deep/80 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>

      <motion.figcaption
        variants={stagger(0.35, 0.1)}
        initial="hidden"
        animate="show"
        className="mt-5 text-center font-display text-[clamp(1.3rem,4vw,2.4rem)] font-light leading-tight"
      >
        {words.map((w, i) => (
          <motion.span key={i}
            variants={{
              hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
              show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE_OUT_SOFT } },
            }}
            className="mr-[0.24em] inline-block text-shimmer-gold"
          >{w}</motion.span>
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
            {p.names.map((n) => <li key={n} className="text-[14px] text-ivory/80">{n}</li>)}
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
  const [phase, setPhase] = useState<Phase>('leads');
  const [paused, setPaused] = useState(false);
  const [live, setLive] = useState(false);

  const p: Portfolio = COMMITTEE[idx];
  const leads = p.leads;
  const together = p.group[0];
  const leadsMs = Math.max(leads.length, 1) * LEAD_STEP * 1000 + LEADS_HOLD;

  useEffect(() => {
    setPhase('leads');
  }, [idx]);

  useEffect(() => {
    if (reduce || paused || !live) return;
    const step = () => {
      if (phase === 'leads') {
        if (together) setPhase('scatter');
        else { setIdx((v) => (v + 1) % COMMITTEE.length); }
      } else if (phase === 'scatter') {
        setPhase('together');
      } else {
        setIdx((v) => (v + 1) % COMMITTEE.length);
      }
    };
    const ms = phase === 'leads' ? leadsMs
      : phase === 'scatter' ? CURTAIN_MS
      : TOGETHER_HOLD;
    const id = window.setTimeout(step, ms);
    return () => window.clearTimeout(id);
  }, [phase, idx, leadsMs, together, reduce, paused, live]);

  return (
    <section className="relative overflow-hidden pb-14 pt-6 sm:pb-20" aria-label="Committee members">
      <MandalaLine className="pointer-events-none absolute -right-40 top-1/3 h-[420px] w-[420px] text-gold/12 animate-spin-slower" />

      <div className="container-editorial relative">
        <motion.dl variants={stagger(0.08, 0.1)} initial="hidden" whileInView="show" viewport={inView}
          className="mx-auto grid max-w-lg grid-cols-3 gap-3">
          {[['Teams', String(COMMITTEE.length)], ['Leads', String(COMMITTEE_COUNT)], ['Photos', String(PHOTO_COUNT)]].map(([k, v]) => (
            <motion.div key={k} variants={riseIn}
              className="border border-gold/25 bg-plum-deep/40 px-3 py-3 text-center backdrop-blur-sm">
              <dd className="font-display text-lg font-light text-ivory">{v}</dd>
              <dt className="mt-0.5 text-[8px] uppercase tracking-[0.24em] text-gold">{k}</dt>
            </motion.div>
          ))}
        </motion.dl>

        {reduce ? <StaticRoster /> : (
          <>
            <motion.div
              onViewportEnter={() => setLive(true)}
              viewport={{ amount: 0.25 }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="relative mt-10 min-h-[clamp(280px,40vw,420px)]"
            >
              <AnimatePresence mode="wait">
                {(phase === 'leads' || phase === 'scatter') && (
                  <motion.div key={`leads-${idx}`}
                    className="absolute inset-0 flex items-center justify-center"
                    exit={{ opacity: 0 }}
                  >
                    {/* stage frame */}
                    {(['left-0 top-0', 'right-0 top-0 scale-x-[-1]', 'bottom-0 left-0 scale-y-[-1]', 'bottom-0 right-0 scale-[-1]'] as const).map((c) => (
                      <svg key={c} viewBox="0 0 80 80" aria-hidden="true"
                        className={`pointer-events-none absolute h-10 w-10 text-gold/50 sm:h-12 sm:w-12 ${c}`}>
                        <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
                          <path d="M2 28 V10 Q2 2 10 2 H28" />
                          <path d="M8 32 V16 Q8 8 16 8 H32" strokeDasharray="2 3" />
                          <circle cx="12" cy="12" r="2" />
                        </g>
                      </svg>
                    ))}

                    {phase === 'scatter' && <ScatterShimmer />}

                    {leads.length ? (
                      <ul className="flex flex-wrap items-start justify-center gap-2.5 sm:gap-3.5">
                        {leads.map((s, i) => (
                          <LeadCard key={s.src} shot={s} index={i} total={leads.length} phase={phase} />
                        ))}
                      </ul>
                    ) : (
                      <div className="flex flex-col items-center gap-3 text-center">
                        <DiyaIcon className="h-9 w-9 text-saffron animate-diya-glow" />
                        <p className="text-[13px] text-ivory/60">Photographs on the way.</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {phase === 'together' && together && (
                  <motion.div key={`together-${idx}`}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <TogetherShot photo={together} role={p.role} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="mt-6 text-center">
              <AnimatePresence mode="wait">
                <motion.div key={p.slug}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE_OUT_SOFT }}>
                  <h3 className="font-display text-[clamp(1.6rem,4.2vw,2.6rem)] font-light leading-tight text-shimmer-gold">{p.role}</h3>
                  <p className="mx-auto mt-2 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-1">
                    {p.names.map((n, i) => (
                      <span key={n} className="flex items-center gap-3">
                        {i > 0 && <span className="text-gold/50">✦</span>}
                        <span className="font-display text-[14px] text-ivory/85">{n}</span>
                      </span>
                    ))}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-1.5" aria-hidden="true">
              {COMMITTEE.map((c, i) => (
                <span key={c.slug} className={`h-1 rounded-full transition-all duration-500 ${i === idx ? 'w-8 bg-saffron' : 'w-3 bg-gold/40'}`} />
              ))}
            </div>
            <p className="mt-3 text-center text-[9.5px] uppercase tracking-[0.24em] text-ivory/40">
              {paused ? 'Paused' : 'Plays automatically'} · Hover to pause
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
