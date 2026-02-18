'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  Search,
  Heart,
  ShoppingBag,
  User,
  ArrowLeft,
  Trash2,
  Send,
  CalendarDays,
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
  PriceDisplay,
  QuantitySelector,
} from '@/components/ui';
import { formatPrice } from '@/lib/utils';
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

function getMinDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toISOString().split('T')[0];
}

export default function CheckoutPage() {
  const cart = useCart();
  const { toasts, toast, removeToast } = useToast();
  const [submitted, setSubmitted] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  const minDate = React.useMemo(() => getMinDate(), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Order submitted! We\'ll be in touch shortly to confirm your booking.');
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Navigation
        items={navItems}
        cartCount={cart.count}
        onSearchClick={() => setSearchOpen(true)}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-cream-100 via-blush-50 to-botanical-50 pt-8 pb-16">
        <div className="container-florista">
          <nav className="mb-8 animate-fade-in">
            <Link href="/products" className="inline-flex items-center gap-2 text-charcoal-500 hover:text-botanical-700 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Continue Shopping</span>
            </Link>
          </nav>
          <div className="max-w-2xl animate-fade-in-up">
            <Badge variant="botanical" className="mb-4">Checkout</Badge>
            <h1 className="font-accent text-display-md md:text-display-lg text-charcoal-700 mb-4">
              Complete Your Order
            </h1>
            <p className="text-lg text-charcoal-500 leading-relaxed">
              Review your items and provide your details to finalize your order.
            </p>
          </div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-12 bg-cream-100">
        <div className="container-florista">
          <div className="max-w-4xl mx-auto">
            {submitted ? (
              <Card variant="elevated" className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-botanical-100 flex items-center justify-center">
                  <Send className="w-8 h-8 text-botanical-600" />
                </div>
                <h2 className="font-body text-display-xs text-charcoal-700 mb-3">
                  Order Submitted!
                </h2>
                <p className="text-charcoal-500 mb-8 max-w-md mx-auto">
                  Thank you for your order. We'll review your request and contact you within 24 hours to confirm details and arrange payment.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild>
                    <Link href="/products">Continue Browsing</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/">Back to Home</Link>
                  </Button>
                </div>
              </Card>
            ) : cart.items.length === 0 ? (
              <Card variant="elevated" className="p-12 text-center">
                <ShoppingBag className="w-16 h-16 mx-auto text-cream-400 mb-4" />
                <h2 className="font-body text-display-xs text-charcoal-700 mb-3">
                  Your Cart is Empty
                </h2>
                <p className="text-charcoal-500 mb-8">
                  Browse our products and add items to your cart before checking out.
                </p>
                <Button asChild>
                  <Link href="/products">Browse Products</Link>
                </Button>
              </Card>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                  {/* Cart Items */}
                  <Card variant="elevated" className="p-6 md:p-8">
                    <h2 className="font-body text-xl text-charcoal-700 mb-6">Your Items</h2>
                    <div className="space-y-4">
                      {cart.items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-cream-50 border border-cream-200">
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-cream-200 flex-shrink-0 relative">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h3 className="font-medium text-charcoal-700">{item.name}</h3>
                                {item.type === 'addon' && (
                                  <span className="text-xs text-botanical-600">Add-on</span>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => cart.removeItem(item.id)}
                                className="p-1.5 text-charcoal-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                                aria-label={`Remove ${item.name}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <QuantitySelector
                                value={item.quantity}
                                onChange={(val) => cart.updateQuantity(item.id, val)}
                                size="sm"
                                min={1}
                                max={50}
                              />
                              <span className="font-body font-semibold text-charcoal-700">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Subtotal */}
                    <div className="mt-6 pt-4 border-t border-cream-300">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-charcoal-600">Subtotal</span>
                        <span className="font-body font-semibold text-2xl text-charcoal-700">
                          {formatPrice(cart.total)}
                        </span>
                      </div>
                      <p className="text-xs text-charcoal-400 mt-1">
                        Final pricing may vary based on customization. We'll confirm the exact total before payment.
                      </p>
                    </div>
                  </Card>

                  {/* Event Details */}
                  <Card variant="elevated" className="p-6 md:p-8">
                    <h2 className="font-body text-xl text-charcoal-700 mb-6 flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-botanical-600" />
                      Event Details
                    </h2>
                    <div className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="checkout-date" className="block text-sm font-medium text-charcoal-600 mb-2">Event Date *</label>
                          <input
                            id="checkout-date"
                            type="date"
                            required
                            min={minDate}
                            className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                          />
                          <p className="text-xs text-charcoal-400 mt-1">Minimum 3 days advance booking required</p>
                        </div>
                        <div>
                          <label htmlFor="checkout-time" className="block text-sm font-medium text-charcoal-600 mb-2">Event Time</label>
                          <input
                            id="checkout-time"
                            type="time"
                            className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="checkout-event-type" className="block text-sm font-medium text-charcoal-600 mb-2">Event Type *</label>
                        <select
                          id="checkout-event-type"
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
                        <label htmlFor="checkout-venue" className="block text-sm font-medium text-charcoal-600 mb-2">Venue Address</label>
                        <input
                          id="checkout-venue"
                          type="text"
                          className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                          placeholder="123 Main St, Toronto, ON"
                        />
                      </div>

                      <div>
                        <label htmlFor="checkout-info" className="block text-sm font-medium text-charcoal-600 mb-2">Additional Information</label>
                        <textarea
                          id="checkout-info"
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors resize-none"
                          placeholder="Color preferences, theme, special requests, or anything else we should know..."
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Contact Information */}
                  <Card variant="elevated" className="p-6 md:p-8">
                    <h2 className="font-body text-xl text-charcoal-700 mb-6">Contact Information</h2>
                    <div className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="checkout-name" className="block text-sm font-medium text-charcoal-600 mb-2">Full Name *</label>
                          <input
                            id="checkout-name"
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                            placeholder="John Smith"
                          />
                        </div>
                        <div>
                          <label htmlFor="checkout-phone" className="block text-sm font-medium text-charcoal-600 mb-2">Phone Number *</label>
                          <input
                            id="checkout-phone"
                            type="tel"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="checkout-email" className="block text-sm font-medium text-charcoal-600 mb-2">Email *</label>
                        <input
                          id="checkout-email"
                          type="email"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Order Summary & Submit */}
                  <Card variant="elevated" className="p-6 md:p-8">
                    <div className="p-4 rounded-xl bg-botanical-50 border border-botanical-200 mb-6">
                      <div className="space-y-2">
                        {cart.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between text-sm">
                            <span className="text-charcoal-600">
                              {item.name} x{item.quantity}
                            </span>
                            <span className="font-medium text-charcoal-700">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                        <div className="border-t border-botanical-200 pt-2 mt-2 flex items-center justify-between">
                          <span className="font-medium text-charcoal-700">Estimated Total</span>
                          <span className="font-body font-semibold text-xl text-botanical-700">
                            {formatPrice(cart.total)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" size="lg" fullWidth leftIcon={<Send className="w-5 h-5" />}>
                      Submit Order
                    </Button>
                    <p className="text-center text-xs text-charcoal-400 mt-3">
                      We'll review your order and contact you within 24 hours to confirm details and arrange payment.
                    </p>
                  </Card>
                </div>
              </form>
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

      {/* Search Modal */}
      <SearchModal
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onAddedToCart={(product) => toast.success(`Added ${product.name} to cart`)}
      />

      <BottomNav items={bottomNavItems.map(item => ({ ...item, badge: item.label === 'Cart' ? cart.count : undefined }))} />

      <ToastContainer position="bottom-right">
        {toasts.map((t) => (<Toast key={t.id} {...t} onClose={() => removeToast(t.id)} />))}
      </ToastContainer>
    </div>
  );
}
