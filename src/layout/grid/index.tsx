import type { ViewProps } from 'react-native';
import { View } from 'react-native';

export interface GridProps extends ViewProps {
  /** Number of columns. Default 6 (mobile). Use 12 on web. */
  cols?: 2 | 3 | 4 | 6 | 12;
  gap?: number;
  className?: string;
}

/**
 * Grid — 6-column (mobile) / 12-column (web) flex-wrap grid.
 * Children should be <Column span={N}> components.
 */
export function Grid({ cols = 6, gap = 16, className, style, ...props }: GridProps) {
  return (
    <View
      className={['flex-row flex-wrap', className].filter(Boolean).join(' ')}
      style={[{ gap }, style]}
      {...props}
    />
  );
}
