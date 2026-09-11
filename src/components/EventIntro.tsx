import { motion } from 'framer-motion';
import { EASE_OUT_SOFT, inView, riseIn, stagger } from '@/lib/motion';
import { ART } from '@/lib/assets';
import { MotifPng } from '@/components/media/MotifPng';
import { Eyebrow, TextReveal } from '@/components/ui/Typography';
import { DiyaIcon, MandalaLine, OrnamentDivider } from '@/components/ornaments/Ornaments';

const STATS = [
  { value: '1', label: 'Night' },
  { value: '1', label: 'Culture' },
  { value: '∞', label: 'Countless Memories' },
];

export function EventIntro() {
  return (
    <section id="intro" className="relative overflow-hidden py-14 sm:py-20">
      {/* no section-level texture — the site-wide gradient carries it, so no
          rectangular band appears where one section meets the next */}
      <MandalaLine className="pointer-events-none absolute -left-40 top-10 h-[380px] w-[380px] text-gold/20 animate-spin-slower" />
      <MotifPng
        src={ART.motif.floral}
        className="absolute right-0 top-8 h-40 w-40 opacity-40"
        idle="sway"
        parallax={40}
        opacity={0.4}
      />
      <MotifPng
        src={ART.motif.bandhaniStrip}
        className="absolute inset-x-0 bottom-0 h-8 w-full opacity-30"
        idle="none"
        reveal={false}
        opacity={0.3}
      />

      <div className="container-editorial relative grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <Eyebrow>The Celebration</Eyebrow>
          <TextReveal
            text="Celebrate the Spirit of Garba"
            as="h2"
            className="mt-4 text-[clamp(2.1rem,5.2vw,3.9rem)] font-light leading-[1.06] text-ivory"
          />
          <OrnamentDivider tone="gold" className="mt-6 !justify-start" />

          <motion.div
            variants={stagger(0, 0.12)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-7 space-y-5 text-[15px] leading-[1.95] text-ivory/80"
          >
            <motion.p variants={riseIn}>
              NUV Khelaiya is our tribute to Navratri as Gujarat has always celebrated it — barefoot
              on open ground, clapping in rhythm, circling a lamp that never goes out. One night of
              devotion carried by taali, chutki, dhol and thousands of voices singing the same aarti.
            </motion.p>
            <motion.p variants={riseIn}>
              Traditional Garba opens the evening. Dandiya takes over as the night deepens. Between
              them: live folk performances, Gujarati food, mirror-work and bandhani everywhere you
              look, and a community that turns strangers into a circle within minutes.
            </motion.p>
            <motion.p variants={riseIn} className="font-gujarati text-lg text-gold">
              એક રાત, એક સંસ્કૃતિ, અગણિત યાદો.
            </motion.p>
          </motion.div>

          <motion.dl
            variants={stagger(0.1, 0.14)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-8 grid grid-cols-3 gap-4 border-y border-gold/35 py-5"
          >
            {STATS.map((s) => (
              <motion.div key={s.label} variants={riseIn} className="text-center sm:text-left">
                <dd className="font-display text-[clamp(2.2rem,5vw,3.2rem)] font-light leading-none text-ivory">
                  {s.value}
                </dd>
                <dt className="mt-2 text-[10px] uppercase tracking-[0.26em] text-gold">{s.label}</dt>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        {/* the Khelaiya '25 film, framed like a temple panel */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-10 rounded-full bg-saffron/20 blur-3xl animate-diya-glow"
          />
          <MandalaLine
            petals={16}
            className="pointer-events-none absolute -inset-12 text-gold/20 animate-spin-slower"
          />

          {/* the khelaiyas, framed by the mandala */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={inView}
            transition={{ duration: 1.1, ease: EASE_OUT_SOFT }}
            className="relative z-10 mx-auto flex aspect-[4/5] w-full max-w-[400px] items-end justify-center"
          >
            <MotifPng
              src={ART.motif.garbaDancer}
              label="Khelaiyas dancing Garba in traditional chaniya choli"
              className="aspect-[447/559] h-[86%]"
              idle="float"
              glow
              duration={9}
            />
          </motion.div>

          {/* diyas and dandiya around the edge */}
          <MotifPng
            src={ART.motif.dandiya}
            className="absolute -right-2 top-2 z-20 h-20 w-20 sm:h-28 sm:w-28"
            idle="sway"
            glow
            duration={6}
          />
          <MotifPng
            src={ART.motif.diya}
            className="absolute -left-2 top-1/3 z-20 h-14 w-14 sm:h-16 sm:w-16"
            idle="pulse"
            glow
            duration={4.4}
          />

          <div className="mt-2 flex items-center justify-center gap-3">
            <DiyaIcon className="h-4 w-4 text-saffron animate-diya-glow" />
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">
              Khelaiya 2025
            </span>
            <DiyaIcon className="h-4 w-4 text-saffron animate-diya-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}
