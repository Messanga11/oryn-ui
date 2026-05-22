/**
 * Modal.web.tsx — web-specific modal using HTML dialog semantics.
 *
 * Replaces react-native-reanimated (Animated.View with FadeIn/ZoomIn)
 * and react-native's Modal component. On web, CSS transitions handle animation.
 * react-native-reanimated is native-only and causes SSR crashes via react-native dependency.
 */
import type { ReactNode } from 'react';
import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';
import { IconButton } from '../icon-button';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
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
  if (!open) return null;

  return (
    <Box
      style={
        {
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
          zIndex: 9999,
          animation: 'fadeIn 200ms ease',
        } as object
      }
      onClick={dismissable ? onClose : undefined}
    >
      <Box
        style={
          {
            width: '100%',
            maxWidth: 440,
            backgroundColor: '#141720',
            borderRadius: 16,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'rgba(255,255,255,0.08)',
            overflow: 'hidden',
            animation: 'zoomIn 200ms ease',
          } as object
        }
        className={className}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
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
      </Box>
    </Box>
  );
}
