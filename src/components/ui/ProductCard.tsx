'use client';

import * as React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { Badge } from './Badge';
import { Button } from './Button';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  rating?: number;
  inStock?: boolean;
}

export interface ProductCardProps {
  variant?: 'default' | 'featured' | 'compact' | 'horizontal';
  product: Product;
  showDescription?: boolean;
  showRating?: boolean;
  onAddToCart?: (id: string) => void;
  onQuickView?: (id: string) => void;
  onClick?: (id: string) => void;
  className?: string;
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      variant = 'default',
      product,
      showDescription = true,
      onAddToCart,
      onQuickView,
      onClick,
      className,
    },
    ref
  ) => {
    const {
      id,
      name,
      description,
      price,
      originalPrice,
      image,
      badge,
      inStock = true,
    } = product;

    const hasDiscount = originalPrice && originalPrice > price;

    if (variant === 'compact') {
      return (
        <div
          ref={ref}
          onClick={() => onClick?.(id)}
          className={cn(
            'flex items-center gap-3 p-3 cursor-pointer',
            'transition-colors duration-fast',
            'hover:bg-cream-100',
            className
          )}
        >
          <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-cream-200">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-body font-medium text-sm text-charcoal-700 truncate">
              {name}
            </h4>
            {description && (
              <p className="text-xs text-charcoal-400 truncate mt-0.5">
                {description}
              </p>
            )}
          </div>
          <div className="flex-shrink-0 text-right">
            <span className="font-body font-semibold text-sm text-charcoal-700">
              {formatPrice(price)}
            </span>
          </div>
        </div>
      );
    }

    if (variant === 'horizontal') {
      return (
        <div
          ref={ref}
          onClick={() => onClick?.(id)}
          className={cn(
            'flex gap-4 p-4 bg-white rounded-xl shadow-sm cursor-pointer',
            'transition-all duration-normal',
            'hover:shadow-md hover:-translate-y-0.5',
            className
          )}
        >
          <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-cream-200 relative">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
            {badge && (
              <div className="absolute top-2 left-2">
                <Badge variant="botanical" size="sm">{badge}</Badge>
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-between py-1">
            <div>
              <h3 className="font-display font-medium text-lg text-charcoal-700">
                {name}
              </h3>
              {description && showDescription && (
                <p className="text-sm text-charcoal-400 mt-1 line-clamp-2">
                  {description}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {hasDiscount && (
                  <span className="text-sm text-charcoal-300 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
                <span className="font-body font-semibold text-charcoal-700">
                  {formatPrice(price)}
                </span>
              </div>
              {onAddToCart && inStock && (
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(id);
                  }}
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    }

    const isFeatured = variant === 'featured';

    return (
      <div
        ref={ref}
        onClick={() => onClick?.(id)}
        className={cn(
          'group cursor-pointer',
          isFeatured ? 'min-w-[280px]' : 'min-w-[240px] max-w-[320px]',
          className
        )}
      >
        {/* Image Container */}
        <div
          className={cn(
            'relative overflow-hidden bg-cream-200',
            isFeatured ? 'aspect-[3/4] rounded-2xl' : 'aspect-[4/5] rounded-xl'
          )}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-slow ease-out group-hover:scale-105"
          />

          {/* Badge */}
          {badge && (
            <div className="absolute top-3 left-3">
              <Badge variant="botanical" size="sm">{badge}</Badge>
            </div>
          )}

          {/* Out of Stock Overlay */}
          {!inStock && (
            <div className="absolute inset-0 bg-charcoal-700/40 flex items-center justify-center">
              <Badge variant="default" size="lg">Sold Out</Badge>
            </div>
          )}

          {/* Quick Actions Overlay */}
          {inStock && (onAddToCart || onQuickView) && (
            <div
              className={cn(
                'absolute inset-x-0 bottom-0 p-4',
                'bg-gradient-to-t from-black/50 to-transparent',
                'opacity-0 translate-y-2 transition-all duration-normal',
                'group-hover:opacity-100 group-hover:translate-y-0',
                isFeatured && 'opacity-100 translate-y-0'
              )}
            >
              <div className="flex gap-2">
                {onAddToCart && (
                  <Button
                    size={isFeatured ? 'md' : 'sm'}
                    variant="primary"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(id);
                    }}
                    leftIcon={<ShoppingCart className="h-4 w-4" />}
                  >
                    Add to Cart
                  </Button>
                )}
                {onQuickView && (
                  <Button
                    size={isFeatured ? 'md' : 'sm'}
                    variant="outline"
                    className="bg-white/90 backdrop-blur-sm border-white/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(id);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="pt-4">
          <h3
            className={cn(
              'font-display font-medium text-charcoal-700',
              isFeatured ? 'text-xl' : 'text-lg'
            )}
          >
            {name}
          </h3>

          {description && showDescription && (
            <p className="text-sm text-charcoal-400 mt-1 line-clamp-2">
              {description}
            </p>
          )}

          <div className="flex items-center gap-2 mt-2">
            {hasDiscount && (
              <span className="text-sm text-charcoal-300 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
            <span
              className={cn(
                'font-body font-semibold text-charcoal-700',
                isFeatured ? 'text-lg' : 'text-base'
              )}
            >
              {formatPrice(price)}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

ProductCard.displayName = 'ProductCard';

export { ProductCard };
