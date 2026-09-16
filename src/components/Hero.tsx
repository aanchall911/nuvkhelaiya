import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { riseIn, stagger, textRevealItem } from '@/lib/motion';
import { ART, MICRO_BRAND } from '@/lib/assets';
import { EVENT } from '@/lib/event';
import { GetPassButton } from '@/components/PassPromo';
import { MotifPng } from '@/components/media/MotifPng';
import {
  DandiyaPair,
  MandalaBackdrop,
  SparkleField,
  ToranBorder,
} from '@/components/ornaments/Ornaments';

const TITLE = 'NUV KHELAIYA'.split('');

/* ================================================================== */
/* Mobile hero — purely static, no scroll animation                   */
/* ================================================================== */
function MobileHero() {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-10 pt-20 sm:hidden"
      aria-labelledby="hero-title-mobile"
    >
      <SparkleField count={18} />
      <MandalaBackdrop size="min(700px, 90vmin)" />
      <ToranBorder className="absolute inset-x-0 top-0 h-6 w-full text-gold/60" count={30} />

      <div className="container-editorial relative z-10 text-center">
        {/* eyebrow */}
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gold/70" />
          <p className="eyebrow text-saffron">{MICRO_BRAND.toUpperCase()}</p>
          <span className="h-px w-8 bg-gold/70" />
        </div>

        {/* title */}
        <h1
          id="hero-title-mobile"
          className="mt-5 font-display text-[clamp(2.6rem,14vw,4rem)] font-light leading-[0.94] text-ivory"
        >
          {TITLE.map((ch, i) => (
            <span
              key={i}
              className={`inline-block ${ch === ' ' ? 'w-[0.22em]' : ''} ${i > 3 ? 'text-shimmer-gold' : ''}`}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </h1>

        {/* tagline */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <DandiyaPair className="h-5 w-5 text-gold" />
          <p className="font-display text-[1rem] font-light italic text-saffron">
            Where Tradition Comes Alive
          </p>
          <DandiyaPair className="h-5 w-5 scale-x-[-1] text-gold" />
        </div>

        <p className="mx-auto mt-4 max-w-xs text-[13px] leading-[1.9] text-ivory/80">
          An evening of Garba, music, culture and unforgettable celebration.
        </p>

        <p className="mt-2 font-gujarati text-[13px] text-gold/90">
          નવરાત્રિ ઉત્સવ · ૨૪ ઓક્ટોબર ૨૦૨૬
        </p>

        {/* garba vector art — the two dancers */}
        <div className="relative mx-auto mt-4 h-[36vw] max-h-[160px] w-full">
          <MotifPng
            src={ART.motif.garbaDancer}
            label="Garba dancer"
            className="absolute bottom-0 left-0 aspect-[447/559] h-full"
            idle="float"
            glow
            duration={8}
            opacity={0.95}
          />
          <MotifPng
            src={ART.motif.garbaDancer}
            className="absolute bottom-0 right-0 aspect-[447/559] h-[84%] scale-x-[-1]"
            idle="float"
            glow
            duration={10}
            delay={0.5}
            opacity={0.88}
          />
        </div>

        {/* date / time / venue — always visible, 3 columns */}
        <dl className="mt-4 grid grid-cols-3 gap-px overflow-hidden border border-gold/30 bg-gold/20">
          {[
            ['Date', `${EVENT.day.slice(0, 3)} · ${EVENT.dateShort}`],
            ['Time', EVENT.time],
            ['Venue', EVENT.venue],
          ].map(([k, v]) => (
            <div key={k} className="bg-plum-deep/65 px-2 py-3">
              <dt className="text-[7px] font-bold uppercase tracking-[0.18em] text-gold">{k}</dt>
              <dd className="mt-1 font-display text-[11px] leading-snug text-ivory">{v}</dd>
            </div>
          ))}
        </dl>

        {/* CTAs */}
        <div className="mt-5 flex flex-col gap-3">
          <GetPassButton label="Get Your Pass →" className="w-full !justify-center" />
          <Link
            to="/about"
            className="btn-outline w-full !justify-center"
          >
            Explore Event →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Desktop hero — pinned scroll animation                              */
/* ================================================================== */
export function Hero() {
  const reduce = !!useReducedMotion();
  const runway = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: runway,
    offset: ['start start', 'end end'],
  });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });

  const beamOpacity = useTransform(p, [0.06, 0.42, 1], [0, 1, 0.85]);
  const beamSpread = useTransform(p, [0.06, 0.5], [0.6, 1]);
  const titleScale = useTransform(p, [0, 0.3, 0.75], [1, 1.06, 0.52]);
  const titleY = useTransform(p, [0, 0.3, 0.8], ['0vh', '-2vh', '-19vh']);
  const introOpacity = useTransform(p, [0, 0.24], [1, 0]);
  const introY = useTransform(p, [0, 0.3], [0, -36]);
  const outroOpacity = useTransform(p, [0.55, 0.82], [0, 1]);
  const outroY = useTransform(p, [0.55, 0.88], [64, 0]);
  const mandalaScale = useTransform(p, [0, 1], [1, 1.45]);
  const mandalaOpacity = useTransform(p, [0, 0.5, 1], [1, 0.75, 0.35]);
  const dancerOpacity = useTransform(p, [0, 0.55, 0.85], [1, 0.85, 0]);
  const scrollHint = useTransform(p, [0, 0.08], [1, 0]);

  const still = reduce ? {} : undefined;

  return (
    <>
      {/* Mobile — always shown on small screens */}
      <MobileHero />

      {/* Desktop — hidden on small screens */}
      <div
        ref={runway}
        className={`hidden sm:block ${reduce ? 'relative' : 'relative h-[220vh]'}`}
      >
        <section
          className={`${
            reduce ? 'relative' : 'sticky top-0'
          } flex h-[100svh] items-center overflow-hidden`}
          aria-labelledby="hero-title"
        >
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

          <motion.div style={reduce ? still : { opacity: dancerOpacity }} className="absolute inset-0">
            <MotifPng
              src={ART.motif.garbaDancer}
              label="Garba dancer in traditional chaniya choli"
              className="absolute bottom-0 left-0 aspect-[447/559] h-[40vh] lg:h-[54vh]"
              idle="float"
              glow
              duration={9}
              opacity={0.95}
            />
            <MotifPng
              src={ART.motif.garbaDancer}
              className="absolute bottom-0 right-0 aspect-[447/559] h-[34vh] scale-x-[-1] lg:h-[46vh]"
              idle="float"
              glow
              duration={11}
              delay={0.6}
              opacity={0.85}
            />
          </motion.div>

          <div className="container-editorial relative z-10 w-full text-center">
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

            <motion.div
              style={
                reduce
                  ? still
                  : { opacity: outroOpacity, y: outroY, position: 'absolute', left: 0, right: 0 }
              }
              className={reduce ? 'mt-10' : 'top-[52%]'}
            >
              <dl className="mx-auto grid max-w-2xl grid-cols-3 gap-px overflow-hidden border border-gold/25 bg-gold/20">
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

              <div className="mt-9 flex items-center justify-center gap-4">
                <Link
                  to="/passes"
                  data-cursor-label="Register"
                  className="btn-primary group"
                >
                  Get Your Pass
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                </Link>
                <Link
                  to="/about"
                  data-cursor-label="Explore"
                  className="btn-outline group"
                >
                  Explore Event
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                </Link>
              </div>
            </motion.div>
          </div>

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
    </>
  );
}
