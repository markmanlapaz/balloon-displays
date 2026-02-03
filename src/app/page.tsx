'use client';

import * as React from 'react';
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
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
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
} from '@/components/ui';

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
    name: 'Event Balloon Package',
    description: 'Full event balloon decoration including arches, columns, and garlands',
    price: 350,
    image: '/images/event-balloon-package.webp',
    badge: 'Popular',
    inStock: true,
  },
  {
    id: 's2',
    name: 'Balloon Setup Service',
    description: 'Professional setup of balloon displays at event venue',
    price: 50,
    image: '/images/balloon-setup-service.webp',
    badge: 'New Display',
    inStock: true,
  },
];

const navItems = [
  { label: 'Products', href: '#products', active: true },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

const bottomNavItems = [
  { icon: <Home />, label: 'Home', href: '/', active: true },
  { icon: <Search />, label: 'Browse', href: '#products' },
  { icon: <Heart />, label: 'Saved', href: '#saved' },
  { icon: <ShoppingBag />, label: 'Cart', href: '#cart', badge: 0 },
  { icon: <User />, label: 'Contact', href: '#contact' },
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
  const [cartItems, setCartItems] = React.useState<Array<{ product: typeof balloonProducts[0]; quantity: number }>>([]);
  const { toasts, toast, removeToast } = useToast();

  const addToCart = (product: typeof balloonProducts[0]) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast.success(`Added ${product.name} to cart`);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Navigation */}
      <Navigation
        items={navItems}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onSearchClick={() => toast.info('Search coming soon!')}
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

              <h1 className="font-display text-display-lg md:text-display-xl lg:text-display-2xl text-charcoal-700 mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                Stunning Balloon Displays for Every
                <span className="text-botanical-600"> Celebration</span>
              </h1>

              <p className="text-lg text-charcoal-500 leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                Transform your events with breathtaking balloon arches, garlands, and custom installations.
                From intimate gatherings to grand celebrations, we bring your vision to life.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <Button size="xl" className="group">
                  Browse Products
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="xl">
                  Get a Quote
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
                    <p className="text-2xl font-display font-semibold text-charcoal-700">500+</p>
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
            <h2 className="font-display text-display-sm md:text-display-md text-charcoal-700 mb-4">
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
              <h2 className="font-display text-display-sm md:text-display-md text-charcoal-700">
                Balloon Displays & Decorations
              </h2>
            </div>
            <Button variant="ghost" className="mt-4 md:mt-0">
              View All Products
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {balloonProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product)}
                onQuickView={() => toast.info('Quick view coming soon!')}
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
              <h2 className="font-display text-display-sm md:text-display-md text-charcoal-700">
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
                      <PriceDisplay price={service.price} size="lg" />
                      <Button size="sm" onClick={() => addToCart(service)}>
                        Book Now
                      </Button>
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
            <h2 className="font-display text-display-sm md:text-display-md text-charcoal-700 mb-4">
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

      {/* CTA Section */}
      <section className="py-24 bg-botanical-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-[10%] w-40 h-52 rounded-full bg-white" />
          <div className="absolute bottom-10 right-[15%] w-32 h-44 rounded-full bg-white" />
          <div className="absolute top-1/2 left-1/2 w-24 h-32 rounded-full bg-white" />
        </div>

        <div className="container-florista relative z-10 text-center">
          <h2 className="font-display text-display-sm md:text-display-md text-white mb-6">
            Ready to Make Your Event Unforgettable?
          </h2>
          <p className="text-botanical-100 text-lg max-w-2xl mx-auto mb-10">
            Let's create something magical together. Contact us for a free consultation and custom quote for your upcoming celebration.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="xl" className="bg-white text-botanical-700 hover:bg-cream-100">
              Get Free Quote
            </Button>
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10">
              View Gallery
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
              <h2 className="font-display text-display-sm md:text-display-md text-charcoal-700 mb-6">
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
              <h3 className="font-display text-xl text-charcoal-700 mb-6">Request a Quote</h3>
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-charcoal-600 mb-2">Your Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-600 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-600 mb-2">Event Type</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors bg-white">
                    <option>Birthday Party</option>
                    <option>Wedding</option>
                    <option>Corporate Event</option>
                    <option>Baby Shower</option>
                    <option>Graduation</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-600 mb-2">Event Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-lg border border-cream-400 focus:border-botanical-500 focus:outline-none focus:ring-2 focus:ring-botanical-100 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-600 mb-2">Tell us about your vision</label>
                  <textarea
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
              <h3 className="font-display text-2xl text-white mb-4">Balloon Displays</h3>
              <p className="text-cream-300 max-w-md mb-6">
                Creating unforgettable moments through stunning balloon artistry.
                Serving the Greater Toronto Area with passion and creativity.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-charcoal-600 flex items-center justify-center hover:bg-botanical-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#products" className="text-cream-300 hover:text-white transition-colors">Products</a></li>
                <li><a href="#services" className="text-cream-300 hover:text-white transition-colors">Services</a></li>
                <li><a href="#gallery" className="text-cream-300 hover:text-white transition-colors">Gallery</a></li>
                <li><a href="#contact" className="text-cream-300 hover:text-white transition-colors">Contact</a></li>
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

      {/* Cart Drawer */}
      <Drawer open={cartOpen} onOpenChange={setCartOpen}>
        <DrawerContent position="right" size="md">
          <DrawerHeader>
            <DrawerTitle>Your Cart ({cartCount})</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 mx-auto text-cream-400 mb-4" />
                <p className="text-charcoal-500">Your cart is empty</p>
                <Button variant="outline" className="mt-4" onClick={() => setCartOpen(false)}>
                  Browse Products
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-cream-200 flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <PriceDisplay price={item.product.price} size="sm" />
                      <QuantitySelector
                        value={item.quantity}
                        onChange={(val) => {
                          setCartItems(prev =>
                            prev.map(i =>
                              i.product.id === item.product.id
                                ? { ...i, quantity: val }
                                : i
                            ).filter(i => i.quantity > 0)
                          );
                        }}
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
          {cartItems.length > 0 && (
            <DrawerFooter className="space-y-4">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span className="font-semibold">${cartTotal.toFixed(2)} CAD</span>
              </div>
              <Button size="lg" fullWidth>
                Request Quote
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
        badge: item.label === 'Cart' ? cartCount : undefined,
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
