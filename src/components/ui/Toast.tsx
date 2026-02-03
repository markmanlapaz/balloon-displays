'use client';

import * as React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  variant?: ToastVariant;
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  className?: string;
}

const variantStyles: Record<ToastVariant, { icon: typeof CheckCircle; className: string }> = {
  success: {
    icon: CheckCircle,
    className: 'text-botanical-600',
  },
  error: {
    icon: XCircle,
    className: 'text-error',
  },
  warning: {
    icon: AlertTriangle,
    className: 'text-warning-dark',
  },
  info: {
    icon: Info,
    className: 'text-info',
  },
};

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = 'info',
      title,
      message,
      duration = 5000,
      action,
      onClose,
      className,
    },
    ref
  ) => {
    const [isExiting, setIsExiting] = React.useState(false);

    const handleClose = React.useCallback(() => {
      setIsExiting(true);
      setTimeout(() => {
        onClose?.();
      }, 200);
    }, [onClose]);

    React.useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(handleClose, duration);
        return () => clearTimeout(timer);
      }
    }, [duration, handleClose]);

    const { icon: Icon, className: iconClassName } = variantStyles[variant];

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(
          'relative min-w-[320px] max-w-[480px] p-4',
          'bg-white rounded-xl shadow-xl border border-cream-300',
          'flex items-start gap-3',
          isExiting ? 'animate-fade-out' : 'animate-slide-in-up',
          className
        )}
      >
        {/* Icon */}
        <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', iconClassName)} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-body font-semibold text-[15px] text-charcoal-700">
              {title}
            </p>
          )}
          <p
            className={cn(
              'font-body text-sm text-charcoal-500',
              title && 'mt-0.5'
            )}
          >
            {message}
          </p>
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className="mt-2 font-body font-medium text-sm text-botanical-700 hover:text-botanical-800 transition-colors"
            >
              {action.label}
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className={cn(
            'flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full',
            'text-charcoal-400 hover:text-charcoal-600 hover:bg-cream-200',
            'transition-colors duration-fast'
          )}
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Progress bar */}
        {duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-xl">
            <div
              className="h-full bg-botanical-300"
              style={{
                animation: `shrink ${duration}ms linear forwards`,
              }}
            />
          </div>
        )}

        <style jsx>{`
          @keyframes shrink {
            from {
              width: 100%;
            }
            to {
              width: 0%;
            }
          }
        `}</style>
      </div>
    );
  }
);

Toast.displayName = 'Toast';

// Toast Container for positioning multiple toasts
export interface ToastContainerProps {
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
  children: React.ReactNode;
}

const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'bottom-right',
  children,
}) => {
  return (
    <div
      className={cn(
        'fixed z-toast flex flex-col gap-2',
        positionClasses[position]
      )}
    >
      {children}
    </div>
  );
};

export { Toast, ToastContainer };

// Hook for managing toasts
export interface ToastItem extends Omit<ToastProps, 'onClose'> {
  id: string;
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useMemo(
    () => ({
      success: (message: string, options?: Partial<Omit<ToastItem, 'id' | 'variant' | 'message'>>) =>
        addToast({ variant: 'success', message, ...options }),
      error: (message: string, options?: Partial<Omit<ToastItem, 'id' | 'variant' | 'message'>>) =>
        addToast({ variant: 'error', message, ...options }),
      warning: (message: string, options?: Partial<Omit<ToastItem, 'id' | 'variant' | 'message'>>) =>
        addToast({ variant: 'warning', message, ...options }),
      info: (message: string, options?: Partial<Omit<ToastItem, 'id' | 'variant' | 'message'>>) =>
        addToast({ variant: 'info', message, ...options }),
    }),
    [addToast]
  );

  return { toasts, toast, addToast, removeToast };
}
