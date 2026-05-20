import type { ViewProps } from 'react-native';
import { View } from 'react-native';

export interface BoxProps extends ViewProps {
  className?: string;
}

/**
 * Box — universal layout primitive.
 * Replaces <div>, <View> everywhere in app/feature code.
 * Styled via NativeWind className (Tailwind classes).
 */
export function Box({ className, style, ...props }: BoxProps) {
  return <View className={className} style={style} {...props} />;
}
