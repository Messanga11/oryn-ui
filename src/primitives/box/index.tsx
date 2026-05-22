import type { ViewProps } from 'react-native';
import { View } from 'react-native';

// Omit the RN-restricted AccessibilityRole enum and re-declare as string so
// web-specific ARIA landmark roles ("navigation", "contentinfo", "banner", "main")
// can be passed without `as any`. react-native-web maps these strings to the
// correct HTML `role` attribute at runtime.
export interface BoxProps extends Omit<ViewProps, 'accessibilityRole'> {
  className?: string;
  accessibilityRole?: string;
}

/**
 * Box — universal layout primitive.
 * Replaces <div>, <View> everywhere in app/feature code.
 * Styled via NativeWind className (Tailwind classes).
 */
export function Box({ className, style, ...props }: BoxProps) {
  return <View className={className} style={style} {...(props as ViewProps)} />;
}
