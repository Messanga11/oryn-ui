export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 14,
  xl: 20,
  '2xl': 28,
  full: 9999,
} as const;

export const borderWidth = {
  none: 0,
  thin: 0.5,
  base: 1,
  thick: 2,
} as const;

export type BorderRadiusToken = keyof typeof borderRadius;
export type BorderWidthToken = keyof typeof borderWidth;
