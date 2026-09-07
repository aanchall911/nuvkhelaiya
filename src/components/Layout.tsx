import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_SILK } from '@/lib/motion';
import { SmoothScrollProvider, useLenis } from '@/lib/smoothScroll';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SignatureGradient } from '@/components/ui/SignatureGradient';
import { AmbientGlows } from '@/components/fx/AmbientGlows';
import { CustomCursor } from '@/components/fx/CustomCursor';
import { ScrollProgress } from '@/components/fx/ScrollProgress';
import { ArchClipDefs } from '@/components/ornaments/Ornaments';

/** Route changes reset scroll; in-page hashes are eased to with Lenis. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -90 });
        else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash, lenis]);

  return null;
}

/** Public site shell: nav + animated page transitions + footer. */
export function Layout() {
  const { pathname } = useLocation();

  return (
    <SmoothScrollProvider>
      <div className="relative flex min-h-screen flex-col bg-plum-deep">
        {/* one signature gradient behind the entire site — fixed, so there are no
            seams between sections and the theme never changes as you scroll */}
        <SignatureGradient className="!fixed" />
        <AmbientGlows />

        <ScrollProgress />
        <CustomCursor />
        <ScrollManager />
        <ArchClipDefs />
        <Navbar />

        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            id="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_SILK }}
            /* `relative` keeps page content painting above the fixed gradient */
            className="relative flex-1"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>

        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
