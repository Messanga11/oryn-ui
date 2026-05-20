import type { ReactNode } from 'react';
import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'pending'
  | 'dot';

export type BadgeTone = 'brand' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'pending';

/** Dot color per tone */
const DOT_COLOR: Record<BadgeTone, string> = {
  brand: '#3B5BDB',
  accent: '#9C36B5',
  success: '#40C057',
  warning: '#FAB005',
  error: '#FA5252',
  info: '#339AF0',
  pending: '#7048E8',
};

const BADGE_CLASS: Record<Exclude<BadgeVariant, 'dot'>, string> = {
  default: 'bg-bg-elevated',
  primary: 'bg-primary-500/20',
  success: 'bg-success/20',
  warning: 'bg-warning/20',
  error: 'bg-error/20',
  info: 'bg-info/20',
  pending: 'bg-pending/20',
};

const TEXT_CLASS: Record<Exclude<BadgeVariant, 'dot'>, string> = {
  default: 'text-text-secondary',
  primary: 'text-primary-400',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  info: 'text-info',
  pending: 'text-pending',
};

export interface BadgeProps {
  variant?: BadgeVariant;
  /** Used with variant="dot" to set the dot color */
  tone?: BadgeTone;
  children?: ReactNode;
  /** @deprecated Use variant="dot" with tone prop instead */
  dot?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Badge — status indicator and standalone dot indicator.
 *
 * DESIGN-05: variant="dot" renders an 8×8 circle, borderRadius 9999, no shadow/glow.
 * tone="brand" → #3B5BDB (admin), tone="accent" → #9C36B5 (driver).
 */
export function Badge({
  variant = 'default',
  tone = 'brand',
  children,
  dot = false,
  size: _size = 'md',
  className,
}: BadgeProps) {
  // Standalone dot indicator (CRIT-30, DESIGN-05)
  if (variant === 'dot') {
    const dotColor = DOT_COLOR[tone];
    return (
      <Box
        className={className}
        style={{
          width: 8,
          height: 8,
          borderRadius: 9999,
          backgroundColor: dotColor,
        }}
      />
    );
  }

  return (
    <Box
      className={[
        'flex-row items-center self-start rounded-full px-2 py-0.5',
        BADGE_CLASS[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {dot ? (
        <Box
          className={[
            'w-1.5 h-1.5 rounded-full mr-1.5',
            TEXT_CLASS[variant].replace('text-', 'bg-'),
          ]
            .filter(Boolean)
            .join(' ')}
        />
      ) : null}
      <Typography variant="caption" className={TEXT_CLASS[variant]}>
        {children}
      </Typography>
    </Box>
  );
}
