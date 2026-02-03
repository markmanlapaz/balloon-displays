'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  LayoutGrid,
  Home,
  Search,
  Heart,
  ShoppingBag,
  User,
  ArrowLeft,
  ZoomIn,
} from 'lucide-react';

import {
  Button,
  Badge,
  Navigation,
  BottomNav,
} from '@/components/ui';
import { cn } from '@/lib/utils';

// Gallery images with metadata
const galleryImages = [
  {
    id: '1',
    src: '/images/single-balloon-arch.webp',
    alt: 'Elegant single balloon arch in coral and cream tones',
    title: 'Classic Single Arch',
    category: 'arches',
    description: 'Perfect for entrances and photo backdrops',
  },
  {
    id: '2',
    src: '/images/single-balloon-arch-hero.webp',
    alt: 'Beautiful balloon arch as hero display',
    title: 'Statement Arch Display',
    category: 'arches',
    description: 'Grand entrance piece for special celebrations',
  },
  {
    id: '3',
    src: '/images/double-balloon-arch.webp',
    alt: 'Stunning double layer balloon arch',
    title: 'Double Layer Arch',
    category: 'arches',
    description: 'Dramatic double-layer design for larger venues',
  },
  {
    id: '4',
    src: '/images/balloon-garland.webp',
    alt: 'Organic balloon garland arrangement',
    title: 'Organic Garland',
    category: 'garlands',
    description: 'Flowing design for tables and walls',
  },
  {
    id: '5',
    src: '/images/balloon-column.webp',
    alt: 'Elegant balloon column',
    title: 'Classic Column',
    category: 'columns',
    description: 'Versatile standing display',
  },
  {
    id: '6',
    src: '/images/large-balloon-bouquet.webp',
    alt: 'Colorful large balloon bouquet',
    title: 'Celebration Bouquet',
    category: 'bouquets',
    description: 'Perfect for centerpieces and gifts',
  },
  {
    id: '7',
    src: '/images/custom-printed-balloon.webp',
    alt: 'Personalized printed balloon',
    title: 'Custom Print Balloon',
    category: 'custom',
    description: 'Personalized with your message or logo',
  },
  {
    id: '8',
    src: '/images/event-balloon-package.webp',
    alt: 'Full event balloon decoration package',
    title: 'Full Event Package',
    category: 'events',
    description: 'Complete venue transformation',
  },
  {
    id: '9',
    src: '/images/balloon-setup-service.webp',
    alt: 'Professional balloon setup at venue',
    title: 'Professional Setup',
    category: 'events',
    description: 'On-site installation service',
  },
];

const categories = [
  { id: 'all', label: 'All Photos' },
  { id: 'arches', label: 'Arches' },
  { id: 'garlands', label: 'Garlands' },
  { id: 'columns', label: 'Columns' },
  { id: 'bouquets', label: 'Bouquets' },
  { id: 'custom', label: 'Custom' },
  { id: 'events', label: 'Events' },
];

const navItems = [
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/#services' },
  { label: 'Gallery', href: '/gallery', active: true },
  { label: 'Contact', href: '/#contact' },
];

const bottomNavItems = [
  { icon: <Home />, label: 'Home', href: '/' },
  { icon: <Search />, label: 'Browse', href: '/products' },
  { icon: <Heart />, label: 'Saved', href: '/#saved' },
  { icon: <ShoppingBag />, label: 'Cart', href: '/#cart' },
  { icon: <User />, label: 'Contact', href: '/#contact' },
];

type ViewMode = 'grid' | 'masonry';

