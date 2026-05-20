import type { TextProps } from 'react-native';
import { Text } from 'react-native';
import type { TypographyVariant } from '../../tokens/typography';

const VARIANT_CLASS: Record<TypographyVariant, string> = {
  h1: 'text-2xl font-bold leading-tight text-text-primary',
  h2: 'text-xl font-bold leading-tight text-text-primary',
  h3: 'text-[17px] font-semibold leading-snug text-text-primary',
  h4: 'text-base font-semibold leading-snug text-text-primary',
  h5: 'text-sm font-semibold text-text-primary',
  h6: 'text-xs font-semibold text-text-primary',
  'body-lg': 'text-[17px] font-normal leading-relaxed text-text-primary',
  body: 'text-base font-normal leading-relaxed text-text-primary',
  'body-sm': 'text-sm font-normal leading-relaxed text-text-primary',
  caption: 'text-xs font-normal text-text-secondary',
  label: 'text-sm font-medium text-text-primary',
  overline: 'text-xs font-semibold tracking-widest uppercase text-text-secondary',
  display: 'text-[32px] font-bold leading-none text-text-primary tabular-nums',
  numeric: 'text-base font-medium text-text-primary tabular-nums',
};

export type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';
export type TextColor =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'disabled'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';
export type TextTone =
  | 'default'
  | 'muted'
  | 'secondary'
  | 'disabled'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';
export type FontWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

const COLOR_CLASS: Record<TextColor, string> = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  muted: 'text-text-muted',
  disabled: 'text-text-disabled',
  error: 'text-error',
  success: 'text-success',
  warning: 'text-warning',
  info: 'text-info',
};

/**
 * DESIGN-03 / WCAG compliance:
 * tone="muted" maps to text.secondary (#8B93A7, ratio 6.4:1 on bg.base) — AAA pass.
 * text.muted (#555E75, ratio 2.9:1) is WCAG fail — forbidden on body text.
 * tone.secondary maps to text.secondary (same)
 */
const TONE_CLASS: Record<TextTone, string> = {
  default: '',
  muted: 'text-text-secondary', // muted → secondary for WCAG AA compliance
  secondary: 'text-text-secondary',
  disabled: 'text-text-disabled',
  error: 'text-error',
  success: 'text-success',
  warning: 'text-warning',
  info: 'text-info',
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
  color?: TextColor;
  /** tone overrides color — tone="muted" maps to text.secondary (WCAG AA) */
  tone?: TextTone;
  weight?: FontWeight;
  align?: TextAlign;
  className?: string;
}

/**
 * Typography — typed text primitive.
 * Replaces <p>, <span>, <h1>–<h6> everywhere.
 *
 * IMPORTANT: tone="muted" → text.secondary (#8B93A7, ratio 6.4:1) NOT text.muted.
 * This is intentional — text.muted (#555E75) fails WCAG AA on dark backgrounds.
 */
export function Typography({
  variant = 'body',
  color,
  tone,
  weight,
  align,
  className,
  style,
  ...props
}: TypographyProps) {
  const variantClass = VARIANT_CLASS[variant];
  // tone takes priority over color
  const colorClass = tone ? TONE_CLASS[tone] : color ? COLOR_CLASS[color] : '';
  const weightClass = weight ? WEIGHT_CLASS[weight] : '';
  const alignClass = align ? ALIGN_CLASS[align] : '';
  const composedClass = [variantClass, colorClass, weightClass, alignClass, className]
    .filter(Boolean)
    .join(' ');

  return <Text className={composedClass} style={style} {...props} />;
}
