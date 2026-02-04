'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Home,
  Search,
  Heart,
  ShoppingBag,
  User,
  ArrowLeft,
  SlidersHorizontal,
  Eye,
  Star,
  ChevronRight,
  ShoppingCart,
  Check,
} from 'lucide-react';

import {
  Button,
  Badge,
  Navigation,
  BottomNav,
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  PriceDisplay,
  QuantitySelector,
  Toast,
  ToastContainer,
  useToast,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
} from '@/components/ui';
import { cn, formatPrice } from '@/lib/utils';
import { allProducts, categories, type Product } from '@/lib/data';
import { useCart } from '@/lib/cart';
import { SearchModal } from '@/components/SearchModal';

const navItems = [
  { label: 'Products', href: '/products', active: true },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Request a Quote', href: '/inquiry' },
  { label: 'FAQ', href: '/faq' },
];

const bottomNavItems = [
  { icon: <Home />, label: 'Home', href: '/' },
  { icon: <Search />, label: 'Browse', href: '/products', active: true },
  { icon: <Heart />, label: 'Saved', href: '/#saved' },
  { icon: <ShoppingBag />, label: 'Cart', href: '/#cart' },
  { icon: <User />, label: 'Quote', href: '/inquiry' },
];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A-Z' },
  { value: 'name-desc', label: 'Name: Z-A' },
];

