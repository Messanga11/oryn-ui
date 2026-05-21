/**
 * 8pt spacing scale — all values multiples of 4, values ≥ 16 multiples of 8.
 * Sprint 02: Added 5xl (120) and 6xl (160) for section vertical padding.
 * CRIT-07: spacing['5xl'] = 120, spacing['6xl'] = 160.
 */
export const spacing = {
  0: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
  '5xl': 120,
  '6xl': 160,
} as const;

export type SpacingToken = keyof typeof spacing;
export type SpacingValue = (typeof spacing)[SpacingToken];
