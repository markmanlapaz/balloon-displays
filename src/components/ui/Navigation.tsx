'use client';

import * as React from 'react';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavigationProps {
  variant?: 'default' | 'transparent' | 'minimal';
  logo?: React.ReactNode;
  items?: NavItem[];
  cartCount?: number;
  onCartClick?: () => void;
  onSearchClick?: () => void;
  onAccountClick?: () => void;
  onMenuToggle?: () => void;
  className?: string;
}

const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  (
    {
      variant = 'default',
      logo,
      items = [],
      cartCount = 0,
      onCartClick,
      onSearchClick,
      onAccountClick,
      onMenuToggle,
      className,
    },
    ref
  ) => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const handleMenuToggle = () => {
      setMobileMenuOpen(!mobileMenuOpen);
      onMenuToggle?.();
    };

    return (
      <>
        <header
          ref={ref}
          className={cn(
            'sticky top-0 z-sticky w-full',
            'transition-all duration-normal',
            variant === 'default' && 'bg-white/95 backdrop-blur-md border-b border-cream-300',
            variant === 'transparent' && 'bg-transparent',
            variant === 'minimal' && 'bg-white border-b border-cream-300',
            className
          )}
        >
          <nav className="container-florista">
            <div className="flex items-center justify-between h-16 lg:h-[72px]">
              {/* Logo */}
              <div className="flex-shrink-0">
                {logo || (
                  <a href="/" className="font-body font-semibold text-2xl text-botanical-700">
                    Balloon Displays
                  </a>
                )}
              </div>

              {/* Desktop Navigation */}
              {variant !== 'minimal' && items.length > 0 && (
                <div className="hidden lg:flex items-center gap-8">
                  {items.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'font-body font-medium text-[15px] transition-colors duration-fast',
                        'relative py-1',
                        item.active
                          ? 'text-botanical-700'
                          : 'text-charcoal-600 hover:text-botanical-700',
                        item.active &&
                          'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-botanical-700 after:rounded-full'
                      )}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2">
                {onSearchClick && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onSearchClick}
                    aria-label="Search"
                    className="hidden sm:flex"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                )}

                {onAccountClick && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onAccountClick}
                    aria-label="Account"
                    className="hidden sm:flex"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                )}

                {onCartClick && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onCartClick}
                    aria-label={`Cart with ${cartCount} items`}
                    className="relative"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-botanical-700 text-cream-100 text-xs font-medium rounded-full">
                        {cartCount > 9 ? '9+' : cartCount}
                      </span>
                    )}
                  </Button>
                )}

                {/* Mobile Menu Toggle */}
                {variant !== 'minimal' && items.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleMenuToggle}
                    aria-label="Toggle menu"
                    aria-expanded={mobileMenuOpen}
                    className="lg:hidden"
                  >
                    {mobileMenuOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          </nav>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-overlay lg:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-charcoal-700/50 animate-fade-in"
              onClick={handleMenuToggle}
            />

            {/* Menu Panel */}
            <div className="absolute top-16 left-0 right-0 bg-white border-b border-cream-300 animate-slide-in-down">
              <nav className="container-florista py-4">
                <div className="flex flex-col gap-1">
                  {items.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'font-body font-medium text-lg py-3 px-4 rounded-lg transition-colors',
                        item.active
                          ? 'text-botanical-700 bg-botanical-50'
                          : 'text-charcoal-700 hover:bg-cream-100'
                      )}
                      onClick={handleMenuToggle}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }
);

Navigation.displayName = 'Navigation';

export { Navigation };
