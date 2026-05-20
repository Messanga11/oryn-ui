import type { ReactNode } from 'react';
import { Modal } from '../modal';
import { Box } from '../../primitives/box';
import { Button } from '../button';
import { Typography } from '../../primitives/typography';

export interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: 'default' | 'destructive';
  loading?: boolean;
  children?: ReactNode;
}

export function AlertDialog({
  open,
  onClose,
  title,
  description,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  onConfirm,
  onCancel,
  variant = 'default',
  loading = false,
}: AlertDialogProps) {
  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleCancel} dismissable={!loading}>
      <Box className="gap-4">
        <Box>
          <Typography variant="h3">{title}</Typography>
          {description ? (
            <Typography variant="body-sm" color="secondary" className="mt-1.5">
              {description}
            </Typography>
          ) : null}
        </Box>
        <Box className="flex-row gap-3 justify-end">
          <Button variant="ghost" size="md" onPress={handleCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'destructive' ? 'destructive' : 'primary'}
            size="md"
            onPress={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
