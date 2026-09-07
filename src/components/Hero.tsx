import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { riseIn, stagger, textRevealItem } from '@/lib/motion';
import { ART, MICRO_BRAND } from '@/lib/assets';
import { EVENT } from '@/lib/event';
import { MotifPng } from '@/components/media/MotifPng';
import {
  DandiyaPair,
  MandalaBackdrop,
  SparkleField,
  ToranBorder,
} from '@/components/ornaments/Ornaments';

const TITLE = 'NUV KHELAIYA'.split('');

export function Hero() {
  const reduce = !!useReducedMotion();
  const runway = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: runway,
    offset: ['start start', 'end end'],
  });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });

  /* ---- festival lighting reveal ---- */
  const beamOpacity = useTransform(p, [0.06, 0.42, 1], [0, 1, 0.85]);
  const beamSpread = useTransform(p, [0.06, 0.5], [0.6, 1]);

  /* ---- title: settles smaller and rises, staying on one line ---- */
  const titleScale = useTransform(p, [0, 0.3, 0.75], [1, 1.06, 0.52]);
  const titleY = useTransform(p, [0, 0.3, 0.8], ['0vh', '-2vh', '-19vh']);

  /* ---- opening copy fades out early ---- */
  const introOpacity = useTransform(p, [0, 0.24], [1, 0]);
  const introY = useTransform(p, [0, 0.3], [0, -36]);

  /* ---- event meta arrives last ---- */
  const outroOpacity = useTransform(p, [0.55, 0.82], [0, 1]);
  const outroY = useTransform(p, [0.55, 0.88], [64, 0]);

  /* ---- ornament reactions ---- */
  const mandalaScale = useTransform(p, [0, 1], [1, 1.45]);
  const mandalaOpacity = useTransform(p, [0, 0.5, 1], [1, 0.75, 0.35]);
  /* the dancers stay planted on the ground and fade, rather than sliding down
     and getting sliced by the section's bottom edge */
  const dancerOpacity = useTransform(p, [0, 0.55, 0.85], [1, 0.85, 0]);
  const scrollHint = useTransform(p, [0, 0.08], [1, 0]);

  const still = reduce ? {} : undefined;

  return (
    /* tall runway drives the pinned animation; the visible hero is sticky */
    <div ref={runway} className={reduce ? 'relative' : 'relative h-[220vh]'}>
      <section
        className={`${
          reduce ? 'relative' : 'sticky top-0'
        } flex h-[100svh] items-center overflow-hidden`}
        aria-labelledby="hero-title"
      >
        {/* No local background wash here. The site-wide fixed gradient is the
            only background, so the hero and the section below it match exactly
            and no seam appears at the hero's bottom edge. */}

        {/* ---- festival lighting beams ---- */}
        <motion.div
          aria-hidden="true"
          style={reduce ? { opacity: 0.5 } : { opacity: beamOpacity, scaleX: beamSpread }}
          className="absolute inset-0 origin-top overflow-hidden mix-blend-screen"
        >
          {[-38, -20, -6, 8, 22, 40].map((deg, i) => (
            <span
              key={deg}
              className="festival-beam left-1/2"
              style={{
                transform: `translateX(-50%) rotate(${deg}deg)`,
                opacity: 0.35 + (i % 3) * 0.16,
              }}
            />
          ))}
        </motion.div>

        <SparkleField count={34} />

        <motion.div
          style={reduce ? still : { scale: mandalaScale, opacity: mandalaOpacity }}
          className="absolute inset-0"
        >
          <MandalaBackdrop size="min(800px, 80vmin)" />
        </motion.div>

        <ToranBorder className="absolute inset-x-0 top-0 h-8 w-full text-gold/60" count={44} />

        {/* ---- decorative PNG motifs ---- */}
        <MotifPng
          src={ART.motif.mandala}
          className="absolute -left-24 top-10 h-72 w-72 opacity-20 sm:h-96 sm:w-96"
          idle="spin"
          goldInk
          opacity={0.2}
        />
        <MotifPng
          src={ART.motif.peacock}
          className="absolute -right-10 bottom-24 h-64 w-64 opacity-30 lg:h-80 lg:w-80"
          idle="bob-sway"
          glow
          opacity={0.3}
        />
        <MotifPng
          src={ART.motif.diya}
          className="absolute bottom-16 left-[8%] h-20 w-20 sm:h-24 sm:w-24"
          idle="pulse"
          glow
          duration={4.2}
        />
        <MotifPng
          src={ART.motif.diya}
          className="absolute bottom-28 right-[12%] h-16 w-16 sm:h-20 sm:w-20"
          idle="pulse"
          glow
          duration={5.4}
          delay={0.8}
        />

        {/* ---- garba dancers, sinking as the hero plays out ---- */}
        <motion.div style={reduce ? still : { opacity: dancerOpacity }} className="absolute inset-0">
          <MotifPng
            src={ART.motif.garbaDancer}
            label="Garba dancer in traditional chaniya choli"
            className="absolute bottom-0 left-0 aspect-[447/559] h-[30vh] sm:h-[42vh] lg:h-[56vh]"
            idle="float"
            glow
            duration={9}
            opacity={0.95}
          />
          <MotifPng
            src={ART.motif.garbaDancer}
            className="absolute bottom-0 right-0 aspect-[447/559] h-[26vh] scale-x-[-1] sm:h-[36vh] lg:h-[48vh]"
            idle="float"
            glow
            duration={11}
            delay={0.6}
            opacity={0.85}
          />
        </motion.div>

        {/* ================= content ================= */}
        <div className="container-editorial relative z-10 w-full text-center">
          {/* eyebrow + opening copy */}
          <motion.div style={reduce ? still : { opacity: introOpacity, y: introY }}>
            <motion.div
              variants={riseIn}
              initial="hidden"
              animate="show"
              className="flex items-center justify-center gap-4"
            >
              <span className="h-px w-10 bg-gold/70 sm:w-16" />
              <p className="eyebrow text-saffron">{MICRO_BRAND.toUpperCase()}</p>
              <span className="h-px w-10 bg-gold/70 sm:w-16" />
            </motion.div>
          </motion.div>

          {/* the title — letters reveal on load, then the word moves as one */}
          <motion.h1
            id="hero-title"
            style={reduce ? still : { scale: titleScale, y: titleY }}
            className="mt-7 origin-center font-display text-[clamp(2.9rem,11vw,8.5rem)] font-light leading-[0.94] text-ivory"
          >
            <motion.span
              variants={stagger(0.3, 0.045)}
              initial="hidden"
              animate="show"
              className="inline-block"
              style={{ perspective: 900 }}
            >
              {TITLE.map((ch, i) => (
                <motion.span
                  key={i}
                  variants={textRevealItem}
                  className={`inline-block will-animate ${ch === ' ' ? 'w-[0.26em]' : ''} ${
                    i > 3 ? 'text-shimmer-gold' : ''
                  }`}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>

          <motion.div style={reduce ? still : { opacity: introOpacity, y: introY }}>
            <div className="mt-5 flex items-center justify-center gap-3">
              <DandiyaPair className="h-6 w-6 text-gold" />
              <p className="font-display text-[clamp(1.1rem,3vw,1.85rem)] font-light italic tracking-wide text-saffron">
                Where Tradition Comes Alive
              </p>
              <DandiyaPair className="h-6 w-6 scale-x-[-1] text-gold" />
            </div>
            <p className="mx-auto mt-6 max-w-xl text-[14px] leading-[1.95] text-ivory/80 sm:text-[15px]">
              An evening of Garba, music, culture and unforgettable celebration.
            </p>
            <p className="mt-3 font-gujarati text-base text-gold/90">
              નવરાત્રિ ઉત્સવ · ૨૪ ઓક્ટોબર ૨૦૨૬
            </p>
          </motion.div>

          {/* dates, venue and CTAs arrive last */}
          <motion.div
            style={
              reduce
                ? still
                : { opacity: outroOpacity, y: outroY, position: 'absolute', left: 0, right: 0 }
            }
            className={reduce ? 'mt-12' : 'top-[52%]'}
          >
            <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-px overflow-hidden border border-gold/25 bg-gold/20 sm:grid-cols-3">
              {[
                ['Date', `${EVENT.day} · ${EVENT.dateShort}`],
                ['Time', EVENT.time],
                ['Venue', EVENT.venue],
              ].map(([k, v]) => (
                <div key={k} className="bg-plum-deep/60 px-5 py-4 backdrop-blur-sm">
                  <dt className="text-[9px] uppercase tracking-[0.28em] text-gold">{k}</dt>
                  <dd className="mt-1.5 font-display text-[15px] text-ivory">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                to="/passes"
                data-cursor-label="Register"
                className="btn-primary group w-full sm:w-auto"
              >
                Get Your Pass
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
              <Link
                to="/about"
                data-cursor-label="Explore"
                className="btn-outline group w-full sm:w-auto"
              >
                Explore Event
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* scroll indicator */}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            style={{ opacity: scrollHint }}
            className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ivory/70"
          >
            <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
            <span className="relative block h-12 w-px overflow-hidden bg-ivory/25">
              <motion.span
                animate={{ y: ['-100%', '100%'] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-x-0 top-0 block h-6 bg-saffron"
              />
            </span>
          </motion.div>
        )}
      </section>
    </div>
  );
}
