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
 * Typography variant → style map
 */
export const typographyVariants = {
  h1: { fontSize: fontSize.xl, fontWeight: fontWeight.bold, lineHeight: 1.2 },
  h2: { fontSize: fontSize.lg, fontWeight: fontWeight.bold, lineHeight: 1.25 },
  h3: { fontSize: fontSize.md, fontWeight: fontWeight.semibold, lineHeight: 1.3 },
  h4: { fontSize: fontSize.base, fontWeight: fontWeight.semibold, lineHeight: 1.35 },
  h5: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, lineHeight: 1.4 },
  h6: { fontSize: fontSize.xs, fontWeight: fontWeight.semibold, lineHeight: 1.4 },
  'body-lg': { fontSize: fontSize.md, fontWeight: fontWeight.regular, lineHeight: 1.5 },
  body: { fontSize: fontSize.base, fontWeight: fontWeight.regular, lineHeight: 1.5 },
  'body-sm': { fontSize: fontSize.sm, fontWeight: fontWeight.regular, lineHeight: 1.5 },
  caption: { fontSize: fontSize.xs, fontWeight: fontWeight.regular, lineHeight: 1.4 },
  label: { fontSize: fontSize.sm, fontWeight: fontWeight.medium, lineHeight: 1.3 },
  overline: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    lineHeight: 1.2,
    letterSpacing: letterSpacing.widest,
    textTransform: 'uppercase' as const,
  },
  /** Tabular numbers for amounts and phone numbers */
  display: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    lineHeight: 1.1,
    fontVariantNumeric: 'tabular-nums',
  },
  numeric: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: 'tabular-nums',
  },
} as const;

export type TypographyVariant = keyof typeof typographyVariants;
