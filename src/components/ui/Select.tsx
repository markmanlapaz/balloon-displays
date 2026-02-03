'use client';

import * as React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  containerClassName?: string;
}

const sizeClasses = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-base',
  lg: 'h-13 px-5 text-base',
};

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = 'Select an option',
      label,
      helperText,
      error,
      disabled = false,
      required = false,
      size = 'md',
      className,
      containerClassName,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue || '');
    const containerRef = React.useRef<HTMLDivElement>(null);

    const value = controlledValue ?? internalValue;
    const selectedOption = options.find((opt) => opt.value === value);
    const hasError = !!error;

    const handleSelect = (optionValue: string) => {
      setInternalValue(optionValue);
      onChange?.(optionValue);
      setIsOpen(false);
    };

    // Close on click outside
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          setIsOpen(!isOpen);
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowDown':
          if (!isOpen) {
            e.preventDefault();
            setIsOpen(true);
          }
          break;
      }
    };

    const selectId = React.useId();

    return (
      <div ref={containerRef} className={cn('w-full relative', containerClassName)}>
        {label && (
          <label
            htmlFor={selectId}
            className="block font-body font-medium text-sm text-charcoal-600 mb-1.5"
          >
            {label}
            {required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}

        <button
          ref={ref}
          id={selectId}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-invalid={hasError}
          aria-describedby={
            error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
          }
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={cn(
            'w-full flex items-center justify-between',
            'font-body text-charcoal-700',
            'bg-white border-[1.5px] border-cream-400 rounded-lg',
            'transition-all duration-fast ease-out',
            'focus:outline-none focus:border-botanical-500 focus:ring-2 focus:ring-botanical-100',
            'disabled:bg-cream-200 disabled:opacity-60 disabled:cursor-not-allowed',
            hasError && 'border-error focus:border-error focus:ring-error-light',
            sizeClasses[size],
            className
          )}
        >
          <span className={cn(!selectedOption && 'text-charcoal-300')}>
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown
            className={cn(
              'h-4 w-4 text-charcoal-400 transition-transform duration-fast',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div
            role="listbox"
            className={cn(
              'absolute z-dropdown top-full left-0 right-0 mt-1',
              'bg-white rounded-lg shadow-lg border border-cream-300',
              'max-h-60 overflow-y-auto',
              'animate-fade-in-down'
            )}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                disabled={option.disabled}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-2.5',
                  'font-body text-sm text-charcoal-700 text-left',
                  'transition-colors duration-fast',
                  'hover:bg-cream-100',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  option.value === value && 'bg-botanical-50'
                )}
              >
                {option.label}
                {option.value === value && (
                  <Check className="h-4 w-4 text-botanical-700" />
                )}
              </button>
            ))}
          </div>
        )}

        {(error || helperText) && (
          <p
            id={error ? `${selectId}-error` : `${selectId}-helper`}
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

Select.displayName = 'Select';

export { Select };
