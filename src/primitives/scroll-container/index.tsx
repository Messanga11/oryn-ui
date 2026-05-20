import type { ScrollViewProps } from 'react-native';
import { ScrollView } from 'react-native';

export interface ScrollContainerProps extends ScrollViewProps {
  className?: string;
  /** Shortcut for horizontal scrolling */
  horizontal?: boolean;
  /** Add safe-area-aware bottom padding */
  withBottomSafeArea?: boolean;
}

/**
 * ScrollContainer — abstract ScrollView.
 * Replaces <ScrollView> everywhere.
 */
export function ScrollContainer({
  className,
  horizontal = false,
  withBottomSafeArea = false,
  contentContainerStyle,
  ...props
}: ScrollContainerProps) {
  return (
    <ScrollView
      className={className}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[
        withBottomSafeArea ? { paddingBottom: 32 } : undefined,
        contentContainerStyle,
      ]}
      {...props}
    />
  );
}
