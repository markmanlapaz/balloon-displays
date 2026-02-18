import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse our portfolio of stunning balloon displays — arches, garlands, columns, bouquets, and full event installations. Get inspired for your next celebration.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Gallery | Balloon Displays',
    description: 'Browse our portfolio of stunning balloon displays — arches, garlands, columns, bouquets, and full event installations.',
    url: '/gallery',
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
