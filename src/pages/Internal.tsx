import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { riseIn, stagger } from '@/lib/motion';
import { SignatureGradient } from '@/components/ui/SignatureGradient';
import { DiyaIcon, MandalaLine } from '@/components/ornaments/Ornaments';

/**
 * Internal shells for the protected routes. Auth, scanning and sync are the
 * next build stage — these screens exist so the routes resolve, and they state
 * plainly that no access control is wired up yet.
 */
function InternalShell({
  kicker,
  title,
  items,
}: {
  kicker: string;
  title: string;
  items: string[];
}) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-plum-deep px-5 py-20 text-ivory">
      {/* same site-wide gradient, plus a dark scrim so scanner UI stays readable
          on a phone at night */}
      <SignatureGradient />
      <div aria-hidden="true" className="absolute inset-0 bg-plum-deep/55" />
      <div aria-hidden="true" className="absolute inset-0 texture-bandhani opacity-40" />
      <MandalaLine className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 text-saffron/[0.08] animate-spin-slower" />

      <motion.div
        variants={stagger(0.1, 0.12)}
        initial="hidden"
        animate="show"
        className="relative w-full max-w-lg text-center"
      >
        <motion.div variants={riseIn} className="flex justify-center">
          <DiyaIcon className="h-10 w-10 text-saffron animate-diya-glow" />
        </motion.div>
        <motion.p variants={riseIn} className="mt-6 eyebrow text-gold">
          {kicker}
        </motion.p>
        <motion.h1
          variants={riseIn}
          className="mt-3 font-display text-[clamp(1.9rem,6vw,2.8rem)] font-light leading-tight"
        >
          {title}
        </motion.h1>

        <motion.div
          variants={riseIn}
          role="status"
          className="mt-8 border border-saffron/50 bg-saffron/10 p-4 text-left"
        >
          <p className="flex items-start gap-2 text-[12.5px] leading-[1.8] text-saffron">
            <span aria-hidden="true">⚠</span>
            <span>
              <strong className="font-medium">Not secured yet.</strong> This route has no
              authentication, and no pass data or check-in records exist. Do not expose it publicly
              until volunteer login and server-side verification are in place.
            </span>
          </p>
        </motion.div>

        <motion.ul variants={riseIn} className="mt-8 space-y-2 text-left">
          {items.map((i) => (
            <li
              key={i}
              className="border border-gold/25 bg-plum/40 px-4 py-3 text-[13px] leading-[1.7] text-ivory/75"
            >
              {i}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={riseIn} className="mt-9">
          <Link to="/" className="btn-outline">
            Back to Site
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}

export function GateShell() {
  return (
    <InternalShell
      kicker="NUV Khelaiya · Internal"
      title="Gate Verification"
      items={[
        'Volunteer login with gate assignment',
        'Camera QR scanner optimised for phones',
        'Valid / Already Used / Invalid states with icon + text',
        'Offline-first local verification against a cached pass set',
        'Pending check-in queue with automatic sync on reconnect',
      ]}
    />
  );
}

export function AdminShell() {
  return (
    <InternalShell
      kicker="NUV Khelaiya · Internal"
      title="Event Control Center"
      items={[
        'Live totals: passes, checked in, remaining, duplicates, sync queue',
        'Charts for registrations, check-ins by hour and by gate',
        'Pass management — search, view, revoke, reissue',
        'Gate and volunteer management',
      ]}
    />
  );
}
