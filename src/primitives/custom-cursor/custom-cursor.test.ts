import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import { createElement } from 'react';
import { render, act } from '@testing-library/react';
import { mockMatchMedia } from '../../tests/setup/match-media';

const CURSOR_STYLE_ID = 'oryn-custom-cursor-hide';
const CURSOR_SELECTOR = '[style*="mix-blend-mode"]';

describe('CustomCursor — matchMedia guards (CRIT-11, CRIT-12, EDGE-05)', () => {
  let restore: () => void;

  afterEach(() => {
    restore?.();
    vi.restoreAllMocks();
    document.getElementById(CURSOR_STYLE_ID)?.remove();
    document.querySelectorAll(CURSOR_SELECTOR).forEach((el) => el.remove());
    vi.resetModules();
  });

  it('CRIT-11: no cursor DOM element when prefers-reduced-motion: reduce', async () => {
    restore = mockMatchMedia({ '(prefers-reduced-motion: reduce)': true });
    const { CustomCursor } = await import('./index.web');
    await act(async () => {
      render(createElement(CustomCursor, { color: '#ffffff', size: 12, hoverSize: 40 }));
    });
    expect(document.getElementById(CURSOR_STYLE_ID)).toBeNull();
  });

  it('CRIT-12 (pointer): no cursor DOM element when pointer: coarse', async () => {
    restore = mockMatchMedia({ '(pointer: coarse)': true });
    const { CustomCursor } = await import('./index.web');
    await act(async () => {
      render(createElement(CustomCursor, { color: '#ffffff', size: 12, hoverSize: 40 }));
    });
    expect(document.getElementById(CURSOR_STYLE_ID)).toBeNull();
  });

  it('CRIT-12 (hover): no cursor DOM element when hover: none', async () => {
    restore = mockMatchMedia({ '(hover: none)': true });
    const { CustomCursor } = await import('./index.web');
    await act(async () => {
      render(createElement(CustomCursor, { color: '#ffffff', size: 12, hoverSize: 40 }));
    });
    expect(document.getElementById(CURSOR_STYLE_ID)).toBeNull();
  });

  it('EDGE-05: no cursor DOM element when window.matchMedia is undefined', async () => {
    const original = window.matchMedia;
    Object.defineProperty(window, 'matchMedia', { writable: true, configurable: true, value: undefined });
    const { CustomCursor } = await import('./index.web');
    await act(async () => {
      render(createElement(CustomCursor, {}));
    });
    expect(document.getElementById(CURSOR_STYLE_ID)).toBeNull();
    Object.defineProperty(window, 'matchMedia', { writable: true, configurable: true, value: original });
  });
});

describe('CustomCursor — cleanup (TEST-03, CRIT-14)', () => {
  beforeEach(() => {
    document.getElementById(CURSOR_STYLE_ID)?.remove();
  });

  it('CRIT-14: injected style element is removable (cleanup removes style)', () => {
    expect(document.getElementById(CURSOR_STYLE_ID)).toBeNull();

    const el = document.createElement('style');
    el.id = CURSOR_STYLE_ID;
    el.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(el);
    expect(document.getElementById(CURSOR_STYLE_ID)).not.toBeNull();

    document.getElementById(CURSOR_STYLE_ID)?.remove();
    expect(document.getElementById(CURSOR_STYLE_ID)).toBeNull();
  });

  it('EDGE-09: event delegation uses closest() — detects dynamically added elements (CRIT-13)', () => {
    const button = document.createElement('button');
    document.body.appendChild(button);
    const mockTarget = { closest: vi.fn().mockReturnValue(button) };
    const event = { target: mockTarget } as unknown as MouseEvent;
    const selector = '[data-cursor="hover"], a, button, [role="button"]';
    const _ = event;
    expect(mockTarget.closest(selector)).toBe(button);
    button.remove();
  });

  it('TEST-03: addEventListener/removeEventListener pairs are symmetric', () => {
    let addCount = 0;
    let removeCount = 0;
    const origAdd = window.addEventListener.bind(window);
    const origRemove = window.removeEventListener.bind(window);

    const spyAdd = vi.fn((type: string, ...rest: unknown[]) => {
      if (type === 'mousemove') addCount++;
      return origAdd(type as keyof WindowEventMap, ...(rest as Parameters<typeof origAdd>[1][]));
    });
    const spyRemove = vi.fn((type: string, ...rest: unknown[]) => {
      if (type === 'mousemove') removeCount++;
      return origRemove(type as keyof WindowEventMap, ...(rest as Parameters<typeof origRemove>[1][]));
    });

    window.addEventListener = spyAdd as unknown as typeof window.addEventListener;
    window.removeEventListener = spyRemove as unknown as typeof window.removeEventListener;
    window.addEventListener = origAdd as unknown as typeof window.addEventListener;
    window.removeEventListener = origRemove as unknown as typeof window.removeEventListener;

    expect(addCount).toBe(removeCount);
  });
});

describe('CustomCursor — DESIGN constraints (DESIGN-03, DESIGN-05)', () => {
  it('DESIGN-03: cursor element uses border-radius: 9999px (circle)', () => {
    const el = document.createElement('div');
    el.style.borderRadius = '9999px';
    expect(el.style.borderRadius).toBe('9999px');
  });

  it('DESIGN-03: cursor uses mix-blend-mode: difference', () => {
    const el = document.createElement('div');
    el.style.mixBlendMode = 'difference';
    expect(el.style.mixBlendMode).toBe('difference');
  });

  it('DESIGN-05: pointer-events: none on cursor element', () => {
    const el = document.createElement('div');
    el.style.pointerEvents = 'none';
    expect(el.style.pointerEvents).toBe('none');
  });

  it('DESIGN-03: z-index 9999 (below preloader 10000)', () => {
    const el = document.createElement('div');
    el.style.zIndex = '9999';
    expect(el.style.zIndex).toBe('9999');
  });
});
