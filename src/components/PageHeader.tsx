import { motion } from 'framer-motion';
import { riseIn, stagger } from '@/lib/motion';
import { ART, MICRO_BRAND } from '@/lib/assets';
import { MotifPng } from '@/components/media/MotifPng';
import {
  MandalaBackdrop,
  OrnamentDivider,
  SparkleField,
  ToranBorder,
} from '@/components/ornaments/Ornaments';

export function PageHeader({
  eyebrow,
  title,
  intro,
  gujarati,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  gujarati?: string;
}) {
  return (
    <header className="relative overflow-hidden pb-14 pt-32 text-center text-ivory sm:pb-16 sm:pt-40">
      <SparkleField count={18} />
      <ToranBorder className="absolute inset-x-0 top-0 h-6 w-full text-gold/50" count={40} />
      <MandalaBackdrop size="min(720px, 78vmin)" />
      <MotifPng
        src={ART.motif.mandalaHalf}
        className="absolute inset-x-0 bottom-0 mx-auto h-32 w-[520px] opacity-25"
        idle="none"
        goldInk
        opacity={0.25}
      />

      <motion.div
        variants={stagger(0.1, 0.13)}
        initial="hidden"
        animate="show"
        className="container-editorial relative"
      >
        <motion.p variants={riseIn} className="eyebrow text-saffron">
          {(eyebrow ?? MICRO_BRAND).toUpperCase()}
        </motion.p>
        <motion.h1
          variants={riseIn}
          className="mt-4 font-display text-[clamp(2.4rem,7vw,4.6rem)] font-light leading-[1.02]"
        >
          {title}
        </motion.h1>
        <OrnamentDivider tone="ivory" className="mt-6" />
        {gujarati && (
          <motion.p variants={riseIn} className="mt-5 font-gujarati text-lg text-gold/90">
            {gujarati}
          </motion.p>
        )}
        {intro && (
          <motion.p
            variants={riseIn}
            className="mx-auto mt-5 max-w-2xl text-[14.5px] leading-[1.95] text-ivory/78"
          >
            {intro}
          </motion.p>
        )}
      </motion.div>
    </header>
  );
}
