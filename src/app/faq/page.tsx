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
  ChevronDown,
  HelpCircle,
  ShoppingCart,
  Calendar,
  Palette,
  CreditCard,
  MessageCircle,
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
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart';

const navItems = [
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Request a Quote', href: '/inquiry' },
  { label: 'FAQ', href: '/faq', active: true },
];

const bottomNavItems = [
  { icon: <Home />, label: 'Home', href: '/' },
  { icon: <Search />, label: 'Browse', href: '/products' },
  { icon: <Heart />, label: 'Saved', href: '/#saved' },
  { icon: <ShoppingBag />, label: 'Cart', href: '/#cart' },
  { icon: <User />, label: 'Quote', href: '/inquiry' },
];

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

const faqSections: FAQSection[] = [
  {
    title: 'General Questions',
    icon: <HelpCircle className="w-5 h-5" />,
    items: [
      {
        question: 'What services do you offer?',
        answer: 'We specialize in custom balloon displays and decorations for all types of events. This includes balloon arches, garlands, columns, backdrops, organic balloon installations, helium bouquets, and themed displays for birthdays, weddings, corporate events, baby showers, graduations, and more.',
      },
      {
        question: 'Do you offer custom balloon designs?',
        answer: 'Absolutely! Every event is unique, and we love bringing your vision to life. Colors, themes, sizes, and styles can all be customized to match your event perfectly.',
      },
      {
        question: 'What areas do you serve?',
        answer: 'We provide balloon delivery, setup, and installation within our local service area. Travel fees may apply for events outside our standard service zone.',
      },
      {
        question: 'How far in advance should I book?',
        answer: 'We recommend booking at least 2\u20134 weeks in advance, especially during peak seasons. Last-minute bookings may be available depending on our schedule.',
      },
    ],
  },
  {
    title: 'Booking & Ordering',
    icon: <ShoppingCart className="w-5 h-5" />,
    items: [
      {
        question: 'How do I place an order?',
        answer: 'You can place an order by contacting us through our website, email, or social media. Once we discuss your event details, we\u2019ll provide a quote and confirm your booking with a deposit.',
      },
      {
        question: 'Is a deposit required?',
        answer: 'Yes, a non-refundable deposit is required to secure your event date. The remaining balance is due before or on the day of the event.',
      },
      {
        question: 'Can I make changes to my order after booking?',
        answer: 'Minor changes can usually be accommodated up to a certain date before your event. Significant changes or last-minute requests may be subject to additional fees.',
      },
      {
        question: 'What is your cancellation policy?',
        answer: 'Deposits are non-refundable. If you need to cancel or reschedule, please notify us as soon as possible. We\u2019ll do our best to work with you based on availability.',
      },
    ],
  },
  {
    title: 'Balloon Displays & Setup',
    icon: <Calendar className="w-5 h-5" />,
    items: [
      {
        question: 'How long do balloon displays last?',
        answer: 'Air-filled balloon displays can last several days to a few weeks indoors. Outdoor displays may have a shorter lifespan due to weather conditions such as heat, cold, wind, or rain.',
      },
      {
        question: 'Do you set up and take down the decorations?',
        answer: 'We handle full setup for all balloon installations. Breakdown and removal services are available upon request and may include an additional fee.',
      },
      {
        question: 'How long does setup take?',
        answer: 'Setup time varies depending on the size and complexity of the display. Most installations take between 30 minutes to 2 hours.',
      },
      {
        question: 'Can balloon displays be set up outdoors?',
        answer: 'Yes, but outdoor installations are weather-dependent. Extreme temperatures, strong winds, or rain can affect balloons, and we may recommend adjustments for durability.',
      },
    ],
  },
  {
    title: 'Materials & Safety',
    icon: <Palette className="w-5 h-5" />,
    items: [
      {
        question: 'What type of balloons do you use?',
        answer: 'We use high-quality, professional-grade latex and foil balloons to ensure vibrant colors and long-lasting displays.',
      },
      {
        question: 'Are your balloons biodegradable?',
        answer: 'Our latex balloons are made from natural rubber latex, which is biodegradable. Foil balloons are not biodegradable and should be disposed of responsibly.',
      },
      {
        question: 'Are balloon decorations safe for children?',
        answer: 'Balloon displays are safe when properly installed and supervised. We recommend adult supervision at all times, especially around young children.',
      },
    ],
  },
  {
    title: 'Pricing & Payments',
    icon: <CreditCard className="w-5 h-5" />,
    items: [
      {
        question: 'How much do balloon displays cost?',
        answer: 'Pricing depends on the size, style, and complexity of the design. We offer packages as well as custom quotes to fit different budgets.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept e-transfer, credit cards, and other approved payment methods. Details will be provided at booking.',
      },
      {
        question: 'Are there additional fees?',
        answer: 'Delivery, setup, travel, and breakdown fees may apply depending on location and event requirements. All costs will be clearly outlined in your quote.',
      },
    ],
  },
  {
    title: 'Other Questions',
    icon: <MessageCircle className="w-5 h-5" />,
    items: [
      {
        question: 'Can you match specific colors or themes?',
        answer: 'Yes! We can match brand colors, party themes, or inspiration photos as closely as possible using our wide range of balloon colors and styles.',
      },
      {
        question: 'Do you work with event planners and venues?',
        answer: 'We\u2019re happy to collaborate with event planners, venues, and other vendors to ensure a smooth and stress-free event setup.',
      },
      {
        question: 'What happens if a balloon pops or deflates?',
        answer: 'Balloon popping can happen occasionally due to environmental factors. While we can\u2019t guarantee against popping, we use professional techniques to minimize this risk.',
      },
      {
        question: 'How do I contact you if I have more questions?',
        answer: 'You can reach us anytime through our website contact form, email, or social media. We\u2019re always happy to help!',
      },
    ],
  },
];

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-cream-300 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between w-full py-5 text-left group"
      >
        <span className={cn(
          'font-medium text-base transition-colors pr-4',
          isOpen ? 'text-botanical-700' : 'text-charcoal-700 group-hover:text-botanical-700'
        )}>
          {item.question}
        </span>
        <ChevronDown className={cn(
          'w-5 h-5 flex-shrink-0 transition-transform duration-200',
          isOpen ? 'rotate-180 text-botanical-600' : 'text-charcoal-400'
        )} />
      </button>
      <div className={cn(
        'overflow-hidden transition-all duration-200',
        isOpen ? 'max-h-96 pb-5' : 'max-h-0'
      )}>
        <p className="text-charcoal-500 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const cart = useCart();
  const { toasts, toast, removeToast } = useToast();
  const [cartOpen, setCartOpen] = React.useState(false);
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
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
            <Badge variant="botanical" className="mb-4">Help Center</Badge>
            <h1 className="font-accent text-display-md md:text-display-lg text-charcoal-700 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-charcoal-500 leading-relaxed">
              Find answers to common questions about our balloon displays, services, booking process, and more.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 bg-cream-100">
        <div className="container-florista">
          <div className="max-w-3xl mx-auto space-y-8">
            {faqSections.map((section, sectionIndex) => (
              <Card key={sectionIndex} variant="elevated" className="overflow-hidden">
                <div className="px-6 md:px-8 pt-6 md:pt-8 pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-botanical-100 flex items-center justify-center text-botanical-700">
                      {section.icon}
                    </div>
                    <h2 className="font-body font-semibold text-xl text-charcoal-700">{section.title}</h2>
                  </div>
                </div>
                <div className="px-6 md:px-8 pb-4 md:pb-6">
                  {section.items.map((item, itemIndex) => {
                    const key = `${sectionIndex}-${itemIndex}`;
                    return (
                      <AccordionItem
                        key={key}
                        item={item}
                        isOpen={!!openItems[key]}
                        onToggle={() => toggleItem(key)}
                      />
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <Card variant="elevated" className="p-8 md:p-12">
              <p className="text-charcoal-500 text-lg mb-2">
                Have a question that's not listed here?
              </p>
              <p className="font-body font-semibold text-xl text-charcoal-700 mb-6">
                Get in touch with us — we'd love to be part of your celebration!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/inquiry">Request a Quote</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/products">Browse Products</Link>
                </Button>
              </div>
            </Card>
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
