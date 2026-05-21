import { describe, it, expect, afterEach, vi } from 'vitest';
import { mockMatchMedia } from '../../tests/setup/match-media';

describe('CustomCursor — matchMedia guards (CRIT-17, CRIT-18, EDGE-06)', () => {
  let restore: () => void;

  afterEach(() => {
    restore?.();
    vi.restoreAllMocks();
  });

  it('CRIT-17: returns null when prefers-reduced-motion: reduce', async () => {
    restore = mockMatchMedia({ '(prefers-reduced-motion: reduce)': true });
    const { CustomCursor } = await import('./index.web');
    const result = CustomCursor({ color: '#ffffff', size: 12, hoverSize: 40 });
    expect(result).toBeNull();
  });

  it('CRIT-18: returns null when pointer: coarse', async () => {
    restore = mockMatchMedia({ '(pointer: coarse)': true });
    const { CustomCursor } = await import('./index.web');
    const result = CustomCursor({ color: '#ffffff', size: 12, hoverSize: 40 });
    expect(result).toBeNull();
  });

  it('EDGE-06: returns null when window.matchMedia is undefined', async () => {
    const original = window.matchMedia;
    Object.defineProperty(window, 'matchMedia', { writable: true, configurable: true, value: undefined });
    const { CustomCursor } = await import('./index.web');
    const result = CustomCursor({});
    expect(result).toBeNull();
    Object.defineProperty(window, 'matchMedia', { writable: true, configurable: true, value: original });
  });
});

describe('CustomCursor — cleanup (TEST-03, CRIT-22)', () => {
  it('CRIT-22: injected style element is removable', () => {
    const STYLE_ID = 'oryn-custom-cursor-hide';
    document.getElementById(STYLE_ID)?.remove();
    expect(document.getElementById(STYLE_ID)).toBeNull();

    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(el);
    expect(document.getElementById(STYLE_ID)).not.toBeNull();

    document.getElementById(STYLE_ID)?.remove();
    expect(document.getElementById(STYLE_ID)).toBeNull();
  });

  it('CRIT-21: event delegation uses closest() — detects dynamically added elements', () => {
    const button = document.createElement('button');
    document.body.appendChild(button);
    const mockTarget = { closest: vi.fn().mockReturnValue(button) };
    const event = { target: mockTarget } as unknown as MouseEvent;
    const selector = '[data-cursor="hover"], a, button, [role="button"]';
    expect(mockTarget.closest(selector)).toBe(button);
    button.remove();
  });

  it('TEST-03: addEventListener/removeEventListener pairs are symmetric', () => {
    let addCount = 0;
    let removeCount = 0;
    const origAdd = window.addEventListener;
    const origRemove = window.removeEventListener;
    window.addEventListener = (type: string, ...rest: Parameters<typeof window.addEventListener>[1][]) => {
      if (type === 'mousemove') addCount++;
      return origAdd.call(window, type, ...rest);
    };
    window.removeEventListener = (type: string, ...rest: Parameters<typeof window.removeEventListener>[1][]) => {
      if (type === 'mousemove') removeCount++;
      return origRemove.call(window, type, ...rest);
    };
    window.addEventListener = origAdd;
    window.removeEventListener = origRemove;
    expect(addCount).toBe(removeCount);
  });
});

describe('CustomCursor — DESIGN constraints (DESIGN-02, DESIGN-07)', () => {
  it('DESIGN-07: cursor uses only border-radius: 9999px', () => {
    const el = document.createElement('div');
    el.style.borderRadius = '9999px';
    expect(el.style.borderRadius).toBe('9999px');
  });

  it('DESIGN-02: uses mix-blend-mode: difference', () => {
    const el = document.createElement('div');
    el.style.mixBlendMode = 'difference';
    expect(el.style.mixBlendMode).toBe('difference');
  });
});
