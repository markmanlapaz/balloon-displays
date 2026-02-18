import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request a Quote',
  description: 'Request a free custom quote for your balloon decoration needs. Tell us about your event and we\'ll create a personalized proposal within 24 hours.',
  alternates: { canonical: '/inquiry' },
  openGraph: {
    title: 'Request a Quote | Balloon Displays',
    description: 'Request a free custom quote for your balloon decoration needs. Tell us about your event and we\'ll create a personalized proposal within 24 hours.',
    url: '/inquiry',
  },
};

export default function InquiryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
