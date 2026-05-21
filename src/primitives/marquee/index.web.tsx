import { type ReactNode, useEffect, useRef, useState } from 'react';

export type MarqueeProps = {
  children: ReactNode;
  speed?: number;
  gap?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
};

const MARQUEE_STYLE_ID = 'oryn-marquee-keyframes';
const MARQUEE_KEYFRAMES_CSS = `@keyframes marquee-left { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(-50%, 0, 0); } } @keyframes marquee-right { from { transform: translate3d(-50%, 0, 0); } to { transform: translate3d(0, 0, 0); } }` as const;

function injectKeyframes(): void {
  if (typeof document === 'undefined' || document.getElementById(MARQUEE_STYLE_ID)) return;
  const styleEl = document.createElement('style');
  styleEl.id = MARQUEE_STYLE_ID;
  styleEl.textContent = MARQUEE_KEYFRAMES_CSS;
  document.head.appendChild(styleEl);
}

export function Marquee({
  children,
  speed = 50,
  gap = 64,
  direction = 'left',
  pauseOnHover = true,
}: MarqueeProps): React.JSX.Element | null {
  // CRIT-24: hooks must be called unconditionally (Rules of Hooks)
  const childRef = useRef<HTMLDivElement>(null);
  const [reps, setReps] = useState(4);
  const [duration, setDuration] = useState(4);
  const [paused, setPaused] = useState(false);

  // CRIT-25: prefers-reduced-motion — checked inside effect and at render
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    injectKeyframes();
    if (prefersReduced || !childRef.current) return;

    const measure = () => {
      const childWidth = childRef.current?.getBoundingClientRect().width ?? 0;
      if (childWidth === 0) return;
      const vw = window.innerWidth;
      // CRIT-24: dynamic duplication — Math.ceil((viewport * 2) / childWidth), not × 2 hardcoded
      const repsPerGroup = Math.max(1, Math.ceil(vw / childWidth) + 1);
      const totalReps = repsPerGroup * 2;
      setReps(totalReps);
      const totalWidth = totalReps * childWidth + totalReps * gap;
      setDuration(totalWidth / speed);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(childRef.current);
    return () => observer.disconnect();
  }, [speed, gap, prefersReduced]);

  // CRIT-26: children null/[] → return null (after hooks)
  if (children == null) return null;
  if (Array.isArray(children) && children.length === 0) return null;

  // CRIT-25: reduced motion → static, readable, no animation
  if (prefersReduced) {
    return <div style={{ overflow: 'visible', whiteSpace: 'nowrap' }}>{children}</div>;
  }

  const animationName = direction === 'right' ? 'marquee-right' : 'marquee-left';
  const animationStyle: React.CSSProperties = {
    animationName,
    animationDuration: `${duration}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationPlayState: paused ? 'paused' : 'running',
    display: 'flex',
    whiteSpace: 'nowrap',
    width: 'max-content',
  };

  const items = Array.from({ length: reps }, (_, i) => (
    <div
      key={i}
      ref={i === 0 ? childRef : undefined}
      style={{ display: 'inline-flex', alignItems: 'center', paddingRight: `${gap}px`, flexShrink: 0 }}
    >
      {children}
    </div>
  ));

  return (
    <div
      style={{ overflow: 'hidden', width: '100%' }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div style={animationStyle}>{items}</div>
    </div>
  );
}
