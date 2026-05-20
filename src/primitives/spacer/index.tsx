import { Box } from '../box';

export interface SpacerProps {
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  axis?: 'vertical' | 'horizontal' | 'both';
}

const SIZE_MAP: Record<string, number> = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

/**
 * Spacer — adaptive blank space.
 * Use instead of margin/padding on surrounding elements when spacing
 * needs to be explicit (e.g. between siblings in a list).
 */
export function Spacer({ size = 'md', axis = 'vertical' }: SpacerProps) {
  const resolved = typeof size === 'number' ? size : SIZE_MAP[size];
  return (
    <Box
      style={{
        width: axis !== 'vertical' ? resolved : undefined,
        height: axis !== 'horizontal' ? resolved : undefined,
      }}
    />
  );
}
