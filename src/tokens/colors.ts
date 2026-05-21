/**
 * Portfolio design tokens — color palette.
 * Dark editorial aesthetic (Awwwards / Locomotive level).
 * Sprint 02: Portfolio palette. Mobilis palette (#3B5BDB, #9C36B5, #0C0E16) forbidden.
 */
export const colors = {
  bg: {
    base: '#0a0a0a',
    surface: '#111111',
  },

  text: {
    primary: '#f0f0f0',
    secondary: '#888888',
    muted: '#888888',
  },

  accent: {
    default: '#DA382E',
  },

  border: {
    subtle: 'rgba(255,255,255,0.08)',
    strong: 'rgba(255,255,255,0.16)',
  },

  surface: {
    hover: 'rgba(255,255,255,0.05)',
  },

  success: '#40C057',
  warning: '#FAB005',
  error: '#FA5252',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type ColorToken = keyof typeof colors;
