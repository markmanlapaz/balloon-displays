'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-body font-medium',
    'rounded-lg',
    'transition-all duration-fast ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-botanical focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100',
    'disabled:pointer-events-none disabled:opacity-60',
    'active:scale-[0.98]',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-botanical-700 text-cream-100',
          'hover:bg-botanical-600 hover:-translate-y-0.5 hover:shadow-botanical',
          'active:bg-botanical-800 active:translate-y-0',
        ],
        secondary: [
          'bg-charcoal-700 text-cream-100',
          'hover:bg-charcoal-600',
          'active:bg-charcoal-800',
        ],
        outline: [
          'border-[1.5px] border-cream-400 bg-transparent text-charcoal-700',
          'hover:bg-cream-200 hover:border-charcoal-300',
          'active:bg-cream-300',
        ],
        ghost: [
          'bg-transparent text-charcoal-700',
          'hover:bg-cream-200',
          'active:bg-cream-300',
        ],
        link: [
          'bg-transparent text-botanical-700 underline-offset-4',
          'hover:underline',
          'active:text-botanical-800',
          'p-0 h-auto',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-5 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // When asChild is true, render Slot with the single child directly
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
