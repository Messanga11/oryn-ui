import type { ReactNode } from 'react';
import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

const CONTAINER_CLASS: Record<AlertVariant, string> = {
  info: 'bg-info/10 border-info/30',
  success: 'bg-success/10 border-success/30',
  warning: 'bg-warning/10 border-warning/30',
  error: 'bg-error/10 border-error/30',
};

const TEXT_COLOR: Record<AlertVariant, 'info' | 'success' | 'warning' | 'error'> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function Alert({ variant = 'info', title, children, icon, className }: AlertProps) {
  return (
    <Box
      className={['flex-row rounded-lg border p-3 gap-2.5', CONTAINER_CLASS[variant], className]
        .filter(Boolean)
        .join(' ')}
    >
      {icon ? <Box className="mt-0.5">{icon}</Box> : null}
      <Box className="flex-1">
        {title ? (
          <Typography variant="label" color={TEXT_COLOR[variant]} className="mb-0.5">
            {title}
          </Typography>
        ) : null}
        <Typography variant="body-sm" color={TEXT_COLOR[variant]}>
          {children}
        </Typography>
      </Box>
    </Box>
  );
}
