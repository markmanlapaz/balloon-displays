import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse our complete collection of balloon displays and decorations — arches, garlands, columns, bouquets, custom prints, and event packages. Shop online for your next celebration.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'All Products | Balloon Displays',
    description: 'Browse our complete collection of balloon displays and decorations — arches, garlands, columns, bouquets, custom prints, and event packages.',
    url: '/products',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
