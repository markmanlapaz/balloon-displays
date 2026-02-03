'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textareaVariants = cva(
  [
    'w-full font-body text-charcoal-700 placeholder:text-charcoal-300',
    'bg-white border-[1.5px] border-cream-400 rounded-lg',
    'transition-all duration-fast ease-out',
    'focus:outline-none focus:border-botanical-500 focus:ring-2 focus:ring-botanical-100',
    'disabled:bg-cream-200 disabled:opacity-60 disabled:cursor-not-allowed',
    'resize-none',
  ],
  {
    variants: {
      inputSize: {
        sm: 'px-3 py-2 text-sm min-h-[80px]',
        md: 'px-4 py-3 text-base min-h-[120px]',
        lg: 'px-5 py-4 text-base min-h-[160px]',
      },
      hasError: {
        true: 'border-error focus:border-error focus:ring-error-light',
      },
    },
    defaultVariants: {
      inputSize: 'md',
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  helperText?: string;
  error?: string;
  showCount?: boolean;
  containerClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      containerClassName,
      inputSize,
      label,
      helperText,
      error,
      showCount = false,
      disabled,
      required,
      maxLength,
      value,
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || React.useId();
    const hasError = !!error;
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block font-body font-medium text-sm text-charcoal-600 mb-1.5"
          >
            {label}
            {required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}

        <textarea
          id={textareaId}
          ref={ref}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          value={value}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
          }
          className={cn(textareaVariants({ inputSize, hasError }), className)}
          {...props}
        />

        <div className="flex justify-between mt-1.5">
          {(error || helperText) && (
            <p
              id={error ? `${textareaId}-error` : `${textareaId}-helper`}
              className={cn(
                'text-sm',
                error ? 'text-error' : 'text-charcoal-400'
              )}
            >
              {error || helperText}
            </p>
          )}

          {showCount && maxLength && (
            <p
              className={cn(
                'text-sm text-charcoal-400 ml-auto',
                charCount >= maxLength && 'text-error'
              )}
            >
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
