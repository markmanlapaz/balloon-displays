/**
 * FLORISTA DESIGN SYSTEM
 * Tailwind CSS Configuration
 *
 * This configuration extends Tailwind with Florista's
 * design tokens for consistent styling across the application.
 */

import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  darkMode: 'class',

  theme: {
    /* ═══════════════════════════════════════════════════════════════
       SCREEN BREAKPOINTS
       ═══════════════════════════════════════════════════════════════ */
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
    },

    extend: {
      /* ═══════════════════════════════════════════════════════════════
         COLORS
         ═══════════════════════════════════════════════════════════════ */
      colors: {
        // Core Brand
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

        // Warm Neutrals
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

        // Cool Neutrals
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

        // Accent - Coral/Peach
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

        // Semantic Colors
        success: {
          DEFAULT: '#2D5A3D',
          light: '#E8F0EB',
          dark: '#1E4A2D',
        },
        error: {
          DEFAULT: '#C44536',
          light: '#FCEAE8',
          dark: '#A33828',
        },
        warning: {
          DEFAULT: '#D4A574',
          light: '#FDF6EE',
          dark: '#B8894E',
        },
        info: {
          DEFAULT: '#4A7A8C',
          light: '#E8F4F7',
          dark: '#3A6070',
        },
      },

      /* ═══════════════════════════════════════════════════════════════
         TYPOGRAPHY
         ═══════════════════════════════════════════════════════════════ */
      fontFamily: {
        display: ['Fraunces', 'Playfair Display', ...defaultTheme.fontFamily.serif],
        body: ['DM Sans', 'Inter', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', 'Fira Code', ...defaultTheme.fontFamily.mono],
        // Aliases
        sans: ['DM Sans', 'Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Fraunces', 'Playfair Display', ...defaultTheme.fontFamily.serif],
      },

      fontSize: {
        // Custom sizes with line-height and letter-spacing
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'display-xs': ['1.5rem', { lineHeight: '1.3', letterSpacing: '0' }],
      },

      letterSpacing: {
        tightest: '-0.02em',
        tighter: '-0.01em',
        tight: '-0.005em',
        wide: '0.01em',
        wider: '0.02em',
        widest: '0.1em',
      },

      /* ═══════════════════════════════════════════════════════════════
         SPACING
         ═══════════════════════════════════════════════════════════════ */
      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
      },

      /* ═══════════════════════════════════════════════════════════════
         SIZING
         ═══════════════════════════════════════════════════════════════ */
      maxWidth: {
        'container-xs': '320px',
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1280px',
        'container-2xl': '1440px',
        'prose': '65ch',
        'prose-wide': '75ch',
      },

      /* ═══════════════════════════════════════════════════════════════
         BORDER RADIUS
         ═══════════════════════════════════════════════════════════════ */
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },

      /* ═══════════════════════════════════════════════════════════════
         SHADOWS
         ═══════════════════════════════════════════════════════════════ */
      boxShadow: {
        'xs': '0 1px 2px rgba(30, 30, 30, 0.04)',
        'sm': '0 2px 4px rgba(30, 30, 30, 0.06)',
        'DEFAULT': '0 4px 8px rgba(30, 30, 30, 0.08), 0 2px 4px rgba(30, 30, 30, 0.04)',
        'md': '0 4px 8px rgba(30, 30, 30, 0.08), 0 2px 4px rgba(30, 30, 30, 0.04)',
        'lg': '0 8px 16px rgba(30, 30, 30, 0.10), 0 4px 8px rgba(30, 30, 30, 0.05)',
        'xl': '0 16px 32px rgba(30, 30, 30, 0.12), 0 8px 16px rgba(30, 30, 30, 0.06)',
        '2xl': '0 24px 48px rgba(30, 30, 30, 0.16), 0 12px 24px rgba(30, 30, 30, 0.08)',
        'inner': 'inset 0 2px 4px rgba(30, 30, 30, 0.06)',
        // Colored shadows
        'botanical': '0 4px 14px rgba(45, 90, 61, 0.25)',
        'botanical-lg': '0 8px 24px rgba(45, 90, 61, 0.30)',
        'warm': '0 4px 14px rgba(180, 83, 56, 0.15)',
        'blush': '0 4px 14px rgba(232, 180, 168, 0.30)',
      },

      /* ═══════════════════════════════════════════════════════════════
         ANIMATION
         ═══════════════════════════════════════════════════════════════ */
      transitionDuration: {
        'instant': '100ms',
        'fast': '150ms',
        'normal': '250ms',
        'slow': '400ms',
        'slower': '600ms',
        'slowest': '1000ms',
      },

      transitionTimingFunction: {
        'default': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'spring': 'cubic-bezier(0.43, 0.13, 0.23, 0.96)',
        'gentle': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },

      animation: {
        // Fade animations
        'fade-in': 'fadeIn 300ms ease-out forwards',
        'fade-out': 'fadeOut 300ms ease-in forwards',
        'fade-in-up': 'fadeInUp 400ms ease-out forwards',
        'fade-in-down': 'fadeInDown 400ms ease-out forwards',
        // Scale animations
        'scale-in': 'scaleIn 250ms ease-out forwards',
        'scale-out': 'scaleOut 200ms ease-in forwards',
        // Slide animations
        'slide-in-right': 'slideInRight 300ms ease-out forwards',
        'slide-in-left': 'slideInLeft 300ms ease-out forwards',
        'slide-in-up': 'slideInUp 300ms ease-out forwards',
        'slide-in-down': 'slideInDown 300ms ease-out forwards',
        // Special animations
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInDown: {
          '0%': { opacity: '0', transform: 'translateY(-24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      /* ═══════════════════════════════════════════════════════════════
         Z-INDEX
         ═══════════════════════════════════════════════════════════════ */
      zIndex: {
        'base': '0',
        'raised': '10',
        'dropdown': '100',
        'sticky': '200',
        'overlay': '300',
        'modal': '400',
        'toast': '500',
        'tooltip': '600',
        'max': '9999',
      },

      /* ═══════════════════════════════════════════════════════════════
         BACKGROUND IMAGES & GRADIENTS
         ═══════════════════════════════════════════════════════════════ */
      backgroundImage: {
        // Subtle gradients
        'gradient-botanical': 'linear-gradient(135deg, #2D5A3D 0%, #4A7A5A 100%)',
        'gradient-cream': 'linear-gradient(180deg, #FAF8F5 0%, #F0EDE8 100%)',
        'gradient-sage': 'linear-gradient(180deg, #F4F7F5 0%, #E8F0EB 100%)',
        'gradient-warm': 'linear-gradient(135deg, #F5F3EE 0%, #F0EDE8 50%, #E8E4DD 100%)',
        // Radial gradients
        'gradient-radial-cream': 'radial-gradient(ellipse at center, #FFFFFF 0%, #FAF8F5 100%)',
        'gradient-radial-sage': 'radial-gradient(ellipse at center, #FFFFFF 0%, #F4F7F5 100%)',
        // Overlay gradients
        'gradient-overlay-dark': 'linear-gradient(180deg, transparent 0%, rgba(30, 30, 30, 0.6) 100%)',
        'gradient-overlay-light': 'linear-gradient(180deg, transparent 0%, rgba(250, 248, 245, 0.9) 100%)',
      },
    },
  },

  plugins: [
    // Add plugins as needed
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
  ],
};

export default config;
