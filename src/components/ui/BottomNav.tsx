'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BottomNavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  badge?: number;
}

export interface BottomNavProps {
  items: BottomNavItem[];
  className?: string;
}

const BottomNav = React.forwardRef<HTMLElement, BottomNavProps>(
  ({ items, className }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          'fixed bottom-0 left-0 right-0 z-sticky',
          'bg-white border-t border-cream-300',
          'pb-safe',
          'lg:hidden',
          className
        )}
      >
        <div className="flex items-center justify-around h-16">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1',
                'flex-1 h-full px-2',
                'transition-colors duration-fast',
                item.active
                  ? 'text-botanical-700'
                  : 'text-charcoal-400 hover:text-charcoal-600'
              )}
            >
              <div className="relative">
                <span className="[&>svg]:h-6 [&>svg]:w-6">{item.icon}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-4 w-4 flex items-center justify-center bg-botanical-700 text-cream-100 text-[10px] font-medium rounded-full">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
    );
  }
);

BottomNav.displayName = 'BottomNav';

export { BottomNav };
