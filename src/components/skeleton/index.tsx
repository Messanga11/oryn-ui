import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Box } from '../../primitives/box';

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  className?: string;
}

/**
 * Skeleton — animated loading placeholder.
 * Use instead of spinners for content areas.
 * Anti-pattern: never show a spinner alone for content loading.
 */
export function Skeleton({
  width,
  height = 16,
  borderRadius = 8,
  className,
}: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          opacity,
          backgroundColor: '#242840',
        },
      ]}
      className={className}
    />
  );
}

/** Pre-built skeleton for a list item row */
export function SkeletonListItem() {
  return (
    <Box className="flex-row items-center px-4 py-3 gap-3">
      <Skeleton width={40} height={40} borderRadius={20} />
      <Box className="flex-1 gap-2">
        <Skeleton height={14} borderRadius={7} />
        <Skeleton height={12} width="60%" borderRadius={6} />
      </Box>
    </Box>
  );
}

/** Pre-built skeleton for a card */
export function SkeletonCard() {
  return (
    <Box className="bg-bg-surface rounded-lg border border-bg-border p-4 gap-3">
      <Skeleton height={16} borderRadius={8} />
      <Skeleton height={12} width="80%" borderRadius={6} />
      <Skeleton height={12} width="60%" borderRadius={6} />
    </Box>
  );
}
