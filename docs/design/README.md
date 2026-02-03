# Florista Design System

A comprehensive design system for the Florista flower delivery e-commerce application.

## Overview

This design system provides the foundation for building consistent, beautiful, and accessible user interfaces for Florista. It captures the brand's essence of botanical elegance combined with modern e-commerce best practices.

## Structure

```
docs/design/
├── README.md              # This file
├── STYLE-GUIDE.md         # Design principles, voice & tone, visual identity
├── tokens/
│   ├── design-tokens.css  # CSS custom properties
│   ├── tailwind.config.ts # Tailwind CSS configuration
│   └── tokens.ts          # TypeScript token definitions
├── components/
│   └── COMPONENTS.md      # Component specifications
└── references/
    └── REFERENCES.md      # Design reference analysis
```

## Quick Start

### 1. Install Dependencies

```bash
npm install -D tailwindcss postcss autoprefixer
npm install @fontsource/fraunces @fontsource/dm-sans
```

### 2. Configure Tailwind

Copy `tokens/tailwind.config.ts` to your project root:

```bash
cp docs/design/tokens/tailwind.config.ts ./tailwind.config.ts
```

### 3. Import Fonts

In your global CSS or layout file:

```css
@import '@fontsource/fraunces/400.css';
@import '@fontsource/fraunces/500.css';
@import '@fontsource/fraunces/600.css';
@import '@fontsource/fraunces/700.css';
@import '@fontsource/dm-sans/400.css';
@import '@fontsource/dm-sans/500.css';
@import '@fontsource/dm-sans/600.css';
```

### 4. Import CSS Tokens (Optional)

If using CSS custom properties alongside Tailwind:

```css
@import 'docs/design/tokens/design-tokens.css';
```

## Design Principles

1. **Botanical Restraint** — Let the flowers speak
2. **Natural Hierarchy** — Guide the eye like through a garden
3. **Organic Precision** — Soft forms within strict structure
4. **Seasonal Sensitivity** — Adapt to content context
5. **Tactile Digital** — Evoke sensory experiences

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `botanical-700` | `#2D5A3D` | Primary CTAs, brand accent |
| `charcoal-700` | `#1E1E1E` | Primary text, secondary buttons |
| `cream-100` | `#FAF8F5` | Page backgrounds |
| `blush-400` | `#E8B4A8` | Warm accent, highlights |

## Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display | Fraunces | 600-700 | 36-72px |
| Headings | Fraunces | 500-600 | 18-48px |
| Body | DM Sans | 400-500 | 14-18px |
| UI | DM Sans | 500-600 | 12-16px |

## Key Components

- **Button** — Primary, secondary, outline, ghost variants
- **ProductCard** — Standard, featured, compact, horizontal layouts
- **Navigation** — Desktop header, mobile bottom nav
- **Hero** — Split, centered, minimal variants
- **Modal/Drawer** — Overlay dialogs and slide-in panels
- **Form Elements** — Input, select, quantity selector

## Tech Stack Alignment

This design system is optimized for:

- **Next.js 14+** with App Router
- **React 18+** with TypeScript
- **Tailwind CSS 3.4+**
- **Framer Motion** (optional, for animations)
- **Radix UI** or **Headless UI** (for accessible primitives)
- **Lucide Icons** or **Phosphor Icons**

## Resources

- [Style Guide](./STYLE-GUIDE.md) — Complete design philosophy and guidelines
- [Design Tokens](./tokens/) — CSS, Tailwind, and TypeScript tokens
- [Component Specs](./components/COMPONENTS.md) — Detailed component documentation

## Version

**v1.0.0** — February 2026

---

*Built for Florista — Where nature meets elegance*
