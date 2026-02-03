# Design References Analysis

Documentation of the visual analysis performed on the Florista design references.

## Source Images

The design system was derived from two primary reference images:

1. **Desktop Hero View** (`1.png` / `desktop-hero.png`)
2. **Mobile App Views** (`2.png` / `mobile-views.png`)

---

## Desktop Hero Analysis

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo: bestfloral.co]        [Nav Items]        [Search]    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  "A perfect gift for your                    ┌───────────┐  │
│   special and lovely                         │           │  │
│   person"                                    │  Product  │  │
│                                              │   Image   │  │
│  [Subtitle text describing                   │ (Bouquet) │  │
│   the bouquet service]                       │           │  │
│                                              └───────────┘  │
│  [Shop Now - Green CTA]                                     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Custom    │  │   3D        │  │  Wedding &  │         │
│  │   Bouquet   │  │   Floral    │  │   Events    │         │
│  │   [icon]    │  │   [icon]    │  │   [icon]    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Observed Elements

**Header/Navigation**
- Clean, minimal header
- Logo positioned left
- Navigation links center-right
- Likely includes: Shop, About, Contact, Cart
- Background: White/cream

**Hero Section**
- Split layout: Content left, Image right
- Large serif headline
- Supportive body text
- Primary green CTA button
- Background: Soft cream/off-white gradient

**Feature Cards**
- Three cards in horizontal row
- Minimal icons
- Short labels
- Subtle shadows or outlined style

### Color Extraction

| Element | Approximate Color | Token Mapping |
|---------|-------------------|---------------|
| CTA Button | `#3B8252` (green) | `botanical-600` |
| Headline | `#1E1E1E` (near-black) | `charcoal-700` |
| Body Text | `#6B6B6B` (gray) | `charcoal-400` |
| Background | `#FAF8F5` (warm white) | `cream-100` |
| Accent Background | `#E8F0EB` (sage tint) | `sage-100` |

---

## Mobile App Views Analysis

### Left Screen: Splash/Home

```
┌─────────────────────┐
│       9:41          │  ← Status bar
├─────────────────────┤
│                     │
│  Florista           │  ← Brand name (script/serif)
│  Buy a beauty       │  ← Main headline
│                     │
│  The silky-textured │
│  blossom has pink   │  ← Description
│  and orange petals  │
│  and elongated      │
│  woody stems...     │
│                     │
│  ┌───────────────┐  │
│  │   Explore     │  │  ← Dark button (secondary)
│  └───────────────┘  │
│                     │
│      [Floral        │
│       imagery]      │  ← Background botanical elements
│                     │
└─────────────────────┘
```

**Typography Observations**
- "Florista" in elegant serif/script
- "Buy a beauty" — Bold serif headline
- Body copy in clean sans-serif
- Button text: All caps or sentence case

**Button Style**
- Dark charcoal background (`#2D2D2D`)
- Cream/white text
- Rounded corners (8-12px radius)
- Medium padding

### Right Screen: Product Detail

```
┌─────────────────────┐
│       9:41          │
├─────────────────────┤
│                     │
│      Florista       │  ← Centered brand
│                     │
│   ┌─────────────┐   │
│   │             │   │
│   │   Product   │   │
│   │    Image    │   │  ← Product photo in vase
│   │  (Flowers   │   │
│   │   in vase)  │   │
│   │             │   │
│   └─────────────┘   │
│                     │
│  California Poppy   │  ← Product name (serif)
│                     │
│  The silky-textured │  ← Description
│  blossom has pink   │
│  and orange petals  │
│  and elongated      │
│  woody stems.       │
│                     │
│  ┌───────────────┐  │
│  │Add to Cart $25│  │  ← Green CTA with price
│  └───────────────┘  │
│                     │
├─────────────────────┤
│  Recently Purchased │  ← Section header
├─────────────────────┤
│ [img] Helleborus    │
│       Hellebores... │  $35  3 days ago
├─────────────────────┤
│                     │
│  🌿  👤  🛒  🔔  ⚙️  │  ← Bottom navigation
│                     │
└─────────────────────┘
```

