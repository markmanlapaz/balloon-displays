'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn, formatPrice } from '@/lib/utils';

const priceVariants = cva(['font-body font-semibold text-charcoal-700'], {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-lg',
      lg: 'text-2xl',
      xl: 'text-3xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const originalPriceVariants = cva(
  ['font-body font-normal text-charcoal-300 line-through'],
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-lg',
        xl: 'text-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface PriceDisplayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof priceVariants> {
  price: number;
  originalPrice?: number;
  currency?: string;
  locale?: string;
  showCurrency?: boolean;
}

const PriceDisplay = React.forwardRef<HTMLDivElement, PriceDisplayProps>(
  (
    {
      className,
      size,
      price,
      originalPrice,
      currency = 'USD',
      locale = 'en-US',
      showCurrency = true,
      ...props
    },
    ref
  ) => {
    const formattedPrice = formatPrice(price, { currency, locale });
    const formattedOriginal = originalPrice
      ? formatPrice(originalPrice, { currency, locale })
      : null;

    const hasDiscount = originalPrice && originalPrice > price;
    const discountPercent = hasDiscount
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2 flex-wrap', className)}
        {...props}
      >
        {hasDiscount && formattedOriginal && (
          <span className={originalPriceVariants({ size })}>
            {formattedOriginal}
          </span>
        )}
        <span className={priceVariants({ size })}>{formattedPrice}</span>
        {hasDiscount && discountPercent > 0 && (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-terracotta-100 text-terracotta-700">
            -{discountPercent}%
          </span>
        )}
      </div>
    );
  }
);

PriceDisplay.displayName = 'PriceDisplay';

export { PriceDisplay, priceVariants };
