'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  Home,
  Search,
  Heart,
  ShoppingBag,
  User,
  Star,
  Check,
  ChevronRight,
  ShoppingCart,
  Calendar,
} from 'lucide-react';

import {
  Button,
  Badge,
  Card,
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
import { allProducts, getProductById, getProductAddOns, type Product } from '@/lib/data';
import { useCart } from '@/lib/cart';
import { SearchModal } from '@/components/SearchModal';

const navItems = [
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Request a Quote', href: '/inquiry' },
  { label: 'FAQ', href: '/faq' },
];

const bottomNavItems = [
  { icon: <Home />, label: 'Home', href: '/' },
  { icon: <Search />, label: 'Browse', href: '/products' },
  { icon: <Heart />, label: 'Saved', href: '/#saved' },
  { icon: <ShoppingBag />, label: 'Cart', href: '/#cart' },
  { icon: <User />, label: 'Quote', href: '/inquiry' },
];

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);

  const [selectedImage, setSelectedImage] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedAddOns, setSelectedAddOns] = React.useState<Record<string, number>>({});
  const [bookingModalOpen, setBookingModalOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  const cart = useCart();
  const { toasts, toast, removeToast } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-100">
        <div className="text-center">
          <h1 className="font-body text-display-md text-charcoal-700 mb-4">Product Not Found</h1>
          <p className="text-charcoal-500 mb-6">The product you're looking for doesn't exist.</p>
          <Button asChild><Link href="/products">Browse All Products</Link></Button>
        </div>
      </div>
    );
  }

  const productAddOns = getProductAddOns(product);
  const isService = product.type === 'service';

  const handleAddToCart = () => {
    // Add main product
    cart.addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      type: isService ? 'service' : 'product',
    }, quantity);

    // Add selected add-ons
    Object.entries(selectedAddOns).forEach(([addOnId, qty]) => {
      if (qty > 0) {
        const addOn = productAddOns.find(a => a.id === addOnId);
        if (addOn) {
          cart.addItem({
            id: `addon-${addOn.id}`,
            name: addOn.name,
            description: addOn.description,
            price: addOn.price,
            image: product.image,
            type: 'addon',
          }, qty);
        }
      }
    });

    toast.success(`Added ${product.name} to cart`);
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => {
      if (prev[addOnId]) {
        const next = { ...prev };
        delete next[addOnId];
        return next;
      }
      return { ...prev, [addOnId]: 1 };
    });
  };

  const addOnTotal = Object.entries(selectedAddOns).reduce((sum, [id, qty]) => {
    const addOn = productAddOns.find(a => a.id === id);
    return sum + (addOn ? addOn.price * qty : 0);
  }, 0);

  const totalPrice = product.price * quantity + addOnTotal;

  const avgRating = product.reviews.length > 0
    ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length : 0;

  const suggestedProducts = allProducts
    .filter(p => p.id !== product.id)
    .sort((a, b) => (a.category === product.category ? -1 : 1))
    .slice(0, 4);

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Navigation
        items={navItems}
        cartCount={cart.count}
        onCartClick={() => setCartOpen(true)}
        onSearchClick={() => setSearchOpen(true)}
      />

      {/* Breadcrumbs */}
      <section className="bg-cream-100 border-b border-cream-300 py-4">
        <div className="container-florista">
          <nav className="flex items-center gap-2 text-sm text-charcoal-500">
            <Link href="/" className="hover:text-botanical-700 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-botanical-700 transition-colors">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-charcoal-700 font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-8 md:py-12 bg-cream-100">
        <div className="container-florista">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-cream-200 relative">
                <Image src={product.images[selectedImage] || product.image} alt={product.name} fill className="object-cover" priority />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button key={i} onClick={() => setSelectedImage(i)}
                      className={cn('w-20 h-20 rounded-lg overflow-hidden border-2 transition-all relative',
                        selectedImage === i ? 'border-botanical-700 ring-2 ring-botanical-200' : 'border-transparent hover:border-cream-400')}>
                      <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                {product.badge && (
                  <Badge variant={product.badge === 'Sale' ? 'warning' : product.badge === 'New Display' ? 'info' : 'botanical'}>{product.badge}</Badge>
                )}
                {isService && <Badge variant="outline">Service</Badge>}
              </div>

              <h1 className="font-accent text-display-sm md:text-display-md text-charcoal-700 mb-3">{product.name}</h1>

              {product.reviews.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn('w-5 h-5', i < Math.round(avgRating) ? 'fill-terracotta-400 text-terracotta-400' : 'text-cream-400')} />
                    ))}
                  </div>
                  <span className="text-sm text-charcoal-500">{avgRating.toFixed(1)} ({product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'})</span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                {product.originalPrice && <span className="text-xl text-charcoal-300 line-through">{formatPrice(product.originalPrice)}</span>}
                <span className="font-body font-semibold text-3xl text-charcoal-700">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <Badge variant="warning" size="sm">{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</Badge>
                )}
              </div>

              <p className="text-charcoal-500 leading-relaxed mb-6">{product.longDescription}</p>

              <div className="mb-8">
                <h3 className="font-body font-semibold text-lg text-charcoal-700 mb-3">Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-botanical-600 flex-shrink-0" />
                      <span className="text-sm text-charcoal-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Note about free setup */}
              <div className="mb-6 p-3 rounded-lg bg-botanical-50 border border-botanical-200">
                <p className="text-sm text-botanical-800">Free professional setup and takedown included with every display order.</p>
              </div>

              <div className="border-t border-cream-300 pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-medium text-charcoal-600">Quantity:</span>
                  <QuantitySelector value={quantity} onChange={setQuantity} min={1} max={50} />
                </div>
                <div className="flex gap-3">
                  {isService ? (
                    <Button size="lg" fullWidth leftIcon={<Calendar className="w-5 h-5" />} onClick={() => setBookingModalOpen(true)}>
                      Book Now - {formatPrice(totalPrice)}
                    </Button>
                  ) : (
                    <Button size="lg" fullWidth leftIcon={<ShoppingCart className="w-5 h-5" />} onClick={handleAddToCart}>
                      Add to Cart - {formatPrice(totalPrice)}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add-Ons Section */}
      {productAddOns.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container-florista">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <Badge variant="botanical" className="mb-3">Customize Your Order</Badge>
                <h2 className="font-accent text-display-xs md:text-display-sm text-charcoal-700 mb-2">Add-Ons & Extras</h2>
                <p className="text-charcoal-500">Enhance your {isService ? 'service' : 'display'} with these popular additions</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {productAddOns.map((addOn) => {
                  const isSelected = !!selectedAddOns[addOn.id];
                  return (
                    <button
                      key={addOn.id}
                      type="button"
                      onClick={() => toggleAddOn(addOn.id)}
                      className={cn(
                        'flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all',
                        isSelected ? 'border-botanical-700 bg-botanical-50' : 'border-cream-300 bg-white hover:border-botanical-300'
                      )}
                    >
                      <div className={cn(
                        'w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors',
                        isSelected ? 'bg-botanical-700 border-botanical-700' : 'border-cream-400'
                      )}>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-medium text-charcoal-700">{addOn.name}</h4>
                          <span className="font-semibold text-botanical-700 whitespace-nowrap">+{formatPrice(addOn.price)}</span>
                        </div>
                        <p className="text-sm text-charcoal-500 mt-1">{addOn.description}</p>
                        {isSelected && (
                          <div className="flex items-center gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
                            <span className="text-xs text-charcoal-500">Qty:</span>
                            <QuantitySelector
                              value={selectedAddOns[addOn.id]}
                              onChange={(val) => setSelectedAddOns(prev => ({ ...prev, [addOn.id]: val }))}
                              min={1}
                              max={10}
                              size="sm"
                            />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {addOnTotal > 0 && (
                <div className="mt-6 p-4 rounded-xl bg-botanical-50 border border-botanical-200">
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-600">Add-ons total: <span className="font-semibold">{formatPrice(addOnTotal)}</span></span>
                    <span className="font-body font-semibold text-lg text-charcoal-700">Order total: {formatPrice(totalPrice)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      {product.reviews.length > 0 && (
        <section className="py-12 bg-cream-100">
          <div className="container-florista">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-accent text-display-xs md:text-display-sm text-charcoal-700 mb-1">Customer Reviews</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn('w-5 h-5', i < Math.round(avgRating) ? 'fill-terracotta-400 text-terracotta-400' : 'text-cream-400')} />
                      ))}
                    </div>
                    <span className="text-charcoal-500">{avgRating.toFixed(1)} out of 5 ({product.reviews.length} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <Card key={review.id} variant="elevated" className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-charcoal-700">{review.name}</h4>
                        {review.event && <span className="text-xs text-charcoal-400">{review.event}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={cn('w-4 h-4', i < review.rating ? 'fill-terracotta-400 text-terracotta-400' : 'text-cream-400')} />
                          ))}
                        </div>
                        <span className="text-xs text-charcoal-400">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                    <p className="text-charcoal-600 leading-relaxed">{review.text}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Suggested Products */}
      <section className="py-12 bg-white">
        <div className="container-florista">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-accent text-display-xs md:text-display-sm text-charcoal-700">You Might Also Like</h2>
            <Button variant="ghost" asChild><Link href="/products">View All<ChevronRight className="w-4 h-4 ml-1" /></Link></Button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestedProducts.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group">
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-cream-200 mb-3 relative">
                  <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="font-body font-medium text-charcoal-700 group-hover:text-botanical-700 transition-colors">{p.name}</h3>
                <span className="font-body font-semibold text-sm text-charcoal-700">{formatPrice(p.price)}</span>
              </Link>
            ))}
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
          <div className="border-t border-charcoal-600 mt-8 pt-8 text-center text-cream-400 text-sm"><p>2026 Balloon Displays. All rights reserved.</p></div>
        </div>
      </footer>

      {/* Search Modal */}
      <SearchModal
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onAddedToCart={(product) => toast.success(`Added ${product.name} to cart`)}
      />

      {/* Booking Modal */}
      <Modal open={bookingModalOpen} onOpenChange={setBookingModalOpen}>
        <ModalContent size="lg">
          <ModalHeader>
            <ModalTitle>Book {product.name}</ModalTitle>
            <ModalDescription>Fill in the details below and we'll confirm your booking</ModalDescription>
          </ModalHeader>
          <ModalBody>
            <form className="space-y-5" onSubmit={(e) => {
              e.preventDefault();
              setBookingModalOpen(false);
              toast.success('Booking request submitted! We\'ll be in touch shortly.');
            }}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pd-booking-name" className="block text-sm font-medium text-charcoal-600 mb-2">Your Name *</label>
                  <input id="pd-booking-name" type="text" required className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors" placeholder="John Smith" />
                </div>
                <div>
                  <label htmlFor="pd-booking-phone" className="block text-sm font-medium text-charcoal-600 mb-2">Phone Number *</label>
                  <input id="pd-booking-phone" type="tel" required className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors" placeholder="(555) 123-4567" />
                </div>
              </div>
              <div>
                <label htmlFor="pd-booking-email" className="block text-sm font-medium text-charcoal-600 mb-2">Email *</label>
                <input id="pd-booking-email" type="email" required className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors" placeholder="john@example.com" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pd-booking-date" className="block text-sm font-medium text-charcoal-600 mb-2">Event Date *</label>
                  <input id="pd-booking-date" type="date" required className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors" />
                </div>
                <div>
                  <label htmlFor="pd-booking-time" className="block text-sm font-medium text-charcoal-600 mb-2">Event Time</label>
                  <input id="pd-booking-time" type="time" className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors" />
                </div>
              </div>
              <div>
                <label htmlFor="pd-booking-event-type" className="block text-sm font-medium text-charcoal-600 mb-2">Event Type *</label>
                <select id="pd-booking-event-type" required className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors bg-white">
                  <option value="">Select event type</option>
                  <option>Birthday Party</option>
                  <option>Wedding</option>
                  <option>Corporate Event</option>
                  <option>Baby Shower</option>
                  <option>Graduation</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="pd-booking-venue" className="block text-sm font-medium text-charcoal-600 mb-2">Venue Address</label>
                <input id="pd-booking-venue" type="text" className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors" placeholder="123 Main St, Toronto, ON" />
              </div>
              <div>
                <label htmlFor="pd-booking-requests" className="block text-sm font-medium text-charcoal-600 mb-2">Special Requests</label>
                <textarea id="pd-booking-requests" rows={3} className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors resize-none" placeholder="Tell us about any specific requirements..." />
              </div>
              <div className="p-4 rounded-lg bg-botanical-50 border border-botanical-200">
                <div className="flex items-center justify-between">
                  <span className="text-charcoal-600">{product.name}{quantity > 1 && ` x${quantity}`}</span>
                  <span className="font-semibold text-charcoal-700">{formatPrice(product.price * quantity)}</span>
                </div>
                {addOnTotal > 0 && (
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-botanical-200">
                    <span className="text-sm text-charcoal-600">Add-ons</span>
                    <span className="font-semibold text-charcoal-700">{formatPrice(addOnTotal)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-botanical-200">
                  <span className="font-medium text-charcoal-700">Total</span>
                  <span className="font-body font-semibold text-lg text-botanical-700">{formatPrice(totalPrice)}</span>
                </div>
              </div>
              <Button type="submit" size="lg" fullWidth>Submit Booking Request</Button>
            </form>
          </ModalBody>
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
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-cream-200 flex-shrink-0 relative">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      {item.type === 'addon' && <span className="text-xs text-botanical-600">Add-on</span>}
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
              <Button size="lg" fullWidth asChild><Link href="/checkout">Checkout</Link></Button>
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
