import { motion } from 'framer-motion';
import { EASE_OUT_SOFT, inView, riseIn, stagger } from '@/lib/motion';
import { ART } from '@/lib/assets';
import { SectionHeading } from '@/components/ui/Typography';
import { DandiyaPair, DiyaIcon, MandalaLine, RangoliCorner } from '@/components/ornaments/Ornaments';

type Item = {
  title: string;
  gujarati: string;
  copy: string;
  icon: 'garba' | 'dandiya' | 'music' | 'food';
  photo: string;
  alt: string;
};

const ITEMS: Item[] = [
  {
    title: 'Garba',
    gujarati: 'ગરબા',
    copy: 'Circles around the garbo — taali, chutki and popat, led live.',
    icon: 'garba',
    photo: ART.photo.garbaCircle,
    alt: 'Dancers performing Garba in a circle at NUV Khelaiya',
  },
  {
    title: 'Dandiya Raas',
    gujarati: 'દાંડિયા રાસ',
    copy: 'Sticks in hand, partners rotating, tempo climbing all night.',
    icon: 'dandiya',
    photo: ART.photo.dandiyaNight,
    alt: 'Dandiya raas partners on the ground at NUV Khelaiya',
  },
  {
    title: 'Live Music',
    gujarati: 'સંગીત',
    copy: 'Dhol, shehnai and folk vocals — no playback, no shortcuts.',
    icon: 'music',
    photo: ART.photo.crowd,
    alt: 'The crowd gathered under festival lights at NUV Khelaiya',
  },
  {
    title: 'Food',
    gujarati: 'ભોજન',
    copy: 'Fafda, jalebi, undhiyu and kulfi, till the last song.',
    icon: 'food',
    photo: ART.photo.food,
    alt: 'Traditional Gujarati festival food at a Navratri stall',
  },
];

function Icon({ name, className = '' }: { name: Item['icon']; className?: string }) {
  const common = { className, 'aria-hidden': true } as const;
  switch (name) {
    case 'dandiya':
      return <DandiyaPair {...common} />;
    case 'garba':
      return <MandalaLine petals={8} {...common} />;
    case 'music':
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" {...common}>
          <ellipse cx="32" cy="26" rx="17" ry="7" />
          <path d="M15 26v10c0 4 8 7 17 7s17-3 17-7V26" />
          <path d="M12 44l8-6M52 44l-8-6" />
        </svg>
      );
    case 'food':
      return <DiyaIcon {...common} />;
  }
}

export function ExperienceCards() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden py-14 text-ivory sm:py-20"
      aria-labelledby="experience-heading"
    >

      <div className="container-editorial relative">
        <div id="experience-heading">
          <SectionHeading
            eyebrow="The Experience"
            title="One Night, One Rhythm"
            tone="ivory"
            intro="Devotion, dance, music and food — from the first aarti to the last round."
          />
        </div>

        <motion.ul
          variants={stagger(0.12, 0.12)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ITEMS.map((item) => (
            <motion.li
              key={item.title}
              variants={riseIn}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.5, ease: EASE_OUT_SOFT }}
              className="group relative"
              data-cursor="hover"
            >
              <div className="relative border border-gold/40 p-[5px] transition-colors duration-500 group-hover:border-saffron/80">
                <RangoliCorner className="pointer-events-none absolute -left-px -top-px h-7 w-7 text-gold/55 transition-colors duration-500 group-hover:text-saffron" />
                <RangoliCorner className="pointer-events-none absolute -bottom-px -right-px h-7 w-7 rotate-180 text-gold/55 transition-colors duration-500 group-hover:text-saffron" />

                {/* the photograph carries the card */}
                <div className="relative aspect-[3/4] overflow-hidden bg-plum-deep/60 ring-1 ring-gold/20">
                  <img
                    src={item.photo}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1300ms] ease-out group-hover:scale-[1.09]"
                  />

                  {/* legibility scrim */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-deep via-plum-deep/45 to-transparent"
                  />
                  {/* shimmer sweep */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-x-full inset-y-0 -translate-x-full
                      bg-gradient-to-r from-transparent via-gold-light/45 to-transparent opacity-0
                      transition-all duration-[1200ms] group-hover:translate-x-full group-hover:opacity-100"
                  />

                  <Icon
                    name={item.icon}
                    className="absolute right-3 top-3 h-8 w-8 text-saffron/90 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6"
                  />

                  {/* the words sit on the image */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-[clamp(1.4rem,2.4vw,1.75rem)] font-light leading-tight text-ivory">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 font-gujarati text-[13px] text-gold">{item.gujarati}</p>
                    <p className="mt-2 max-h-0 overflow-hidden text-[12.5px] leading-[1.7] text-ivory/80 opacity-0 transition-all duration-700 group-hover:max-h-24 group-hover:opacity-100">
                      {item.copy}
                    </p>
                    <span
                      aria-hidden="true"
                      className="mt-3 block h-px w-8 bg-saffron transition-all duration-700 group-hover:w-full"
                    />
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
