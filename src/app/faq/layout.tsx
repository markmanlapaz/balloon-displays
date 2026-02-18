import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about our balloon decoration services — pricing, booking, setup, customization, and more.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ | Balloon Displays',
    description: 'Frequently asked questions about our balloon decoration services — pricing, booking, setup, customization, and more.',
    url: '/faq',
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
