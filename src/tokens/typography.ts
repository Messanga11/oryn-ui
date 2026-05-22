/**
 * Typography tokens — Clash Display (display/h1-h3), Inter (body/labels), JetBrains Mono (code)
 * Sprint 02: Updated for portfolio editorial aesthetic (Awwwards level).
 * FONT-01: Clash Display weight 700 only.
 * FONT-02: Inter weights 400/500 only.
 * FONT-03: JetBrains Mono weight 400 only.
 */
export const fontFamily = {
  display: 'Clash Display',
  sans: 'Inter',
  mono: 'JetBrains Mono',
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
  '5xl': 64,
  '6xl': 80,
  '7xl': 100,
  '8xl': 140,
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
 * Typography variant → style map.
 * display/h1-h3: Clash Display, editorial scale, string letterSpacing (em units).
 * body/labels: Inter 400/500, numeric letterSpacing (RN compatible).
 * mono: JetBrains Mono, code contexts.
 * label: uppercase 0.1em tracking, CRIT-05.
 * CRIT-01: display.letterSpacing === '-0.02em'
 * CRIT-02: all colors === '#f0f0f0' (no '#F1F3F9')
 * CRIT-03: display.fontFamily === 'Clash Display'
 * CRIT-04: mono variant added
 * CRIT-05: label recalibrated
 */
export const typographyVariants = {
  display: {
    fontFamily: 'Clash Display',
    fontSize: 64,
    lineHeight: 61,
    letterSpacing: '-0.02em',
    color: '#f0f0f0',
  },
  /** display-xl: clamp(48px, 8vw, 96px) — used for massive hero email/CTA on web */
  'display-xl': {
    fontFamily: 'Clash Display',
    fontSize: 96,
    lineHeight: 91, // lineHeight ≈ 0.95
    letterSpacing: '-0.02em',
    fontWeight: '700',
    color: '#f0f0f0',
  },
  h1: {
    fontFamily: 'Clash Display',
    fontSize: 48,
    lineHeight: 48,
    letterSpacing: '-0.02em',
    color: '#f0f0f0',
  },
  h2: {
    fontFamily: 'Clash Display',
    fontSize: 36,
    lineHeight: 38,
    letterSpacing: '-0.02em',
    color: '#f0f0f0',
  },
  h3: {
    fontFamily: 'Clash Display',
    fontSize: 28,
    lineHeight: 31,
    letterSpacing: '-0.015em',
    color: '#f0f0f0',
  },
  h4: {
    fontFamily: 'Inter',
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.1,
    color: '#f0f0f0',
  },
  h5: {
    fontFamily: 'Inter',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    color: '#f0f0f0',
  },
  h6: {
    fontFamily: 'Inter',
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0,
    color: '#f0f0f0',
  },
  'body-lg': {
    fontFamily: 'Inter',
    fontSize: 17,
    lineHeight: 26,
    letterSpacing: -0.1,
    color: '#f0f0f0',
  },
  body: {
    fontFamily: 'Inter',
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.1,
    color: '#f0f0f0',
  },
  'body-sm': {
    fontFamily: 'Inter',
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0,
    color: '#f0f0f0',
  },
  caption: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
    color: '#888888',
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: '0.1em',
    fontWeight: '500',
    textTransform: 'uppercase' as const,
    color: '#f0f0f0',
  },
  overline: {
    fontFamily: 'Inter',
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: '0.1em',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    color: '#888888',
  },
  numeric: {
    fontFamily: 'Inter',
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0,
    color: '#f0f0f0',
    fontVariantNumeric: 'tabular-nums',
  },
  mono: {
    fontFamily: 'JetBrains Mono',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
} as const;

export type TypographyVariant = keyof typeof typographyVariants;
