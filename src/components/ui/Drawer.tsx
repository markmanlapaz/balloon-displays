'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Drawer = DialogPrimitive.Root;
const DrawerTrigger = DialogPrimitive.Trigger;
const DrawerClose = DialogPrimitive.Close;
const DrawerPortal = DialogPrimitive.Portal;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-modal bg-charcoal-700/50 backdrop-blur-sm',
      'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
      className
    )}
    {...props}
  />
));
DrawerOverlay.displayName = 'DrawerOverlay';

interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  position?: 'left' | 'right' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'full';
}

const positionClasses = {
  left: 'left-0 top-0 bottom-0 data-[state=open]:animate-slide-in-left data-[state=closed]:animate-slide-out-left',
  right: 'right-0 top-0 bottom-0 data-[state=open]:animate-slide-in-right data-[state=closed]:animate-slide-out-right',
  bottom: 'bottom-0 left-0 right-0 rounded-t-2xl data-[state=open]:animate-slide-in-up data-[state=closed]:animate-slide-out-down max-h-[90vh]',
};

const sizeClasses = {
  left: {
    sm: 'w-[320px]',
    md: 'w-[400px]',
    lg: 'w-[560px]',
    full: 'w-full',
  },
  right: {
    sm: 'w-[320px]',
    md: 'w-[400px]',
    lg: 'w-[560px]',
    full: 'w-full',
  },
  bottom: {
    sm: '',
    md: '',
    lg: '',
    full: '',
  },
};

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(({ className, children, position = 'right', size = 'md', ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed z-modal bg-white shadow-2xl flex flex-col',
        'focus:outline-none',
        positionClasses[position],
        position !== 'bottom' && sizeClasses[position][size],
        className
      )}
      {...props}
    >
      {/* Drag handle for bottom drawer */}
      {position === 'bottom' && (
        <div className="flex justify-center py-3">
          <div className="w-12 h-1.5 rounded-full bg-cream-400" />
        </div>
      )}
      {children}
    </DialogPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = 'DrawerContent';

interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  showCloseButton?: boolean;
}

const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, children, showCloseButton = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'h-16 px-6 flex items-center justify-between flex-shrink-0',
        'border-b border-cream-300',
        className
      )}
      {...props}
    >
      <div className="flex-1">{children}</div>
      {showCloseButton && (
        <DialogPrimitive.Close
          className={cn(
            'h-8 w-8 flex items-center justify-center rounded-full',
            'text-charcoal-400 hover:text-charcoal-600 hover:bg-cream-200',
            'transition-colors duration-fast',
            'focus:outline-none focus:ring-2 focus:ring-botanical focus:ring-offset-2'
          )}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </div>
  )
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('font-display font-semibold text-xl text-charcoal-700', className)}
    {...props}
  />
));
DrawerTitle.displayName = 'DrawerTitle';

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-charcoal-500', className)}
    {...props}
  />
));
DrawerDescription.displayName = 'DrawerDescription';

const DrawerBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex-1 overflow-y-auto p-6 scrollbar-thin', className)}
    {...props}
  />
);
DrawerBody.displayName = 'DrawerBody';

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'p-6 border-t border-cream-300 flex-shrink-0',
      'pb-safe',
      className
    )}
    {...props}
  />
);
DrawerFooter.displayName = 'DrawerFooter';

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
};
