import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your balloon display order. Review your selected items and provide event details to finalize your booking.',
  alternates: { canonical: '/checkout' },
  openGraph: {
    title: 'Checkout | Balloon Displays',
    description: 'Complete your balloon display order. Review your selected items and provide event details to finalize your booking.',
    url: '/checkout',
  },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
