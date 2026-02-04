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
  X,
  Send,
} from 'lucide-react';

import {
  Button,
  Badge,
  Card,
  Navigation,
  BottomNav,
  Toast,
  ToastContainer,
  useToast,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
  PriceDisplay,
  QuantitySelector,
} from '@/components/ui';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/cart';

const navItems = [
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Request a Quote', href: '/inquiry', active: true },
  { label: 'FAQ', href: '/faq' },
];

const bottomNavItems = [
  { icon: <Home />, label: 'Home', href: '/' },
  { icon: <Search />, label: 'Browse', href: '/products' },
  { icon: <Heart />, label: 'Saved', href: '/#saved' },
  { icon: <ShoppingBag />, label: 'Cart', href: '/#cart' },
  { icon: <User />, label: 'Quote', href: '/inquiry', active: true },
];

export default function InquiryPage() {
  const cart = useCart();
  const { toasts, toast, removeToast } = useToast();
  const [submitted, setSubmitted] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Inquiry submitted! We\'ll get back to you within 24 hours.');
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Navigation
        items={navItems}
        cartCount={cart.count}
        onCartClick={() => setCartOpen(true)}
        onSearchClick={() => toast.info('Search coming soon!')}
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
            <Badge variant="botanical" className="mb-4">Get in Touch</Badge>
            <h1 className="font-accent text-display-md md:text-display-lg text-charcoal-700 mb-4">
              Request a Quote
            </h1>
            <p className="text-lg text-charcoal-500 leading-relaxed">
              Tell us about your event and we'll put together a custom quote for you.
              We typically respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 bg-cream-100">
        <div className="container-florista">
          <div className="max-w-4xl mx-auto">
            {submitted ? (
              <Card variant="elevated" className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-botanical-100 flex items-center justify-center">
                  <Send className="w-8 h-8 text-botanical-600" />
                </div>
                <h2 className="font-body text-display-xs text-charcoal-700 mb-3">
                  Inquiry Submitted!
                </h2>
                <p className="text-charcoal-500 mb-8 max-w-md mx-auto">
                  Thank you for your inquiry. We've received your request and will get back to you within 24 hours with a custom quote.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild>
                    <Link href="/products">Continue Browsing</Link>
                  </Button>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Submit Another Inquiry
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="space-y-8">
                {/* Form */}
                <Card variant="elevated" className="p-8">
                  <h2 className="font-body text-xl text-charcoal-700 mb-6">Event Details</h2>
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="inquiry-name" className="block text-sm font-medium text-charcoal-600 mb-2">Your Name *</label>
                        <input
                          id="inquiry-name"
                          type="text"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label htmlFor="inquiry-email" className="block text-sm font-medium text-charcoal-600 mb-2">Email *</label>
                        <input
                          id="inquiry-email"
                          type="email"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="inquiry-phone" className="block text-sm font-medium text-charcoal-600 mb-2">Phone Number</label>
                        <input
                          id="inquiry-phone"
                          type="tel"
                          className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label htmlFor="inquiry-date" className="block text-sm font-medium text-charcoal-600 mb-2">Event Date *</label>
                        <input
                          id="inquiry-date"
                          type="date"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="inquiry-event-type" className="block text-sm font-medium text-charcoal-600 mb-2">Event Type *</label>
                        <select
                          id="inquiry-event-type"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors bg-white"
                        >
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
                        <label htmlFor="inquiry-guests" className="block text-sm font-medium text-charcoal-600 mb-2">Estimated Guest Count</label>
                        <input
                          id="inquiry-guests"
                          type="number"
                          className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                          placeholder="50"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="inquiry-details" className="block text-sm font-medium text-charcoal-600 mb-2">Tell us about your event *</label>
                      <textarea
                        id="inquiry-details"
                        rows={5}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors resize-none"
                        placeholder="Describe your event, venue, guest count, color preferences, and any specific balloon display ideas you have in mind..."
                      />
                    </div>

                    {/* Cart Items Inline */}
                    {cart.items.length > 0 && (
                      <div className="p-5 rounded-xl bg-botanical-50 border border-botanical-200">
                        <h3 className="font-body font-semibold text-charcoal-700 mb-3">Your Selected Items</h3>
                        <div className="space-y-3 mb-4">
                          {cart.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg overflow-hidden bg-cream-200 flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-charcoal-700 truncate">{item.name}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-charcoal-400">
                                    {item.type === 'addon' ? 'Add-on' : ''} x{item.quantity}
                                  </span>
                                  <span className="text-sm font-semibold text-charcoal-700">
                                    {formatPrice(item.price * item.quantity)}
                                  </span>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => cart.removeItem(item.id)}
                                className="p-1 text-charcoal-400 hover:text-charcoal-600 transition-colors"
                                aria-label={`Remove ${item.name}`}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-botanical-200 pt-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-charcoal-600">Estimated Total</span>
                            <span className="font-body font-semibold text-lg text-charcoal-700">
                              {formatPrice(cart.total)}
                            </span>
                          </div>
                          <p className="text-xs text-charcoal-400 mt-1">
                            These items will be included with your inquiry. Final pricing may vary based on customization.
                          </p>
                        </div>
                      </div>
                    )}

                    <Button type="submit" size="lg" fullWidth leftIcon={<Send className="w-5 h-5" />}>
                      Submit Inquiry
                    </Button>
                  </form>
                </Card>

                {cart.items.length === 0 && (
                  <div className="text-center">
                    <p className="text-sm text-charcoal-400 mb-3">
                      Want to include specific products with your inquiry?
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/products">Browse Products</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}
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

      {/* Cart Drawer */}
      <Drawer open={cartOpen} onOpenChange={setCartOpen}>
        <DrawerContent position="right" size="md">
          <DrawerHeader>
            <DrawerTitle>Your Cart ({cart.count})</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            {cart.items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 mx-auto text-cream-400 mb-4" />
                <p className="text-charcoal-500">Your cart is empty</p>
                <Button variant="outline" className="mt-4" onClick={() => setCartOpen(false)}>
                  Browse Products
                </Button>
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
                      <QuantitySelector
                        value={item.quantity}
                        onChange={(val) => cart.updateQuantity(item.id, val)}
                        size="sm"
                        className="mt-2"
                        min={0}
                      />
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
              <p className="text-center text-sm text-charcoal-400">
                We'll contact you to confirm details and arrange payment
              </p>
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
