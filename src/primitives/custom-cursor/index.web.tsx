import { useEffect, useRef } from 'react';

export type CustomCursorProps = {
  color?: string;
  size?: number;
  hoverSize?: number;
};

const CURSOR_HIDE_CSS = '*, *::before, *::after { cursor: none !important; }';
const CURSOR_STYLE_ID = 'oryn-custom-cursor-hide';

export function CustomCursor({
  color = '#ffffff',
  size = 12,
  hoverSize = 40,
}: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const motionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    // CRIT-12: check BOTH pointer:coarse AND hover:none (touch device detection)
    const pointerMQ = window.matchMedia('(pointer: coarse)');
    const hoverMQ = window.matchMedia('(hover: none)');

    if (motionMQ.matches || pointerMQ.matches || hoverMQ.matches) return;

    const el = document.createElement('div');
    cursorRef.current = el;

    Object.assign(el.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '9999px',
      background: color,
      mixBlendMode: 'difference',
      pointerEvents: 'none',
      zIndex: '9999',
      transition: `width 0.2s cubic-bezier(0.23, 1, 0.32, 1), height 0.2s cubic-bezier(0.23, 1, 0.32, 1)`,
      transform: 'translate3d(-9999px, -9999px, 0) translate(-50%, -50%)',
      willChange: 'transform',
    });

    document.body.appendChild(el);

    if (!document.getElementById(CURSOR_STYLE_ID)) {
      const styleEl = document.createElement('style');
      styleEl.id = CURSOR_STYLE_ID;
      styleEl.textContent = CURSOR_HIDE_CSS;
      document.head.appendChild(styleEl);
    }

    let rafId = -1;
    let targetX = -9999;
    let targetY = -9999;

    const tick = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const isHoverable = target?.closest('[data-cursor="hover"], a, button, [role="button"]');
      if (isHoverable && cursorRef.current) {
        Object.assign(cursorRef.current.style, {
          width: `${hoverSize}px`,
          height: `${hoverSize}px`,
          background: 'transparent',
          border: `1px solid ${color}`,
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const wasHoverable = target?.closest('[data-cursor="hover"], a, button, [role="button"]');
      if (wasHoverable && cursorRef.current) {
        Object.assign(cursorRef.current.style, {
          width: `${size}px`,
          height: `${size}px`,
          background: color,
          border: 'none',
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) cleanup();
    };
    motionMQ.addEventListener('change', handleMotionChange);

    function cleanup() {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      motionMQ.removeEventListener('change', handleMotionChange);

      if (cursorRef.current) {
        cursorRef.current.remove();
        cursorRef.current = null;
      }

      document.getElementById(CURSOR_STYLE_ID)?.remove();
    }

    return cleanup;
  }, [color, size, hoverSize]);

  return null;
}
