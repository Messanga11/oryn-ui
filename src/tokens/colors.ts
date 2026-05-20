/**
 * Mobilis design tokens — color palette
 * Dark-first utility style (Linear / Onfleet aesthetic)
 */
export const colors = {
  // Brand gradient: CTA & app icon only (sprint 02+). Token exists; runtime use forbidden sprint 00.
  brand: {
    from: '#3B5BDB',
    to: '#9C36B5',
    gradient: ['#3B5BDB', '#9C36B5'] as const,
    gradientAngle: 135,
  },

  // Primary blue
  primary: {
    50: '#E7EDFC',
    100: '#C2CEFF',
    200: '#9DAFFF',
    300: '#748FFC',
    400: '#4C6EF5',
    500: '#3B5BDB',
    600: '#3451C7',
    700: '#2C44B0',
    800: '#243899',
    900: '#1A2D7A',
    DEFAULT: '#3B5BDB',
  },

  // Violet accent
  accent: {
    DEFAULT: '#9C36B5',
    light: '#C77DCA',
    dark: '#7A1D96',
  },

  // Semantic
  success: '#40C057',
  warning: '#FAB005',
  error: '#FA5252',
  info: '#339AF0',
  pending: '#7048E8',
  alert: '#E64980',

  // Neutral surfaces (dark theme)
  bg: {
    base: '#0C0E16',
    surface: '#141720',
    elevated: '#1C2030',
    overlay: '#242840',
    border: 'rgba(255,255,255,0.08)',
    borderStrong: 'rgba(255,255,255,0.16)',
  },

  // Text
  text: {
    primary: '#F1F3F9',
    secondary: '#8B93A7',
    muted: '#555E75',
    disabled: '#3A4055',
    inverse: '#0C0E16',
  },

  // Utility
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type ColorToken = keyof typeof colors;