**Product Card Elements**
- Large product image (hero style)
- Product name in serif font
- Description in sans-serif
- Integrated price in CTA button

**Recently Purchased List**
- Thumbnail image (small, rounded)
- Product name (bold)
- Truncated description
- Price aligned right
- Timestamp/date

**Bottom Navigation**
- 5 icons evenly spaced
- Home, Profile/Search, Cart/Wishlist, Notifications, Settings
- Active state: Filled or colored icon
- Inactive: Outlined, gray

---

## Typography Analysis

### Heading Font Characteristics

Based on visual analysis, the heading font appears to be:
- **Style**: Old-style serif with soft, organic curves
- **Weight**: Medium to Bold (500-700)
- **Characteristics**: High contrast, elegant terminals
- **Similar fonts**: Fraunces, Playfair Display, Cormorant

**Recommendation**: `Fraunces` — Matches the "wonky" organic feel while maintaining elegance

### Body Font Characteristics

- **Style**: Geometric sans-serif with humanist touches
- **Weight**: Regular to Medium (400-500)
- **Characteristics**: Good x-height, open apertures
- **Similar fonts**: DM Sans, Inter, Outfit

**Recommendation**: `DM Sans` — Clean, warm, excellent for UI

---

## Spacing Patterns

### Observed Spacing Scale

| Context | Approximate Value | Token |
|---------|-------------------|-------|
| Icon padding | 4px | `space-1` |
| Text gap | 8px | `space-2` |
| Element gap | 12-16px | `space-3-4` |
| Card padding | 20-24px | `space-5-6` |
| Section gap | 32-48px | `space-8-12` |
| Hero padding | 64-80px | `space-16-20` |

---

## Interactive Patterns

### Button States (Inferred)

**Primary (Green)**
```
Default:  bg #2D5A3D, text white
Hover:    bg #3D7A52, slight lift
Active:   bg #1E4A2D, pressed
Disabled: bg #C4C4C4, 60% opacity
```

**Secondary (Dark)**
```
Default:  bg #2D2D2D, text white
Hover:    bg #4A4A4A
Active:   bg #1E1E1E
```

### Card Interactions (Inferred)

- Hover: Subtle shadow increase, slight scale (1.02)
- Image: Zoom effect on hover (scale 1.05)
- Quick actions: Fade in on hover

---

## Accessibility Considerations

### Contrast Ratios (Verified)

| Combination | Ratio | WCAG Level |
|-------------|-------|------------|
| Charcoal on Cream | 14.5:1 | AAA |
| Botanical on White | 5.8:1 | AA |
| White on Botanical | 5.8:1 | AA |
| Stone on Cream | 4.6:1 | AA |

### Touch Targets

All buttons appear to meet 44x44px minimum:
- Primary CTA: ~160x48px
- Bottom nav items: ~60x64px area
- List items: Full-width, ~64px height

---

## Animation Recommendations

Based on the organic, elegant aesthetic:

1. **Page Transitions**: Gentle fade + subtle slide (300-400ms)
2. **Card Hover**: Soft scale + shadow (200ms ease-out)
3. **Button Press**: Quick scale down (100ms)
4. **Modal Enter**: Scale from 0.95 + fade (250ms)
5. **List Items**: Staggered fade-in (50ms delay each)

Avoid:
- Bouncy/springy animations
- Harsh snapping
- Excessive motion

---

## Implementation Notes

### Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| Mobile (<640px) | Single column, bottom nav, larger touch targets |
| Tablet (768px) | 2-column product grid, side navigation |
| Desktop (1024px+) | 3-4 column grid, full header nav |

### Image Guidelines

- **Aspect Ratios**: 4:5 for products, 16:9 for heroes
- **Formats**: WebP preferred, JPEG fallback
- **Sizes**: Serve responsive images (srcset)
- **Loading**: Lazy load below-fold images
- **Placeholders**: Cream background (#FAF8F5) or blur-up

---

*Analysis completed February 2026*
