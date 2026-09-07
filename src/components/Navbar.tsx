import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_OUT_SOFT } from '@/lib/motion';
import { ART } from '@/lib/assets';
import { DiyaIcon } from '@/components/ornaments/Ornaments';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/about#schedule', label: 'Event' },
  { to: '/passes', label: 'Passes' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/team', label: 'Team' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

/** Durga Maa emblem, with the diya ornament as a graceful fallback. */
function BrandMark() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <DiyaIcon className="h-9 w-9 shrink-0 text-saffron animate-diya-glow" />;
  }

  return (
    <span className="relative grid h-11 w-11 shrink-0 place-items-center sm:h-12 sm:w-12">
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-saffron/25 blur-lg animate-diya-glow"
      />
      <img
        src={ART.brand.durga}
        alt=""
        aria-hidden="true"
        width={360}
        height={360}
        onError={() => setFailed(true)}
        className="relative h-full w-full object-contain png-halo
          transition-transform duration-700 ease-out group-hover:scale-110"
      />
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const lastY = useRef(0);

  /* floating pill once scrolled; hides going down, returns going up */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 160);
        lastY.current = y;
      }
    };
    onScroll();
    lastY.current = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <motion.header
      animate={{ y: hidden && !open ? '-140%' : '0%' }}
      transition={{ duration: 0.55, ease: EASE_OUT_SOFT }}
      className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ${
        scrolled ? 'pt-2 sm:pt-4' : 'pt-5 sm:pt-8'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50
          focus:bg-saffron focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest focus:text-plum-deep"
      >
        Skip to content
      </a>

      {/* full-bleed at rest, floating pill once scrolled */}
      <div
        className={`transition-all duration-500 ${
          scrolled ? 'mx-auto w-[min(1300px,calc(100%-1.25rem))]' : 'w-full'
        }`}
      >
        <nav
          aria-label="Primary"
          className={`flex items-center justify-between gap-4 transition-all duration-500 ${
            scrolled
              ? 'h-[64px] rounded-full border border-gold/30 bg-plum-deep/70 px-4 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:px-6'
              : 'h-[72px] px-4 sm:px-6 lg:px-8'
          }`}
        >
        {/* ---- left: brand lockup ---- */}
        <Link
          to="/"
          className="group mr-auto flex shrink-0 items-center gap-3"
          aria-label="NUV Khelaiya — home"
        >
          <BrandMark />
          <span className="leading-none">
            <span className="block font-display text-[21px] font-bold tracking-[0.12em] text-ivory sm:text-[23px]">
              NUV <span className="text-saffron">Khelaiya</span>
            </span>
            <span className="mt-1 block text-[8.5px] font-semibold uppercase tracking-[0.3em] text-gold/90">
              Navratri Utsav
            </span>
          </span>
        </Link>

        {/* ---- centre: navigation ---- */}
        <ul className="hidden items-center gap-0.5 lg:flex xl:gap-1.5">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative block px-2.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-300 xl:px-3 ${
                    isActive && !l.to.includes('#') ? 'text-saffron' : 'text-ivory hover:text-saffron'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span
                      className={`absolute inset-x-2.5 -bottom-0.5 h-[1.5px] origin-left bg-saffron transition-transform duration-300 xl:inset-x-3 ${
                        isActive && !l.to.includes('#') ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ---- right: CTA ---- */}
        <div className="ml-auto flex shrink-0 items-center gap-3">
          <Link to="/passes" className="btn-primary hidden !px-6 !py-2.5 !font-bold sm:inline-flex">
            Get Pass
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center border border-gold/40 text-ivory lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${
                  open ? 'translate-y-1.5 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-[1.5px] w-full bg-current transition-opacity duration-200 ${
                  open ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-[1.5px] w-full bg-current transition-transform duration-300 ${
                  open ? '-translate-y-1.5 -rotate-45' : ''
                }`}
              />
            </span>
          </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE_OUT_SOFT }}
            className="lg:hidden"
          >
            <div className="border-t border-gold/20 bg-plum-deep/97 px-5 pb-8 pt-4 backdrop-blur-xl texture-bandhani">
              <ul className="divide-y divide-gold/15">
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.045, duration: 0.4 }}
                  >
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      className="flex min-h-[52px] items-center justify-between font-display text-xl font-bold text-ivory"
                    >
                      {l.label}
                      <span className="text-gold/60">✦</span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <Link to="/passes" className="btn-primary mt-6 w-full !font-bold">
                Get Your Pass
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
