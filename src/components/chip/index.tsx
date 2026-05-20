import type { ReactNode } from 'react';
import { Pressable } from '../../primitives/pressable';
import { Typography } from '../../primitives/typography';

export interface ChipProps {
  children: ReactNode;
  selected?: boolean;
  onPress?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Chip({ children, selected = false, onPress, disabled, className }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={[
        'flex-row items-center rounded-full px-3 py-1 border',
        selected ? 'bg-primary-500/20 border-primary-500/50' : 'bg-bg-elevated border-bg-border',
        disabled ? 'opacity-50' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Typography
        variant="caption"
        className={selected ? 'text-primary-400' : 'text-text-secondary'}
      >
        {children}
      </Typography>
    </Pressable>
  );
}
