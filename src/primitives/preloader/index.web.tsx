import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type PreloaderProps = {
  // EDGE-02: optional to handle undefined at runtime
  progress?: number;
  onComplete?: () => void;
  label?: string;
};

// CRIT-20: clamp [0,100], handle NaN/Infinity/undefined → 0
function sanitizeProgress(value: number | undefined): number {
  if (value === undefined || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

export function Preloader({ progress, onComplete, label = 'LOADING' }: PreloaderProps) {
  const calledRef = useRef(false);
  // CRIT-21: one-shot via useRef<boolean>
  const mountedRef = useRef(true);
  const [revealing, setRevealing] = useState(false);

  // ARCH-05: SSR-safe guard
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // CRIT-22: reduced-motion → onComplete at mount, return null
  useEffect(() => {
    if (prefersReduced && !calledRef.current) {
      calledRef.current = true;
      onComplete?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    const clamped = sanitizeProgress(progress);
    if (clamped >= 100 && !calledRef.current) {
      calledRef.current = true;
      setRevealing(true);
    }
  }, [progress, prefersReduced]);

  if (prefersReduced) return null;

  const clamped = sanitizeProgress(progress);
  // DESIGN-06: format "00" to "100" (padStart 2, not 3)
  const displayNum = String(Math.floor(clamped)).padStart(2, '0');

  return (
    <AnimatePresence>
      {!revealing && (
        <motion.div
          // CRIT-23: aria-hidden during reveal final, role=progressbar
          aria-hidden={revealing ? 'true' : undefined}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
          style={{
            position: 'fixed',
            inset: 0,
            // DESIGN-06: background #0a0a0a, z-index 10000 (above CustomCursor 9999)
            backgroundColor: '#0a0a0a',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: '48px',
            // DESIGN-07: initial clip-path inset(0 0 0 0)
            clipPath: 'inset(0 0 0 0)',
          }}
          exit={{
            // DESIGN-07: reveal via clip-path inset(100% 0 0 0), 700ms cubic-bezier expo.inOut
            clipPath: 'inset(100% 0 0 0)',
            transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] },
          }}
          onAnimationComplete={() => {
            // EDGE-07: guard — only call if still mounted
            if (mountedRef.current) onComplete?.();
          }}
        >
          {/* DESIGN-06: counter typography ≥100px equivalent, #f0f0f0, bottom-right */}
          <span
            style={{
              fontFamily: '"Clash Display", "Inter", sans-serif',
              fontSize: 'clamp(64px, 9vw, 140px)',
              lineHeight: '0.95',
              letterSpacing: '-0.02em',
              fontWeight: '700',
              color: '#f0f0f0',
              userSelect: 'none',
            }}
          >
            {displayNum}
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '14px',
                lineHeight: '1.4',
                letterSpacing: '0',
                marginLeft: '6px',
                color: '#888888',
                verticalAlign: 'super',
              }}
            >
              %
            </span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
