import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { inView, riseIn, stagger } from '@/lib/motion';
import { ART, MICRO_BRAND } from '@/lib/assets';
import { MotifPng } from '@/components/media/MotifPng';
import { DiyaIcon, MandalaLine, OrnamentDivider, ToranBorder } from '@/components/ornaments/Ornaments';

const QUICK = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'Event' },
  { to: '/passes', label: 'Passes' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/team', label: 'Team' },
];

const SOCIALS: { label: string; href: string; path: string }[] = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    path: 'M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.23 1 .5 1.4 1 .5.4.8.8 1 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2a3.7 3.7 0 0 1-1 1.4c-.4.5-.8.8-1.4 1-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4a3.7 3.7 0 0 1-1.4-1c-.5-.4-.8-.8-1-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2a3.7 3.7 0 0 1 1-1.4c.4-.5.8-.8 1.4-1 .4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 5.3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 7.4a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8Zm5.7-7.6a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0Z',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    path: 'M21.6 7.2s-.2-1.4-.8-2c-.7-.8-1.6-.8-2-.9C16.2 4.1 12 4.1 12 4.1h-.1s-4.2 0-6.8.2c-.4.1-1.3.1-2 .9-.6.6-.8 2-.8 2S2.1 8.8 2.1 10.5v1.6c0 1.6.2 3.3.2 3.3s.2 1.4.8 2c.7.8 1.7.8 2.1.9 1.5.1 6.4.2 6.8.2 0 0 4.2 0 6.8-.2.4-.1 1.3-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.3v-1.6c0-1.7-.2-3.3-.2-3.3ZM9.9 14.3V8.6l5.6 2.9-5.6 2.8Z',
  },
  {
    label: 'WhatsApp',
    href: 'https://whatsapp.com',
    path: 'M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.83 9.83 0 0 0 4.68 1.19c5.43 0 9.84-4.41 9.84-9.85C21.88 6.4 17.47 2 12.04 2Zm5.72 13.9c-.24.68-1.4 1.3-1.93 1.35-.53.06-1.02.24-3.44-.72-2.9-1.15-4.72-4.16-4.86-4.36-.14-.2-1.15-1.55-1.15-2.95 0-1.4.73-2.09 1-2.38.26-.29.56-.36.75-.36l.54.01c.17 0 .4-.06.63.48.24.58.8 1.98.87 2.12.07.15.12.32.02.51-.1.2-.15.32-.3.5l-.44.5c-.14.15-.3.3-.13.6.17.29.75 1.25 1.6 2.02 1.1.98 2.03 1.3 2.32 1.44.29.15.46.12.63-.07.17-.2.72-.84.91-1.13.2-.29.4-.24.66-.14.27.1 1.66.78 1.95.93.29.14.48.22.55.34.07.13.07.72-.17 1.4Z',
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden text-ivory">
      {/* light teal scrim only — the site-wide gradient carries the colour */}
      <div aria-hidden="true" className="absolute inset-0 bg-teal/45 backdrop-blur-[2px]" />
      <ToranBorder className="relative h-4 w-full text-gold/50" count={40} />

      {/* mandala only — no texture block, so the footer blends into the gradient */}
      <MandalaLine className="pointer-events-none absolute -bottom-40 -right-32 h-[420px] w-[420px] text-ivory/[0.06] animate-spin-slower" />
      <MotifPng
        src={ART.motif.diyaRow}
        className="absolute bottom-0 left-1/2 h-20 w-[520px] -translate-x-1/2 opacity-70"
        idle="pulse"
        glow
        duration={5}
      />

      <div className="container-editorial relative py-16 sm:py-20">
        <motion.div
          variants={stagger(0, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]"
        >
          <motion.div variants={riseIn}>
            <div className="flex items-center gap-3">
              <DiyaIcon className="h-8 w-8 text-saffron animate-diya-glow" />
              <p className="font-display text-3xl font-light tracking-[0.1em]">
                NUV <span className="text-saffron">Khelaiya</span>
              </p>
            </div>
            <p className="mt-3 eyebrow text-gold">{MICRO_BRAND.toUpperCase()}</p>
            <p className="mt-5 max-w-sm text-sm leading-[1.9] text-ivory/70">
              One night of Garba, Dandiya and devotion — a traditional Gujarati Navratri
              celebration built around community, culture and craft.
            </p>
            <p className="mt-4 font-gujarati text-lg text-saffron/90">આવો, સાથે ગરબે ઘૂમીએ</p>
          </motion.div>

          <motion.nav variants={riseIn} aria-label="Quick links">
            <h2 className="eyebrow text-gold">Quick Links</h2>
            <ul className="mt-5 space-y-3">
              {QUICK.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center gap-2 text-sm text-ivory/75 transition-colors hover:text-saffron"
                  >
                    <span className="h-px w-0 bg-saffron transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div variants={riseIn}>
            <h2 className="eyebrow text-gold">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm text-ivory/75">
              <li>
                <a href="mailto:khelaiya@nuv.ac.in" className="transition-colors hover:text-saffron">
                  khelaiya@nuv.ac.in
                </a>
              </li>
              <li>
                <a href="tel:+919000000000" className="transition-colors hover:text-saffron">
                  +91 90000 00000
                </a>
              </li>
              <li className="leading-relaxed">
                Navrachana University Grounds,
                <br />
                Vasna–Bhayli Road, Vadodara, Gujarat
              </li>
            </ul>

            <ul className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center border border-gold/40 text-ivory/80
                      transition-all duration-300 hover:-translate-y-1 hover:border-saffron hover:text-saffron"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <OrnamentDivider tone="ivory" className="mt-14" />

        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-[11px] uppercase tracking-[0.2em] text-ivory/55 sm:flex-row">
          <p>© 2026 NUV Khelaiya. All Rights Reserved.</p>
          <p className="flex items-center gap-3">
            <Link to="/gate" className="transition-colors hover:text-saffron">
              Gate Access
            </Link>
            <span className="text-gold/50">✦</span>
            <Link to="/admin" className="transition-colors hover:text-saffron">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
