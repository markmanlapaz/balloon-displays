# Balloon Displays Website Management Guide

**Version 1.0** | Last Updated: February 4, 2026

---

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Pages & Routing](#pages--routing)
5. [Managing Products & Services](#managing-products--services)
6. [Managing Images](#managing-images)
7. [Updating Site Content](#updating-site-content)
8. [Components Reference](#components-reference)
9. [Styling & Theming](#styling--theming)
10. [Shopping Cart & Checkout](#shopping-cart--checkout)
11. [Navigation](#navigation)
12. [Search Functionality](#search-functionality)
13. [Deployment](#deployment)
14. [Common Tasks Quick Reference](#common-tasks-quick-reference)
15. [Troubleshooting](#troubleshooting)

---

## Overview

### What This Website Is

The Balloon Displays website is a modern, full-featured ecommerce site for a balloon decoration business serving the Greater Toronto Area. It showcases balloon products and services, allows customers to browse and add items to a cart, request quotes, and learn about the business.

### Tech Stack Summary

- **Framework**: Next.js 14.2.0 (App Router) with React 18.3.0
- **Language**: TypeScript 5.3.0
- **Styling**: Tailwind CSS 3.4.1 with extensive custom theme
- **UI Components**: Radix UI primitives for modals and dialogs
- **Icons**: lucide-react
- **Cart Storage**: Browser localStorage (no database)
- **Deployment**: Optimized for Vercel (or any Node.js hosting)

**Important**: This is a frontend-only application with no backend server or database. All product data is stored in code files, and the shopping cart uses browser storage.

### Who This Guide Is For

This guide is designed for:
- Website owners who need to update products, prices, and content
- Developers maintaining or extending the site
- Anyone comfortable editing code files to make content changes

You should be comfortable with basic text editing and following step-by-step instructions. Some familiarity with JSON-style data structures is helpful but not required.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have installed:
- **Node.js** version 20 or newer ([download here](https://nodejs.org/))
- A code editor such as **VS Code** ([download here](https://code.visualstudio.com/))
- **Git** for version control (optional but recommended)

### Installation

1. **Open your terminal or command prompt** and navigate to the project folder:
   ```bash
   cd C:\Users\markm\Desktop\balloon-displays
   ```

2. **Install dependencies** (this downloads all required packages):
   ```bash
   npm install
   ```
   This step only needs to be done once, or when new dependencies are added.

### Running the Development Server

To preview the website locally while making changes:

```bash
npm run dev
```

The site will open at `http://localhost:3000` in your browser. Any changes you make to files will automatically refresh the page.

**Pro Tip**: Keep the development server running while you edit. Save your files and refresh the browser to see changes instantly.

### Building for Production

When you're ready to deploy the site:

```bash
npm run build
```

This creates an optimized production build in the `.next` folder. The build process checks for errors and optimizes performance.

To test the production build locally:

```bash
npm run start
```

---

## Project Structure

Here's how the project is organized:

```
balloon-displays/
├── public/                  # Static files (images, fonts)
│   └── images/             # All website images (.webp format)
├── src/
│   ├── app/                # Next.js pages (App Router)
│   │   ├── page.tsx        # Home page (/)
│   │   ├── products/       # Products pages
│   │   ├── services/       # Services page
│   │   ├── gallery/        # Gallery page
│   │   ├── about/          # About page
│   │   ├── inquiry/        # Request quote form
│   │   ├── faq/            # FAQ page
│   │   └── checkout/       # Checkout page
│   ├── components/         # Reusable React components
│   │   ├── ui/            # UI building blocks (buttons, cards, etc.)
│   │   └── SearchModal.tsx # Search modal component
│   ├── lib/               # Utilities and data
│   │   ├── data.ts        # ALL PRODUCT & SERVICE DATA (edit this!)
│   │   ├── cart.ts        # Shopping cart logic
│   │   └── utils.ts       # Helper functions
│   └── styles/            # Global CSS
├── tailwind.config.ts     # Tailwind CSS theme customization
├── package.json           # Project dependencies
└── tsconfig.json          # TypeScript configuration
```

### Key Files to Know

| File | Purpose |
|------|---------|
| `src/lib/data.ts` | Contains all products, services, and reviews. Edit this to change product info. |
| `src/app/page.tsx` | Home page content and layout |
| `tailwind.config.ts` | Brand colors, fonts, and design system settings |
| `public/images/` | Where all images are stored |

---

## Pages & Routing

### How Next.js App Router Works

Next.js uses file-based routing. Each folder inside `src/app/` with a `page.tsx` file becomes a route:

- `src/app/page.tsx` → `/` (home page)
- `src/app/products/page.tsx` → `/products`
- `src/app/about/page.tsx` → `/about`

**Dynamic routes** use square brackets:
- `src/app/products/[id]/page.tsx` → `/products/1`, `/products/2`, etc.

### All Pages

| Route | File Location | Purpose |
|-------|---------------|---------|
| `/` | `src/app/page.tsx` | Home/landing page with hero, products, services, testimonials |
| `/products` | `src/app/products/page.tsx` | Products listing with category filters |
| `/products/[id]` | `src/app/products/[id]/page.tsx` | Individual product detail pages |
| `/services` | `src/app/services/page.tsx` | Services listing |
| `/gallery` | `src/app/gallery/page.tsx` | Photo gallery |
| `/about` | `src/app/about/page.tsx` | About the business |
| `/inquiry` | `src/app/inquiry/page.tsx` | Request a quote form |
| `/faq` | `src/app/faq/page.tsx` | Frequently asked questions |
| `/checkout` | `src/app/checkout/page.tsx` | Order review and checkout form |

### How to Find and Edit Pages

1. **Identify which page** you want to edit (e.g., About page)
2. **Open the corresponding file** (e.g., `src/app/about/page.tsx`)
3. **Find the text or content** you want to change (look for JSX markup inside `return (...)`)
4. **Edit and save** the file
5. **Refresh your browser** to see the changes

**Note**: Page files are written in TypeScript/React (TSX format). HTML-like tags are JSX. Text content is usually between tags like `<h1>Your Text Here</h1>` or `<p>Your paragraph</p>`.

---

## Managing Products & Services

**This is the most important section for day-to-day content management.**

All products and services are stored in a single file: **`src/lib/data.ts`**

### Understanding the Data Structure

The file exports several arrays and objects:

- `allProducts` — All products (15 items including products, packages, and add-ons)
- `servicesList` — All services (5 items: Birthday, Wedding, Corporate, Baby Shower, Graduation)
- `addOns` — Available add-ons (8 items)
- `categories` — Product categories for filtering

### Product Data Fields

Each product has these fields:

```typescript
{
  id: string;                    // Unique identifier (e.g., "1", "2", "s1")
  name: string;                  // Product name
  description: string;           // Short description (shown on cards)
  longDescription: string;       // Full description (shown on detail page)
  price: number;                 // Price in dollars (e.g., 150 for $150)
  originalPrice?: number;        // Optional: crossed-out price for sales
  priceLabel?: string;           // Optional: Custom text like "Starting at"
  image: string;                 // Main image path (e.g., "/images/arch.webp")
  images: string[];              // Array of image paths for gallery
  badge?: string;                // Optional badge text: "Popular", "New Display", "Sale"
  inStock: boolean;              // true or false
  category: string;              // "arches", "garlands", "columns", etc.
  type: "product" | "service";   // Product or service
  features: string[];            // Array of bullet point features
  reviews: Review[];             // Array of customer reviews
  addOns: AddOn[];               // Array of compatible add-on IDs
}
```

### How to Add a New Product

1. **Open** `src/lib/data.ts`
2. **Scroll to** the `allProducts` array (starts around line 100)
3. **Copy an existing product** object (including all curly braces and commas)
4. **Paste it** at the end of the array, just before the closing `];`
5. **Edit the fields**:

```typescript
{
  id: '16',  // IMPORTANT: Use a unique ID
  name: 'Triple Balloon Arch',
  description: 'Massive three-layer arch for grand entrances',
  longDescription: 'Our most impressive balloon installation features three layers of balloons...',
  price: 450,
  image: '/images/triple-arch.webp',
  images: ['/images/triple-arch.webp'],
  badge: 'Premium',
  inStock: true,
  category: 'arches',
  type: 'product',
  features: [
    '14-16 ft span',
    'Three layers of balloons',
    'Custom color combinations',
    'Professional setup included',
  ],
  reviews: [],
  addOns: ['ao1', 'ao3', 'ao8'] as unknown as AddOn[],
},
```

6. **Save the file** and refresh your browser

**Important Notes**:
- Always use a unique `id` that doesn't conflict with existing products
- Images must exist in `public/images/` (see [Managing Images](#managing-images))
- The `addOns` line uses a TypeScript workaround — copy it exactly as shown
- Don't forget the comma after the closing `}` (except for the last item)

### How to Edit an Existing Product

1. **Open** `src/lib/data.ts`
2. **Search** for the product name or ID (Ctrl+F or Cmd+F)
3. **Edit the field** you want to change:

```typescript
// Change price
price: 175,  // Was 150

// Change description
description: 'Updated single arch design, perfect for any event',

// Add a badge
badge: 'Best Seller',

// Mark as out of stock
inStock: false,
```

4. **Save and refresh** your browser

### How to Remove a Product

1. **Open** `src/lib/data.ts`
2. **Find the product** in the `allProducts` array
3. **Delete the entire object** (from opening `{` to closing `},`)
4. **Save and refresh**

**Warning**: Removing a product will break any direct links to its detail page. Consider marking it as out of stock instead.

### How to Add/Edit a Service

Services work the same way as products but use the `servicesList` array (starts around line 568).

Example service:

```typescript
{
  id: 'svc-anniversary',
  name: 'Anniversary Celebrations',
  description: 'Romantic balloon decor for milestone anniversaries',
  longDescription: 'Celebrate years of love with elegant balloon installations...',
  price: 300,
  priceLabel: 'Starting at $300',
  image: '/images/anniversary-decor.webp',
  features: [
    'Romantic color palettes',
    'Custom anniversary number displays',
    'Photo-worthy installations',
    'Delivery and setup included',
  ],
  reviews: [],
},
```

### How to Update Prices

**Single Product**:
1. Find the product in `src/lib/data.ts`
2. Change the `price: 150,` line to your new price
3. Save and refresh

**Multiple Products** (bulk price increase):
1. Open `src/lib/data.ts`
2. Use Find & Replace carefully, or edit each price manually
3. Double-check your changes before saving

**Pro Tip**: If you want to show a sale price, set both `originalPrice` and `price`:

```typescript
price: 120,           // Sale price (shown large)
originalPrice: 150,   // Original price (shown crossed out)
badge: 'Sale',        // Adds a "Sale" badge
```

### How to Add or Edit Customer Reviews

Reviews are nested inside products. To add a review:

1. **Find the product** in `src/lib/data.ts`
2. **Locate the `reviews:` array**
3. **Add a new review object**:

```typescript
reviews: [
  {
    id: 'r20',  // Unique ID
    name: 'Jennifer L.',
    rating: 5,  // 1 to 5
    date: '2026-01-15',  // YYYY-MM-DD format
    text: 'The balloon arch exceeded our expectations! Setup was quick and professional.',
    event: 'Wedding',  // Optional
  },
  // ... existing reviews
],
```

**Pro Tip**: Keep reviews concise (1-3 sentences) for better readability.

---

## Managing Images

### Image Storage

All images are stored in the **`public/images/`** folder.

In your code, reference them as `/images/filename.webp` (note the leading slash).

### Image Format Recommendations

- **Format**: WebP (modern, compressed format)
- **Naming**: Use lowercase with hyphens (e.g., `single-balloon-arch.webp`)
- **Size**: Aim for under 500 KB per image (use compression tools)
- **Dimensions**:
  - Product cards: 800x1000px (4:5 aspect ratio)
  - Hero images: 1200x1500px
  - Gallery images: 1200x800px (3:2 aspect ratio)

### How to Add a New Image

1. **Prepare your image**:
   - Resize to appropriate dimensions
   - Convert to WebP format (use [Squoosh](https://squoosh.app/) or similar)
   - Name it descriptively: `triple-balloon-arch.webp`

2. **Copy the file** into `public/images/`

3. **Reference it in your code**:
   ```typescript
   image: '/images/triple-balloon-arch.webp',
   ```

4. **Clear your browser cache** if the image doesn't appear immediately

### How to Replace an Image

**Option 1: Replace the file (keeps same filename)**
1. Delete the old image from `public/images/`
2. Add the new image with the exact same filename
3. Refresh your browser (you may need to hard-refresh: Ctrl+Shift+R or Cmd+Shift+R)

**Option 2: Use a new filename**
1. Add the new image to `public/images/`
2. Update the reference in `src/lib/data.ts`:
   ```typescript
   image: '/images/new-arch-photo.webp',
   ```
3. Delete the old image file (optional)

### Image Optimization Tips

- Use WebP format for 30-50% smaller file sizes compared to JPEG/PNG
- Compress images before uploading (tools: TinyPNG, Squoosh, ImageOptim)
- Avoid images larger than 2000px wide — they slow down the site
- Use descriptive filenames for SEO: `birthday-balloon-bouquet.webp` (not `IMG_1234.webp`)

---

## Updating Site Content

### Editing the Home Page

**File**: `src/app/page.tsx`

The home page has several sections you can customize:

#### Hero Section (Lines 215-295)

The large banner at the top of the page.

**To change the main heading**:
```tsx
<h1 className="font-accent text-display-lg...">
  Stunning Balloon Displays for Every
  <span className="text-botanical-600"> Celebration</span>
</h1>
```

**To change the description**:
```tsx
<p className="text-lg text-charcoal-500...">
  Transform your events with breathtaking balloon arches...
</p>
```

**To change the hero image**:
```tsx
<img
  src="/images/single-balloon-arch-hero.webp"  // Change this path
  alt="Beautiful balloon arch decoration"
/>
```

#### Why Choose Us (Lines 298-327)

Edit feature cards in this section:

```tsx
<FeatureCard
  icon={<Sparkles className="w-6 h-6" />}
  title="Custom Designs"
  description="Every installation is uniquely crafted to match your event's theme."
/>
```

#### Testimonials (Lines 161-180 & 427-452)

Testimonials are defined at the top of the file, then displayed later:

```tsx
const testimonials = [
  {
    name: 'Sarah M.',
    event: 'Wedding Reception',
    text: 'The balloon arch was absolutely stunning!...',
    rating: 5,
  },
  // Add more testimonials here
];
```

#### Contact Information (Lines 531-643)

Update phone, email, and social media:

```tsx
<p className="font-medium text-charcoal-700">(555) 123-4567</p>
// Change to your actual phone number

<p className="font-medium text-charcoal-700">hello@balloondisplays.com</p>
// Change to your actual email

<p className="font-medium text-charcoal-700">@balloondisplays</p>
// Change to your Instagram handle
```

**Important**: The same contact info appears in the footer (lines 646-687). Update both places for consistency.

### Editing the About Page

**File**: `src/app/about/page.tsx`

Edit the business story, mission, and team information in this file. Look for text between JSX tags and update as needed.

### Editing the FAQ Page

**File**: `src/app/faq/page.tsx`

FAQs are typically structured as an array of objects:

```tsx
const faqs = [
  {
    question: 'Do you deliver and set up?',
    answer: 'Yes! We handle delivery, professional setup, and post-event cleanup...',
  },
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking 2-4 weeks in advance...',
  },
];
```

### Global Changes (Header/Footer/Navigation)

**Navigation**: Edit `src/components/ui/Navigation.tsx` (see [Navigation](#navigation) section)

**Footer**: Lives at the bottom of `src/app/page.tsx` (lines 646-687)

---

## Components Reference

### What Are Components?

Components are reusable UI building blocks. Instead of writing the same button code everywhere, you use a `<Button>` component.

All UI components live in `src/components/ui/`.

### Key Components

#### Button (`Button.tsx`)

**Usage**:
```tsx
<Button>Click Me</Button>
<Button variant="outline">Secondary Action</Button>
<Button size="lg">Large Button</Button>
```

**Variants**: `primary` (default), `outline`, `ghost`, `secondary`
**Sizes**: `sm`, `md` (default), `lg`, `xl`

#### ProductCard (`ProductCard.tsx`)

Displays a product with image, name, price, and add-to-cart button.

**Usage**:
```tsx
<ProductCard
  product={productData}
  onAddToCart={() => addToCart(productData)}
  onClick={() => navigateToProduct(productData.id)}
/>
```

#### Badge (`Badge.tsx`)

Small label for tags like "Popular", "Sale", "New".

**Usage**:
```tsx
<Badge>Popular</Badge>
<Badge variant="warning">Sale</Badge>
<Badge variant="botanical">New Display</Badge>
```

**Variants**: `default`, `botanical`, `outline`, `success`, `warning`, `error`

#### Card (`Card.tsx`)

Container for content blocks.

**Usage**:
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title Here</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent>
    Main content goes here
  </CardContent>
</Card>
```

**Variants**: `default`, `elevated` (with shadow)

#### Modal (`Modal.tsx`)

Popup dialog for forms or detailed content.

**Usage**:
```tsx
<Modal open={isOpen} onOpenChange={setIsOpen}>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Modal Title</ModalTitle>
    </ModalHeader>
    <ModalBody>
      Content here
    </ModalBody>
  </ModalContent>
</Modal>
```

#### Navigation (`Navigation.tsx`)

Sticky header with logo, menu, cart, and search icons.

**Props**:
- `items`: Array of navigation links
- `cartCount`: Number of items in cart
- `onCartClick`: Function to open cart drawer
- `onSearchClick`: Function to open search modal

#### BottomNav (`BottomNav.tsx`)

Mobile-only bottom navigation bar.

**Usage**:
```tsx
<BottomNav items={[
  { icon: <Home />, label: 'Home', href: '/', active: true },
  { icon: <Search />, label: 'Browse', href: '/products' },
  // ... more items
]} />
```

#### PriceDisplay (`PriceDisplay.tsx`)

Formatted price with currency.

**Usage**:
```tsx
<PriceDisplay price={150} />  // Displays "$150.00 CAD"
<PriceDisplay price={99.99} size="lg" />
```

#### QuantitySelector (`QuantitySelector.tsx`)

Plus/minus buttons for quantity input.

**Usage**:
```tsx
<QuantitySelector
  value={quantity}
  onChange={setQuantity}
  min={1}
  max={10}
/>
```

#### Toast (`Toast.tsx`)

Temporary notification messages.

**Usage**:
```tsx
const { toast } = useToast();

toast.success('Item added to cart!');
toast.error('Something went wrong');
toast.info('Processing your request...');
```

---

## Styling & Theming

### How Tailwind CSS Works

This site uses **Tailwind CSS**, a utility-first CSS framework. Instead of writing custom CSS, you apply pre-made classes:

```tsx
<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-bold text-gray-800">Hello</h2>
</div>
```

Classes like `bg-white`, `rounded-lg`, `text-2xl` control background, borders, text size, etc.

### Theme Customization

**File**: `tailwind.config.ts`

This file defines your brand colors, fonts, spacing, and more.

### Brand Colors

The color system is defined in `tailwind.config.ts` (lines 24-138):

```typescript
colors: {
  botanical: {
    DEFAULT: '#2D5A3D',  // Main green
    50: '#F4F7F5',       // Lightest shade
    700: '#2D5A3D',      // Default
    900: '#143A20',      // Darkest shade
  },
  cream: {
    DEFAULT: '#FAF8F5',  // Background cream
    // ... more shades
  },
  charcoal: {
    DEFAULT: '#1E1E1E',  // Dark text
    // ... more shades
  },
  // More colors: sage, blush, terracotta, coral
},
```

**To change the primary brand color**:

1. Open `tailwind.config.ts`
2. Find the `botanical` color definition
3. Replace the hex color codes with your brand colors
4. Save and rebuild (`npm run dev` will auto-reload)

**Pro Tip**: Use a color palette generator like [Coolors](https://coolors.co/) or [Tailwind Shades](https://www.tailwindshades.com/) to create full color scales from a single brand color.

### Fonts

Three fonts are used:

```typescript
fontFamily: {
  display: ['var(--font-fraunces)', ...defaultTheme.fontFamily.serif],  // Headings
  accent: ['var(--font-bellota)', 'sans-serif'],                       // Accent text
  body: ['var(--font-dm-sans)', ...defaultTheme.fontFamily.sans],     // Body text
},
```

- **Fraunces**: Display headings (elegant serif)
- **Bellota**: Accent text (friendly, playful)
- **DM Sans**: Body text (clean, readable)

**To change fonts**:

1. Choose new fonts from [Google Fonts](https://fonts.google.com/)
2. Update font imports (usually in `src/app/layout.tsx`)
3. Update the `fontFamily` config in `tailwind.config.ts`

### Responsive Breakpoints

```typescript
screens: {
  'xs': '375px',   // Small phones
  'sm': '640px',   // Large phones
  'md': '768px',   // Tablets
  'lg': '1024px',  // Small laptops
  'xl': '1280px',  // Desktops
  '2xl': '1440px', // Large desktops
},
```

**Usage in code**:
```tsx
<div className="text-base md:text-lg lg:text-xl">
  {/* Text scales up on larger screens */}
</div>
```

### Spacing and Sizing

Custom spacing units:

```typescript
spacing: {
  '4.5': '1.125rem',  // 18px
  '13': '3.25rem',    // 52px
  '15': '3.75rem',    // 60px
  '18': '4.5rem',     // 72px
  '22': '5.5rem',     // 88px
},
```

### Shadows

Consistent shadow system:

```typescript
boxShadow: {
  'xs': '0 1px 2px rgba(30, 30, 30, 0.04)',
  'sm': '0 2px 4px rgba(30, 30, 30, 0.06)',
  'DEFAULT': '0 4px 8px rgba(30, 30, 30, 0.08)...',
  'lg': '0 8px 16px rgba(30, 30, 30, 0.10)...',
  'botanical': '0 4px 14px rgba(45, 90, 61, 0.25)',
},
```

**Usage**:
```tsx
<div className="shadow-lg">  // Applies large shadow
```

---

## Shopping Cart & Checkout

### How the Cart Works

The shopping cart is powered by **localStorage** (browser-based storage). No database is required.

**Key Features**:
- Add products to cart
- Update quantities
- Remove items
- Persist cart between page reloads
- Clear cart

**Limitations**:
- Cart is tied to a single browser/device
- No server-side validation
- No payment processing (requires custom integration)

### Cart Implementation

**File**: `src/lib/cart.ts`

The `useCart` hook provides cart functionality:

```tsx
import { useCart } from '@/lib/cart';

function MyComponent() {
  const cart = useCart();

  // Add item to cart
  cart.addItem({
    id: '1',
    name: 'Single Balloon Arch',
    description: 'Perfect for entrances',
    price: 150,
    image: '/images/arch.webp',
    type: 'product',
  });

  // Update quantity
  cart.updateQuantity('1', 3);

  // Remove item
  cart.removeItem('1');

  // Get totals
  console.log(cart.total);   // Total price
  console.log(cart.count);   // Total item count
  console.log(cart.items);   // Array of cart items
}
```

### Cart Storage

Cart data is saved to **localStorage** with the key `balloon-displays-cart`.

To view cart data (for debugging):
1. Open browser DevTools (F12)
2. Go to "Application" or "Storage" tab
3. Look under "Local Storage" → `http://localhost:3000`
4. Find the `balloon-displays-cart` key

### Checkout Flow

**Current Implementation** (in `src/app/checkout/page.tsx`):

1. User reviews cart items
2. User fills out contact and event information
3. Form submission displays a "Thank You" message
4. **No payment is processed** (form data is not sent anywhere)

**Warning**: The checkout page is a placeholder. It does not process payments or send order data to a server.

### Integrating Payment Processing

To add real payment processing, you'll need to:

1. **Choose a payment provider**:
   - Stripe (most popular, easy to integrate)
   - PayPal
   - Square
   - Shopify Payments (if migrating to Shopify)

2. **Add backend API routes** (Next.js API routes):
   - Create `src/app/api/create-payment-intent/route.ts`
   - Handle payment processing on the server

3. **Install payment provider SDK**:
   ```bash
   npm install @stripe/stripe-js @stripe/react-stripe-js
   ```

4. **Update checkout page** to use payment provider's components

5. **Set environment variables** for API keys (in `.env.local`):
   ```
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

**Recommendation**: If you're not a developer, consider using a service like Shopify, Wix, or Squarespace for built-in payment processing.

### Clearing Cart After Order

To clear the cart programmatically:

```tsx
cart.clearCart();
```

---

## Navigation

### Desktop Navigation

**File**: `src/components/ui/Navigation.tsx`

The navigation bar appears at the top of every page.

**Navigation Items** (defined in pages, e.g., `src/app/page.tsx` line 144):

```tsx
const navItems = [
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Request a Quote', href: '/inquiry' },
  { label: 'FAQ', href: '/faq' },
];
```

**To add a new navigation link**:

1. Open the page file where `navItems` is defined (usually `src/app/page.tsx`)
2. Add a new object to the array:
   ```tsx
   { label: 'Blog', href: '/blog' },
   ```
3. Ensure the corresponding page exists (`src/app/blog/page.tsx`)

**To remove a navigation link**:

Delete the corresponding line from `navItems`.

**To reorder navigation links**:

Change the order of items in the `navItems` array.

### Mobile Navigation

**Mobile Bottom Bar** (`src/components/ui/BottomNav.tsx`):

On mobile devices (below 1024px wide), a bottom navigation bar appears with 5 icons.

**Bottom Nav Items** (defined in pages, e.g., `src/app/page.tsx` line 153):

```tsx
const bottomNavItems = [
  { icon: <Home />, label: 'Home', href: '/', active: true },
  { icon: <Search />, label: 'Browse', href: '/products' },
  { icon: <Heart />, label: 'Saved', href: '#saved' },
  { icon: <ShoppingBag />, label: 'Cart', href: '#cart', badge: 0 },
  { icon: <User />, label: 'Quote', href: '/inquiry' },
];
```

**To change mobile navigation**:

Edit the `bottomNavItems` array. You can:
- Change the icon (import from `lucide-react`)
- Change the label text
- Change the destination href
- Set `active: true` for the current page

### Hamburger Menu (Mobile)

On mobile, a hamburger icon also opens a slide-down menu with the same items as the desktop nav. This is built into the `Navigation` component.

### Logo

**To change the logo**:

1. If using text logo:
   ```tsx
   <a href="/" className="font-body font-semibold text-2xl text-botanical-700">
     Balloon Displays
   </a>
   ```
   Simply change the text.

2. If using an image logo:
   ```tsx
   <a href="/">
     <img src="/images/logo.webp" alt="Balloon Displays" className="h-10" />
   </a>
   ```
   Replace `src` with your logo image path.

---

## Search Functionality

### How Search Works

The search modal allows users to search products by name, description, or category.

**File**: `src/components/SearchModal.tsx`

**Triggered by**:
- Clicking the search icon in the navigation bar
- Keyboard shortcut (if implemented)

**Search Algorithm**:
The search filters products client-side using the `searchQuery` against product names and descriptions:

```tsx
const filtered = allProducts.filter(product =>
  product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  product.description.toLowerCase().includes(searchQuery.toLowerCase())
);
```

### Customizing Search

**To change what fields are searched**:

Edit the filter function in `SearchModal.tsx`:

```tsx
// Add category to search
const filtered = allProducts.filter(product =>
  product.name.toLowerCase().includes(q) ||
  product.description.toLowerCase().includes(q) ||
  product.category.toLowerCase().includes(q)
);
```

**To add search to the services page**:

Import and use the same `SearchModal` component on the services page.

### Search Placeholder Text

```tsx
<input
  type="text"
  placeholder="Search products..."  // Change this text
  ...
/>
```

---

## Deployment

### Recommended: Vercel (Next.js official platform)

Vercel is the easiest and fastest way to deploy Next.js apps.

**Steps**:

1. **Create a GitHub repository** for your project (if you haven't already)
2. **Push your code** to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/balloon-displays.git
   git push -u origin main
   ```
3. **Go to [vercel.com](https://vercel.com/)** and sign up (free account)
4. **Click "New Project"**
5. **Import your GitHub repository**
6. **Configure settings** (Vercel auto-detects Next.js):
   - Framework: Next.js (auto-detected)
   - Root directory: `./` (default)
   - Build command: `npm run build` (default)
7. **Click "Deploy"**

Your site will be live in 1-2 minutes at a URL like `https://balloon-displays.vercel.app`.

**Custom Domain**:

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your domain (e.g., `balloondisplays.com`)
3. Follow DNS configuration instructions (add A record or CNAME)

### Alternative: Netlify

Similar to Vercel, Netlify offers free hosting:

1. Go to [netlify.com](https://www.netlify.com/)
2. Sign up and connect your GitHub repo
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Deploy

### Self-Hosted (VPS or Cloud Server)

If you have your own server:

1. **Build the app**:
   ```bash
   npm run build
   ```
2. **Start the production server**:
   ```bash
   npm run start
   ```
   The app runs on port 3000 by default.

3. **Set up a reverse proxy** (Nginx or Apache) to route traffic from port 80/443 to port 3000

4. **Use a process manager** like PM2 to keep the app running:
   ```bash
   npm install -g pm2
   pm2 start npm --name "balloon-displays" -- start
   pm2 save
   pm2 startup
   ```

### Environment Variables

If you add environment variables (for API keys, etc.), create a `.env.local` file:

```
NEXT_PUBLIC_SITE_URL=https://balloondisplays.com
STRIPE_SECRET_KEY=sk_live_...
```

**In Vercel/Netlify**: Add environment variables in the dashboard under **Settings** → **Environment Variables**.

**Important**: Variables starting with `NEXT_PUBLIC_` are exposed to the browser. Keep secrets (like API keys) without this prefix.

---

## Common Tasks Quick Reference

| Task | File to Edit | Instructions |
|------|--------------|--------------|
| **Add a new product** | `src/lib/data.ts` | Copy an existing product object in `allProducts` array, change fields, save |
| **Change a product price** | `src/lib/data.ts` | Find product, edit `price: 150,` to new value |
| **Add a product image** | `public/images/` + `src/lib/data.ts` | Add image to folder, update `image:` path in product |
| **Update phone number** | `src/app/page.tsx` | Search for `(555) 123-4567`, replace in contact section AND footer |
| **Update email address** | `src/app/page.tsx` | Search for `hello@balloondisplays.com`, replace all |
| **Change home page hero text** | `src/app/page.tsx` | Edit text in `<h1>` and `<p>` tags in hero section (lines 234-241) |
| **Add a navigation link** | `src/app/page.tsx` | Add object to `navItems` array: `{ label: 'New Page', href: '/new' }` |
| **Change brand color** | `tailwind.config.ts` | Edit color hex codes in `botanical` section (lines 25-38) |
| **Add a customer review** | `src/lib/data.ts` | Find product, add review object to `reviews:` array |
| **Mark product as sold out** | `src/lib/data.ts` | Change `inStock: true,` to `inStock: false,` |
| **Add a sale badge** | `src/lib/data.ts` | Add `badge: 'Sale',` and `originalPrice: 200,` to product |
| **Edit About page** | `src/app/about/page.tsx` | Edit text content in JSX markup |
| **Edit FAQ questions** | `src/app/faq/page.tsx` | Edit FAQ array with questions and answers |
| **Update Instagram handle** | `src/app/page.tsx` | Search for `@balloondisplays`, replace all |
| **Change footer text** | `src/app/page.tsx` | Edit content in `<footer>` section (lines 646-687) |
| **Add a new page** | `src/app/your-page/page.tsx` | Create new folder with `page.tsx` file |

---

## Troubleshooting

### Common Issues and Fixes

#### "Module not found" error

**Problem**: You see an error like `Cannot find module 'next'` or similar.

**Solution**:
```bash
npm install
```
This reinstalls all dependencies.

---

#### Changes not showing in browser

**Problem**: You edited a file but the website looks the same.

**Solutions**:
1. **Hard refresh** the browser:
   - Windows/Linux: Ctrl + Shift + R
   - Mac: Cmd + Shift + R
2. **Restart the dev server**:
   - Stop it (Ctrl+C in terminal)
   - Run `npm run dev` again
3. **Clear browser cache**

---

#### Build fails with TypeScript errors

**Problem**: `npm run build` shows TypeScript errors.

**Common causes**:
- Missing semicolon or comma
- Incorrect data type (e.g., string where number is expected)
- Missing closing bracket or brace

**Solution**:
1. Read the error message carefully — it shows the file and line number
2. Open that file and fix the syntax error
3. Run `npm run build` again

**Tip**: Use a code editor like VS Code with TypeScript support — it highlights errors as you type.

---

#### Images not loading

**Problem**: Product images appear as broken links.

**Checklist**:
1. Image file exists in `public/images/` folder
2. Image filename matches exactly (case-sensitive): `Arch.webp` ≠ `arch.webp`
3. Image path starts with `/`: `/images/arch.webp` not `images/arch.webp`
4. Image format is supported (WebP, PNG, JPEG)
5. Clear browser cache and hard refresh

---

#### Cart not saving between page reloads

**Problem**: Cart empties when you refresh the page.

**Solution**:
- Check browser console (F12) for localStorage errors
- Ensure you're not in Private/Incognito mode (localStorage is disabled)
- Clear browser data and try again
- Check if browser has localStorage enabled

---

#### Styles not applying after changing Tailwind config

**Problem**: Changed a color in `tailwind.config.ts` but site still uses old color.

**Solution**:
1. **Stop the dev server** (Ctrl+C)
2. **Delete the `.next` folder** (cache):
   ```bash
   rm -rf .next
   # or on Windows:
   rmdir /s .next
   ```
3. **Restart dev server**:
   ```bash
   npm run dev
   ```

---

#### Port 3000 already in use

**Problem**: Error: "Port 3000 is already in use"

**Solution**:
- **Find and stop the process** using port 3000, or
- **Use a different port**:
  ```bash
  npm run dev -- -p 3001
  ```
  Site will run on `http://localhost:3001`

---

#### "Cannot read property of undefined" error

**Problem**: JavaScript error in browser console.

**Common cause**: Accessing a property that doesn't exist.

**Example**:
```tsx
product.image  // Error if product is undefined
```

**Solution**: Add safety checks:
```tsx
product?.image  // Returns undefined if product is null
```

---

### Getting Help

If you're stuck:

1. **Check the error message** carefully — it often tells you exactly what's wrong
2. **Search the error** on Google or Stack Overflow
3. **Consult Next.js documentation**: [nextjs.org/docs](https://nextjs.org/docs)
4. **Consult Tailwind CSS documentation**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
5. **Check the GitHub repository** for similar issues

---

## Conclusion

You now have a comprehensive guide to managing the Balloon Displays website. Remember:

- **Product and service data** lives in `src/lib/data.ts`
- **Images** go in `public/images/`
- **Page content** is in `src/app/[page-name]/page.tsx`
- **Theme colors and fonts** are configured in `tailwind.config.ts`

Always test your changes locally with `npm run dev` before deploying to production.

For questions or issues, refer to the [Troubleshooting](#troubleshooting) section or consult the official Next.js and Tailwind CSS documentation.

**Happy editing!**
