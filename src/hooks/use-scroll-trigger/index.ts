import { useEffect, type DependencyList, type RefObject } from 'react';

export type ScrollTriggerConfig = {
  trigger?: RefObject<Element | null> | Element | string | null;
  start?: string | number;
  end?: string | number;
  scrub?: boolean | number;
  onEnter?: () => void;
  onLeave?: () => void;
  onUpdate?: (self: { progress: number }) => void;
  markers?: boolean;
  pin?: boolean | string | Element;
  toggleActions?: string;
};

export function useScrollTrigger(
  config: ScrollTriggerConfig,
  deps: DependencyList = [],
): void {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      config.onEnter?.();
      return;
    }

    const triggerEl =
      config.trigger && typeof config.trigger === 'object' && 'current' in config.trigger
        ? config.trigger.current
        : config.trigger;

    if (triggerEl === null || triggerEl === undefined) return;

    let ctx: { revert: () => void } | null = null;

    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([gsapMod, stMod]) => {
      const { gsap } = gsapMod as unknown as { gsap: { registerPlugin?: (p: unknown) => void; context: (fn: () => void) => { revert: () => void } } };
      const { ScrollTrigger } = stMod as unknown as { ScrollTrigger: { create: (config: unknown) => void } };
      gsap.registerPlugin?.(ScrollTrigger);

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: triggerEl,
          start: config.start ?? 'top 80%',
          end: config.end ?? 'bottom 20%',
          scrub: config.scrub,
          onEnter: config.onEnter,
          onLeave: config.onLeave,
          onUpdate: config.onUpdate,
          markers: config.markers ?? false,
          pin: config.pin,
          toggleActions: config.toggleActions,
        });
      });
    }).catch(() => {
      config.onEnter?.();
    });

    return () => {
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
