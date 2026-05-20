/**
 * Typography tokens — Inter font, tabular nums for amounts
 */
export const fontFamily = {
  sans: 'Inter',
  mono: 'JetBrainsMono',
} as const;

export const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 32,
  '4xl': 40,
} as const;

export const fontWeight = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const lineHeight = {
  tight: 1.2,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
} as const;

export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 2,
} as const;

/**
 * Typography variant → style map (absolute pixel values for RN compatibility).
 * CRIT-33/DESIGN-02/03 compliance: fontFamily, lineHeight, letterSpacing, color explicit.
 * tone="muted" in Typography component maps to text.secondary (#8B93A7) — WCAG AA pass.
 */
export const typographyVariants = {
  display: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.5,
    color: '#F1F3F9',
    fontVariantNumeric: 'tabular-nums',
  },
  h1: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.4,
    color: '#F1F3F9',
  },
  h2: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: -0.3,
    color: '#F1F3F9',
  },
  h3: {
    fontFamily: 'Inter_500Medium',
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: -0.2,
    color: '#F1F3F9',
  },
  h4: {
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.1,
    color: '#F1F3F9',
  },
  h5: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    color: '#F1F3F9',
  },
  h6: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0,
    color: '#F1F3F9',
  },
  'body-lg': {
    fontFamily: 'Inter_400Regular',
    fontSize: 17,
    lineHeight: 26,
    letterSpacing: -0.1,
    color: '#F1F3F9',
  },
  body: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.1,
    color: '#F1F3F9',
  },
  'body-sm': {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0,
    color: '#F1F3F9',
  },
  caption: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
    color: '#8B93A7',
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    color: '#F1F3F9',
  },
  overline: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 2,
    color: '#8B93A7',
    textTransform: 'uppercase' as const,
  },
  numeric: {
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0,
    color: '#F1F3F9',
    fontVariantNumeric: 'tabular-nums',
  },
} as const;

export type TypographyVariant = keyof typeof typographyVariants;
