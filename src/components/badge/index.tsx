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
  | 'pending';

const BADGE_CLASS: Record<BadgeVariant, string> = {
  default: 'bg-bg-elevated',
  primary: 'bg-primary-500/20',
  success: 'bg-success/20',
  warning: 'bg-warning/20',
  error: 'bg-error/20',
  info: 'bg-info/20',
  pending: 'bg-pending/20',
};

const TEXT_CLASS: Record<BadgeVariant, string> = {
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
  children: ReactNode;
  dot?: boolean;
  className?: string;
}

export function Badge({ variant = 'default', children, dot = false, className }: BadgeProps) {
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
          className={['w-1.5 h-1.5 rounded-full mr-1.5', TEXT_CLASS[variant].replace('text-', 'bg-')]
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