interface LightboxProps {
  images: typeof galleryImages;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

function Lightbox({ images, currentIndex, isOpen, onClose, onPrevious, onNext }: LightboxProps) {
  const currentImage = images[currentIndex];

  // Handle keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrevious, onNext]);

  if (!isOpen || !currentImage) return null;

  return (
    <div className="fixed inset-0 z-modal">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal-900/95 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6">
          <div className="text-cream-100">
            <span className="text-sm text-cream-400">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-cream-100 hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image container */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-16 py-4 min-h-0">
          <div className="relative w-full h-full max-w-5xl flex items-center justify-center animate-scale-in">
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Navigation arrows */}
          <button
            onClick={onPrevious}
            className={cn(
              'absolute left-4 md:left-8 top-1/2 -translate-y-1/2',
              'w-12 h-12 rounded-full bg-white/10 flex items-center justify-center',
              'text-cream-100 hover:bg-white/20 transition-all',
              'focus:outline-none focus:ring-2 focus:ring-cream-100',
              currentIndex === 0 && 'opacity-30 cursor-not-allowed'
            )}
            disabled={currentIndex === 0}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={onNext}
            className={cn(
              'absolute right-4 md:right-8 top-1/2 -translate-y-1/2',
              'w-12 h-12 rounded-full bg-white/10 flex items-center justify-center',
              'text-cream-100 hover:bg-white/20 transition-all',
              'focus:outline-none focus:ring-2 focus:ring-cream-100',
              currentIndex === images.length - 1 && 'opacity-30 cursor-not-allowed'
            )}
            disabled={currentIndex === images.length - 1}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Footer with image info */}
        <div className="p-4 md:p-6 text-center">
          <h3 className="font-display text-xl md:text-2xl text-cream-100 mb-1">
            {currentImage.title}
          </h3>
          <p className="text-cream-400 text-sm md:text-base">
            {currentImage.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [viewMode, setViewMode] = React.useState<ViewMode>('grid');
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const filteredImages = React.useMemo(() => {
    if (selectedCategory === 'all') return galleryImages;
    return galleryImages.filter((img) => img.category === selectedCategory);
  }, [selectedCategory]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const goToPrevious = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  const goToNext = () => {
    if (lightboxIndex !== null && lightboxIndex < filteredImages.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Navigation */}
      <Navigation items={navItems} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cream-100 via-blush-50 to-botanical-50 pt-8 pb-16">
        <div className="container-florista">
          {/* Breadcrumb */}
          <nav className="mb-8 animate-fade-in">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-charcoal-500 hover:text-botanical-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </nav>

          <div className="max-w-2xl animate-fade-in-up">
            <Badge variant="botanical" className="mb-4">Our Work</Badge>
            <h1 className="font-display text-display-md md:text-display-lg text-charcoal-700 mb-4">
              Gallery
            </h1>
            <p className="text-lg text-charcoal-500 leading-relaxed">
              Browse our portfolio of stunning balloon displays. From elegant arches to whimsical
              bouquets, see how we transform celebrations into unforgettable experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Controls */}
      <section className="sticky top-[72px] z-sticky bg-white border-b border-cream-300 py-4">
        <div className="container-florista">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category filters */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap',
                    'transition-all duration-fast',
                    selectedCategory === category.id
                      ? 'bg-botanical-700 text-cream-100 shadow-botanical'
                      : 'bg-cream-200 text-charcoal-600 hover:bg-cream-300'
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* View mode toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-charcoal-500 mr-2 hidden sm:inline">
                {filteredImages.length} {filteredImages.length === 1 ? 'photo' : 'photos'}
              </span>
              <div className="flex items-center bg-cream-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 rounded-md transition-all duration-fast',
                    viewMode === 'grid'
                      ? 'bg-white text-botanical-700 shadow-sm'
                      : 'text-charcoal-400 hover:text-charcoal-600'
                  )}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('masonry')}
                  className={cn(
                    'p-2 rounded-md transition-all duration-fast',
                    viewMode === 'masonry'
                      ? 'bg-white text-botanical-700 shadow-sm'
                      : 'text-charcoal-400 hover:text-charcoal-600'
                  )}
                  aria-label="Masonry view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-cream-100">
        <div className="container-florista">
          {filteredImages.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-charcoal-500 text-lg">
                No photos found in this category.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSelectedCategory('all')}
              >
                View All Photos
              </Button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredImages.map((image, index) => (
                <GalleryCard
                  key={image.id}
                  image={image}
                  index={index}
                  onClick={() => openLightbox(index)}
                />
              ))}
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8">
              {filteredImages.map((image, index) => (
                <GalleryCardMasonry
                  key={image.id}
                  image={image}
                  index={index}
                  onClick={() => openLightbox(index)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container-florista text-center">
          <h2 className="font-display text-display-xs md:text-display-sm text-charcoal-700 mb-4">
            Love What You See?
          </h2>
          <p className="text-charcoal-500 text-lg max-w-xl mx-auto mb-8">
            Let us create something beautiful for your next celebration.
            Contact us for a free consultation and custom quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/#contact">Get a Quote</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/#products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-700 text-cream-100 py-12">
        <div className="container-florista">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="font-display text-xl text-white">Balloon Displays</h3>
              <p className="text-cream-400 text-sm mt-1">
                Creating unforgettable moments
              </p>
            </div>
            <div className="flex gap-6">
              <Link href="/" className="text-cream-300 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link href="/#products" className="text-cream-300 hover:text-white transition-colors text-sm">
                Products
              </Link>
              <Link href="/gallery" className="text-cream-300 hover:text-white transition-colors text-sm">
                Gallery
              </Link>
              <Link href="/#contact" className="text-cream-300 hover:text-white transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>
          <div className="border-t border-charcoal-600 mt-8 pt-8 text-center text-cream-400 text-sm">
            <p>2026 Balloon Displays. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation (Mobile) */}
      <BottomNav items={bottomNavItems} />

      {/* Lightbox */}
      <Lightbox
        images={filteredImages}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </div>
  );
}

interface GalleryCardProps {
  image: typeof galleryImages[0];
  index: number;
  onClick: () => void;
}

function GalleryCard({ image, index, onClick }: GalleryCardProps) {
  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-xl bg-cream-200',
        'cursor-pointer animate-fade-in-up'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={onClick}
    >
      {/* Image container with fixed aspect ratio */}
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-normal">
        {/* Zoom icon */}
        <div className="absolute top-4 right-4">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-cream-100 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-normal">
            <ZoomIn className="w-5 h-5" />
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <Badge
            variant="botanical"
            className="mb-2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-normal"
            style={{ transitionDelay: '50ms' }}
          >
            {categories.find((c) => c.id === image.category)?.label || 'Photo'}
          </Badge>
          <h3
            className="font-display text-lg text-cream-100 mb-1 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-normal"
            style={{ transitionDelay: '100ms' }}
          >
            {image.title}
          </h3>
          <p
            className="text-cream-300 text-sm transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-normal"
            style={{ transitionDelay: '150ms' }}
          >
            {image.description}
          </p>
        </div>
      </div>
    </article>
  );
}

function GalleryCardMasonry({ image, index, onClick }: GalleryCardProps) {
  // Randomize height for masonry effect
  const heights = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/5]'];
  const heightClass = heights[index % heights.length];

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-xl bg-cream-200 mb-6 md:mb-8',
        'cursor-pointer animate-fade-in-up break-inside-avoid'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={onClick}
    >
      {/* Image container with variable aspect ratio */}
      <div className={cn(heightClass, 'overflow-hidden')}>
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-normal">
        {/* Zoom icon */}
        <div className="absolute top-4 right-4">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-cream-100 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-normal">
            <ZoomIn className="w-5 h-5" />
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <Badge
            variant="botanical"
            className="mb-2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-normal"
            style={{ transitionDelay: '50ms' }}
          >
            {categories.find((c) => c.id === image.category)?.label || 'Photo'}
          </Badge>
          <h3
            className="font-display text-lg text-cream-100 mb-1 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-normal"
            style={{ transitionDelay: '100ms' }}
          >
            {image.title}
          </h3>
          <p
            className="text-cream-300 text-sm transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-normal"
            style={{ transitionDelay: '150ms' }}
          >
            {image.description}
          </p>
        </div>
      </div>
    </article>
  );
}
