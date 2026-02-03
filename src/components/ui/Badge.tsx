'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1',
    'font-body font-medium',
    'rounded-full',
    'transition-colors duration-fast',
  ],
  {
    variants: {
      variant: {
        default: 'bg-cream-300 text-charcoal-600',
        botanical: 'bg-botanical-700 text-cream-100',
        success: 'bg-botanical-100 text-botanical-800',
        warning: 'bg-warning-light text-warning-dark',
        error: 'bg-error-light text-error-dark',
        info: 'bg-info-light text-info-dark',
        outline: 'bg-transparent border border-cream-400 text-charcoal-600',
      },
      size: {
        sm: 'h-5 px-2 text-[11px] uppercase tracking-wider',
        md: 'h-6 px-2.5 text-xs',
        lg: 'h-7 px-3 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      dot,
      removable,
      onRemove,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full',
              variant === 'botanical' ? 'bg-cream-100' : 'bg-current'
            )}
          />
        )}
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className={cn(
              'ml-0.5 -mr-1 h-4 w-4 rounded-full inline-flex items-center justify-center',
              'hover:bg-black/10 transition-colors',
              'focus:outline-none focus:ring-1 focus:ring-current'
            )}
            aria-label="Remove"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
