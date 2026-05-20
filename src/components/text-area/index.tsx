import { useState } from 'react';
import type { TextInputProps } from 'react-native';
import { TextInput as RNTextInput } from 'react-native';
import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';

export interface TextAreaProps extends Omit<TextInputProps, 'multiline' | 'style'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  rows?: number;
  className?: string;
}

export function TextArea({
  label,
  helperText,
  errorText,
  rows = 4,
  className,
  editable = true,
  ...props
}: TextAreaProps) {
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
      <RNTextInput
        multiline
        numberOfLines={rows}
        className={[
          'rounded-lg border bg-bg-surface px-3 py-2.5 text-base text-text-primary',
          borderClass,
          !editable ? 'opacity-60' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        placeholderTextColor="#555E75"
        textAlignVertical="top"
        editable={editable}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ minHeight: rows * 24 }}
        {...props}
      />
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
