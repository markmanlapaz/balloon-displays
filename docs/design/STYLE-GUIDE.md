# Florista Design System

## Style Guide & Design Principles

---

## Brand Essence

**Florista** embodies the intersection of nature's ephemeral beauty and timeless elegance. Our design language draws from botanical illustration traditions, Japanese *Ikebana* philosophy, and modern Scandinavian minimalism—creating interfaces that feel like curated gallery spaces where flowers are the art.

### Design Philosophy

> *"Let the flowers speak. Design should frame, never compete."*

---

## Core Principles

### 1. Botanical Restraint
Every element exists to showcase the product. We use generous negative space, allowing arrangements to breathe like they would in a well-lit atelier. Avoid visual clutter—if it doesn't serve the flower, remove it.

### 2. Natural Hierarchy
Mimic how the eye moves through a garden: focal blooms first, then supporting foliage, then container. Headlines command attention, imagery creates desire, body text informs, CTAs convert.

### 3. Organic Precision
Soft doesn't mean imprecise. Our rounded corners, flowing curves, and natural imagery sit within a strict grid system. Think of a perfectly arranged bouquet—organic forms within intentional structure.

### 4. Seasonal Sensitivity
The design system adapts subtly to context. Product pages featuring warm-toned flowers lean into peach and coral accents. Cool arrangements invite sage and eucalyptus tones. The system breathes with its content.

### 5. Tactile Digital
Evoke the sensory experience of a flower shop: the weight of a ceramic vase, the texture of kraft paper wrapping, the softness of petals. Subtle shadows, material-inspired backgrounds, and micro-animations that feel physical.

---

## Visual Identity

### Logo Usage

The **Florista** wordmark uses a custom serif treatment inspired by botanical engravings.

**Clear Space**: Minimum padding equal to the height of the "F" ascender on all sides.

**Minimum Size**:
- Digital: 80px width
- Print: 20mm width

