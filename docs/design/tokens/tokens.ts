/**
 * FLORISTA DESIGN TOKENS
 * TypeScript Token Definitions
 *
 * Use these tokens in your React components for type-safe,
 * consistent styling. These align with the Tailwind config
 * and CSS custom properties.
 */

// ═══════════════════════════════════════════════════════════════
// COLOR TOKENS
// ═══════════════════════════════════════════════════════════════

export const colors = {
  // Core Brand - Botanical Green
  botanical: {
    DEFAULT: '#2D5A3D',
    50: '#F4F7F5',
    100: '#E8F0EB',
    200: '#D1E1D6',
    300: '#A8C9B3',
    400: '#7EB08F',
    500: '#5A9B6E',
    600: '#3D7A52',
    700: '#2D5A3D',
    800: '#1E4A2D',
    900: '#143A20',
    950: '#0A2A14',
  },

  // Warm Neutrals - Cream
  cream: {
    DEFAULT: '#FAF8F5',
    50: '#FFFFFF',
    100: '#FAF8F5',
    200: '#F5F3EE',
    300: '#F0EDE8',
    400: '#E8E4DD',
    500: '#DDD8CF',
    600: '#C4BDB0',
    700: '#A8A090',
    800: '#8C8474',
    900: '#6E685C',
  },

  // Cool Neutrals - Charcoal
  charcoal: {
    DEFAULT: '#1E1E1E',
    50: '#F5F5F5',
    100: '#E8E8E8',
    200: '#C4C4C4',
    300: '#9A9A9A',
    400: '#6B6B6B',
    500: '#4A4A4A',
    600: '#2D2D2D',
    700: '#1E1E1E',
    800: '#141414',
    900: '#0A0A0A',
  },

  // Sage Tints
  sage: {
    50: '#F4F7F5',
    100: '#E8F0EB',
    200: '#D1E1D6',
    300: '#A8C9B3',
    400: '#7EB08F',
    500: '#5A9B6E',
  },

  // Accent - Blush
  blush: {
    DEFAULT: '#E8B4A8',
    50: '#FDF8F7',
    100: '#FAF0ED',
    200: '#F5E1DB',
    300: '#F2D4CC',
    400: '#E8B4A8',
    500: '#D49485',
    600: '#C07466',
    700: '#A85A4C',
    800: '#8A4840',
    900: '#6C3A34',
  },

  // Accent - Terracotta
  terracotta: {
    DEFAULT: '#B45338',
    50: '#FDF6F4',
    100: '#FCEAE5',
    200: '#F8D5CC',
    300: '#EAAB98',
    400: '#D4735A',
    500: '#B45338',
    600: '#9A4530',
    700: '#7A3726',
    800: '#5E2B1E',
    900: '#421F16',
  },

  // Accent - Coral
  coral: {
    DEFAULT: '#E07A5F',
    50: '#FDF7F5',
    100: '#FCEEE9',
    200: '#F9DDD4',
    300: '#F4C4A8',
    400: '#E9A080',
    500: '#E07A5F',
    600: '#C85F45',
    700: '#A64A36',
    800: '#843B2B',
    900: '#622D21',
  },

  // Semantic
  semantic: {
    success: { DEFAULT: '#2D5A3D', light: '#E8F0EB', dark: '#1E4A2D' },
    error: { DEFAULT: '#C44536', light: '#FCEAE8', dark: '#A33828' },
    warning: { DEFAULT: '#D4A574', light: '#FDF6EE', dark: '#B8894E' },
    info: { DEFAULT: '#4A7A8C', light: '#E8F4F7', dark: '#3A6070' },
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// TYPOGRAPHY TOKENS
// ═══════════════════════════════════════════════════════════════

export const typography = {
  fontFamily: {
    display: "'Fraunces', 'Playfair Display', Georgia, serif",
    body: "'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },

  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    none: 1,
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 1.75,
  },

  letterSpacing: {
    tighter: '-0.02em',
    tight: '-0.01em',
    normal: '0',
    wide: '0.01em',
    wider: '0.02em',
    widest: '0.1em',
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// SPACING TOKENS
// ═══════════════════════════════════════════════════════════════

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.5: '0.375rem',   // 6px
  2: '0.5rem',       // 8px
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  3.5: '0.875rem',   // 14px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  7: '1.75rem',      // 28px
  8: '2rem',         // 32px
  9: '2.25rem',      // 36px
  10: '2.5rem',      // 40px
  11: '2.75rem',     // 44px
  12: '3rem',        // 48px
  14: '3.5rem',      // 56px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
  28: '7rem',        // 112px
  32: '8rem',        // 128px
  36: '9rem',        // 144px
  40: '10rem',       // 160px
} as const;

// ═══════════════════════════════════════════════════════════════
// SIZING TOKENS
// ═══════════════════════════════════════════════════════════════

export const sizing = {
  container: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
  },

  icon: {
    xs: '1rem',       // 16px
    sm: '1.25rem',    // 20px
    md: '1.5rem',     // 24px
    lg: '2rem',       // 32px
    xl: '2.5rem',     // 40px
  },

  avatar: {
    xs: '1.5rem',     // 24px
    sm: '2rem',       // 32px
    md: '2.5rem',     // 40px
    lg: '3rem',       // 48px
    xl: '4rem',       // 64px
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// BORDER RADIUS TOKENS
// ═══════════════════════════════════════════════════════════════

export const borderRadius = {
  none: '0',
  sm: '0.25rem',     // 4px
  DEFAULT: '0.5rem', // 8px
  md: '0.5rem',      // 8px
  lg: '0.75rem',     // 12px
  xl: '1rem',        // 16px
  '2xl': '1.5rem',   // 24px
  '3xl': '2rem',     // 32px
  full: '9999px',
} as const;

// ═══════════════════════════════════════════════════════════════
// SHADOW TOKENS
// ═══════════════════════════════════════════════════════════════

export const shadows = {
  xs: '0 1px 2px rgba(30, 30, 30, 0.04)',
  sm: '0 2px 4px rgba(30, 30, 30, 0.06)',
  DEFAULT: '0 4px 8px rgba(30, 30, 30, 0.08), 0 2px 4px rgba(30, 30, 30, 0.04)',
  md: '0 4px 8px rgba(30, 30, 30, 0.08), 0 2px 4px rgba(30, 30, 30, 0.04)',
  lg: '0 8px 16px rgba(30, 30, 30, 0.10), 0 4px 8px rgba(30, 30, 30, 0.05)',
  xl: '0 16px 32px rgba(30, 30, 30, 0.12), 0 8px 16px rgba(30, 30, 30, 0.06)',
  '2xl': '0 24px 48px rgba(30, 30, 30, 0.16), 0 12px 24px rgba(30, 30, 30, 0.08)',
  inner: 'inset 0 2px 4px rgba(30, 30, 30, 0.06)',
  // Colored
  botanical: '0 4px 14px rgba(45, 90, 61, 0.25)',
  botanicalLg: '0 8px 24px rgba(45, 90, 61, 0.30)',
  warm: '0 4px 14px rgba(180, 83, 56, 0.15)',
  blush: '0 4px 14px rgba(232, 180, 168, 0.30)',
} as const;

// ═══════════════════════════════════════════════════════════════
// ANIMATION TOKENS
// ═══════════════════════════════════════════════════════════════

export const animation = {
  duration: {
    instant: '100ms',
    fast: '150ms',
    normal: '250ms',
    slow: '400ms',
    slower: '600ms',
    slowest: '1000ms',
  },

  easing: {
    linear: 'linear',
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    spring: 'cubic-bezier(0.43, 0.13, 0.23, 0.96)',
    gentle: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// Z-INDEX TOKENS
// ═══════════════════════════════════════════════════════════════

export const zIndex = {
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  toast: 500,
  tooltip: 600,
  max: 9999,
} as const;

// ═══════════════════════════════════════════════════════════════
// BREAKPOINTS
// ═══════════════════════════════════════════════════════════════

export const breakpoints = {
  xs: '375px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
} as const;

// ═══════════════════════════════════════════════════════════════
// TYPE EXPORTS
// ═══════════════════════════════════════════════════════════════

export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
export type FontSizeToken = keyof typeof typography.fontSize;
export type FontWeightToken = keyof typeof typography.fontWeight;
export type RadiusToken = keyof typeof borderRadius;
export type ShadowToken = keyof typeof shadows;
export type ZIndexToken = keyof typeof zIndex;
export type BreakpointToken = keyof typeof breakpoints;

// Default export
const tokens = {
  colors,
  typography,
  spacing,
  sizing,
  borderRadius,
  shadows,
  animation,
  zIndex,
  breakpoints,
};

export default tokens;
