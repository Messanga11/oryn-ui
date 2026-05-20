import type { ReactNode } from 'react';
import { useState } from 'react';
import type { TextInputProps } from 'react-native';
import { TextInput as RNTextInput } from 'react-native';
import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

/**
 * Input — universal text input.
 * Replaces <input>, <TextInput> everywhere.
 */
export function Input({
  label,
  helperText,
  errorText,
  leftIcon,
  rightIcon,
  className,
  editable = true,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const hasError = !!errorText;

  const borderClass = hasError
    ? 'border-error'
    : focused
      ? 'border-primary-500'
      : 'border-bg-border-strong';

  return (
    <Box className={['w-full', className].filter(Boolean).join(' ')}>
      {label ? (
        <Typography variant="label" className="mb-1.5">
          {label}
        </Typography>
      ) : null}

      <Box
        className={[
          'flex-row items-center h-11 rounded-lg border bg-bg-surface px-3',
          borderClass,
          !editable ? 'opacity-60' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {leftIcon ? <Box className="mr-2">{leftIcon}</Box> : null}

        <RNTextInput
          className="flex-1 text-base text-text-primary"
          placeholderTextColor="#555E75"
          editable={editable}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />

        {rightIcon ? <Box className="ml-2">{rightIcon}</Box> : null}
      </Box>

      {hasError ? (
        <Typography variant="caption" color="error" className="mt-1">
          {errorText}
        </Typography>
      ) : helperText ? (
        <Typography variant="caption" color="muted" className="mt-1">
          {helperText}
        </Typography>
      ) : null}
    </Box>
  );
}
