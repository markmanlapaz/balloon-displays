'use client';

import * as React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
}

const QuantitySelector = React.forwardRef<HTMLDivElement, QuantitySelectorProps>(
  (
    {
      value,
      min = 1,
      max = 99,
      onChange,
      size = 'md',
      disabled = false,
      className,
    },
    ref
  ) => {
    const handleDecrement = () => {
      if (value > min) {
        onChange(value - 1);
      }
    };

    const handleIncrement = () => {
      if (value < max) {
        onChange(value + 1);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value, 10);
      if (!isNaN(newValue)) {
        onChange(Math.min(Math.max(newValue, min), max));
      }
    };

    const buttonSize = size === 'sm' ? 'w-9 h-9' : 'w-11 h-11';
    const inputSize = size === 'sm' ? 'w-12 h-9 text-sm' : 'w-14 h-11 text-base';
    const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center border-[1.5px] border-cream-400 rounded-lg overflow-hidden',
          disabled && 'opacity-60',
          className
        )}
      >
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          aria-label="Decrease quantity"
          className={cn(
            buttonSize,
            'flex items-center justify-center',
            'text-charcoal-600 bg-transparent',
            'transition-colors duration-fast',
            'hover:bg-cream-200',
            'disabled:text-charcoal-200 disabled:cursor-not-allowed disabled:hover:bg-transparent'
          )}
        >
          <Minus className={iconSize} />
        </button>

        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          min={min}
          max={max}
          aria-label="Quantity"
          className={cn(
            inputSize,
            'text-center font-body font-medium text-charcoal-700',
            'border-x border-cream-400 bg-transparent',
            'focus:outline-none',
            'disabled:cursor-not-allowed',
            '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          )}
        />

        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          aria-label="Increase quantity"
          className={cn(
            buttonSize,
            'flex items-center justify-center',
            'text-charcoal-600 bg-transparent',
            'transition-colors duration-fast',
            'hover:bg-cream-200',
            'disabled:text-charcoal-200 disabled:cursor-not-allowed disabled:hover:bg-transparent'
          )}
        >
          <Plus className={iconSize} />
        </button>
      </div>
    );
  }
);

QuantitySelector.displayName = 'QuantitySelector';

export { QuantitySelector };
