import type { ReactNode } from 'react';
import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';
import { Button } from '../button';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <Box
      className={[
        'flex-1 items-center justify-center py-16 px-8',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {icon ? <Box className="mb-4 opacity-40">{icon}</Box> : null}
      <Typography variant="h3" align="center">
        {title}
      </Typography>
      {description ? (
        <Typography variant="body-sm" color="muted" align="center" className="mt-2">
          {description}
        </Typography>
      ) : null}
      {actionLabel && onAction ? (
        <Button onPress={onAction} variant="outline" size="md" className="mt-6">
          {actionLabel}
        </Button>
      ) : null}
    </Box>
  );
}
