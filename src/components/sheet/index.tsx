import type { ReactNode } from 'react';
import { Modal, Pressable as RNPressable } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { Box } from '../../primitives/box';
import { ScrollContainer } from '../../primitives/scroll-container';
import { Typography } from '../../primitives/typography';

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  /** Snap height in percentage (default 50%) */
  snapHeight?: number;
  className?: string;
}

/**
 * Sheet — bottom sheet component.
 * Prefer over full-screen modals for actions and forms.
 */
export function Sheet({
  open,
  onClose,
  title,
  description,
  children,
  snapHeight = 50,
  className,
}: SheetProps) {
  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={onClose}>
      {/* Backdrop */}
      <RNPressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }} onPress={onClose} />

      {/* Sheet content */}
      <Animated.View
        entering={SlideInDown.springify().damping(20)}
        exiting={SlideOutDown.springify().damping(20)}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: `${snapHeight}%`,
          backgroundColor: '#141720',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}
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

        <ScrollContainer withBottomSafeArea className="flex-1">
          <Box className="px-4 pb-4">{children}</Box>
        </ScrollContainer>
      </Animated.View>
    </Modal>
  );
}
