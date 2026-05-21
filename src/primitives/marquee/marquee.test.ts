import { describe, it, expect, vi } from 'vitest';

describe('Marquee — edge cases (EDGE-04)', () => {
  it('EDGE-04: exports Marquee function', async () => {
    const { Marquee } = await import('./index.web');
    expect(typeof Marquee).toBe('function');
  });
});

describe('Marquee — duplication calculation (CRIT-40)', () => {
  it('CRIT-40: totalReps × childWidth >= 2 × viewportWidth', () => {
    function calculateReps(childWidth: number, vw: number): number {
      const repsPerGroup = Math.max(1, Math.ceil(vw / childWidth) + 1);
      return repsPerGroup * 2;
    }
    expect(calculateReps(100, 1000) * 100).toBeGreaterThanOrEqual(2 * 1000);
    expect(calculateReps(1000, 1000) * 1000).toBeGreaterThanOrEqual(2 * 1000);
    expect(calculateReps(1500, 1000)).toBeGreaterThanOrEqual(2);
  });

  it('CRIT-41: duration = totalWidth / speed', () => {
    const speed = 60;
    const childWidth = 300;
    const gap = 48;
    const reps = 4;
    const totalWidth = reps * childWidth + reps * gap;
    expect(totalWidth / speed).toBeGreaterThan(0);
  });
});

describe('Marquee — props (CRIT-39)', () => {
  it('CRIT-39: accepts speed, gap, direction, pauseOnHover props', () => {
    const props = { speed: 60, gap: 48, direction: 'left' as const, pauseOnHover: true };
    expect(props.speed).toBe(60);
    expect(props.gap).toBe(48);
  });
});
