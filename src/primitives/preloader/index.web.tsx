import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type PreloaderProps = {
  progress: number;
  onComplete?: () => void;
  label?: string;
};

function sanitizeProgress(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

export function Preloader({ progress, onComplete, label = 'LOADING' }: PreloaderProps) {
  const calledRef = useRef(false);
  const mountedRef = useRef(true);
  const [revealing, setRevealing] = useState(false);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

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
  const displayNum = String(Math.floor(clamped)).padStart(3, '0');

  return (
    <AnimatePresence>
      {!revealing && (
        <motion.div
          aria-hidden={revealing ? 'true' : undefined}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#0a0a0a',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'flex-end',
            padding: '48px',
            clipPath: 'inset(0 0 0 0)',
          }}
          exit={{
            clipPath: 'inset(100% 0 0 0)',
            transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] },
          }}
          onAnimationComplete={() => {
            if (mountedRef.current) onComplete?.();
          }}
        >
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '14px',
              lineHeight: '1.4',
              letterSpacing: '0',
              color: '#f0f0f0',
              userSelect: 'none',
            }}
          >
            {displayNum}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
