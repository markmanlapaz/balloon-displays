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
  Sparkles,
  Heart as HeartIcon,
  Users,
  Award,
  PartyPopper,
  Star,
} from 'lucide-react';

import {
  Button,
  Badge,
  Card,
  CardContent,
  Navigation,
  BottomNav,
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
} from '@/components/ui';
import { useCart } from '@/lib/cart';
import { SearchModal } from '@/components/SearchModal';

const navItems = [
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about', active: true },
  { label: 'Request a Quote', href: '/inquiry' },
];

const bottomNavItems = [
  { icon: <Home />, label: 'Home', href: '/' },
  { icon: <Search />, label: 'Browse', href: '/products' },
  { icon: <Heart />, label: 'Saved', href: '/#saved' },
  { icon: <ShoppingBag />, label: 'Cart', href: '/#cart' },
  { icon: <User />, label: 'Quote', href: '/inquiry' },
];

export default function AboutPage() {
  const [cartOpen, setCartOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const cart = useCart();
  const { toasts, toast, removeToast } = useToast();

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
            <Badge variant="botanical" className="mb-4">Our Story</Badge>
            <h1 className="font-accent text-display-md md:text-display-lg text-charcoal-700 mb-4">
              About Balloon Displays
            </h1>
            <p className="text-lg text-charcoal-500 leading-relaxed">
              More than decorations — we create the moments that become your favorite memories.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container-florista">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/single-balloon-arch-hero.webp"
                  alt="Our team setting up a beautiful balloon display"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/20 to-transparent" />
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <Badge variant="botanical" className="mb-4">How It Started</Badge>
              <h2 className="font-accent text-display-xs md:text-display-sm text-charcoal-700 mb-6">
                A passion born from celebration
              </h2>
              <div className="space-y-5 text-charcoal-500 leading-relaxed text-lg">
                <p>
                  It all started with a simple birthday party. We wanted to create something
                  truly special for a loved one — something that would make them walk through
                  the door and feel the love in the room before a single word was spoken. That
                  first balloon arch changed everything.
                </p>
                <p>
                  What began as a heartfelt gesture for family and friends quickly grew into
                  something bigger. Neighbors started asking, then friends of friends, and
                  before we knew it, we were spending every weekend transforming spaces into
                  celebrations. We realized that balloons aren't just decorations — they're
                  the first thing people see, the backdrop of every photo, and the detail
                  that ties a whole event together.
                </p>
                <p>
                  Today, Balloon Displays is proud to serve the Greater Toronto Area with the
                  same care and passion we poured into that very first arch. Every installation
                  still feels personal to us, because we know it's personal to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-20 bg-gradient-to-br from-botanical-50 to-sage-50">
        <div className="container-florista">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
            <Badge variant="botanical" className="mb-4">What Drives Us</Badge>
            <h2 className="font-accent text-display-sm md:text-display-md text-charcoal-700 mb-4">
              Every event deserves to feel extraordinary
            </h2>
            <p className="text-charcoal-500 text-lg leading-relaxed">
              We believe that the details are what make a celebration unforgettable.
              A child's wide eyes. A couple's first dance framed by something beautiful.
              A room that says "you matter" before anyone even speaks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card variant="elevated" className="p-8 text-center animate-fade-in-up" style={{ animationDelay: '0ms' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-botanical-100 text-botanical-700 mb-5">
                <HeartIcon className="w-7 h-7" />
              </div>
              <h3 className="font-body font-semibold text-lg text-charcoal-700 mb-3">Made with Heart</h3>
              <p className="text-charcoal-500 leading-relaxed">
                We treat every event like it's our own. Your celebration matters to us,
                and that care shows in every detail, every color choice, and every perfectly
                placed balloon.
              </p>
            </Card>

            <Card variant="elevated" className="p-8 text-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-botanical-100 text-botanical-700 mb-5">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-body font-semibold text-lg text-charcoal-700 mb-3">Creativity First</h3>
              <p className="text-charcoal-500 leading-relaxed">
                No two events are the same, and neither are our designs. We work closely
                with you to bring your unique vision to life — whether it's a color palette,
                a theme, or just a feeling you want your guests to have.
              </p>
            </Card>

            <Card variant="elevated" className="p-8 text-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-botanical-100 text-botanical-700 mb-5">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-body font-semibold text-lg text-charcoal-700 mb-3">Quality You Can Trust</h3>
              <p className="text-charcoal-500 leading-relaxed">
                We use only premium, long-lasting balloons and professional-grade materials.
                Your display will look stunning from the first guest's arrival to the last
                dance of the night.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="py-20 bg-white">
        <div className="container-florista">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
            <Badge variant="botanical" className="mb-4">Our Journey</Badge>
            <h2 className="font-accent text-display-sm md:text-display-md text-charcoal-700 mb-4">
              Growing one celebration at a time
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '500+', label: 'Events Decorated', icon: <PartyPopper className="w-6 h-6" /> },
              { number: '200+', label: 'Happy Customers', icon: <Users className="w-6 h-6" /> },
              { number: '5', label: 'Stars Average Rating', icon: <Star className="w-6 h-6" /> },
              { number: '100%', label: 'Setup & Takedown', icon: <Award className="w-6 h-6" /> },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-botanical-100 text-botanical-700 mb-4">
                  {stat.icon}
                </div>
                <p className="text-3xl font-body font-semibold text-charcoal-700 mb-1">{stat.number}</p>
                <p className="text-charcoal-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Note */}
      <section className="py-20 bg-cream-100">
        <div className="container-florista">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blush-100 mb-8">
              <HeartIcon className="w-8 h-8 text-blush-500" />
            </div>
            <h2 className="font-accent text-display-xs md:text-display-sm text-charcoal-700 mb-6">
              A note from our team
            </h2>
            <blockquote className="text-lg md:text-xl text-charcoal-500 leading-relaxed italic">
              "Thank you for considering us for your special day. We know that behind every
              event is a story — a milestone, a dream, a moment you've been looking forward to.
              It's an honor to be a small part of that. We promise to bring not just balloons,
              but genuine care and excitement to everything we create for you. Your joy is what
              keeps us doing what we love."
            </blockquote>
            <p className="mt-6 font-body font-semibold text-charcoal-700">
              — The Balloon Displays Team
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-botanical-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-[10%] w-40 h-52 rounded-full bg-white" />
          <div className="absolute bottom-10 right-[15%] w-32 h-44 rounded-full bg-white" />
          <div className="absolute top-1/2 left-1/2 w-24 h-32 rounded-full bg-white" />
        </div>

        <div className="container-florista relative z-10 text-center">
          <h2 className="font-accent text-display-sm md:text-display-md text-white mb-6">
            Let's Create Something Beautiful Together
          </h2>
          <p className="text-botanical-100 text-lg max-w-2xl mx-auto mb-10">
            Whether it's an intimate birthday or a grand wedding, we'd love to hear about your
            vision and help bring it to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="xl" className="bg-white text-botanical-700 hover:bg-cream-100" asChild>
              <Link href="/inquiry">Get a Free Quote</Link>
            </Button>
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/gallery">View Our Work</Link>
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
              <Link href="/about" className="text-cream-300 hover:text-white transition-colors text-sm">About</Link>
              <Link href="/inquiry" className="text-cream-300 hover:text-white transition-colors text-sm">Request a Quote</Link>
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
