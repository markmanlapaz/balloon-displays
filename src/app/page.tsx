'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Home,
  Search,
  Heart,
  ShoppingBag,
  User,
  Sparkles,
  Gift,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Star,
  ChevronRight,
  PartyPopper,
  Truck,
  ClipboardList,
  CreditCard,
  Check,
  ShoppingCart,
} from 'lucide-react';

import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  ProductCard,
  Navigation,
  BottomNav,
  Hero,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
  PriceDisplay,
  QuantitySelector,
  Toast,
  ToastContainer,
  useToast,
  FeatureCard,
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
} from '@/components/ui';
import { SearchModal } from '@/components/SearchModal';
import { useCart } from '@/lib/cart';
import { cn, formatPrice } from '@/lib/utils';
import { allProducts, type Product } from '@/lib/data';

// Balloon products from CSV
const balloonProducts = [
  {
    id: '1',
    name: 'Single Balloon Arch',
    description: 'Single arch balloon display, perfect for entrances or small events',
    price: 150,
    image: '/images/single-balloon-arch.webp',
    badge: 'Popular',
    inStock: true,
  },
  {
    id: '2',
    name: 'Double Balloon Arch',
    description: 'Double-layer balloon arch, great for photo backdrops or larger events',
    price: 250,
    image: '/images/double-balloon-arch.webp',
    badge: 'New Display',
    inStock: true,
  },
  {
    id: '3',
    name: 'Balloon Garland',
    description: 'Balloon garland for tables, walls, or stages, 10-12 ft long',
    price: 120,
    image: '/images/balloon-garland.webp',
    badge: 'Popular',
    inStock: true,
  },
  {
    id: '4',
    name: 'Balloon Column',
    description: 'Decorative balloon column, 6-8 ft tall, ideal for parties or weddings',
    price: 80,
    image: '/images/balloon-column.webp',
    inStock: true,
  },
  {
    id: '5',
    name: 'Large Balloon Bouquet',
    description: 'Large bouquet of 12-15 latex and foil balloons, perfect for celebrations',
    price: 50,
    image: '/images/large-balloon-bouquet.webp',
    badge: 'Popular',
    inStock: true,
  },
  {
    id: '6',
    name: 'Custom Printed Balloon',
    description: 'Personalized latex balloon with text or logo, great for events',
    price: 5,
    originalPrice: 8,
    image: '/images/custom-printed-balloon.webp',
    badge: 'Sale',
    inStock: true,
  },
];

const services = [
  {
    id: 's1',
    name: 'Birthday Party Decorations',
    description: 'Complete balloon decoration service for birthday celebrations of all ages',
    price: 350,
    priceLabel: 'Starting at $350',
    image: '/images/event-balloon-package.webp',
    badge: 'Popular',
    inStock: true,
  },
  {
    id: 's2',
    name: 'Wedding & Event Decor',
    description: 'Elegant balloon installations for weddings, corporate events, and more',
    price: 0,
    priceLabel: 'Contact for Quote',
    image: '/images/double-balloon-arch.webp',
    inStock: true,
  },
];

const navItems = [
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Request a Quote', href: '/inquiry' },
  { label: 'FAQ', href: '/faq' },
];

const bottomNavItems = [
  { icon: <Home />, label: 'Home', href: '/', active: true },
  { icon: <Search />, label: 'Browse', href: '/products' },
  { icon: <Heart />, label: 'Saved', href: '#saved' },
  { icon: <ShoppingBag />, label: 'Cart', href: '#cart', badge: 0 },
  { icon: <User />, label: 'Quote', href: '/inquiry' },
];

const testimonials = [
  {
    name: 'Sarah M.',
    event: 'Wedding Reception',
    text: 'The balloon arch was absolutely stunning! Everyone was taking photos in front of it. Made our special day even more magical.',
    rating: 5,
  },
  {
    name: 'Michael T.',
    event: 'Corporate Event',
    text: 'Professional service from start to finish. The setup was quick and the display looked incredible. Will definitely book again.',
    rating: 5,
  },
  {
    name: 'Emily R.',
    event: 'Birthday Party',
    text: 'My daughter was thrilled with the balloon decorations! The colors were perfect and the quality exceeded my expectations.',
    rating: 5,
  },
];

