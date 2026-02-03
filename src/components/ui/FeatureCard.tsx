'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  href?: string;
  variant?: 'default' | 'outlined' | 'filled';
  className?: string;
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    {
      icon,
      title,
      description,
      href,
      variant = 'default',
      className,
    },
    ref
  ) => {
    const content = (
      <>
        <div
          className={cn(
            'w-14 h-14 rounded-2xl flex items-center justify-center mb-4',
            'bg-botanical-100 text-botanical-700',
            'transition-colors duration-normal',
            'group-hover:bg-botanical-200'
          )}
        >
          <span className="[&>svg]:w-6 [&>svg]:h-6">{icon}</span>
        </div>
        <h3 className="font-display font-medium text-lg text-charcoal-700">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-charcoal-400 mt-1">
            {description}
          </p>
        )}
      </>
    );

    const baseClasses = cn(
      'group p-6 rounded-2xl text-center',
      'transition-all duration-normal ease-out',
      variant === 'default' && 'bg-white shadow-sm hover:shadow-md hover:-translate-y-1',
      variant === 'outlined' && 'border-[1.5px] border-cream-400 hover:border-botanical-300 hover:bg-botanical-50',
      variant === 'filled' && 'bg-cream-100 hover:bg-cream-200',
      className
    );

    if (href) {
      return (
        <a ref={ref as any} href={href} className={baseClasses}>
          {content}
        </a>
      );
    }

    return (
      <div ref={ref} className={baseClasses}>
        {content}
      </div>
    );
  }
);

FeatureCard.displayName = 'FeatureCard';

export { FeatureCard };
