import React from 'react';
import type { TypographyVariant } from '../../tokens/typography';

export type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';
export type TextColor = 'primary' | 'secondary' | 'muted' | 'error' | 'success' | 'warning' | 'info';
export type TextTone = 'default' | 'muted' | 'secondary' | 'error' | 'success' | 'warning' | 'info';
export type FontWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

/**
 * CRIT-11: Exact Tailwind/NativeWind classes per variant.
 */
const VARIANT_CLASS: Record<TypographyVariant, string> = {
  display: 'text-[clamp(80px,10vw,140px)] leading-[0.95] tracking-[-0.02em] font-display font-bold text-text-primary',
  h1: 'text-[clamp(56px,7vw,100px)] leading-[1.0] tracking-[-0.02em] font-display font-bold text-text-primary',
  h2: 'text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-[-0.02em] font-display font-bold text-text-primary',
  h3: 'text-[clamp(28px,3.5vw,48px)] leading-[1.1] tracking-[-0.015em] font-display font-bold text-text-primary',
  h4: 'font-sans text-base font-semibold leading-snug text-text-primary',
  h5: 'font-sans text-sm font-semibold text-text-primary',
  h6: 'font-sans text-xs font-semibold text-text-primary',
  'body-lg': 'font-sans text-[17px] font-normal leading-relaxed text-text-primary',
  body: 'font-sans text-base font-normal leading-relaxed text-text-primary',
  'body-sm': 'font-sans text-sm font-normal leading-relaxed text-text-primary',
  caption: 'font-sans text-xs font-normal text-text-secondary',
  label: 'text-[12px] leading-[1.4] tracking-[0.1em] uppercase font-sans font-medium text-text-primary',
  overline: 'font-mono text-[12px] font-semibold tracking-[0.1em] uppercase text-text-secondary',
  numeric: 'font-sans text-base font-medium text-text-primary tabular-nums',
  mono: 'text-[14px] leading-[1.4] tracking-[0] font-mono text-text-primary',
};

/**
 * CRIT-12: HTML element per variant.
 * display → h1, h1-h6 → tags, mono → code, label → span, body* → p, caption → span
 */
const VARIANT_ELEMENT: Record<TypographyVariant, keyof React.JSX.IntrinsicElements> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  'body-lg': 'p',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
  label: 'span',
  overline: 'span',
  numeric: 'span',
  mono: 'code',
};

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

export interface TypographyProps {
  variant?: TypographyVariant;
  /** CRIT-14: override the rendered HTML element */
  as?: keyof React.JSX.IntrinsicElements;
  color?: TextColor;
  tone?: TextTone;
  weight?: FontWeight;
  align?: TextAlign;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  id?: string;
  [key: string]: unknown;
}

export function Typography({
  variant = 'body',
  as,
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

  const element = as ?? VARIANT_ELEMENT[variant] ?? 'span';
  return React.createElement(
    element,
    { className: composedClass, style, ...(props as Record<string, unknown>) },
    children,
  );
}
