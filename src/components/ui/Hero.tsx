'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

export interface HeroProps {
  variant?: 'centered' | 'split' | 'minimal';
  headline: string;
  subheadline?: string;
  description?: string;
  cta?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary';
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  image?: {
    src: string;
    alt: string;
  };
  backgroundImage?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  children?: React.ReactNode;
}

const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    {
      variant = 'split',
      headline,
      subheadline,
      description,
      cta,
      secondaryCta,
      image,
      backgroundImage,
      align = 'left',
      className,
      children,
    },
    ref
  ) => {
    if (variant === 'centered') {
      return (
        <section
          ref={ref}
          className={cn(
            'relative min-h-[70vh] flex items-center justify-center',
            'px-5 py-16 lg:py-24',
            className
          )}
          style={
            backgroundImage
              ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
              : undefined
          }
        >
          {backgroundImage && (
            <div className="absolute inset-0 bg-charcoal-700/40" />
          )}

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {subheadline && (
              <p
                className={cn(
                  'font-display text-lg lg:text-xl mb-4 animate-fade-in-up',
                  backgroundImage ? 'text-cream-200' : 'text-charcoal-500'
                )}
                style={{ animationDelay: '100ms' }}
              >
                {subheadline}
              </p>
            )}

            <h1
              className={cn(
                'font-display font-bold text-display-md lg:text-display-xl text-balance animate-fade-in-up',
                backgroundImage ? 'text-white' : 'text-charcoal-700'
              )}
              style={{ animationDelay: '200ms' }}
            >
              {headline}
            </h1>

            {description && (
              <p
                className={cn(
                  'mt-6 text-lg lg:text-xl max-w-xl mx-auto animate-fade-in-up',
                  backgroundImage ? 'text-cream-200' : 'text-charcoal-500'
                )}
                style={{ animationDelay: '300ms' }}
              >
                {description}
              </p>
            )}

            {(cta || secondaryCta) && (
              <div
                className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up"
                style={{ animationDelay: '400ms' }}
              >
                {cta && (
                  <Button
                    asChild
                    size="lg"
                    variant={cta.variant || 'primary'}
                  >
                    <a href={cta.href}>{cta.label}</a>
                  </Button>
                )}
                {secondaryCta && (
                  <Button
                    asChild
                    size="lg"
                    variant={backgroundImage ? 'outline' : 'ghost'}
                    className={backgroundImage ? 'border-white text-white hover:bg-white/10' : ''}
                  >
                    <a href={secondaryCta.href}>{secondaryCta.label}</a>
                  </Button>
                )}
              </div>
            )}

            {children}
          </div>
        </section>
      );
    }

    if (variant === 'minimal') {
      return (
        <section
          ref={ref}
          className={cn(
            'py-16 lg:py-24 bg-gradient-to-b from-cream-100 to-sage-50',
            className
          )}
        >
          <div className="container-florista">
            <div
              className={cn(
                'max-w-2xl',
                align === 'center' && 'mx-auto text-center',
                align === 'right' && 'ml-auto text-right'
              )}
            >
              {subheadline && (
                <p className="font-display text-botanical-600 text-lg mb-3 animate-fade-in-up">
                  {subheadline}
                </p>
              )}

              <h1 className="font-display font-bold text-display-md lg:text-display-lg text-charcoal-700 text-balance animate-fade-in-up">
                {headline}
              </h1>

              {description && (
                <p className="mt-6 text-lg text-charcoal-500 animate-fade-in-up">
                  {description}
                </p>
              )}

              {(cta || secondaryCta) && (
                <div
                  className={cn(
                    'mt-8 flex flex-wrap gap-4',
                    align === 'center' && 'justify-center',
                    align === 'right' && 'justify-end'
                  )}
                >
                  {cta && (
                    <Button asChild size="lg" variant={cta.variant || 'primary'}>
                      <a href={cta.href}>{cta.label}</a>
                    </Button>
                  )}
                  {secondaryCta && (
                    <Button asChild size="lg" variant="ghost">
                      <a href={secondaryCta.href}>{secondaryCta.label}</a>
                    </Button>
                  )}
                </div>
              )}

              {children}
            </div>
          </div>
        </section>
      );
    }

    // Split variant (default)
    return (
      <section
        ref={ref}
        className={cn(
          'min-h-[80vh] bg-cream-100',
          className
        )}
      >
        <div className="container-florista h-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 lg:py-16 min-h-[80vh]">
            {/* Content */}
            <div className="max-w-lg">
              {subheadline && (
                <p
                  className="font-display text-botanical-600 text-lg lg:text-xl mb-2 animate-fade-in-up"
                  style={{ animationDelay: '100ms' }}
                >
                  {subheadline}
                </p>
              )}

              <h1
                className="font-display font-bold text-display-md lg:text-display-lg xl:text-display-xl text-charcoal-700 text-balance animate-fade-in-up"
                style={{ animationDelay: '200ms' }}
              >
                {headline}
              </h1>

              {description && (
                <p
                  className="mt-6 text-lg text-charcoal-500 leading-relaxed max-w-md animate-fade-in-up"
                  style={{ animationDelay: '300ms' }}
                >
                  {description}
                </p>
              )}

              {(cta || secondaryCta) && (
                <div
                  className="mt-8 flex flex-wrap gap-4 animate-fade-in-up"
                  style={{ animationDelay: '400ms' }}
                >
                  {cta && (
                    <Button asChild size="lg" variant={cta.variant || 'primary'}>
                      <a href={cta.href}>{cta.label}</a>
                    </Button>
                  )}
                  {secondaryCta && (
                    <Button asChild size="lg" variant="outline">
                      <a href={secondaryCta.href}>{secondaryCta.label}</a>
                    </Button>
                  )}
                </div>
              )}

              {children}
            </div>

            {/* Image */}
            {image && (
              <div
                className="relative animate-fade-in lg:animate-slide-in-right"
                style={{ animationDelay: '200ms' }}
              >
                <div className="aspect-[4/5] lg:aspect-[3/4] rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-sage-200 rounded-2xl lg:rounded-3xl" />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
);

Hero.displayName = 'Hero';

export { Hero };
