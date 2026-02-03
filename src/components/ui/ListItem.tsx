'use client';

import * as React from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';

export interface ListItemProps {
  variant?: 'default' | 'product' | 'navigation' | 'selectable';
  title: string;
  subtitle?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  image?: string;
  price?: number;
  meta?: string;
  selected?: boolean;
  disabled?: boolean;
  showDivider?: boolean;
  onClick?: () => void;
  className?: string;
}

const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  (
    {
      variant = 'default',
      title,
      subtitle,
      leftContent,
      rightContent,
      image,
      price,
      meta,
      selected = false,
      disabled = false,
      showDivider = true,
      onClick,
      className,
    },
    ref
  ) => {
    const isInteractive = !!onClick && !disabled;

    const content = (
      <>
        {/* Left Content / Image */}
        {(leftContent || image) && (
          <div className="flex-shrink-0">
            {image ? (
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-cream-200">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              leftContent
            )}
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              'font-body font-medium text-[15px] text-charcoal-700 truncate',
              disabled && 'text-charcoal-400'
            )}
          >
            {title}
          </p>
          {subtitle && (
            <p className="text-sm text-charcoal-400 truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right Content */}
        <div className="flex-shrink-0 flex items-center gap-2">
          {variant === 'product' && (
            <div className="text-right">
              {price !== undefined && (
                <p className="font-body font-semibold text-[15px] text-charcoal-700">
                  {formatPrice(price)}
                </p>
              )}
              {meta && (
                <p className="text-xs text-charcoal-300 mt-0.5">{meta}</p>
              )}
            </div>
          )}

          {variant === 'selectable' && selected && (
            <div className="h-5 w-5 rounded-full bg-botanical-700 flex items-center justify-center">
              <Check className="h-3 w-3 text-cream-100" />
            </div>
          )}

          {variant === 'navigation' && (
            <ChevronRight className="h-5 w-5 text-charcoal-300" />
          )}

          {rightContent}
        </div>
      </>
    );

    const baseClasses = cn(
      'flex items-center gap-3 py-3',
      showDivider && 'border-b border-cream-300',
      isInteractive && [
        'cursor-pointer transition-colors duration-fast',
        '-mx-3 px-3 rounded-lg',
        'hover:bg-cream-100',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-botanical focus-visible:ring-offset-2',
      ],
      disabled && 'opacity-50 cursor-not-allowed',
      selected && variant === 'selectable' && 'bg-botanical-50',
      className
    );

    if (isInteractive) {
      return (
        <div
          ref={ref}
          role="button"
          tabIndex={0}
          onClick={onClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick?.();
            }
          }}
          className={baseClasses}
        >
          {content}
        </div>
      );
    }

    return (
      <div ref={ref} className={baseClasses}>
        {content}
      </div>
    );
  }
);

ListItem.displayName = 'ListItem';

// List container component
export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const List = React.forwardRef<HTMLDivElement, ListProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="list"
      className={cn('divide-y divide-cream-300', className)}
      {...props}
    >
      {children}
    </div>
  )
);

List.displayName = 'List';

export { ListItem, List };
