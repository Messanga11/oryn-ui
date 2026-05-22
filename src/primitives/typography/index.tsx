import React from 'react';
import { Text } from 'react-native';
import type { TextProps } from 'react-native';
import type { TypographyVariant } from '../../tokens/typography';

/**
 * CRIT-13: Native variant classes.
 * display → ClashDisplay_700Bold (via font-display Tailwind alias), 64px
 * h1 → 48px, h2 → 36px, h3 → 28px
 * mono → JetBrainsMono (via font-mono), 14px
 */
const VARIANT_CLASS: Record<TypographyVariant, string> = {
  display: 'font-display text-[64px] font-bold leading-none tracking-tight text-text-primary',
  'display-xl': 'font-display text-[96px] font-bold leading-none tracking-tight text-text-primary',
  h1: 'font-display text-[48px] font-bold leading-tight tracking-tight text-text-primary',
  h2: 'font-display text-[36px] font-bold leading-tight tracking-tight text-text-primary',
  h3: 'font-display text-[28px] font-bold leading-snug text-text-primary',
  h4: 'font-sans text-base font-semibold leading-snug text-text-primary',
  h5: 'font-sans text-sm font-semibold text-text-primary',
  h6: 'font-sans text-xs font-semibold text-text-primary',
  'body-lg': 'font-sans text-[17px] font-normal leading-relaxed text-text-primary',
  body: 'font-sans text-base font-normal leading-relaxed text-text-primary',
  'body-sm': 'font-sans text-sm font-normal leading-relaxed text-text-primary',
  caption: 'font-sans text-xs font-normal text-text-secondary',
  label: 'font-sans text-[12px] font-medium uppercase text-text-primary',
  overline: 'font-mono text-[11px] font-semibold uppercase text-text-secondary',
  numeric: 'font-sans text-base font-medium text-text-primary',
  mono: 'font-mono text-[14px] font-normal text-text-primary',
};

export type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';
export type TextColor = 'primary' | 'secondary' | 'muted' | 'error' | 'success' | 'warning' | 'info';
export type TextTone = 'default' | 'muted' | 'secondary' | 'error' | 'success' | 'warning' | 'info';
export type FontWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

const COLOR_CLASS: Record<TextColor, string> = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  muted: 'text-text-secondary',
  error: 'text-error',
  success: 'text-success',
  warning: 'text-warning',
  info: 'text-text-secondary',
};

const TONE_CLASS: Record<TextTone, string> = {
  default: '',
  muted: 'text-text-secondary',
  secondary: 'text-text-secondary',
  error: 'text-error',
  success: 'text-success',
  warning: 'text-warning',
  info: 'text-text-secondary',
};

const WEIGHT_CLASS: Record<FontWeight, string> = {
  light: 'font-light',
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const ALIGN_CLASS: Record<TextAlign, string> = {
  auto: '',
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
  justify: 'text-justify',
};

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  /** as prop accepted but ignored on native (always renders Text) */
  as?: string;
  color?: TextColor;
  tone?: TextTone;
  weight?: FontWeight;
  align?: TextAlign;
  className?: string;
  children?: React.ReactNode;
}

export function Typography({
  variant = 'body',
  as: _as,
  color,
  tone,
  weight,
  align,
  className,
  style,
  children,
  ...props
}: TypographyProps) {
  const variantClass = VARIANT_CLASS[variant];
  const colorClass = tone ? TONE_CLASS[tone] : color ? COLOR_CLASS[color] : '';
  const weightClass = weight ? WEIGHT_CLASS[weight] : '';
  const alignClass = align ? ALIGN_CLASS[align] : '';
  const composedClass = [variantClass, colorClass, weightClass, alignClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Text className={composedClass} style={style} {...props}>
      {children}
    </Text>
  );
}
