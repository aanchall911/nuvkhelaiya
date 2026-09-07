import { motion } from 'framer-motion';
import { inView, riseInSmall, stagger, textRevealItem } from '@/lib/motion';
import { MICRO_BRAND } from '@/lib/assets';
import { OrnamentDivider } from '@/components/ornaments/Ornaments';

/** Word-by-word headline reveal. Renders as a single accessible heading. */
export function TextReveal({
  text,
  as: Tag = 'h2',
  className = '',
  delay = 0,
}: {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
}) {
  const words = text.split(' ');
  return (
    <Tag className={className}>
      <motion.span
        variants={stagger(delay, 0.09)}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="inline-block"
        style={{ perspective: 800 }}
      >
        {words.map((w, i) => (
          <motion.span key={`${w}-${i}`} variants={textRevealItem} className="inline-block will-animate">
            {w}
            {i < words.length - 1 && '\u00A0'}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

export function Eyebrow({
  children,
  tone = 'gold',
  className = '',
}: {
  children: React.ReactNode;
  tone?: 'gold' | 'ivory' | 'plum' | 'teal';
  className?: string;
}) {
  const color =
    tone === 'ivory'
      ? 'text-ivory/80'
      : tone === 'plum'
        ? 'text-plum/70'
        : tone === 'teal'
          ? 'text-teal'
          : 'text-gold';
  return (
    <motion.p
      variants={riseInSmall}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={`eyebrow ${color} ${className}`}
    >
      {children}
    </motion.p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = 'plum',
  align = 'center',
  divider = true,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: 'plum' | 'ivory';
  align?: 'center' | 'left';
  divider?: boolean;
}) {
  const dark = tone === 'ivory';
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      {eyebrow && <Eyebrow tone={dark ? 'gold' : 'gold'}>{eyebrow}</Eyebrow>}
      <TextReveal
        text={title}
        className={`mt-4 text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.08] ${
          dark ? 'text-ivory' : 'text-plum'
        }`}
      />
      {divider && (
        <OrnamentDivider
          tone={dark ? 'ivory' : 'gold'}
          className={align === 'center' ? 'mt-6' : 'mt-6 !justify-start'}
        />
      )}
      {intro && (
        <motion.p
          variants={riseInSmall}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className={`mt-6 text-[15px] leading-[1.9] ${dark ? 'text-ivory/75' : 'text-plum/70'}`}
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}

/** Recurring micro-branding ribbon: CELEBRATE • DANCE • DEVOTION */
export function MicroBrand({
  tone = 'gold',
  className = '',
}: {
  tone?: 'gold' | 'ivory' | 'plum';
  className?: string;
}) {
  const color = tone === 'ivory' ? 'text-ivory/70' : tone === 'plum' ? 'text-plum/60' : 'text-gold';
  return (
    <motion.p
      variants={riseInSmall}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={`eyebrow ${color} ${className}`}
    >
      {MICRO_BRAND.toUpperCase()}
    </motion.p>
  );
}
