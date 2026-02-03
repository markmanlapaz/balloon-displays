import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with Tailwind CSS merge support.
 * Handles conditional classes, arrays, and deduplicates Tailwind utilities.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as currency.
 */
export function formatPrice(
  price: number,
  options: {
    currency?: string;
    locale?: string;
    showCents?: boolean;
  } = {}
): string {
  const { currency = 'USD', locale = 'en-US', showCents = true } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  }).format(price);
}

/**
 * Truncates text to a specified length with ellipsis.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Generates a unique ID for accessibility purposes.
 */
let idCounter = 0;
export function generateId(prefix: string = 'florista'): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

/**
 * Delays execution for a specified time (useful for animations).
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Checks if code is running on the client side.
 */
export const isClient = typeof window !== 'undefined';

/**
 * Checks if the user prefers reduced motion.
 */
export function prefersReducedMotion(): boolean {
  if (!isClient) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
