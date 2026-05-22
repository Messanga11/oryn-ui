import { useState } from 'react';
import type { ReactNode } from 'react';
import type { TextInputProps } from 'react-native';
import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';

// Re-export the same interface shape so consumers get type compatibility
export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

// DESIGN-11: exact styling from sprint 05 contract
const BASE_CLASS = [
  'w-full bg-[#111111]',
  'border border-[rgba(255,255,255,0.08)]',
  'rounded-lg px-4 py-[14px]',
  'text-base font-sans text-text-primary',
  'outline-none',
  'transition-all duration-200',
  'focus:border-[#DA382E] focus:ring-2 focus:ring-[rgba(218,56,46,0.2)]',
].join(' ');

const ERROR_CLASS = 'border-error focus:border-error focus:ring-[rgba(239,68,68,0.2)]';
const DISABLED_CLASS = 'opacity-60 cursor-not-allowed';

/**
 * Input (web) — native <input> with DESIGN-11 styling.
 * Drops all react-native-specific props to avoid invalid DOM attribute warnings.
 * `onChangeText` → mapped to `onChange`. `editable` → mapped to `disabled`.
 */
export function Input({
  label,
  helperText,
  errorText,
  leftIcon: _leftIcon,
  rightIcon: _rightIcon,
  className,
  editable = true,
  onChangeText,
  secureTextEntry,
  // RN-specific props — discarded on web
  keyboardType: _keyboardType,
  autoCapitalize: _autoCapitalize,
  autoCorrect: _autoCorrect,
  placeholderTextColor: _placeholderTextColor,
  textAlignVertical: _textAlignVertical,
  multiline: _multiline,
  numberOfLines: _numberOfLines,
  returnKeyType: _returnKeyType,
  enablesReturnKeyAutomatically: _enablesReturnKeyAutomatically,
  onSubmitEditing: _onSubmitEditing,
  underlineColorAndroid: _underlineColorAndroid,
  selectionColor: _selectionColor,
  allowFontScaling: _allowFontScaling,
  textContentType: _textContentType,
  clearButtonMode: _clearButtonMode,
  inputAccessoryViewID: _inputAccessoryViewID,
  scrollEnabled: _scrollEnabled,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const hasError = !!errorText;

  const inputClass = [
    BASE_CLASS,
    hasError ? ERROR_CLASS : focused ? 'border-[#DA382E]' : '',
    !editable ? DISABLED_CLASS : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Map RN props to HTML-compatible props
  const htmlProps = props as React.InputHTMLAttributes<HTMLInputElement>;

  return (
    <Box className="w-full">
      {label ? (
        <Typography variant="label" className="mb-1.5">
          {label}
        </Typography>
      ) : null}

      <input
        type={secureTextEntry ? 'password' : 'text'}
        className={inputClass}
        disabled={!editable}
        onChange={onChangeText ? (e) => onChangeText(e.target.value) : htmlProps.onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...htmlProps}
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
