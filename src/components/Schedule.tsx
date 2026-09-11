import { motion } from 'framer-motion';
import { drawLine, inView, riseIn, stagger } from '@/lib/motion';
import { ART } from '@/lib/assets';
import { EVENT } from '@/lib/event';
import { MotifPng } from '@/components/media/MotifPng';
import { SectionHeading, MicroBrand } from '@/components/ui/Typography';
import { DiyaIcon } from '@/components/ornaments/Ornaments';

const SLOTS = [
  { time: '06:00 PM', title: 'Gates Open', copy: 'Pass scanning begins at all three gates.' },
  { time: '07:00 PM', title: 'Welcome Ceremony', copy: 'Aarti and the lighting of the garbo.' },
  { time: '07:30 PM', title: 'Traditional Garba', copy: 'Two-clap, three-clap and popat, led live.' },
  { time: '09:00 PM', title: 'Live Performance', copy: 'Folk artists and dhol ensemble on the main stage.' },
  { time: '10:00 PM', title: 'Dandiya Night', copy: 'Raas circles open to everyone on the ground.' },
  { time: '11:30 PM', title: 'Grand Finale', copy: 'Closing aarti and the final round together.' },
];

export function Schedule() {
  return (
    <section id="schedule" className="relative overflow-hidden py-14 sm:py-20">
      <MotifPng
        src={ART.motif.diyaRow}
        className="absolute right-0 top-10 h-24 w-72 opacity-40"
        idle="pulse"
        parallax={30}
        glow
        opacity={0.4}
      />

      <div className="container-editorial relative">
        <SectionHeading
          eyebrow={EVENT.dateShort}
          title="The Order of the Night"
          tone="ivory"
          intro={`One night, ${EVENT.dateLong}. Special performances are announced on-site.`}
        />

        <ol className="relative mx-auto mt-10 max-w-3xl">
          {/* the ornamental spine */}
          <motion.span
            aria-hidden="true"
            variants={drawLine}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            style={{ originY: 0 }}
            className="absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-gold via-gold/50 to-transparent sm:block"
          />

          <motion.div variants={stagger(0.05, 0.13)} initial="hidden" whileInView="show" viewport={inView}>
            {SLOTS.map((s) => (
              <motion.li
                key={s.time}
                variants={riseIn}
                className="group relative flex gap-6 pb-7 last:pb-0 sm:pl-0"
              >
                <span className="relative z-10 mt-1 hidden h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/50 bg-plum-deep/70 backdrop-blur-sm sm:grid">
                  <DiyaIcon className="h-5 w-5 text-saffron transition-transform duration-500 group-hover:scale-110" />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-full bg-saffron/40 opacity-0 blur-lg transition-opacity duration-700 group-hover:opacity-100"
                  />
                </span>

                <div className="flex-1 border-b border-gold/25 pb-6 transition-colors duration-500 group-hover:border-gold/60">
                  <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-saffron">
                    {s.time}
                  </p>
                  <h3 className="mt-2 font-display text-[26px] font-light leading-tight text-ivory">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-[1.85] text-ivory/70">{s.copy}</p>
                </div>
              </motion.li>
            ))}
          </motion.div>
        </ol>

        <MicroBrand className="mt-14 text-center" />
      </div>
    </section>
  );
}
