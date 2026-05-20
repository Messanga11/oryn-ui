import type { PressableProps as RNPressableProps } from 'react-native';
import { Pressable as RNPressable } from 'react-native';

export interface PressableProps extends RNPressableProps {
  className?: string;
  /** Minimum touch target size — enforced via minHeight/minWidth */
  hitSlop?: number;
}

/**
 * Pressable — universal touch zone with visual feedback.
 * Replaces <button>, <TouchableOpacity> everywhere.
 * Default touch target ≥ 48px (WCAG / Apple HIG).
 */
export function Pressable({ className, style, hitSlop = 8, ...props }: PressableProps) {
  return (
    <RNPressable
      className={className}
      hitSlop={hitSlop}
      style={({ pressed }) => [
        { opacity: pressed ? 0.75 : 1 },
        typeof style === 'function' ? style({ pressed }) : style,
      ]}
      accessibilityRole="button"
      {...props}
    />
  );
}
