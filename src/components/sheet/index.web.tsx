/**
 * Sheet.web.tsx — web-specific bottom sheet using CSS positioning.
 *
 * Replaces react-native-reanimated (Animated.View with SlideInDown/SlideOutDown)
 * and react-native's Modal. On web, CSS transforms handle animation.
 * react-native-reanimated is native-only and causes SSR crashes via react-native dependency.
 */
import type { ReactNode } from 'react';
import { Box } from '../../primitives/box';
import { ScrollContainer } from '../../primitives/scroll-container';
import { Typography } from '../../primitives/typography';

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  snapHeight?: number;
  className?: string;
}

export function Sheet({
  open,
  onClose,
  title,
  description,
  children,
  snapHeight = 50,
  className,
}: SheetProps) {
  if (!open) return null;

  return (
    <Box
      style={
        {
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
        } as object
      }
    >
      {/* Backdrop */}
      <Box
        style={
          {
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
          } as object
        }
        onClick={onClose}
      />

      {/* Sheet content */}
      <Box
        style={
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            maxHeight: `${snapHeight}vh`,
            backgroundColor: '#141720',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'rgba(255,255,255,0.08)',
            overflow: 'hidden',
            animation: 'slideInUp 300ms ease',
          } as object
        }
        className={className}
      >
        {/* Handle */}
        <Box className="items-center pt-3 pb-1">
          <Box className="w-10 h-1 rounded-full bg-bg-overlay" />
        </Box>

        {(title ?? description) ? (
          <Box className="px-4 pb-3">
            {title ? <Typography variant="h3">{title}</Typography> : null}
            {description ? (
              <Typography variant="body-sm" color="secondary" className="mt-0.5">
                {description}
              </Typography>
            ) : null}
          </Box>
        ) : null}

        <ScrollContainer className="flex-1">
          <Box className="px-4 pb-4">{children}</Box>
        </ScrollContainer>
      </Box>
    </Box>
  );
}
