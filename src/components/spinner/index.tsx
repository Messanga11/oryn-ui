import { ActivityIndicator } from 'react-native';
import { Box } from '../../primitives/box';

export type SpinnerSize = 'sm' | 'md' | 'lg';

const SIZE_MAP: Record<SpinnerSize, 'small' | 'large'> = {
  sm: 'small',
  md: 'small',
  lg: 'large',
};

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  /** Center in parent container */
  centered?: boolean;
  className?: string;
}

export function Spinner({
  size = 'md',
  color = '#f0f0f0',
  centered = false,
  className,
}: SpinnerProps) {
  if (centered) {
    return (
      <Box className={['flex-1 items-center justify-center', className].filter(Boolean).join(' ')}>
        <ActivityIndicator size={SIZE_MAP[size]} color={color} />
      </Box>
    );
  }

  return <ActivityIndicator size={SIZE_MAP[size]} color={color} />;
}
