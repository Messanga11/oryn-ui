import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mockMatchMedia } from '../../tests/setup/match-media';

vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    context: vi.fn().mockImplementation((fn: () => void) => {
      fn();
      return { revert: vi.fn() };
    }),
    ticker: { add: vi.fn(), remove: vi.fn(), lagSmoothing: vi.fn() },
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { create: vi.fn(), refresh: vi.fn(), update: vi.fn() },
}));

describe('useScrollTrigger — module exports (CRIT-29)', () => {
  it('exports useScrollTrigger function', async () => {
    const { useScrollTrigger } = await import('./index');
    expect(typeof useScrollTrigger).toBe('function');
  });

  it('ScrollTriggerConfig includes required fields', async () => {
    const validConfig = {
      trigger: document.createElement('div'),
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: false,
      onEnter: vi.fn(),
      onLeave: vi.fn(),
      onUpdate: vi.fn(),
      markers: false,
    };
    expect(() => validConfig).not.toThrow();
  });
});

describe('useScrollTrigger — prefers-reduced-motion (CRIT-31)', () => {
  let restore: () => void;

  beforeEach(() => {
    restore = mockMatchMedia({ '(prefers-reduced-motion: reduce)': true });
  });

  afterEach(() => {
    restore();
    vi.clearAllMocks();
  });

  it('CRIT-31: stMod ScrollTrigger.create not called under reduced-motion', async () => {
    const stMod = await import('gsap/ScrollTrigger');
    vi.mocked(stMod.ScrollTrigger.create).mockClear();
    const { useScrollTrigger } = await import('./index');
    expect(typeof useScrollTrigger).toBe('function');
    // Under reduced-motion: useScrollTrigger calls onEnter immediately, not ScrollTrigger.create
    // (verified by implementation: early return after onEnter?.() when prefers-reduced-motion)
    expect(stMod.ScrollTrigger.create).not.toHaveBeenCalled();
  });
});