export default function BalloonDisplaysHome() {
  const [cartOpen, setCartOpen] = React.useState(false);
  const [bookingModalOpen, setBookingModalOpen] = React.useState(false);
  const [bookingService, setBookingService] = React.useState<typeof services[0] | null>(null);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [quickViewProduct, setQuickViewProduct] = React.useState<Product | null>(null);
  const [quickViewQuantity, setQuickViewQuantity] = React.useState(1);
  const { toasts, toast, removeToast } = useToast();
  const cart = useCart();

  const addToCart = (product: typeof balloonProducts[0]) => {
    cart.addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      type: 'product',
    });
    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Navigation */}
      <Navigation
        items={navItems}
        cartCount={cart.count}
        onCartClick={() => setCartOpen(true)}
        onSearchClick={() => setSearchOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-cream-100 via-blush-50 to-botanical-50">
        {/* Decorative floating balloons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[10%] w-24 h-32 rounded-full bg-gradient-to-b from-coral-300 to-coral-400 opacity-60 animate-float-slow blur-sm" />
          <div className="absolute top-40 right-[15%] w-20 h-28 rounded-full bg-gradient-to-b from-botanical-300 to-botanical-400 opacity-50 animate-float-medium blur-sm" />
          <div className="absolute bottom-40 left-[20%] w-16 h-24 rounded-full bg-gradient-to-b from-blush-300 to-blush-400 opacity-40 animate-float-fast blur-sm" />
          <div className="absolute top-60 left-[60%] w-28 h-36 rounded-full bg-gradient-to-b from-terracotta-200 to-terracotta-300 opacity-50 animate-float-slow blur-sm" />
          <div className="absolute bottom-60 right-[25%] w-14 h-20 rounded-full bg-gradient-to-b from-sage-300 to-sage-400 opacity-40 animate-float-medium blur-sm" />
        </div>

        <div className="container-florista relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-cream-300 mb-6 animate-fade-in">
                <Sparkles className="w-4 h-4 text-coral-500" />
                <span className="text-sm font-medium text-charcoal-600">Making celebrations unforgettable</span>
              </div>

              <h1 className="font-accent text-display-lg md:text-display-xl lg:text-display-2xl text-charcoal-700 mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                Stunning Balloon Displays for Every
                <span className="text-botanical-600"> Celebration</span>
              </h1>

              <p className="text-lg text-charcoal-500 leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                Transform your events with breathtaking balloon arches, garlands, and custom installations.
                From intimate gatherings to grand celebrations, we bring your vision to life.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <Button size="xl" className="group" asChild>
                  <Link href="/products">
                    Browse Products
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link href="/inquiry">Get a Quote</Link>
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 mt-10 pt-8 border-t border-cream-300 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-terracotta-400 text-terracotta-400" />
                    ))}
                  </div>
                  <span className="text-sm text-charcoal-500">200+ Happy Customers</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/single-balloon-arch-hero.webp"
                  alt="Beautiful balloon arch decoration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/20 to-transparent" />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-botanical-100 flex items-center justify-center">
                    <PartyPopper className="w-7 h-7 text-botanical-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-body font-semibold text-charcoal-700">500+</p>
                    <p className="text-sm text-charcoal-400">Events Decorated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-florista">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-accent text-display-sm md:text-display-md text-charcoal-700 mb-4">
              Why Choose Us
            </h2>
            <p className="text-charcoal-500 text-lg">
              We're passionate about creating memorable experiences through stunning balloon artistry
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Custom Designs"
              description="Every installation is uniquely crafted to match your event's theme, colors, and style."
            />
            <FeatureCard
              icon={<Truck className="w-6 h-6" />}
              title="Delivery & Setup"
              description="Professional delivery and installation at your venue. We handle everything."
            />
            <FeatureCard
              icon={<Gift className="w-6 h-6" />}
              title="Premium Quality"
              description="We use only high-quality, long-lasting balloons for displays that stay beautiful."
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-cream-100">
        <div className="container-florista">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <Badge variant="botanical" className="mb-4">Our Products</Badge>
              <h2 className="font-accent text-display-sm md:text-display-md text-charcoal-700">
                Balloon Displays & Decorations
              </h2>
            </div>
            <Button variant="ghost" className="mt-4 md:mt-0" asChild>
              <Link href="/products">
                View All Products
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {balloonProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product)}
                onQuickView={() => {
                  const full = allProducts.find((p) => p.id === product.id);
                  if (full) {
                    setQuickViewProduct(full);
                    setQuickViewQuantity(1);
                  }
                }}
                onClick={() => window.location.href = `/products/${product.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container-florista">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <Badge variant="botanical" className="mb-4">Our Services</Badge>
              <h2 className="font-accent text-display-sm md:text-display-md text-charcoal-700">
                Professional Event Services
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.id} variant="elevated" className="group overflow-hidden" hoverable>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="flex-1 flex flex-col justify-center p-6">
                    {service.badge && (
                      <Badge variant="botanical" className="w-fit mb-3">{service.badge}</Badge>
                    )}
                    <CardTitle className="text-xl mb-2">{service.name}</CardTitle>
                    <CardDescription className="mb-4">{service.description}</CardDescription>
                    <div className="flex items-center justify-between mt-auto">
                      {service.price > 0 ? (
                        <div>
                          <span className="text-xs text-charcoal-400">Starting at</span>
                          <PriceDisplay price={service.price} size="lg" />
                        </div>
                      ) : (
                        <span className="font-body font-semibold text-lg text-charcoal-700">{service.priceLabel}</span>
                      )}
                      {service.price > 0 ? (
                        <Button size="sm" onClick={() => {
                          setBookingService(service);
                          setBookingModalOpen(true);
                        }}>
                          Book Now
                        </Button>
                      ) : (
                        <Button size="sm" asChild>
                          <Link href="/inquiry">Get a Quote</Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-botanical-50 to-sage-50">
        <div className="container-florista">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="botanical" className="mb-4">Testimonials</Badge>
            <h2 className="font-accent text-display-sm md:text-display-md text-charcoal-700 mb-4">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} variant="elevated" className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-terracotta-400 text-terracotta-400" />
                  ))}
                </div>
                <p className="text-charcoal-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="border-t border-cream-300 pt-4">
                  <p className="font-semibold text-charcoal-700">{testimonial.name}</p>
                  <p className="text-sm text-charcoal-400">{testimonial.event}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="container-florista">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="botanical" className="mb-4">Simple Process</Badge>
            <h2 className="font-accent text-display-sm md:text-display-md text-charcoal-700 mb-4">
              How it Works
            </h2>
            <p className="text-charcoal-500 text-lg">
              From browsing to beautiful setup, we make the process seamless
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: 1,
                icon: <ClipboardList className="w-6 h-6" />,
                title: 'Inquire & Plan',
                description: 'Browse products, select items, and submit an inquiry or request a quote for your event.',
              },
              {
                step: 2,
                icon: <CreditCard className="w-6 h-6" />,
                title: 'Payment',
                description: 'Receive your custom quote and complete payment to confirm your booking.',
              },
              {
                step: 3,
                icon: <Truck className="w-6 h-6" />,
                title: 'Setup & Cleanup',
                description: 'Our team handles delivery, professional setup, and post-event cleanup.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-botanical-100 text-botanical-700 mb-5">
                  {item.icon}
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-botanical-700 text-cream-100 text-sm font-semibold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-body font-semibold text-lg text-charcoal-700 mb-2">{item.title}</h3>
                <p className="text-charcoal-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-botanical-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-[10%] w-40 h-52 rounded-full bg-white" />
          <div className="absolute bottom-10 right-[15%] w-32 h-44 rounded-full bg-white" />
          <div className="absolute top-1/2 left-1/2 w-24 h-32 rounded-full bg-white" />
        </div>

        <div className="container-florista relative z-10 text-center">
          <h2 className="font-accent text-display-sm md:text-display-md text-white mb-6">
            Ready to Make Your Event Unforgettable?
          </h2>
          <p className="text-botanical-100 text-lg max-w-2xl mx-auto mb-10">
            Let's create something magical together. Contact us for a free consultation and custom quote for your upcoming celebration.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="xl" className="bg-white text-botanical-700 hover:bg-cream-100" asChild>
              <Link href="/inquiry">Get Free Quote</Link>
            </Button>
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/gallery">View Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-cream-100">
        <div className="container-florista">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <Badge variant="botanical" className="mb-4">Get in Touch</Badge>
              <h2 className="font-accent text-display-sm md:text-display-md text-charcoal-700 mb-6">
                Let's Plan Your Perfect Event
              </h2>
              <p className="text-charcoal-500 text-lg mb-8">
                Have questions or ready to book? We'd love to hear from you.
                Reach out and let's start creating something beautiful.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-botanical-100 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-botanical-600" />
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-400">Phone</p>
                    <p className="font-medium text-charcoal-700">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-botanical-100 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-botanical-600" />
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-400">Email</p>
                    <p className="font-medium text-charcoal-700">hello@balloondisplays.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-botanical-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-botanical-600" />
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-400">Service Area</p>
                    <p className="font-medium text-charcoal-700">Greater Toronto Area</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-botanical-100 flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-botanical-600" />
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-400">Instagram</p>
                    <p className="font-medium text-charcoal-700">@balloondisplays</p>
                  </div>
                </div>
              </div>
            </div>

            <Card variant="elevated" className="p-8">
              <h3 className="font-body text-xl text-charcoal-700 mb-6">Request a Quote</h3>
              <form className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-charcoal-600 mb-2">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-charcoal-600 mb-2">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="contact-event-type" className="block text-sm font-medium text-charcoal-600 mb-2">Event Type</label>
                  <select id="contact-event-type" className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors bg-white">
                    <option>Birthday Party</option>
                    <option>Wedding</option>
                    <option>Corporate Event</option>
                    <option>Baby Shower</option>
                    <option>Graduation</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-event-date" className="block text-sm font-medium text-charcoal-600 mb-2">Event Date</label>
                  <input
                    id="contact-event-date"
                    type="date"
                    className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-vision" className="block text-sm font-medium text-charcoal-600 mb-2">Tell us about your vision</label>
                  <textarea
                    id="contact-vision"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors resize-none"
                    placeholder="Describe your ideal balloon decorations..."
                  />
                </div>
                <Button size="lg" fullWidth>
                  Send Request
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-700 text-cream-100 py-16">
        <div className="container-florista">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="font-body text-2xl text-white mb-4">Balloon Displays</h3>
              <p className="text-cream-300 max-w-md mb-6">
                Creating unforgettable moments through stunning balloon artistry.
                Serving the Greater Toronto Area with passion and creativity.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-charcoal-600 flex items-center justify-center hover:bg-botanical-600 transition-colors" aria-label="Follow us on Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/products" className="text-cream-300 hover:text-white transition-colors">Products</Link></li>
                <li><Link href="/services" className="text-cream-300 hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/gallery" className="text-cream-300 hover:text-white transition-colors">Gallery</Link></li>
                <li><Link href="/inquiry" className="text-cream-300 hover:text-white transition-colors">Request a Quote</Link></li>
                <li><Link href="/faq" className="text-cream-300 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-3 text-cream-300">
                <li>(555) 123-4567</li>
                <li>hello@balloondisplays.com</li>
                <li>Greater Toronto Area</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-charcoal-600 pt-8 text-center text-cream-400 text-sm">
            <p>© 2026 Balloon Displays. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <Modal open={bookingModalOpen} onOpenChange={(open) => { if (!open) { setBookingModalOpen(false); setBookingService(null); } }}>
        <ModalContent size="lg">
          {bookingService && (
            <>
              <ModalHeader>
                <ModalTitle>Book {bookingService.name}</ModalTitle>
                <ModalDescription>Fill in the details below and we'll confirm your booking</ModalDescription>
              </ModalHeader>
              <ModalBody>
                <form className="space-y-5" onSubmit={(e) => {
                  e.preventDefault();
                  setBookingModalOpen(false);
                  setBookingService(null);
                  toast.success('Booking request submitted! We\'ll be in touch shortly.');
                }}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="booking-name" className="block text-sm font-medium text-charcoal-600 mb-2">Your Name *</label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-phone" className="block text-sm font-medium text-charcoal-600 mb-2">Phone Number *</label>
                      <input
                        id="booking-phone"
                        type="tel"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="booking-email" className="block text-sm font-medium text-charcoal-600 mb-2">Email *</label>
                    <input
                      id="booking-email"
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="booking-date" className="block text-sm font-medium text-charcoal-600 mb-2">Event Date *</label>
                      <input
                        id="booking-date"
                        type="date"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-time" className="block text-sm font-medium text-charcoal-600 mb-2">Event Time</label>
                      <input
                        id="booking-time"
                        type="time"
                        className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="booking-event-type" className="block text-sm font-medium text-charcoal-600 mb-2">Event Type *</label>
                    <select
                      id="booking-event-type"
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
                    <label htmlFor="booking-venue" className="block text-sm font-medium text-charcoal-600 mb-2">Venue Address</label>
                    <input
                      id="booking-venue"
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                      placeholder="123 Main St, Toronto, ON"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-requests" className="block text-sm font-medium text-charcoal-600 mb-2">Special Requests</label>
                    <textarea
                      id="booking-requests"
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors resize-none"
                      placeholder="Tell us about any specific requirements..."
                    />
                  </div>

                  <div className="p-4 rounded-lg bg-botanical-50 border border-botanical-200">
                    <div className="flex items-center justify-between">
                      <span className="text-charcoal-600">{bookingService.name}</span>
                      <span className="font-body font-semibold text-lg text-botanical-700">
                        ${bookingService.price.toFixed(2)}
                      </span>
                    </div>
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
                        onClick={() => {
                          cart.addItem({
                            id: quickViewProduct.id,
                            name: quickViewProduct.name,
                            description: quickViewProduct.description,
                            price: quickViewProduct.price,
                            image: quickViewProduct.image,
                            type: quickViewProduct.type === 'service' ? 'service' : 'product',
                          }, quickViewQuantity);
                          toast.success(`Added ${quickViewProduct.name} to cart`);
                          setQuickViewProduct(null);
                        }}>
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
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
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

      {/* Bottom Navigation (Mobile) */}
      <BottomNav items={bottomNavItems.map(item => ({
        ...item,
        badge: item.label === 'Cart' ? cart.count : undefined,
      }))} />

      {/* Toast Container */}
      <ToastContainer position="bottom-right">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            {...t}
            onClose={() => removeToast(t.id)}
          />
        ))}
      </ToastContainer>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
