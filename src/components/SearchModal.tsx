'use client';

import * as React from 'react';
import Link from 'next/link';
import { ShoppingCart, TrendingUp } from 'lucide-react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  Badge,
  Button,
  SearchBar,
} from '@/components/ui';
import { allProducts, type Product } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/cart';

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddedToCart?: (product: Product) => void;
}

export function SearchModal({ open, onOpenChange, onAddedToCart }: SearchModalProps) {
  const [query, setQuery] = React.useState('');
  const cart = useCart();

  // Reset query when modal closes
  React.useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const results = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [query]);

  const trending = React.useMemo(
    () => allProducts.filter((p) => p.badge === 'Popular').slice(0, 4),
    []
  );

  const handleAddToCart = (product: Product) => {
    cart.addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      type: product.type === 'service' ? 'service' : 'product',
    });
    onAddedToCart?.(product);
  };

  const showResults = query.trim().length > 0;
  const showTrending = !showResults;

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="lg">
        <ModalHeader>
          <ModalTitle>Search Products</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <SearchBar
            placeholder="Search balloon displays, garlands, arches..."
            value={query}
            onChange={setQuery}
            autoFocus
            size="lg"
          />

          <div className="mt-6">
            {showResults && results.length === 0 && (
              <div className="text-center py-12">
                <p className="text-charcoal-500 text-lg mb-2">No results found</p>
                <p className="text-charcoal-400 text-sm">
                  Try searching for "arch", "garland", or "bouquet"
                </p>
              </div>
            )}

            {showResults && results.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-charcoal-400 mb-3">
                  {results.length} {results.length === 1 ? 'result' : 'results'}
                </p>
                {results.map((product) => (
                  <SearchResultItem
                    key={product.id}
                    product={product}
                    onAddToCart={() => handleAddToCart(product)}
                    onNavigate={() => onOpenChange(false)}
                  />
                ))}
              </div>
            )}

            {showTrending && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-botanical-500" />
                  <p className="text-sm font-medium text-charcoal-600">Popular Products</p>
                </div>
                <div className="space-y-2">
                  {trending.map((product) => (
                    <SearchResultItem
                      key={product.id}
                      product={product}
                      onAddToCart={() => handleAddToCart(product)}
                      onNavigate={() => onOpenChange(false)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function SearchResultItem({
  product,
  onAddToCart,
  onNavigate,
}: {
  product: Product;
  onAddToCart: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-cream-100 transition-colors group">
      <Link
        href={`/products/${product.id}`}
        onClick={onNavigate}
        className="flex items-center gap-4 flex-1 min-w-0"
      >
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-cream-200 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-body font-medium text-charcoal-700 truncate">
              {product.name}
            </h4>
            {product.badge && (
              <Badge
                variant={
                  product.badge === 'Sale'
                    ? 'warning'
                    : product.badge === 'New Display'
                      ? 'info'
                      : 'botanical'
                }
                size="sm"
              >
                {product.badge}
              </Badge>
            )}
          </div>
          <p className="text-sm text-charcoal-400 truncate mt-0.5">
            {product.description}
          </p>
          <div className="flex items-center gap-2 mt-1">
            {product.originalPrice && (
              <span className="text-xs text-charcoal-300 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="font-body font-semibold text-sm text-charcoal-700">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </Link>
      <Button
        size="sm"
        variant="outline"
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onAddToCart();
        }}
        aria-label={`Add ${product.name} to cart`}
      >
        <ShoppingCart className="w-4 h-4" />
      </Button>
    </div>
  );
}
