import { motion } from 'framer-motion';
import { inView, riseIn, stagger } from '@/lib/motion';
import { ART } from '@/lib/assets';
import { MotifPng } from '@/components/media/MotifPng';
import { SectionHeading } from '@/components/ui/Typography';
import { DiyaIcon, MandalaLine } from '@/components/ornaments/Ornaments';

/**
 * Designed placeholder for sections still being built, so navigation never
 * lands on a broken or empty page during the build-out.
 */
export function StageNext({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 texture-patola opacity-40" />
      <MandalaLine className="pointer-events-none absolute -right-32 top-1/2 h-[360px] w-[360px] -translate-y-1/2 text-gold/20 animate-spin-slower" />
      <MotifPng
        src={ART.motif.rangoli}
        className="absolute -left-16 bottom-0 h-56 w-56 opacity-30"
        idle="spin"
        opacity={0.3}
        goldInk
      />

      <div className="container-editorial relative">
        <SectionHeading eyebrow="In Production" title={title} tone="ivory" />

        <motion.ul
          variants={stagger(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2"
        >
          {items.map((i) => (
            <motion.li
              key={i}
              variants={riseIn}
              className="card-invitation flex items-start gap-3 p-5 transition-shadow duration-500 hover:shadow-lift"
            >
              <DiyaIcon className="mt-0.5 h-5 w-5 shrink-0 text-saffron-deep" />
              <span className="text-[13.5px] leading-[1.8] text-plum/80">{i}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
