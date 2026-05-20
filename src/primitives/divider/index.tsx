import { Box } from '../box';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

/**
 * Divider — visual separator line.
 */
export function Divider({ orientation = 'horizontal', className }: DividerProps) {
  return (
    <Box
      className={[
        orientation === 'horizontal'
          ? 'w-full h-px bg-bg-border'
          : 'h-full w-px bg-bg-border',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
