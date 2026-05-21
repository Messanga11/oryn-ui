import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export type LenisOptions = {
  lerp?: number;
  duration?: number;
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  easing?: (t: number) => number;
};

type LenisInstance = {
  raf: (time: number) => void;
  destroy: () => void;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  off: (event: string, callback: (...args: unknown[]) => void) => void;
};

type GsapTicker = {
  add: (fn: (t: number) => void) => void;
  remove: (fn: (t: number) => void) => void;
  lagSmoothing: (n: number) => void;
};

const OUTSIDE_PROVIDER = Symbol('OUTSIDE_PROVIDER');
const LenisContext = createContext<LenisInstance | null | typeof OUTSIDE_PROVIDER>(OUTSIDE_PROVIDER);

const DEFAULT_LENIS_OPTIONS: Required<LenisOptions> = {
  lerp: 0.1,
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
};

export type SmoothScrollProviderProps = {
  children: ReactNode;
  options?: Partial<LenisOptions>;
};

export function SmoothScrollProvider({ children, options }: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<LenisInstance | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setLenis(null);
      return;
    }

    let lenisInstance: LenisInstance | null = null;
    let gsapTicker: GsapTicker | null = null;
    let tickerHandler: ((time: number) => void) | null = null;
    let cancelled = false;

    Promise.all([
      import('lenis'),
      import('gsap').then((m) => (m as unknown as { gsap: { ticker: GsapTicker; registerPlugin?: (p: unknown) => void } }).gsap),
    ]).then(([LenisMod, gsap]) => {
      if (cancelled) return;
      const mergedOptions = { ...DEFAULT_LENIS_OPTIONS, ...optionsRef.current };
      const LenisClass = (LenisMod as { default: new (opts: unknown) => LenisInstance }).default;
      lenisInstance = new LenisClass(mergedOptions);
      gsapTicker = gsap.ticker;
      gsapTicker.lagSmoothing(0);
      tickerHandler = (time: number) => lenisInstance!.raf(time * 1000);
      gsapTicker.add(tickerHandler);

      import('gsap/ScrollTrigger').then((stMod) => {
        if (!cancelled && lenisInstance) {
          const { ScrollTrigger } = stMod as unknown as { ScrollTrigger: { update: () => void; refresh: () => void } };
          gsap.registerPlugin?.(ScrollTrigger);
          lenisInstance.on('scroll', ScrollTrigger.update as (...args: unknown[]) => void);
          ScrollTrigger.refresh();
        }
      }).catch(() => {});

      setLenis(lenisInstance);
    }).catch(() => {});

    return () => {
      cancelled = true;
      if (tickerHandler && gsapTicker) gsapTicker.remove(tickerHandler);
      if (lenisInstance) lenisInstance.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis(): LenisInstance | null {
  const ctx = useContext(LenisContext);
  if (ctx === OUTSIDE_PROVIDER) {
    throw new Error('useLenis must be used inside SmoothScrollProvider');
  }
  return ctx;
}
