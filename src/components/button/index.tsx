import type { ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';
import { Pressable } from '../../primitives/pressable';
import { Typography } from '../../primitives/typography';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 active:bg-primary-600',
  secondary: 'bg-bg-elevated active:bg-bg-overlay',
  outline: 'border border-bg-border-strong bg-transparent active:bg-bg-elevated',
  ghost: 'bg-transparent active:bg-bg-elevated',
  destructive: 'bg-error active:opacity-80',
};

const TEXT_VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-text-primary',
  outline: 'text-text-primary',
  ghost: 'text-text-secondary',
  destructive: 'text-white',
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 rounded-md',
  md: 'h-11 px-4 rounded-lg',
  lg: 'h-[52px] px-6 rounded-[14px]',
};

const TEXT_SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'text-sm font-medium',
  md: 'text-base font-semibold',
  lg: 'text-[17px] font-semibold',
};

export interface ButtonProps {
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  /** Icon placed before the label */
  leftIcon?: ReactNode;
  /** Icon placed after the label */
  rightIcon?: ReactNode;
  children: ReactNode;
  className?: string;
  accessibilityLabel?: string;
}

/**
 * Button — primary action component.
 * Replaces <button> everywhere. Handles loading + disabled states.
 */
export function Button({
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  accessibilityLabel,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const containerClass = [
    'flex-row items-center justify-center',
    SIZE_CLASS[size],
    VARIANT_CLASS[variant],
    isDisabled ? 'opacity-50' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={containerClass}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? '#8B93A7' : '#FFFFFF'}
        />
      ) : (
        <>
          {leftIcon ? <>{leftIcon}</> : null}
          <Typography
            className={[TEXT_SIZE_CLASS[size], TEXT_VARIANT_CLASS[variant], leftIcon ? 'ml-2' : '', rightIcon ? 'mr-2' : ''].filter(Boolean).join(' ')}
          >
            {children}
          </Typography>
          {rightIcon ? <>{rightIcon}</> : null}
        </>
      )}
    </Pressable>
  );
}
