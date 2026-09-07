import { motion } from 'framer-motion';
import { EASE_OUT_SOFT, inView, riseIn, stagger } from '@/lib/motion';
import { ART } from '@/lib/assets';
import { MotifPng } from '@/components/media/MotifPng';
import { DiyaIcon, MandalaLine, OrnamentDivider } from '@/components/ornaments/Ornaments';

const INVITE = 'ચણિયાચોળી ને કેડિયું કરો તૈયાર, ઢોલના ધબકારે ગરબે ઘૂમવા આપ સૌ હાર્દિક આમંત્રિત છો!';

/**
 * The invitation — a Gujarati couplet between the hero and the story, so the
 * two never sit against a long empty stretch of gradient.
 */
export function InvitationBand() {
  const words = INVITE.split(' ');

  return (
    // the negative top margin pulls this up into the hero's tail, so the
    // couplet sits close under the CTAs instead of a screen below them
    <section
      className="relative -mt-[16vh] overflow-hidden pb-20 pt-0 sm:-mt-[18vh] sm:pb-24"
      aria-label="Invitation"
    >
      {/* a soft mandala and a pair of diyas hold the band together */}
      <MandalaLine
        petals={16}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 text-gold/[0.09] animate-spin-slower"
      />
      <MotifPng
        src={ART.motif.diya}
        className="absolute bottom-6 left-[6%] h-14 w-14 sm:h-16 sm:w-16"
        idle="pulse"
        glow
        duration={4.6}
      />
      <MotifPng
        src={ART.motif.diya}
        className="absolute right-[8%] top-6 h-12 w-12 sm:h-14 sm:w-14"
        idle="pulse"
        glow
        duration={5.8}
        delay={0.7}
      />

      <div className="container-editorial relative">
        <motion.div
          variants={stagger(0.05, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={riseIn} className="flex items-center justify-center gap-3">
            <DiyaIcon className="h-4 w-4 text-saffron animate-diya-glow" />
            <p className="eyebrow text-gold">આમંત્રણ · The Invitation</p>
            <DiyaIcon className="h-4 w-4 text-saffron animate-diya-glow" />
          </motion.div>

          <OrnamentDivider className="mt-6" />

          {/* the couplet, arriving word by word */}
          <motion.p
            variants={stagger(0.25, 0.07)}
            className="mt-8 font-gujarati text-[clamp(1.15rem,3.1vw,2rem)] font-semibold leading-[1.85]"
          >
            {words.map((w, i) => (
              <motion.span
                key={`${w}-${i}`}
                variants={{
                  hidden: { opacity: 0, y: 14, filter: 'blur(5px)' },
                  show: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: { duration: 0.7, ease: EASE_OUT_SOFT },
                  },
                }}
                className="mr-[0.3em] inline-block text-shimmer-gold"
              >
                {w}
              </motion.span>
            ))}
          </motion.p>

          <motion.p
            variants={riseIn}
            className="mx-auto mt-7 max-w-xl text-[13px] italic leading-[1.9] text-ivory/60"
          >
            Get your chaniya choli and kediyu ready — you are all warmly invited to circle the garbo
            to the beat of the dhol.
          </motion.p>

          <OrnamentDivider className="mt-9" />
        </motion.div>
      </div>
    </section>
  );
}

/**
 * A compact Gujarati quote — for filling quiet stretches inside a section,
 * rather than as a band of its own.
 */
export function GujaratiQuote({
  text,
  translation,
  className = '',
}: {
  text: string;
  translation?: string;
  className?: string;
}) {
  const words = text.split(' ');

  return (
    <motion.figure
      variants={stagger(0.08, 0.06)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={`relative text-center ${className}`}
    >
      <motion.div variants={riseIn} className="flex items-center justify-center gap-3">
        <DiyaIcon className="h-4 w-4 text-saffron animate-diya-glow" />
        <span aria-hidden="true" className="h-px w-10 bg-gold/50 sm:w-16" />
        <DiyaIcon className="h-4 w-4 text-saffron animate-diya-glow" />
      </motion.div>

      <blockquote className="mt-5">
        <motion.p
          variants={stagger(0.18, 0.07)}
          className="font-gujarati text-[clamp(1.05rem,2.6vw,1.7rem)] font-semibold leading-[1.8]"
        >
          {words.map((w, i) => (
            <motion.span
              key={`${w}-${i}`}
              variants={{
                hidden: { opacity: 0, y: 12, filter: 'blur(5px)' },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.65, ease: EASE_OUT_SOFT },
                },
              }}
              className="mr-[0.3em] inline-block text-shimmer-gold"
            >
              {w}
            </motion.span>
          ))}
        </motion.p>
      </blockquote>

      {translation && (
        <motion.figcaption
          variants={riseIn}
          className="mx-auto mt-4 max-w-xs text-[12px] italic leading-[1.85] text-ivory/55"
        >
          {translation}
        </motion.figcaption>
      )}
    </motion.figure>
  );
}
