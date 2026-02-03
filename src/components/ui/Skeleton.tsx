'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = 'default',
      width,
      height,
      animate = true,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-cream-300',
          animate && 'animate-pulse',
          variant === 'circular' && 'rounded-full',
          variant === 'text' && 'rounded h-4',
          variant === 'default' && 'rounded-lg',
          className
        )}
        style={{
          width: width,
          height: height,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// Pre-built skeleton compositions
const SkeletonProductCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('space-y-4', className)}>
    <Skeleton className="aspect-[4/5] w-full" />
    <div className="space-y-2">
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
      <Skeleton variant="text" className="w-1/4" />
    </div>
  </div>
);

const SkeletonListItem: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('flex items-center gap-3 py-3', className)}>
    <Skeleton variant="default" className="w-14 h-14 flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <Skeleton variant="text" className="w-1/2" />
      <Skeleton variant="text" className="w-3/4" />
    </div>
    <Skeleton variant="text" className="w-16" />
  </div>
);

const SkeletonAvatar: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className,
}) => (
  <Skeleton
    variant="circular"
    width={size}
    height={size}
    className={className}
  />
);

export { Skeleton, SkeletonProductCard, SkeletonListItem, SkeletonAvatar };
