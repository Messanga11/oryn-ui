import { useState } from 'react';
import type { TextInputProps } from 'react-native';
import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';

// Re-export the same interface shape for type compatibility
export interface TextAreaProps extends Omit<TextInputProps, 'multiline' | 'style'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  rows?: number;
  className?: string;
}

// DESIGN-10/11: same styling as Input + min-h-[160px] for message field
const BASE_CLASS = [
  'w-full bg-[#111111]',
  'border border-[rgba(255,255,255,0.08)]',
  'rounded-lg px-4 py-[14px]',
  'text-base font-sans text-text-primary',
  'outline-none resize-none',
  'min-h-[160px]',
  'transition-all duration-200',
  'focus:border-[#DA382E] focus:ring-2 focus:ring-[rgba(218,56,46,0.2)]',
].join(' ');

const ERROR_CLASS = 'border-error focus:border-error focus:ring-[rgba(239,68,68,0.2)]';
const DISABLED_CLASS = 'opacity-60 cursor-not-allowed';

/**
 * TextArea (web) — native <textarea> with DESIGN-11 styling.
 * Drops RN-specific props. min-height 160px for the message field (DESIGN-10).
 */
export function TextArea({
  label,
  helperText,
  errorText,
  rows = 6,
  className,
  editable = true,
  onChangeText,
  // RN-specific props — discarded on web
  keyboardType: _keyboardType,
  autoCapitalize: _autoCapitalize,
  autoCorrect: _autoCorrect,
  placeholderTextColor: _placeholderTextColor,
  textAlignVertical: _textAlignVertical,
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
  secureTextEntry: _secureTextEntry,
  ...props
}: TextAreaProps) {
  const [focused, setFocused] = useState(false);
  const hasError = !!errorText;

  const textareaClass = [
    BASE_CLASS,
    hasError ? ERROR_CLASS : focused ? 'border-[#DA382E]' : '',
    !editable ? DISABLED_CLASS : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const htmlProps = props as React.TextareaHTMLAttributes<HTMLTextAreaElement>;

  return (
    <Box className="w-full">
      {label ? (
        <Typography variant="label" className="mb-1.5">
          {label}
        </Typography>
      ) : null}

      <textarea
        rows={rows}
        className={textareaClass}
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
