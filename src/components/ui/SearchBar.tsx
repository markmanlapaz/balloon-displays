'use client';

import * as React from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  suggestions?: string[];
  recentSearches?: string[];
  trendingSearches?: string[];
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  autoFocus?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-10 pl-10 pr-10 text-sm',
  md: 'h-12 pl-12 pr-12 text-base',
  lg: 'h-14 pl-14 pr-14 text-base',
};

const iconSizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-5 w-5',
};

const iconPositionClasses = {
  sm: 'left-3',
  md: 'left-4',
  lg: 'left-5',
};

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      placeholder = 'Search...',
      value: controlledValue,
      onChange,
      onSearch,
      suggestions = [],
      recentSearches = [],
      trendingSearches = [],
      loading = false,
      size = 'md',
      autoFocus = false,
      className,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const value = controlledValue ?? internalValue;
    const hasValue = value.length > 0;
    const showDropdown = isOpen && (suggestions.length > 0 || recentSearches.length > 0 || trendingSearches.length > 0);

    const allSuggestions = React.useMemo(() => {
      const items: { type: 'suggestion' | 'recent' | 'trending'; value: string }[] = [];

      suggestions.forEach((s) => items.push({ type: 'suggestion', value: s }));
      if (!hasValue) {
        recentSearches.forEach((s) => items.push({ type: 'recent', value: s }));
        trendingSearches.forEach((s) => items.push({ type: 'trending', value: s }));
      }

      return items;
    }, [suggestions, recentSearches, trendingSearches, hasValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(newValue);
      setHighlightedIndex(-1);
    };

    const handleClear = () => {
      setInternalValue('');
      onChange?.('');
      inputRef.current?.focus();
    };

    const handleSubmit = (searchValue: string) => {
      onSearch?.(searchValue);
      setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < allSuggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : allSuggestions.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && allSuggestions[highlightedIndex]) {
            handleSubmit(allSuggestions[highlightedIndex].value);
          } else {
            handleSubmit(value);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    };

    const handleSuggestionClick = (suggestion: string) => {
      setInternalValue(suggestion);
      onChange?.(suggestion);
      handleSubmit(suggestion);
    };

    // Combine refs
    React.useImperativeHandle(ref, () => inputRef.current!);

    return (
      <div className={cn('relative', className)}>
        {/* Search Icon */}
        <Search
          className={cn(
            'absolute top-1/2 -translate-y-1/2 text-charcoal-400 pointer-events-none',
            iconSizeClasses[size],
            iconPositionClasses[size]
          )}
        />

        {/* Input */}
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete="off"
          aria-label="Search"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          className={cn(
            'w-full font-body text-charcoal-700 placeholder:text-charcoal-300',
            'bg-white border-[1.5px] border-cream-400 rounded-xl',
            'transition-all duration-fast',
            'focus:outline-none focus:border-botanical-500 focus:ring-2 focus:ring-botanical-100',
            sizeClasses[size],
            '[&::-webkit-search-cancel-button]:hidden'
          )}
        />

        {/* Clear Button */}
        {hasValue && (
          <button
            type="button"
            onClick={handleClear}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 right-3',
              'h-6 w-6 flex items-center justify-center rounded-full',
              'text-charcoal-400 hover:text-charcoal-600 hover:bg-cream-200',
              'transition-colors duration-fast'
            )}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="absolute top-1/2 -translate-y-1/2 right-3">
            <div className="h-5 w-5 border-2 border-cream-400 border-t-botanical-600 rounded-full animate-spin" />
          </div>
        )}

        {/* Dropdown */}
        {showDropdown && (
          <div
            className={cn(
              'absolute top-full left-0 right-0 mt-2',
              'bg-white rounded-xl shadow-lg border border-cream-300',
              'max-h-80 overflow-y-auto',
              'z-dropdown',
              'animate-fade-in-down'
            )}
          >
            {hasValue && suggestions.length > 0 && (
              <div className="p-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left',
                      'transition-colors duration-fast',
                      highlightedIndex === index
                        ? 'bg-cream-100'
                        : 'hover:bg-cream-50'
                    )}
                  >
                    <Search className="h-4 w-4 text-charcoal-300 flex-shrink-0" />
                    <span className="font-body text-sm text-charcoal-700">
                      {suggestion}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {!hasValue && recentSearches.length > 0 && (
              <div className="p-2">
                <p className="px-3 py-1.5 text-xs font-medium text-charcoal-400 uppercase tracking-wider">
                  Recent
                </p>
                {recentSearches.map((search, index) => {
                  const adjustedIndex = suggestions.length + index;
                  return (
                    <button
                      key={search}
                      type="button"
                      onClick={() => handleSuggestionClick(search)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left',
                        'transition-colors duration-fast',
                        highlightedIndex === adjustedIndex
                          ? 'bg-cream-100'
                          : 'hover:bg-cream-50'
                      )}
                    >
                      <Clock className="h-4 w-4 text-charcoal-300 flex-shrink-0" />
                      <span className="font-body text-sm text-charcoal-700">
                        {search}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {!hasValue && trendingSearches.length > 0 && (
              <div className="p-2 border-t border-cream-200">
                <p className="px-3 py-1.5 text-xs font-medium text-charcoal-400 uppercase tracking-wider">
                  Trending
                </p>
                {trendingSearches.map((search, index) => {
                  const adjustedIndex = suggestions.length + recentSearches.length + index;
                  return (
                    <button
                      key={search}
                      type="button"
                      onClick={() => handleSuggestionClick(search)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left',
                        'transition-colors duration-fast',
                        highlightedIndex === adjustedIndex
                          ? 'bg-cream-100'
                          : 'hover:bg-cream-50'
                      )}
                    >
                      <TrendingUp className="h-4 w-4 text-botanical-500 flex-shrink-0" />
                      <span className="font-body text-sm text-charcoal-700">
                        {search}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export { SearchBar };