const priceRanges = [
  { value: 'all', label: 'All Prices' },
  { value: '0-50', label: 'Under $50' },
  { value: '50-150', label: '$50 - $150' },
  { value: '150-300', label: '$150 - $300' },
  { value: '300+', label: '$300+' },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('featured');
  const [priceRange, setPriceRange] = React.useState('all');
  const [typeFilter, setTypeFilter] = React.useState<'all' | 'product' | 'service'>('all');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [quickViewProduct, setQuickViewProduct] = React.useState<Product | null>(null);
  const [quickViewQuantity, setQuickViewQuantity] = React.useState(1);
  const [cartOpen, setCartOpen] = React.useState(false);

  const cart = useCart();
  const { toasts, toast, removeToast } = useToast();

  const addToCart = (product: Product, quantity: number = 1) => {
    cart.addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      type: product.type === 'service' ? 'service' : 'product',
    }, quantity);
    toast.success(`Added ${product.name} to cart`);
  };

  const filteredProducts = React.useMemo(() => {
    let result = [...allProducts];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (typeFilter !== 'all') {
      result = result.filter(p => p.type === typeFilter);
    }
    if (priceRange !== 'all') {
      if (priceRange === '300+') {
        result = result.filter(p => p.price >= 300);
      } else {
        const [min, max] = priceRange.split('-').map(Number);
        result = result.filter(p => p.price >= min && p.price <= max);
      }
    }

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'name-asc': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc': result.sort((a, b) => b.name.localeCompare(a.name)); break;
    }

    return result;
  }, [selectedCategory, sortBy, priceRange, typeFilter]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSortBy('featured');
    setPriceRange('all');
    setTypeFilter('all');
  };

  const hasActiveFilters = selectedCategory !== 'all' || priceRange !== 'all' || typeFilter !== 'all';

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setQuickViewQuantity(1);
  };

  // Reusable filter UI (shared between desktop sidebar and mobile drawer)
  const filterContent = (
    <div className="space-y-6">
      {/* Type */}
      <div>
        <h4 className="text-sm font-medium text-charcoal-600 mb-3">Type</h4>
        <div className="space-y-2">
          {([
            { value: 'all' as const, label: 'All' },
            { value: 'product' as const, label: 'Products' },
            { value: 'service' as const, label: 'Services' },
          ]).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setTypeFilter(option.value)}
              className="flex items-center gap-3 w-full text-left cursor-pointer group py-0.5"
            >
              <div className={cn(
                'w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
                typeFilter === option.value
                  ? 'bg-botanical-700 border-botanical-700'
                  : 'border-cream-400 group-hover:border-charcoal-300'
              )}>
                {typeFilter === option.value && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="text-sm text-charcoal-600">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <h4 className="text-sm font-medium text-charcoal-600 mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className="flex items-center gap-3 w-full text-left cursor-pointer group py-0.5"
            >
              <div className={cn(
                'w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
                selectedCategory === cat.id
                  ? 'bg-botanical-700 border-botanical-700'
                  : 'border-cream-400 group-hover:border-charcoal-300'
              )}>
                {selectedCategory === cat.id && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="text-sm text-charcoal-600">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-sm font-medium text-charcoal-600 mb-3">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.value}
              type="button"
              onClick={() => setPriceRange(range.value)}
              className="flex items-center gap-3 w-full text-left cursor-pointer group py-0.5"
            >
              <div className={cn(
                'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
                priceRange === range.value
                  ? 'bg-botanical-700 border-botanical-700'
                  : 'border-cream-400 group-hover:border-charcoal-300'
              )}>
                {priceRange === range.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <span className="text-sm text-charcoal-600">{range.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <label htmlFor="sidebar-sort" className="text-sm font-medium text-charcoal-600 mb-3 block">Sort By</label>
        <select
          id="sidebar-sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-cream-400 bg-white text-sm text-charcoal-600 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Navigation
        items={navItems}
        cartCount={cart.count}
        onCartClick={() => setCartOpen(true)}
        onSearchClick={() => setSearchOpen(true)}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-cream-100 via-blush-50 to-botanical-50 pt-8 pb-16">
        <div className="container-florista">
          <nav className="mb-8 animate-fade-in">
            <Link href="/" className="inline-flex items-center gap-2 text-charcoal-500 hover:text-botanical-700 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </nav>
          <div className="max-w-2xl animate-fade-in-up">
            <Badge variant="botanical" className="mb-4">Shop</Badge>
            <h1 className="font-accent text-display-md md:text-display-lg text-charcoal-700 mb-4">
              All Products
            </h1>
            <p className="text-lg text-charcoal-500 leading-relaxed">
              Browse our complete collection of balloon displays and decorations.
              Find the perfect piece for your next celebration.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden sticky top-[72px] z-sticky bg-white border-b border-cream-300 py-3">
        <div className="container-florista flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cream-200 text-charcoal-600 text-sm font-medium hover:bg-cream-300 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters & Sort
            {hasActiveFilters && (
              <span className="w-5 h-5 rounded-full bg-botanical-700 text-cream-100 text-xs flex items-center justify-center">!</span>
            )}
          </button>
          <span className="text-sm text-charcoal-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-8 bg-cream-100">
        <div className="container-florista">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-[260px] flex-shrink-0">
              <div className="sticky top-[96px] space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-body font-semibold text-charcoal-700">Filters</h3>
                    {hasActiveFilters && (
                      <button onClick={clearFilters} className="text-xs text-botanical-700 hover:underline font-medium">
                        Clear all
                      </button>
                    )}
                  </div>
                  {filterContent}
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1 min-w-0">
              <div className="hidden lg:flex items-center justify-between mb-6">
                <p className="text-sm text-charcoal-500">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
                </p>
                <label htmlFor="desktop-sort" className="sr-only">Sort by</label>
                <select
                  id="desktop-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-cream-400 bg-white text-sm text-charcoal-600 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-charcoal-500 text-lg mb-4">No products match your filters.</p>
                  <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <ProductGridCard
                      key={product.id}
                      product={product}
                      index={index}
                      onAddToCart={() => addToCart(product)}
                      onQuickView={() => openQuickView(product)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-700 text-cream-100 py-12">
        <div className="container-florista">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="font-body text-xl text-white">Balloon Displays</h3>
              <p className="text-cream-400 text-sm mt-1">Creating unforgettable moments</p>
            </div>
            <div className="flex gap-6">
              <Link href="/" className="text-cream-300 hover:text-white transition-colors text-sm">Home</Link>
              <Link href="/products" className="text-cream-300 hover:text-white transition-colors text-sm">Products</Link>
              <Link href="/services" className="text-cream-300 hover:text-white transition-colors text-sm">Services</Link>
              <Link href="/gallery" className="text-cream-300 hover:text-white transition-colors text-sm">Gallery</Link>
              <Link href="/inquiry" className="text-cream-300 hover:text-white transition-colors text-sm">Request a Quote</Link>
              <Link href="/faq" className="text-cream-300 hover:text-white transition-colors text-sm">FAQ</Link>
            </div>
          </div>
          <div className="border-t border-charcoal-600 mt-8 pt-8 text-center text-cream-400 text-sm">
            <p>2026 Balloon Displays. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Filter Drawer */}
      <Drawer open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <DrawerContent position="left" size="sm">
          <DrawerHeader><DrawerTitle>Filters & Sort</DrawerTitle></DrawerHeader>
          <DrawerBody>{filterContent}</DrawerBody>
          <DrawerFooter className="flex gap-3">
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} className="flex-1">Clear All</Button>
            )}
            <Button onClick={() => setSidebarOpen(false)} className="flex-1">
              Show {filteredProducts.length} Results
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Search Modal */}
      <SearchModal
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onAddedToCart={(product) => toast.success(`Added ${product.name} to cart`)}
      />

      {/* Quick View Modal */}
      <Modal open={quickViewProduct !== null} onOpenChange={(open) => { if (!open) setQuickViewProduct(null); }}>
        <ModalContent size="lg">
          {quickViewProduct && (
            <>
              <ModalHeader>
                <ModalTitle>{quickViewProduct.name}</ModalTitle>
                <ModalDescription>{quickViewProduct.type === 'service' ? 'Service' : 'Product'}</ModalDescription>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <div className="aspect-[4/5] rounded-xl overflow-hidden bg-cream-200">
                      <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="md:w-1/2 flex flex-col">
                    {quickViewProduct.badge && (
                      <Badge variant={quickViewProduct.badge === 'Sale' ? 'warning' : 'botanical'} className="w-fit mb-3">
                        {quickViewProduct.badge}
                      </Badge>
                    )}
                    <p className="text-charcoal-500 text-sm leading-relaxed mb-4">
                      {quickViewProduct.longDescription.slice(0, 200)}...
                    </p>
                    <div className="flex items-center gap-3 mb-4">
                      {quickViewProduct.originalPrice && (
                        <span className="text-charcoal-300 line-through text-lg">{formatPrice(quickViewProduct.originalPrice)}</span>
                      )}
                      <span className="font-body font-semibold text-2xl text-charcoal-700">{formatPrice(quickViewProduct.price)}</span>
                    </div>
                    {quickViewProduct.reviews.length > 0 && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={cn('w-4 h-4', i < Math.round(quickViewProduct.reviews.reduce((s, r) => s + r.rating, 0) / quickViewProduct.reviews.length) ? 'fill-terracotta-400 text-terracotta-400' : 'text-cream-400')} />
                          ))}
                        </div>
                        <span className="text-sm text-charcoal-500">({quickViewProduct.reviews.length} {quickViewProduct.reviews.length === 1 ? 'review' : 'reviews'})</span>
                      </div>
                    )}
                    <ul className="space-y-1.5 mb-6">
                      {quickViewProduct.features.slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-charcoal-600">
                          <Check className="w-3.5 h-3.5 text-botanical-600 flex-shrink-0" />{feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-charcoal-600">Qty:</span>
                        <QuantitySelector value={quickViewQuantity} onChange={setQuickViewQuantity} min={1} max={20} size="sm" />
                      </div>
                      <Button fullWidth size="lg" leftIcon={<ShoppingCart className="w-5 h-5" />}
                        onClick={() => { addToCart(quickViewProduct, quickViewQuantity); setQuickViewProduct(null); }}>
                        Add to Cart - {formatPrice(quickViewProduct.price * quickViewQuantity)}
                      </Button>
                      <Button variant="outline" fullWidth asChild>
                        <Link href={`/products/${quickViewProduct.id}`}>View Full Details<ChevronRight className="w-4 h-4 ml-1" /></Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Cart Drawer */}
      <Drawer open={cartOpen} onOpenChange={setCartOpen}>
        <DrawerContent position="right" size="md">
          <DrawerHeader><DrawerTitle>Your Cart ({cart.count})</DrawerTitle></DrawerHeader>
          <DrawerBody>
            {cart.items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 mx-auto text-cream-400 mb-4" />
                <p className="text-charcoal-500">Your cart is empty</p>
                <Button variant="outline" className="mt-4" onClick={() => setCartOpen(false)}>Browse Products</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-cream-200 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <PriceDisplay price={item.price} size="sm" />
                      <QuantitySelector value={item.quantity} onChange={(val) => cart.updateQuantity(item.id, val)} size="sm" className="mt-2" min={0} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </DrawerBody>
          {cart.items.length > 0 && (
            <DrawerFooter className="space-y-4">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span className="font-semibold">${cart.total.toFixed(2)} CAD</span>
              </div>
              <Button size="lg" fullWidth asChild>
                <Link href="/checkout">Checkout</Link>
              </Button>
              <p className="text-center text-sm text-charcoal-400">We'll contact you to confirm details and arrange payment</p>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>

      <BottomNav items={bottomNavItems.map(item => ({ ...item, badge: item.label === 'Cart' ? cart.count : undefined }))} />

      <ToastContainer position="bottom-right">
        {toasts.map((t) => (<Toast key={t.id} {...t} onClose={() => removeToast(t.id)} />))}
      </ToastContainer>
    </div>
  );
}

interface ProductGridCardProps {
  product: Product;
  index: number;
  onAddToCart: () => void;
  onQuickView: () => void;
}

function ProductGridCard({ product, index, onAddToCart, onQuickView }: ProductGridCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const avgRating = product.reviews.length > 0
    ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length : 0;

  return (
    <article className="group animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-cream-200 mb-4">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
          {product.badge && (
            <div className="absolute top-3 left-3">
              <Badge variant={product.badge === 'Sale' ? 'warning' : product.badge === 'New Display' ? 'info' : 'botanical'} size="sm">{product.badge}</Badge>
            </div>
          )}
          {product.type === 'service' && (
            <div className="absolute top-3 right-3">
              <Badge variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">Service</Badge>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <div className="flex gap-2">
              <Button size="sm" className="flex-1" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddToCart(); }} leftIcon={<ShoppingCart className="h-4 w-4" />}>
                Add to Cart
              </Button>
              <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm border-white/50" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView(); }} aria-label={`Quick view ${product.name}`}>
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-body font-medium text-lg text-charcoal-700 group-hover:text-botanical-700 transition-colors">{product.name}</h3>
          <p className="text-sm text-charcoal-400 mt-1 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              {hasDiscount && <span className="text-sm text-charcoal-300 line-through">{formatPrice(product.originalPrice!)}</span>}
              <span className="font-body font-semibold text-charcoal-700">{formatPrice(product.price)}</span>
            </div>
            {avgRating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-terracotta-400 text-terracotta-400" />
                <span className="text-xs text-charcoal-500">{avgRating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
