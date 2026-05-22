import React from 'react';
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
 * forwardRef so parent components can attach intersection observers or GSAP refs.
 */
export const Box = React.forwardRef<View, BoxProps>(function Box(
  { className, style, ...props },
  ref,
) {
  return <View ref={ref} className={className} style={style} {...(props as ViewProps)} />;
});

Box.displayName = 'Box';
