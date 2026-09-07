import { useState } from 'react';

/**
 * SignatureGradient — the NUV Khelaiya brand background, lifted verbatim from
 * the homepage hero so every page shares one identical treatment.
 *
 * Three stacked layers:
 *  1. the animated Deep Plum → Warm Yellow → Deep Teal signature gradient
 *  2. an optional photographic backdrop, luminosity-blended
 *  3. a radial depth wash that keeps type legible over the bright midpoint
 *  4. a bandhani dot field for texture
 *
 * Purely decorative. Render it as the first child of a `relative` section.
 */
export function SignatureGradient({
  backdrop,
  className = '',
}: {
  /** optional photo layered into the gradient; hides itself if missing */
  backdrop?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      {/* 1 — signature gradient, slowly drifting */}
      <div className="absolute inset-0 bg-signature-animated" />

      {/* 2 — optional photographic backdrop */}
      {backdrop && !failed && (
        <img
          src={backdrop}
          alt=""
          loading="eager"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.18] mix-blend-luminosity"
        />
      )}

      {/* 3 — radial depth wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,rgba(74,12,50,0.15)_0%,rgba(74,12,50,0.72)_58%,rgba(15,77,91,0.9)_100%)]" />

      {/* 4 — bandhani texture */}
      <div className="absolute inset-0 texture-bandhani opacity-50" />
    </div>
  );
}
