import { motion } from 'framer-motion';
import { EASE_OUT_SOFT, inView, riseIn, stagger } from '@/lib/motion';
import { ART } from '@/lib/assets';
import { EVENT, PASS_TIERS, REGISTRATION_URL, inr } from '@/lib/event';
import { MotifPng } from '@/components/media/MotifPng';
import { MicroBrand, SectionHeading } from '@/components/ui/Typography';
import { DiyaIcon, MandalaLine, RangoliCorner, SparkleField } from '@/components/ornaments/Ornaments';

const STEPS = [
  { n: '01', title: 'Tap Get Pass', copy: 'You are taken straight to the registration form.' },
  { n: '02', title: 'Fill & Pay', copy: 'Details and payment, in one go.' },
  { n: '03', title: 'Collect Your Pass', copy: 'Pick up the printed card with your unique QR.' },
  { n: '04', title: 'Scan & Celebrate', copy: 'Volunteers verify at the gate in seconds.' },
];

/** The one call to action — opens the registration link in a new tab. */
export function GetPassButton({
  label = 'Get Pass',
  className = '',
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={REGISTRATION_URL}
      target="_blank"
      rel="noreferrer noopener"
      data-cursor-label="Register"
      className={`btn-primary group !font-bold ${className}`}
    >
      {label}
      <span aria-hidden="true" className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">
        →
      </span>
      <span className="sr-only">(opens the registration page in a new tab)</span>
    </a>
  );
}

export function PassPromo({ showHeading = true }: { showHeading?: boolean } = {}) {
  return (
    <section
      id="passes"
      className={`relative overflow-hidden text-ivory ${
        showHeading ? 'py-24 sm:py-28' : 'pb-24 pt-12 sm:pb-28'
      }`}
      aria-label="Passes and pricing"
    >
      <SparkleField count={22} />
      <MandalaLine className="pointer-events-none absolute -right-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 text-saffron/10 animate-spin-slow" />
      <MotifPng
        src={ART.motif.chaniyaCholi}
        className="absolute -left-8 bottom-0 h-72 w-56 opacity-25"
        idle="bob-sway"
        parallax={-40}
        opacity={0.25}
      />

      <div className="container-editorial relative">
        {showHeading && (
          <SectionHeading
            eyebrow={`One Night · ${EVENT.dateShort}`}
            title="Your Pass to the Night"
            tone="ivory"
            intro="Every pass carries a unique, signed QR code. One pass, one entry — verified at the gate in seconds, online or offline."
          />
        )}

        {/* ---------- pricing ---------- */}
        <motion.ul
          variants={stagger(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${showHeading ? 'mt-14' : ''}`}
        >
          {PASS_TIERS.map((t) => (
            <motion.li
              key={t.id}
              variants={riseIn}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.45, ease: EASE_OUT_SOFT }}
              className={`group relative flex flex-col overflow-hidden border p-6 backdrop-blur-sm
                transition-colors duration-500 ${
                  t.featured
                    ? 'border-saffron/70 bg-plum-deep/65 shadow-[0_24px_60px_-30px_rgba(254,191,74,0.55)]'
                    : 'border-gold/30 bg-plum-deep/40 hover:border-saffron/60'
                }`}
            >
              <RangoliCorner className="pointer-events-none absolute -left-1 -top-1 h-8 w-8 text-gold/45 transition-colors duration-500 group-hover:text-saffron/80" />
              <RangoliCorner className="pointer-events-none absolute -bottom-1 -right-1 h-8 w-8 rotate-180 text-gold/45 transition-colors duration-500 group-hover:text-saffron/80" />

              {t.featured && (
                <span className="absolute right-0 top-0 bg-saffron px-3 py-1 text-[8.5px] font-bold uppercase tracking-[0.2em] text-plum-deep">
                  {t.note}
                </span>
              )}

              <h3 className="font-display text-[22px] font-light leading-tight text-ivory">{t.name}</h3>
              <p className="mt-1 font-gujarati text-[13px] text-gold/85">{t.gujarati}</p>

              <p className="mt-5 flex items-end gap-2">
                <span className="font-display text-[clamp(2rem,5vw,2.6rem)] font-light leading-none text-shimmer-gold">
                  {inr(t.price)}
                </span>
                {t.was && (
                  <span className="pb-1 text-[13px] text-ivory/45 line-through">{inr(t.was)}</span>
                )}
              </p>
              {!t.featured && (
                <p className="mt-1.5 text-[9.5px] font-bold uppercase tracking-[0.2em] text-gold/80">
                  {t.note}
                </p>
              )}

              <span aria-hidden="true" className="my-5 block h-px w-full bg-gradient-to-r from-gold/60 to-transparent" />

              <ul className="flex-1 space-y-2.5">
                {t.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-[12.5px] leading-[1.7] text-ivory/75">
                    <DiyaIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-saffron" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          variants={riseIn}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-6 text-center text-[11px] text-ivory/45"
        >
          Indicative pricing. Final rates are confirmed on the registration page.
        </motion.p>

        {/* ---------- the single CTA ---------- */}
        <motion.div
          variants={riseIn}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <GetPassButton label="Get Pass" className="!px-12 !py-4 !text-[12px]" />
          <p className="text-[10.5px] uppercase tracking-[0.24em] text-gold/80">
            {EVENT.day} · {EVENT.dateLong} · {EVENT.time}
          </p>
        </motion.div>

        {/* ---------- how it works ---------- */}
        <motion.ol
          variants={stagger(0.1, 0.09)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STEPS.map((s) => (
            <motion.li
              key={s.n}
              variants={riseIn}
              className="group relative border border-gold/25 bg-plum-deep/35 p-6 backdrop-blur-sm
                transition-all duration-500 hover:-translate-y-1 hover:border-saffron/60"
            >
              <span className="font-display text-[36px] font-light leading-none text-saffron/35 transition-colors duration-500 group-hover:text-saffron/70">
                {s.n}
              </span>
              <h3 className="mt-2 font-display text-[19px] font-light text-ivory">{s.title}</h3>
              <p className="mt-1.5 text-[12.5px] leading-[1.8] text-ivory/65">{s.copy}</p>
            </motion.li>
          ))}
        </motion.ol>

        <MicroBrand tone="ivory" className="mt-14 text-center" />
      </div>
    </section>
  );
}
