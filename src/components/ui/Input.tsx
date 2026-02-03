'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  [
    'w-full font-body text-charcoal-700 placeholder:text-charcoal-300',
    'bg-white border-[1.5px] border-cream-400 rounded-lg',
    'transition-all duration-fast ease-out',
    'focus:outline-none focus:border-botanical-500 focus:ring-2 focus:ring-botanical-100',
    'disabled:bg-cream-200 disabled:opacity-60 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      inputSize: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-base',
        lg: 'h-13 px-5 text-base',
      },
      hasError: {
        true: 'border-error focus:border-error focus:ring-error-light',
      },
      hasLeftIcon: {
        true: '',
      },
      hasRightIcon: {
        true: '',
      },
    },
    compoundVariants: [
      { inputSize: 'sm', hasLeftIcon: true, className: 'pl-9' },
      { inputSize: 'md', hasLeftIcon: true, className: 'pl-11' },
      { inputSize: 'lg', hasLeftIcon: true, className: 'pl-12' },
      { inputSize: 'sm', hasRightIcon: true, className: 'pr-9' },
      { inputSize: 'md', hasRightIcon: true, className: 'pr-11' },
      { inputSize: 'lg', hasRightIcon: true, className: 'pr-12' },
    ],
    defaultVariants: {
      inputSize: 'md',
    },
  }
);

const labelVariants = cva([
  'block font-body font-medium text-charcoal-600 mb-1.5',
], {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      inputSize,
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      disabled,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const hasError = !!error;

    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={labelVariants({ size: inputSize })}
          >
            {label}
            {required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400 pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            className={cn(
              inputVariants({
                inputSize,
                hasError,
                hasLeftIcon: !!leftIcon,
                hasRightIcon: !!rightIcon,
              }),
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400">
              {rightIcon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p
            id={error ? `${inputId}-error` : `${inputId}-helper`}
            className={cn(
              'mt-1.5 text-sm',
              error ? 'text-error' : 'text-charcoal-400'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
