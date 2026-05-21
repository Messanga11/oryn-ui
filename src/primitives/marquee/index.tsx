import React, { type ReactNode } from 'react';

export type MarqueeProps = {
  children: ReactNode;
  speed?: number;
  gap?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
};

export function Marquee({ children }: MarqueeProps): React.JSX.Element | null {
  if (children == null) return null;
  if (Array.isArray(children) && children.length === 0) return null;
  // Native: simple row, no animation
  return <>{children}</>;
}
