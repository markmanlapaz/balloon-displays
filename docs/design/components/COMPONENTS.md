# Florista Component Specifications

Comprehensive documentation for all UI components in the Florista Design System.

---

## Table of Contents

1. [Button](#button)
2. [Input](#input)
3. [Card](#card)
4. [ProductCard](#productcard)
5. [Navigation](#navigation)
6. [BottomNav](#bottomnav)
7. [Hero](#hero)
8. [Badge](#badge)
9. [Modal](#modal)
10. [Drawer](#drawer)
11. [PriceDisplay](#pricedisplay)
12. [QuantitySelector](#quantityselector)
13. [SearchBar](#searchbar)
14. [ListItem](#listitem)
15. [Toast](#toast)

---

## Button

Primary interactive element for user actions.

### Variants

| Variant | Usage |
|---------|-------|
| `primary` | Main CTAs: "Add to Cart", "Buy Now", "Checkout" |
| `secondary` | Secondary actions: "Explore", "View Details" |
| `outline` | Tertiary actions: "Cancel", "Back" |
| `ghost` | Minimal actions: icon buttons, nav items |
| `link` | Inline text actions |

### Sizes

| Size | Height | Padding | Font Size | Use Case |
|------|--------|---------|-----------|----------|
| `sm` | 32px | 12px 16px | 14px | Tight spaces, inline |
| `md` | 40px | 14px 20px | 14px | Default |
| `lg` | 48px | 16px 24px | 16px | Primary CTAs |
| `xl` | 56px | 18px 32px | 18px | Hero sections |

### Props

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}
```

### Visual Specifications

**Primary Button**
```
Background: botanical-700 (#2D5A3D)
Text: cream-100 (#FAF8F5)
Border: none
Border Radius: radius-md (8px)
Shadow: none (hover: shadow-botanical)

Hover:
  Background: botanical-600 (#3D7A52)
  Transform: translateY(-1px)
  Shadow: shadow-botanical

Active:
  Background: botanical-800 (#1E4A2D)
  Transform: translateY(0)

Disabled:
  Background: charcoal-200 (#C4C4C4)
  Cursor: not-allowed
  Opacity: 0.6
```

**Secondary Button**
```
Background: charcoal-700 (#1E1E1E)
Text: cream-100 (#FAF8F5)
Border: none
Border Radius: radius-md (8px)

Hover:
  Background: charcoal-600 (#2D2D2D)
```

**Outline Button**
```
Background: transparent
Text: charcoal-700 (#1E1E1E)
Border: 1.5px solid charcoal-200 (#C4C4C4)
Border Radius: radius-md (8px)

Hover:
  Background: cream-200 (#F5F3EE)
  Border-color: charcoal-400 (#6B6B6B)
```

### Animation

```css
transition: all 150ms ease-out;

/* Loading spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Usage Example

```tsx
<Button variant="primary" size="lg" rightIcon={<CartIcon />}>
  Add to Cart $25
</Button>

<Button variant="secondary" size="md">
  Explore
</Button>

<Button variant="outline" size="sm" leftIcon={<BackIcon />}>
  Back to Shop
</Button>
```

---

## Input

Form input fields for user data entry.

### Variants

| Variant | Description |
|---------|-------------|
| `default` | Standard text input |
| `search` | Search input with icon |
| `textarea` | Multi-line text input |
| `select` | Dropdown selection |

### Sizes

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| `sm` | 36px | 10px 12px | 14px |
| `md` | 44px | 12px 16px | 16px |
| `lg` | 52px | 14px 20px | 16px |

### Props

```typescript
interface InputProps {
  variant?: 'default' | 'search' | 'textarea';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
}
```

### Visual Specifications

```
Background: white (#FFFFFF)
Text: charcoal-700 (#1E1E1E)
Placeholder: charcoal-300 (#9A9A9A)
Border: 1.5px solid cream-400 (#E8E4DD)
Border Radius: radius-md (8px)

Focus:
  Border-color: botanical-500 (#5A9B6E)
  Box-shadow: focus-ring (0 0 0 2px cream, 0 0 0 4px botanical)

Error:
  Border-color: error (#C44536)
  Helper text color: error (#C44536)

Disabled:
  Background: cream-200 (#F5F3EE)
  Opacity: 0.6
  Cursor: not-allowed
```

### Label Typography

```
Font: DM Sans
Size: 14px
Weight: 500
Color: charcoal-600 (#2D2D2D)
Margin-bottom: 6px
```

### Usage Example

```tsx
<Input
  label="Email Address"
  placeholder="you@example.com"
  type="email"
  required
  helperText="We'll never share your email"
/>

<Input
  variant="search"
  placeholder="Search flowers..."
  leftIcon={<SearchIcon />}
/>
```

---

## Card

Container component for grouping related content.

### Variants

| Variant | Description |
|---------|-------------|
| `elevated` | Raised with shadow, white background |
| `outlined` | Border, no shadow |
| `filled` | Subtle background fill |
| `ghost` | Transparent, no border |

### Props

```typescript
interface CardProps {
  variant?: 'elevated' | 'outlined' | 'filled' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'sm' | 'md' | 'lg' | 'xl';
  hoverable?: boolean;
  clickable?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
```

### Visual Specifications

**Elevated (Default)**
```
Background: white (#FFFFFF)
Border: none
Border Radius: radius-lg (12px)
Shadow: shadow-sm
Padding: space-6 (24px)

Hover (if hoverable):
  Shadow: shadow-md
  Transform: translateY(-2px)
```

**Outlined**
```
Background: transparent
Border: 1.5px solid cream-400 (#E8E4DD)
Shadow: none
```

**Filled**
```
Background: cream-100 (#FAF8F5)
Border: none
Shadow: none
```

### Usage Example

```tsx
<Card variant="elevated" hoverable padding="lg">
  <CardHeader>Featured Bouquet</CardHeader>
  <CardContent>...</CardContent>
</Card>
```

---

## ProductCard

Specialized card for displaying product information.

### Variants

| Variant | Description |
|---------|-------------|
| `default` | Standard product grid card |
| `featured` | Larger, more prominent display |
| `compact` | Minimal, list-style display |
| `horizontal` | Side-by-side image and content |

### Props

```typescript
interface ProductCardProps {
  variant?: 'default' | 'featured' | 'compact' | 'horizontal';
  product: {
    id: string;
    name: string;
    description?: string;
    price: number;
    originalPrice?: number;
    image: string;
    badge?: string;
    rating?: number;
    inStock?: boolean;
  };
  showDescription?: boolean;
  showRating?: boolean;
  onAddToCart?: (id: string) => void;
  onQuickView?: (id: string) => void;
  onClick?: (id: string) => void;
  className?: string;
}
```

### Visual Specifications

**Default Card**
```
Width: 100% (grid-controlled)
Min-width: 240px
Max-width: 320px

Image Container:
  Aspect ratio: 4:5
  Border radius: radius-lg (12px)
  Overflow: hidden
  Background: cream-200 (#F5F3EE)

Image:
  Object-fit: cover
  Transition: transform 400ms ease-out

  Hover:
    Transform: scale(1.05)

Content:
  Padding: space-4 (16px) top

Product Name:
  Font: Fraunces
  Size: 18px
  Weight: 500
  Color: charcoal-700
  Line-height: 1.3

Description:
  Font: DM Sans
  Size: 14px
  Weight: 400
  Color: charcoal-400
  Line-height: 1.5
  Max-lines: 2 (line-clamp)
  Margin-top: space-1

Price:
  Font: DM Sans
  Size: 16px
  Weight: 600
  Color: charcoal-700
  Margin-top: space-2

Original Price (if discounted):
  Size: 14px
  Weight: 400
  Color: charcoal-300
  Text-decoration: line-through
  Margin-right: space-2
```

**Featured Card**
```
Width: 100%
Min-height: 400px

Image Container:
  Aspect ratio: 3:4
  Border radius: radius-xl (16px)

Product Name:
  Font-size: 24px

Add to Cart Button:
  Visible always (not just on hover)
  Position: absolute bottom of image
  Margin: space-4 from edges
```

**Compact Card (for lists)**
```
Display: flex
Height: 80px
Padding: space-3

Image:
  Width: 64px
  Height: 64px
  Border-radius: radius-md
  Flex-shrink: 0

Content:
  Flex: 1
  Padding-left: space-3

Product Name:
  Font: DM Sans
  Size: 14px
  Weight: 500
```

### Hover Interactions

```css
/* Card hover */
.product-card:hover {
  .product-image {
    transform: scale(1.05);
  }

  .quick-actions {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Quick actions overlay */
.quick-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(transparent, rgba(0,0,0,0.4));
  opacity: 0;
  transform: translateY(8px);
  transition: all 250ms ease-out;
}
```

### Usage Example

```tsx
<ProductCard
  variant="default"
  product={{
    id: '1',
    name: 'California Poppy',
    description: 'The silky-textured blossom has pink and orange petals',
    price: 25,
    image: '/products/california-poppy.jpg',
    badge: 'New',
  }}
  onAddToCart={(id) => handleAddToCart(id)}
/>
```

---

## Navigation

Main navigation header component.

### Variants

| Variant | Description |
|---------|-------------|
| `default` | Standard sticky header |
| `transparent` | Transparent background (for hero overlays) |
| `minimal` | Logo only with menu toggle |

### Props

```typescript
interface NavigationProps {
  variant?: 'default' | 'transparent' | 'minimal';
  logo?: React.ReactNode;
  items: {
    label: string;
    href: string;
    active?: boolean;
  }[];
  actions?: React.ReactNode;
  cartCount?: number;
  onMenuToggle?: () => void;
  className?: string;
}
```

### Visual Specifications

```
Height: 72px (desktop), 64px (mobile)
Background: white (#FFFFFF) with backdrop-blur
Border-bottom: 1px solid cream-300 (#F0EDE8)
Position: sticky
Top: 0
Z-index: z-sticky (200)

Logo:
  Font: Fraunces
  Size: 24px
  Weight: 500
  Color: botanical-700

Nav Items:
  Font: DM Sans
  Size: 15px
  Weight: 500
  Color: charcoal-600
  Gap: space-8 (32px)

  Hover:
    Color: botanical-700

  Active:
    Color: botanical-700
    Position indicator (dot below)

Cart Icon:
  Size: 24px
  Badge: botanical background, white text, 16px circle
```

### Mobile Navigation

```
Hamburger Menu:
  Size: 24px
  3 lines, 2px height, 18px width
  Gap: 5px

Mobile Menu (Drawer):
  Width: 100%
  Height: 100vh
  Background: white
  Animation: slide-in-right 300ms

  Items:
    Padding: space-4 vertical
    Font-size: 18px
    Border-bottom: 1px solid cream-300
```

### Usage Example

```tsx
<Navigation
  logo={<Logo />}
  items={[
    { label: 'Shop', href: '/shop' },
    { label: 'Occasions', href: '/occasions' },
    { label: 'Subscriptions', href: '/subscriptions' },
    { label: 'About', href: '/about' },
  ]}
  cartCount={3}
/>
```

---

## BottomNav

Mobile bottom navigation bar.

### Props

```typescript
interface BottomNavProps {
  items: {
    icon: React.ReactNode;
    label: string;
    href: string;
    active?: boolean;
    badge?: number;
  }[];
  className?: string;
}
```

### Visual Specifications

```
Height: 64px + safe-area-inset-bottom
Background: white (#FFFFFF)
Border-top: 1px solid cream-300 (#F0EDE8)
Position: fixed
Bottom: 0
Left: 0
Right: 0
Z-index: z-sticky (200)

Items:
  Display: flex
  Justify-content: space-around

Item:
  Flex-direction: column
  Align-items: center
  Gap: space-1 (4px)

Icon:
  Size: 24px
  Color: charcoal-400 (inactive), botanical-700 (active)
  Transition: color 150ms

Label:
  Font: DM Sans
  Size: 11px
  Weight: 500
  Color: charcoal-400 (inactive), botanical-700 (active)
```

### Usage Example

```tsx
<BottomNav
  items={[
    { icon: <HomeIcon />, label: 'Home', href: '/', active: true },
    { icon: <SearchIcon />, label: 'Search', href: '/search' },
    { icon: <HeartIcon />, label: 'Saved', href: '/saved' },
    { icon: <CartIcon />, label: 'Cart', href: '/cart', badge: 2 },
    { icon: <UserIcon />, label: 'Account', href: '/account' },
  ]}
/>
```

---

## Hero

Large hero section for landing pages.

### Variants

| Variant | Description |
|---------|-------------|
| `centered` | Centered text with background image |
| `split` | Image on one side, content on other |
| `minimal` | Text only with subtle background |

### Props

```typescript
interface HeroProps {
  variant?: 'centered' | 'split' | 'minimal';
  headline: string;
  subheadline?: string;
  description?: string;
  cta?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary';
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  image?: {
    src: string;
    alt: string;
  };
  backgroundImage?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}
```

### Visual Specifications

**Split Hero (from reference)**
```
Container:
  Min-height: 80vh
  Display: grid
  Grid-template-columns: 1fr 1fr (desktop), 1fr (mobile)
  Gap: space-16 (64px)
  Padding: space-16 vertical, container margins horizontal
  Background: cream-100 (#FAF8F5)

Content Side:
  Display: flex
  Flex-direction: column
  Justify-content: center
  Max-width: 520px

Headline:
  Font: Fraunces
  Size: 48px (desktop), 36px (mobile)
  Weight: 600
  Color: charcoal-700
  Letter-spacing: -0.02em
  Line-height: 1.1

Subheadline:
  Font: Fraunces
  Size: 24px
  Weight: 400
  Color: charcoal-500
  Margin-top: space-2

Description:
  Font: DM Sans
  Size: 18px
  Weight: 400
  Color: charcoal-500
  Line-height: 1.6
  Margin-top: space-6
  Max-width: 400px

CTA:
  Margin-top: space-8

Image Side:
  Display: flex
  Align-items: center
  Justify-content: center

Image:
  Max-width: 100%
  Border-radius: radius-2xl (24px)
  Shadow: shadow-lg
```

### Animation

```css
/* Staggered entrance animation */
.hero-content > * {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 500ms ease-out forwards;
}

.hero-headline { animation-delay: 100ms; }
.hero-subheadline { animation-delay: 200ms; }
.hero-description { animation-delay: 300ms; }
.hero-cta { animation-delay: 400ms; }

.hero-image {
  opacity: 0;
  transform: scale(1.02);
  animation: scaleIn 600ms ease-out 200ms forwards;
}
```

### Usage Example

```tsx
<Hero
  variant="split"
  headline="A perfect gift for your special and lovely person"
  description="Bouquet of beautiful flowers for everyday moments and special occasions."
  cta={{ label: 'Shop Now', href: '/shop' }}
  secondaryCta={{ label: 'Learn More', href: '/about' }}
  image={{
    src: '/hero-bouquet.jpg',
    alt: 'Beautiful spring bouquet',
  }}
/>
```

---

## Badge

Small status indicators and labels.

### Variants

| Variant | Usage |
|---------|-------|
| `default` | Neutral information |
| `success` | Positive status (in stock, delivered) |
| `warning` | Attention needed (low stock) |
| `error` | Negative status (out of stock) |
| `botanical` | Brand accent (new, featured) |

### Sizes

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| `sm` | 20px | 6px 8px | 11px |
| `md` | 24px | 6px 10px | 12px |
| `lg` | 28px | 8px 12px | 13px |

### Props

```typescript
interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'botanical';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
  className?: string;
}
```

### Visual Specifications

```
Border-radius: radius-full (pill shape)
Font: DM Sans
Weight: 500
Text-transform: uppercase (for sm size)
Letter-spacing: 0.02em

Variant Colors:
  default:   bg cream-300, text charcoal-600
  success:   bg botanical-100, text botanical-800
  warning:   bg warning-light, text warning-dark
  error:     bg error-light, text error-dark
  botanical: bg botanical-700, text cream-100
```

### Usage Example

```tsx
<Badge variant="botanical">New</Badge>
<Badge variant="success" size="sm">In Stock</Badge>
<Badge variant="error">Sold Out</Badge>
```

---

## Modal

Overlay dialog for focused interactions.

### Sizes

| Size | Width |
|------|-------|
| `sm` | 400px |
| `md` | 560px |
| `lg` | 720px |
| `xl` | 900px |
| `full` | 100% - 40px margins |

### Props

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  title?: string;
  description?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}
```

### Visual Specifications

```
Overlay:
  Background: rgba(30, 30, 30, 0.5)
  Backdrop-filter: blur(4px)
  Z-index: z-modal (400)

Dialog:
  Background: white
  Border-radius: radius-xl (16px)
  Shadow: shadow-2xl
  Max-height: calc(100vh - 80px)
  Overflow: hidden

Header:
  Padding: space-6 (24px)
  Border-bottom: 1px solid cream-300

Title:
  Font: Fraunces
  Size: 24px
  Weight: 600
  Color: charcoal-700

Close Button:
  Position: absolute
  Top: space-4
  Right: space-4
  Size: 32px
  Border-radius: radius-full
  Background: transparent

  Hover:
    Background: cream-200

Content:
  Padding: space-6
  Overflow-y: auto

Footer:
  Padding: space-6
  Border-top: 1px solid cream-300
  Display: flex
  Justify-content: flex-end
  Gap: space-3
```

### Animation

```css
/* Overlay */
.modal-overlay {
  animation: fadeIn 200ms ease-out;
}

/* Dialog */
.modal-dialog {
  animation: scaleIn 250ms ease-out;
}

/* Exit animations */
.modal-overlay.exiting { animation: fadeOut 150ms ease-in; }
.modal-dialog.exiting { animation: scaleOut 150ms ease-in; }
```

### Usage Example

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Quick View"
  size="lg"
>
  <ProductQuickView product={product} />
</Modal>
```

---

## Drawer

Slide-in panel for supplementary content.

### Positions

| Position | Description |
|----------|-------------|
| `right` | Slides in from right (default) |
| `left` | Slides in from left |
| `bottom` | Slides up from bottom (mobile sheets) |

### Props

```typescript
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'full';
  title?: string;
  showCloseButton?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}
```

### Visual Specifications

```
Right/Left Drawer:
  Width: 360px (sm), 480px (md), 640px (lg)
  Height: 100vh

Bottom Drawer:
  Width: 100%
  Max-height: 90vh
  Border-radius: radius-xl radius-xl 0 0

Background: white
Shadow: shadow-2xl
Z-index: z-modal (400)

Header:
  Height: 64px
  Padding: 0 space-6
  Display: flex
  Align-items: center
  Justify-content: space-between
  Border-bottom: 1px solid cream-300
```

### Animation

```css
/* Right drawer */
.drawer-right {
  transform: translateX(100%);
  animation: slideInRight 300ms ease-out forwards;
}

/* Bottom drawer */
.drawer-bottom {
  transform: translateY(100%);
  animation: slideInUp 300ms ease-out forwards;
}
```

### Usage Example

```tsx
<Drawer
  isOpen={cartOpen}
  onClose={() => setCartOpen(false)}
  position="right"
  title="Your Cart"
  footer={<CheckoutButton />}
>
  <CartContents />
</Drawer>
```

---

## PriceDisplay

Consistent price formatting component.

### Props

```typescript
interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  showCurrency?: boolean;
  className?: string;
}
```

### Visual Specifications

```
Current Price:
  Font: DM Sans
  Weight: 600
  Color: charcoal-700

  Sizes:
    sm: 14px
    md: 18px
    lg: 24px

Original Price (strikethrough):
  Font: DM Sans
  Weight: 400
  Color: charcoal-300
  Text-decoration: line-through
  Margin-right: space-2

  Sizes:
    sm: 12px
    md: 14px
    lg: 18px

Discount Badge:
  Background: terracotta-100
  Color: terracotta-700
  Font-size: 12px
  Padding: 2px 6px
  Border-radius: radius-sm
  Margin-left: space-2
```

### Usage Example

```tsx
<PriceDisplay price={25} size="lg" />
<PriceDisplay price={19.99} originalPrice={29.99} />
```

---

## QuantitySelector

Number input for product quantities.

### Props

```typescript
interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
}
```

### Visual Specifications

```
Container:
  Display: inline-flex
  Align-items: center
  Border: 1.5px solid cream-400
  Border-radius: radius-md
  Overflow: hidden

Buttons (-/+):
  Width: 36px (sm), 44px (md)
  Height: 36px (sm), 44px (md)
  Background: transparent
  Color: charcoal-600
  Font-size: 18px

  Hover:
    Background: cream-200

  Disabled:
    Color: charcoal-200
    Cursor: not-allowed

Input:
  Width: 48px (sm), 56px (md)
  Height: 36px (sm), 44px (md)
  Text-align: center
  Border: none
  Border-left: 1px solid cream-400
  Border-right: 1px solid cream-400
  Font: DM Sans
  Font-size: 14px (sm), 16px (md)
  Font-weight: 500
```

### Usage Example

```tsx
<QuantitySelector
  value={quantity}
  min={1}
  max={10}
  onChange={setQuantity}
/>
```

---

## SearchBar

Search input with suggestions.

### Props

```typescript
interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  suggestions?: string[];
  recentSearches?: string[];
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

### Visual Specifications

```
Container:
  Position: relative

Input:
  Height: 44px (md), 52px (lg)
  Padding-left: space-11 (for icon)
  Padding-right: space-4
  Background: white
  Border: 1.5px solid cream-400
  Border-radius: radius-lg

  Focus:
    Border-color: botanical-500
    Shadow: focus-ring

Search Icon:
  Position: absolute
  Left: space-4
  Color: charcoal-400
  Size: 20px

Clear Button:
  Position: absolute
  Right: space-3
  Opacity: 0 (hidden when empty)

Dropdown:
  Position: absolute
  Top: calc(100% + 8px)
  Width: 100%
  Background: white
  Border-radius: radius-lg
  Shadow: shadow-lg
  Max-height: 320px
  Overflow-y: auto
  Z-index: z-dropdown

Suggestion Item:
  Padding: space-3 space-4
  Font: DM Sans
  Size: 15px
  Cursor: pointer

  Hover:
    Background: cream-100
```

### Usage Example

```tsx
<SearchBar
  placeholder="Search flowers, occasions..."
  suggestions={['Roses', 'Tulips', 'Birthday bouquets']}
  onSearch={handleSearch}
/>
```

---

## ListItem

Reusable list item for various content types.

### Variants

| Variant | Description |
|---------|-------------|
| `default` | Standard list item |
| `product` | Product with image and price |
| `navigation` | Nav link with arrow |
| `selectable` | Checkbox or radio option |

### Props

```typescript
interface ListItemProps {
  variant?: 'default' | 'product' | 'navigation' | 'selectable';
  title: string;
  subtitle?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  image?: string;
  price?: number;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}
```

### Visual Specifications

**Product List Item (Recently Purchased)**
```
Container:
  Display: flex
  Align-items: center
  Padding: space-3 0
  Border-bottom: 1px solid cream-300
  Gap: space-3

Image:
  Width: 56px
  Height: 56px
  Border-radius: radius-md
  Object-fit: cover
  Flex-shrink: 0

Content:
  Flex: 1
  Min-width: 0

Title:
  Font: DM Sans
  Size: 15px
  Weight: 500
  Color: charcoal-700

Subtitle:
  Font: DM Sans
  Size: 13px
  Color: charcoal-400
  Margin-top: space-0.5
  White-space: nowrap
  Overflow: hidden
  Text-overflow: ellipsis

Right Content:
  Flex-shrink: 0
  Text-align: right

Price:
  Font: DM Sans
  Size: 15px
  Weight: 600
  Color: charcoal-700

Date/Meta:
  Font-size: 12px
  Color: charcoal-300
```

### Usage Example

```tsx
<ListItem
  variant="product"
  image="/products/helleborus.jpg"
  title="Helleborus"
  subtitle="Hellebores have a vast array of features you can't dispara..."
  price={35}
  rightContent={<span className="text-sm text-gray-400">3 days ago</span>}
/>
```

---

## Toast

Notification messages for user feedback.

### Variants

| Variant | Usage |
|---------|-------|
| `success` | Positive confirmation |
| `error` | Error messages |
| `warning` | Caution/alerts |
| `info` | Neutral information |

### Props

```typescript
interface ToastProps {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  className?: string;
}
```

### Visual Specifications

```
Position: fixed
Bottom: space-6 (+ safe area on mobile)
Right: space-6 (desktop) / centered (mobile)
Z-index: z-toast (500)

Container:
  Min-width: 320px
  Max-width: 480px
  Padding: space-4
  Background: white
  Border-radius: radius-lg
  Shadow: shadow-xl
  Display: flex
  Align-items: flex-start
  Gap: space-3

Icon:
  Size: 20px
  Flex-shrink: 0

  Colors:
    success: botanical-600
    error: error
    warning: warning
    info: info

Content:
  Flex: 1

Title:
  Font: DM Sans
  Size: 15px
  Weight: 600
  Color: charcoal-700

Message:
  Font: DM Sans
  Size: 14px
  Color: charcoal-500
  Margin-top: space-0.5

Action Button:
  Font-size: 14px
  Font-weight: 500
  Color: botanical-700
  Margin-top: space-2

Close Button:
  Position: absolute (or flex end)
  Color: charcoal-400
  Size: 16px
```

### Animation

```css
/* Enter */
.toast {
  animation: slideInUp 300ms ease-out;
}

/* Exit */
.toast.exiting {
  animation: slideOutDown 200ms ease-in;
}

/* Progress bar for auto-dismiss */
.toast-progress {
  height: 3px;
  background: botanical-300;
  animation: shrink linear var(--duration);
}
```

### Usage Example

```tsx
toast.success('Added to cart', {
  message: 'California Poppy has been added to your cart',
  action: {
    label: 'View Cart',
    onClick: () => navigate('/cart'),
  },
});
```

---

## Component Checklist

Use this checklist when implementing components:

- [ ] **Accessibility**: Proper ARIA labels, keyboard navigation, focus management
- [ ] **Responsive**: Works on all breakpoints (xs, sm, md, lg, xl)
- [ ] **States**: Default, hover, focus, active, disabled, loading, error
- [ ] **Animation**: Smooth transitions, respects `prefers-reduced-motion`
- [ ] **Dark Mode**: Supports dark theme (if applicable)
- [ ] **TypeScript**: Full type definitions with proper generics
- [ ] **Documentation**: Storybook stories with all variants
- [ ] **Testing**: Unit tests for logic, visual regression tests

---

*Component Specifications v1.0.0*
*Last updated: February 2026*
