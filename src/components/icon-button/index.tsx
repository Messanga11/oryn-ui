import type { ReactNode } from 'react';
import { Pressable } from '../../primitives/pressable';

export type IconButtonVariant = 'ghost' | 'subtle' | 'outline';
export type IconButtonSize = 'sm' | 'md' | 'lg';

const VARIANT_CLASS: Record<IconButtonVariant, string> = {
  ghost: 'bg-transparent active:bg-bg-elevated',
  subtle: 'bg-bg-elevated active:bg-bg-overlay',
  outline: 'border border-bg-border bg-transparent active:bg-bg-elevated',
};

const SIZE_CLASS: Record<IconButtonSize, string> = {
  sm: 'w-8 h-8 rounded-md',
  md: 'w-10 h-10 rounded-lg',
  lg: 'w-12 h-12 rounded-xl',
};

export interface IconButtonProps {
  icon: ReactNode;
  onPress?: () => void;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  accessibilityLabel: string;
  className?: string;
}

/**
 * IconButton — square icon-only touchable.
 * Minimum 48px touch target enforced by default hitSlop.
 */
export function IconButton({
  icon,
  onPress,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  accessibilityLabel,
  className,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={[
        'items-center justify-center',
        SIZE_CLASS[size],
        VARIANT_CLASS[variant],
        disabled ? 'opacity-50' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
    >
      {icon}
    </Pressable>
  );
}
