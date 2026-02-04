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
  Star,
  Check,
  ChevronRight,
  Calendar,
} from 'lucide-react';

import {
  Button,
  Badge,
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  Navigation,
  BottomNav,
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
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
import { cn, formatPrice } from '@/lib/utils';
import { servicesList, type ServiceItem } from '@/lib/data';
import { useCart } from '@/lib/cart';

const navItems = [
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services', active: true },
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

export default function ServicesPage() {
  const [selectedService, setSelectedService] = React.useState<ServiceItem | null>(null);
  const [bookingOpen, setBookingOpen] = React.useState(false);
  const [bookingService, setBookingService] = React.useState<ServiceItem | null>(null);
  const [cartOpen, setCartOpen] = React.useState(false);

  const cart = useCart();
  const { toasts, toast, removeToast } = useToast();

  const openBooking = (service: ServiceItem) => {
    setBookingService(service);
    setBookingOpen(true);
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
            <Badge variant="botanical" className="mb-4">Our Services</Badge>
            <h1 className="font-accent text-display-md md:text-display-lg text-charcoal-700 mb-4">
              Event Decoration Services
            </h1>
            <p className="text-lg text-charcoal-500 leading-relaxed">
              From intimate gatherings to grand celebrations, our professional team transforms your venue
              with stunning balloon installations. Free setup included with every display order.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-cream-100">
        <div className="container-florista">
          <div className="space-y-8">
            {servicesList.map((service, index) => (
              <Card key={service.id} variant="elevated" className="overflow-hidden animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="lg:w-2/5 aspect-video lg:aspect-auto overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <CardContent className="flex-1 p-6 lg:p-8 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="font-body text-xl lg:text-2xl text-charcoal-700">{service.name}</h2>
                    </div>

                    <p className="text-charcoal-500 leading-relaxed mb-4">{service.description}</p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {service.features.slice(0, 6).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-botanical-600 flex-shrink-0" />
                          <span className="text-sm text-charcoal-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Reviews */}
                    {service.reviews.length > 0 && (
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => {
                              const avg = service.reviews.reduce((s, r) => s + r.rating, 0) / service.reviews.length;
                              return (
                                <Star key={i} className={cn('w-4 h-4', i < Math.round(avg) ? 'fill-terracotta-400 text-terracotta-400' : 'text-cream-400')} />
                              );
                            })}
                          </div>
                          <span className="text-sm text-charcoal-500">
                            ({service.reviews.length} {service.reviews.length === 1 ? 'review' : 'reviews'})
                          </span>
                        </div>
                        {/* Show first review as testimonial */}
                        <blockquote className="text-sm text-charcoal-500 italic border-l-2 border-botanical-300 pl-3">
                          "{service.reviews[0].text.slice(0, 120)}..."
                          <span className="block text-xs text-charcoal-400 mt-1 not-italic">
                            - {service.reviews[0].name}, {service.reviews[0].event}
                          </span>
                        </blockquote>
                      </div>
                    )}

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-cream-300">
                      <div>
                        {service.price ? (
                          <div>
                            <span className="text-xs text-charcoal-400">Starting at</span>
                            <span className="block font-body font-semibold text-2xl text-charcoal-700">{formatPrice(service.price)}</span>
                          </div>
                        ) : (
                          <div>
                            <span className="font-body font-semibold text-lg text-charcoal-700">{service.priceLabel}</span>
                            <span className="block text-xs text-charcoal-400">Custom pricing based on your event</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setSelectedService(service)}>
                          Learn More
                        </Button>
                        <Button leftIcon={<Calendar className="w-4 h-4" />} onClick={() => openBooking(service)}>
                          {service.price ? 'Book Now' : 'Get a Quote'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Free Setup Banner */}
      <section className="py-16 bg-botanical-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-[10%] w-40 h-52 rounded-full bg-white" />
          <div className="absolute bottom-10 right-[15%] w-32 h-44 rounded-full bg-white" />
        </div>
        <div className="container-florista relative z-10 text-center">
          <h2 className="font-accent text-display-xs md:text-display-sm text-white mb-4">
            Free Professional Setup & Takedown
          </h2>
          <p className="text-botanical-100 text-lg max-w-2xl mx-auto mb-8">
            Every display order includes complimentary professional setup at your venue and takedown after your event.
            Our experienced team handles everything so you can focus on your celebration.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" className="bg-white text-botanical-700 hover:bg-cream-100" asChild>
              <Link href="/inquiry">Get a Quote</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
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

      {/* Service Detail Modal */}
      <Modal open={selectedService !== null} onOpenChange={(open) => { if (!open) setSelectedService(null); }}>
        <ModalContent size="lg">
          {selectedService && (
            <>
              <ModalHeader>
                <ModalTitle>{selectedService.name}</ModalTitle>
                <ModalDescription>{selectedService.priceLabel}</ModalDescription>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  <div className="aspect-video rounded-xl overflow-hidden bg-cream-200">
                    <img src={selectedService.image} alt={selectedService.name} className="w-full h-full object-cover" />
                  </div>

                  <p className="text-charcoal-500 leading-relaxed">{selectedService.longDescription}</p>

                  <div>
                    <h4 className="font-body font-semibold text-charcoal-700 mb-3">What's Included</h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {selectedService.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-botanical-600 flex-shrink-0" />
                          <span className="text-sm text-charcoal-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedService.reviews.length > 0 && (
                    <div>
                      <h4 className="font-body font-semibold text-charcoal-700 mb-3">Reviews</h4>
                      <div className="space-y-3">
                        {selectedService.reviews.map((review) => (
                          <div key={review.id} className="p-4 rounded-lg bg-cream-100">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-charcoal-700">{review.name}</span>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={cn('w-3.5 h-3.5', i < review.rating ? 'fill-terracotta-400 text-terracotta-400' : 'text-cream-400')} />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-charcoal-600">{review.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button fullWidth size="lg" leftIcon={<Calendar className="w-5 h-5" />}
                    onClick={() => { setSelectedService(null); openBooking(selectedService); }}>
                    {selectedService.price ? `Book Now - ${formatPrice(selectedService.price)}` : 'Get a Quote'}
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Booking Modal */}
      <Modal open={bookingOpen} onOpenChange={(open) => { if (!open) { setBookingOpen(false); setBookingService(null); } }}>
        <ModalContent size="lg">
          {bookingService && (
            <>
              <ModalHeader>
                <ModalTitle>Book {bookingService.name}</ModalTitle>
                <ModalDescription>
                  {bookingService.price ? `Starting at ${formatPrice(bookingService.price)}` : bookingService.priceLabel}
                </ModalDescription>
              </ModalHeader>
              <ModalBody>
                <form className="space-y-5" onSubmit={(e) => {
                  e.preventDefault();
                  setBookingOpen(false);
                  setBookingService(null);
                  toast.success('Booking request submitted! We\'ll be in touch within 24 hours.');
                }}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="svc-booking-name" className="block text-sm font-medium text-charcoal-600 mb-2">Your Name *</label>
                      <input id="svc-booking-name" type="text" required className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors" placeholder="John Smith" />
                    </div>
                    <div>
                      <label htmlFor="svc-booking-phone" className="block text-sm font-medium text-charcoal-600 mb-2">Phone Number *</label>
                      <input id="svc-booking-phone" type="tel" required className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors" placeholder="(555) 123-4567" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="svc-booking-email" className="block text-sm font-medium text-charcoal-600 mb-2">Email *</label>
                    <input id="svc-booking-email" type="email" required className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors" placeholder="john@example.com" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="svc-booking-date" className="block text-sm font-medium text-charcoal-600 mb-2">Event Date *</label>
                      <input id="svc-booking-date" type="date" required className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="svc-booking-guests" className="block text-sm font-medium text-charcoal-600 mb-2">Estimated Guest Count</label>
                      <input id="svc-booking-guests" type="number" className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors" placeholder="50" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="svc-booking-venue" className="block text-sm font-medium text-charcoal-600 mb-2">Venue Address</label>
                    <input id="svc-booking-venue" type="text" className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors" placeholder="123 Main St, Toronto, ON" />
                  </div>
                  <div>
                    <label htmlFor="svc-booking-vision" className="block text-sm font-medium text-charcoal-600 mb-2">Tell us about your vision *</label>
                    <textarea id="svc-booking-vision" rows={4} required className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors resize-none" placeholder="Color preferences, theme, specific ideas, and anything else we should know..." />
                  </div>
                  <Button type="submit" size="lg" fullWidth>
                    Submit Booking Request
                  </Button>
                </form>
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
