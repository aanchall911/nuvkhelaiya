import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT_SOFT, inView, riseIn, stagger } from '@/lib/motion';
import { PARTNER_SPONSORS, TITLE_SPONSORS, type Sponsor } from '@/data/sponsors';
import { MicroBrand } from '@/components/ui/Typography';
import { DiyaIcon, RangoliCorner, ToranBorder } from '@/components/ornaments/Ornaments';

/* ------------------------------------------------------------------ */
/* One sponsor plate, hanging from the ribbon                          */
/* ------------------------------------------------------------------ */
function SponsorPlate({
  sponsor,
  size = 'sm',
  index = 0,
}: {
  sponsor: Sponsor;
  size?: 'sm' | 'lg';
  index?: number;
}) {
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const showLogo = sponsor.logo && !failed;

  /* every plate hangs on a slightly different cord length */
  const cord = size === 'lg' ? [30, 44][index % 2] : [20, 38, 26, 46][index % 4];

  const Body = (
    <>
      <RangoliCorner className="pointer-events-none absolute -left-px -top-px h-6 w-6 text-gold/65 transition-colors duration-500 group-hover:text-saffron" />
      <RangoliCorner className="pointer-events-none absolute -right-px -top-px h-6 w-6 scale-x-[-1] text-gold/65 transition-colors duration-500 group-hover:text-saffron" />
      <RangoliCorner className="pointer-events-none absolute -bottom-px -left-px h-6 w-6 scale-y-[-1] text-gold/65 transition-colors duration-500 group-hover:text-saffron" />
      <RangoliCorner className="pointer-events-none absolute -bottom-px -right-px h-6 w-6 scale-[-1] text-gold/65 transition-colors duration-500 group-hover:text-saffron" />

      <div
        className={`relative grid place-items-center overflow-hidden bg-plum-deep/55 ring-1 ring-gold/25 ${
          size === 'lg' ? 'h-[110px] w-[200px]' : 'h-[84px] w-[152px]'
        }`}
      >
        {showLogo ? (
          /* logos sit on an ivory plate so brand colours stay true, and are
             contained so nothing is ever stretched or cropped */
          <span className="grid h-full w-full place-items-center bg-ivory/92 p-3">
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
              className="max-h-full max-w-full object-contain"
            />
          </span>
        ) : (
          <span className="px-3 text-center">
            <span
              className={`block font-display font-medium leading-tight text-shimmer-gold ${
                size === 'lg' ? 'text-[26px]' : 'text-[19px]'
              }`}
            >
              {sponsor.wordmark ?? sponsor.name}
            </span>
            {sponsor.wordmark && sponsor.wordmark !== sponsor.name && (
              <span className="mt-1 block text-[8px] uppercase tracking-[0.2em] text-ivory/55">
                {sponsor.name}
              </span>
            )}
          </span>
        )}

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-full inset-y-0 -translate-x-full
            bg-gradient-to-r from-transparent via-gold-light/45 to-transparent opacity-0
            transition-all duration-[1100ms] group-hover:translate-x-full group-hover:opacity-100"
        />
      </div>
    </>
  );

  return (
    <motion.div
      className="flex origin-top flex-col items-center"
      animate={reduce ? undefined : { rotate: [-1.4, 1.4, -1.4] }}
      transition={{
        duration: 6 + (index % 4) * 1.2,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.3,
      }}
    >
      {/* cord + bead */}
      <span
        aria-hidden="true"
        className="block w-px bg-gradient-to-b from-gold/85 to-gold/40"
        style={{ height: cord }}
      />
      <span
        aria-hidden="true"
        className="mb-1.5 block h-2 w-2 rounded-full bg-saffron shadow-[0_0_10px_rgba(254,191,74,0.8)]"
      />

      {sponsor.url ? (
        <a
          href={sponsor.url}
          target="_blank"
          rel="noreferrer noopener"
          data-cursor="hover"
          aria-label={`${sponsor.name} (opens in a new tab)`}
          className="group relative block border border-gold/45 p-[4px] transition-colors duration-500 hover:border-saffron/80"
        >
          {Body}
        </a>
      ) : (
        <div
          data-cursor="hover"
          className="group relative border border-gold/45 p-[4px] transition-colors duration-500 hover:border-saffron/80"
        >
          {Body}
        </div>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Sponsors — a toran ribbon drifting right to left                    */
/* ------------------------------------------------------------------ */
export function SponsorToran() {
  /* the track holds two copies, so the loop is seamless */
  const ribbon = [...PARTNER_SPONSORS, ...PARTNER_SPONSORS];

  return (
    <section className="relative overflow-hidden pb-24 pt-12 sm:pb-28" aria-label="Our partners">
      <div className="container-editorial relative">
        <motion.p
          variants={riseIn}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="text-center text-[13px] leading-relaxed text-ivory/65"
        >
          Thank you to the partners who make NUV Khelaiya 2026 possible.
        </motion.p>

        {/* ---------- title partners ---------- */}
        <motion.div
          variants={stagger(0.1, 0.14)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12"
        >
          <motion.p variants={riseIn} className="text-center eyebrow text-gold">
            Title Partners
          </motion.p>

          <div className="mt-3">
            <div aria-hidden="true">
              <span className="block h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
              <ToranBorder className="h-4 w-full text-gold/70" count={26} />
            </div>

            <motion.ul variants={riseIn} className="flex flex-wrap items-start justify-center gap-8 sm:gap-14">
              {TITLE_SPONSORS.map((s, i) => (
                <li key={s.name}>
                  <SponsorPlate sponsor={s} size="lg" index={i} />
                </li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>

      {/* ---------- the moving ribbon, full bleed ---------- */}
      <motion.div
        variants={riseIn}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="mt-20"
      >
        <p className="container-editorial text-center eyebrow text-gold">Our Partners</p>

        <div className="marquee-paused group relative mt-3">
          {/* the rail the ribbon hangs from, edge to edge */}
          <div aria-hidden="true">
            <span className="block h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
            <ToranBorder className="h-4 w-full text-gold/70" count={60} />
          </div>

          <div className="marquee-mask overflow-hidden">
            <ul className="marquee-track gap-8 pb-4 sm:gap-14" style={{ ['--marquee-duration' as string]: '34s' }}>
              {ribbon.map((s, i) => (
                <li key={`${s.name}-${i}`} aria-hidden={i >= PARTNER_SPONSORS.length}>
                  <SponsorPlate sponsor={s} index={i} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-4 text-center text-[9.5px] uppercase tracking-[0.24em] text-ivory/35">
          Hover to pause
        </p>
      </motion.div>

      <div className="container-editorial relative">
        <motion.div
          variants={riseIn}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-16 flex flex-col items-center gap-4 text-center"
        >
          <DiyaIcon className="h-6 w-6 text-saffron animate-diya-glow" />
          <p className="max-w-md text-[13px] leading-relaxed text-ivory/60">
            Want to light up the night with us? Write to{' '}
            <a
              href="mailto:khelaiya@nuv.ac.in"
              className="text-saffron underline decoration-gold/50 underline-offset-4 transition-colors hover:decoration-saffron"
            >
              khelaiya@nuv.ac.in
            </a>
          </p>
        </motion.div>

        <MicroBrand className="mt-14 text-center" />
      </div>
    </section>
  );
}

export const SPONSOR_EASE = EASE_OUT_SOFT;
