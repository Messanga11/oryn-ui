import type { ReactNode } from 'react';
import { Modal as RNModal, Pressable as RNPressable } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';
import { IconButton } from '../icon-button';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  /** If false, clicking backdrop doesn't close */
  dismissable?: boolean;
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  dismissable = true,
  className,
}: ModalProps) {
  return (
    <RNModal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(150)}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.7)',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
        }}
      >
        {dismissable ? (
          <RNPressable
            style={{ position: 'absolute', inset: 0 }}
            onPress={onClose}
          />
        ) : null}

        <Animated.View
          entering={ZoomIn.springify().damping(18)}
          exiting={ZoomOut.duration(150)}
          style={{
            width: '100%',
            maxWidth: 440,
            backgroundColor: '#141720',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.08)',
            overflow: 'hidden',
          }}
          className={className}
        >
          {(title ?? description) ? (
            <Box className="flex-row items-start justify-between px-4 pt-4 pb-3 border-b border-bg-border">
              <Box className="flex-1 mr-2">
                {title ? <Typography variant="h3">{title}</Typography> : null}
                {description ? (
                  <Typography variant="body-sm" color="secondary" className="mt-0.5">
                    {description}
                  </Typography>
                ) : null}
              </Box>
              <IconButton
                icon={<Typography className="text-text-muted text-xl">✕</Typography>}
                onPress={onClose}
                accessibilityLabel="Fermer"
                size="sm"
              />
            </Box>
          ) : null}
          <Box className="px-4 py-4">{children}</Box>
        </Animated.View>
      </Animated.View>
    </RNModal>
  );
}