**Color Variations**:
- Primary: Forest Green (#2D5A3D) on cream backgrounds
- Inverted: Cream (#FAF8F5) on dark backgrounds
- Mono: Charcoal (#1E1E1E) for formal applications

### Photography Direction

**Product Photography**:
- Natural, diffused lighting (north-facing window aesthetic)
- Neutral backgrounds: cream, soft grey, natural linen textures
- Slight depth of field—sharp focal bloom, gentle background blur
- Overhead and 3/4 angles preferred
- Show scale with human hands when appropriate

**Lifestyle Photography**:
- Aspirational but attainable domestic settings
- Morning light preference (golden hour secondary)
- Muted, desaturated color grading
- Negative space for text overlay

**Avoid**:
- Harsh shadows or flash photography
- Overly saturated colors
- Busy or distracting backgrounds
- Stock photo aesthetic

---

## Color Philosophy

### The Palette Story

Our palette emerges from a morning in an English country garden: the deep greens of dewy foliage, the warm cream of antique ceramic, the blush of dawn-touched petals, and the rich earth beneath.

### Color Relationships

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   BACKGROUNDS          CONTENT            ACCENTS       │
│   ────────────         ───────            ───────       │
│                                                         │
│   Cream Canvas   →     Forest Text    +   Botanical     │
│   Soft Sage      →     Charcoal       +   Blush         │
│   Pure White     →     Stone Grey     +   Terracotta    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Usage Ratios

For a harmonious interface, maintain these approximate ratios:

- **60% Neutrals** (Cream, White, Light Sage) — Backgrounds, cards, containers
- **30% Content** (Charcoal, Forest) — Text, icons, borders
- **10% Accent** (Botanical Green, Blush) — CTAs, highlights, badges

---

## Typography Philosophy

### Font Pairing Rationale

**Fraunces** (Headings) — A "wonky" old-style serif with optical sizing. Its soft, organic curves echo flower petals while its historical roots evoke botanical illustration traditions. The slight quirkiness prevents stuffiness.

**DM Sans** (Body) — A geometric sans-serif with humanist touches. Clean enough for UI, warm enough for brand. Its generous x-height ensures readability at small sizes.

### Hierarchy System

```
DISPLAY (Hero Headlines)
Fraunces 700 / 56-72px / -0.02em tracking / 1.1 line-height
"A perfect gift for your special person"

H1 (Page Titles)
Fraunces 600 / 40-48px / -0.01em tracking / 1.2 line-height
"California Poppy"

H2 (Section Headers)
Fraunces 500 / 28-32px / 0 tracking / 1.25 line-height
"Recently Purchased"

H3 (Card Titles)
DM Sans 600 / 20-24px / 0 tracking / 1.3 line-height
"Custom Bouquet"

BODY LARGE (Intros)
DM Sans 400 / 18px / 0.01em tracking / 1.6 line-height

BODY (Default)
DM Sans 400 / 16px / 0.01em tracking / 1.6 line-height

BODY SMALL (Captions)
DM Sans 400 / 14px / 0.02em tracking / 1.5 line-height

OVERLINE (Labels)
DM Sans 500 / 12px / 0.1em tracking / 1.4 line-height / UPPERCASE
```

### Typography Rules

1. **Never center long text blocks** — Left-align body copy for readability
2. **Limit line length** — 60-75 characters for body text
3. **Use sentence case** — Except for overlines and navigation
4. **Avoid bold body text** — Use size or color for emphasis instead
5. **Headings in Forest or Charcoal only** — Never grey

---

## Spacing & Layout

### Spacing Scale

Based on an 8px grid with 4px half-steps for fine-tuning:

```
--space-1:   4px    (0.25rem)  — Tight icon padding
--space-2:   8px    (0.5rem)   — Inline elements, tight groups
--space-3:   12px   (0.75rem)  — Related element gaps
--space-4:   16px   (1rem)     — Default component padding
--space-5:   24px   (1.5rem)   — Section element gaps
--space-6:   32px   (2rem)     — Card padding, component margins
--space-7:   48px   (3rem)     — Section padding (mobile)
--space-8:   64px   (4rem)     — Section padding (desktop)
--space-9:   96px   (6rem)     — Hero section spacing
--space-10:  128px  (8rem)     — Maximum breathing room
```

### Layout Grid

**Desktop (1440px canvas)**:
- 12-column grid
- 72px columns
- 24px gutters
- 80px margins

**Tablet (768px)**:
- 8-column grid
- 24px gutters
- 40px margins

**Mobile (375px)**:
- 4-column grid
- 16px gutters
- 20px margins

### Container Widths

```css
--container-sm:  640px   /* Narrow content, forms */
--container-md:  768px   /* Blog posts, product details */
--container-lg:  1024px  /* Product grids */
--container-xl:  1280px  /* Full layouts */
--container-2xl: 1440px  /* Maximum width */
```

---

## Motion & Animation

### Motion Principles

1. **Purposeful** — Animation should guide attention or provide feedback, never distract
2. **Natural** — Ease curves that mimic organic movement (ease-out for entering, ease-in for exiting)
3. **Swift** — Most interactions complete in 150-300ms
4. **Consistent** — Same action = same animation across the system

### Timing Tokens

```css
--duration-instant:  100ms   /* Micro-feedback (button press) */
--duration-fast:     150ms   /* Hover states, toggles */
--duration-normal:   250ms   /* Default transitions */
--duration-slow:     400ms   /* Modal entrances, page transitions */
--duration-slower:   600ms   /* Complex choreography */

--ease-default:      cubic-bezier(0.4, 0, 0.2, 1);    /* General purpose */
--ease-in:           cubic-bezier(0.4, 0, 1, 1);       /* Exits */
--ease-out:          cubic-bezier(0, 0, 0.2, 1);       /* Entrances */
--ease-bounce:       cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful emphasis */
--ease-spring:       cubic-bezier(0.43, 0.13, 0.23, 0.96); /* Natural settle */
```

### Animation Patterns

**Page Load Sequence**:
1. Background fades in (0ms, 300ms duration)
2. Hero image scales from 1.02 to 1 (100ms delay, 500ms duration)
3. Headline slides up + fades (200ms delay, 400ms duration)
4. Supporting text (300ms delay)
5. CTA button (400ms delay)
6. Secondary elements stagger (500ms+, 50ms increments)

**Card Hover**:
- Scale: 1 → 1.02
- Shadow: elevation-1 → elevation-2
- Duration: 250ms ease-out

**Button Interactions**:
- Hover: background lightens 8%, 150ms
- Press: scale 0.98, 100ms
- Release: scale 1, 150ms ease-bounce

---

## Elevation & Depth

### Shadow System

```css
--shadow-xs:    0 1px 2px rgba(30, 30, 30, 0.04);
--shadow-sm:    0 2px 4px rgba(30, 30, 30, 0.06);
--shadow-md:    0 4px 8px rgba(30, 30, 30, 0.08);
--shadow-lg:    0 8px 16px rgba(30, 30, 30, 0.10);
--shadow-xl:    0 16px 32px rgba(30, 30, 30, 0.12);
--shadow-2xl:   0 24px 48px rgba(30, 30, 30, 0.16);

/* Colored shadows for depth */
--shadow-green: 0 4px 14px rgba(45, 90, 61, 0.25);
--shadow-warm:  0 4px 14px rgba(180, 83, 56, 0.15);
```

### Z-Index Scale

```css
--z-base:       0
--z-raised:     10    /* Cards, buttons */
--z-dropdown:   100   /* Menus, selects */
--z-sticky:     200   /* Sticky headers */
--z-overlay:    300   /* Overlays, backdrops */
--z-modal:      400   /* Modals, dialogs */
--z-toast:      500   /* Notifications */
--z-tooltip:    600   /* Tooltips */
--z-max:        9999  /* Emergency override */
```

---

## Border Radius

### Radius Scale

```css
--radius-none:  0
--radius-sm:    4px    /* Badges, tags */
--radius-md:    8px    /* Buttons, inputs */
--radius-lg:    12px   /* Cards, containers */
--radius-xl:    16px   /* Large cards, images */
--radius-2xl:   24px   /* Feature sections */
--radius-full:  9999px /* Pills, avatars */
```

### Application Guidelines

- **Buttons**: radius-md (8px) for standard, radius-full for pill style
- **Cards**: radius-lg (12px) default, radius-xl for featured
- **Images**: radius-lg or match parent container
- **Inputs**: radius-md to match buttons
- **Badges/Tags**: radius-sm (4px) or radius-full

---

## Iconography

### Icon Style

- **Line weight**: 1.5px stroke
- **Corner radius**: 1px
- **Size grid**: 24x24px base, scales to 16, 20, 32, 40
- **Style**: Rounded line icons, not filled (except for active states)

### Icon Sizing

```
--icon-xs:  16px  — Inline with small text
--icon-sm:  20px  — Inline with body text
--icon-md:  24px  — Default, buttons, navigation
--icon-lg:  32px  — Feature callouts
--icon-xl:  40px  — Empty states, illustrations
```

### Recommended Icon Set

Use **Lucide Icons** or **Phosphor Icons** for consistency with the organic, friendly aesthetic. Avoid overly geometric icon sets.

---

## Accessibility

### Color Contrast

All text meets WCAG 2.1 AA standards:
- **Large text** (24px+): 3:1 minimum contrast
- **Body text**: 4.5:1 minimum contrast
- **UI components**: 3:1 minimum contrast

### Focus States

```css
/* Visible focus ring for keyboard navigation */
--focus-ring: 0 0 0 2px var(--color-cream),
              0 0 0 4px var(--color-botanical);
```

### Touch Targets

- Minimum 44x44px for all interactive elements
- Minimum 8px spacing between adjacent touch targets

### Motion Sensitivity

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Voice & Tone

### Writing Principles

1. **Warm but not saccharine** — "Your arrangement is on its way" not "Yay! 🎉 Your flowers are coming!"
2. **Helpful, not pushy** — Guide decisions without aggressive upselling
3. **Clear over clever** — Skip puns; clarity builds trust
4. **Inclusive** — Avoid gendered assumptions about gift recipients

### Microcopy Examples

| Context | ✅ Do | ❌ Don't |
|---------|-------|---------|
| Empty cart | "Your cart is waiting for blooms" | "Your cart is empty!" |
| Add to cart | "Add to Cart" | "Buy Now!!!" |
| Sold out | "Currently unavailable — notify me" | "SOLD OUT" |
| Error | "We couldn't process your payment. Please check your details." | "Error: Payment failed" |
| Success | "Your order is confirmed" | "Woohoo! Order placed! 🎊" |

---

## File Naming Conventions

### Components
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.test.tsx
├── ComponentName.stories.tsx
├── index.ts
└── types.ts
```

### Design Tokens
```
tokens/
├── colors.ts
├── typography.ts
├── spacing.ts
├── shadows.ts
└── index.ts
```

### Assets
```
kebab-case-descriptive-name.{png|svg|jpg}
icon-cart.svg
hero-spring-collection.jpg
pattern-botanical-light.png
```

---

*Last updated: February 2026*
*Version: 1.0.0*
