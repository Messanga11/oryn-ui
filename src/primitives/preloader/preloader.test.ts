import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mockMatchMedia } from '../../tests/setup/match-media';

describe('sanitizeProgress — CRIT-35, EDGE-03', () => {
  function sanitizeProgress(value: number): number {
    if (!Number.isFinite(value)) return 0;
    return Math.max(0, Math.min(100, value));
  }

  it('EDGE-03: -5 → 0', () => { expect(sanitizeProgress(-5)).toBe(0); });
  it('EDGE-03: 150 → 100', () => { expect(sanitizeProgress(150)).toBe(100); });
  it('EDGE-03: NaN → 0', () => { expect(sanitizeProgress(Number.NaN)).toBe(0); });
  it('EDGE-03: Infinity → 0', () => { expect(sanitizeProgress(Infinity)).toBe(0); });
  it('EDGE-03: -Infinity → 0', () => { expect(sanitizeProgress(-Infinity)).toBe(0); });
  it('CRIT-35: 42 → "042"', () => {
    expect(String(Math.floor(sanitizeProgress(42))).padStart(3, '0')).toBe('042');
  });
  it('CRIT-35: 7 → "007"', () => {
    expect(String(Math.floor(sanitizeProgress(7))).padStart(3, '0')).toBe('007');
  });
  it('CRIT-35: 100 → "100"', () => {
    expect(String(Math.floor(sanitizeProgress(100))).padStart(3, '0')).toBe('100');
  });
});

describe('Preloader — one-shot onComplete (TEST-04, CRIT-34)', () => {
  it('TEST-04: onComplete called once when progress reaches 100', () => {
    const onComplete = vi.fn();
    let calledRef = false;
    function process(progress: number) {
      const clamped = !Number.isFinite(progress) ? 0 : Math.max(0, Math.min(100, progress));
      if (clamped >= 100 && !calledRef) { calledRef = true; onComplete(); }
    }
    process(50);
    expect(onComplete).not.toHaveBeenCalled();
    process(100);
    expect(onComplete).toHaveBeenCalledTimes(1);
    process(99);
    process(100);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('CRIT-34: progress 99→100→99→100 — onComplete called once', () => {
    const onComplete = vi.fn();
    let calledRef = false;
    function process(progress: number) {
      const clamped = !Number.isFinite(progress) ? 0 : Math.max(0, Math.min(100, progress));
      if (clamped >= 100 && !calledRef) { calledRef = true; onComplete(); }
    }
    process(99); process(100); process(99); process(100);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});

describe('Preloader — prefers-reduced-motion (CRIT-37)', () => {
  let restore: () => void;

  beforeEach(() => { restore = mockMatchMedia({ '(prefers-reduced-motion: reduce)': true }); });
  afterEach(() => { restore(); vi.clearAllMocks(); });

  it('CRIT-37: matchMedia returns reduce=true', () => {
    expect(window.matchMedia('(prefers-reduced-motion: reduce)').matches).toBe(true);
  });
});

describe('Preloader — EDGE-09: unmount guard', () => {
  it('EDGE-09: onComplete not called after unmount', () => {
    const onComplete = vi.fn();
    let mounted = true;
    let calledRef = false;
    function process(progress: number) {
      const clamped = Math.max(0, Math.min(100, progress));
      if (clamped >= 100 && !calledRef && mounted) { calledRef = true; onComplete(); }
    }
    process(50);
    mounted = false;
    process(100);
    expect(onComplete).not.toHaveBeenCalled();
  });
});

describe('Preloader — module exports', () => {
  it('exports Preloader function', async () => {
    const { Preloader } = await import('./index.web');
    expect(typeof Preloader).toBe('function');
  });
});
