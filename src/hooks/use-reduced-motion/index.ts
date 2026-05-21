import { useEffect, useState } from 'react';

/**
 * useReducedMotion — returns true when prefers-reduced-motion: reduce is active.
 * Reacts to mid-session OS setting changes (EDGE-02).
 * SSR-safe: initializes to false on server, updates after hydration.
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    setReducedMotion(mql.matches);
    mql.addEventListener('change', handleChange);

    return () => {
      mql.removeEventListener('change', handleChange);
    };
  }, []);

  return reducedMotion;
}
