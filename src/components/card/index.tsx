import type { ReactNode } from 'react';
import { Box } from '../../primitives/box';
import { Pressable } from '../../primitives/pressable';

export interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  className?: string;
}

/**
 * Card — surface container.
 * Becomes a Pressable when onPress is provided.
 */
export function Card({ children, onPress, className }: CardProps) {
  const containerClass = ['bg-bg-surface rounded-lg border border-bg-border p-4', className]
    .filter(Boolean)
    .join(' ');

  if (onPress) {
    return (
      <Pressable onPress={onPress} className={containerClass}>
        {children}
      </Pressable>
    );
  }

  return <Box className={containerClass}>{children}</Box>;
}
