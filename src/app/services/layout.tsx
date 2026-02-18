import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Decoration Services',
  description: 'Professional balloon decoration services for birthdays, weddings, corporate events, baby showers, and graduations. Free setup and takedown included. Serving the Greater Toronto Area.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Event Decoration Services | Balloon Displays',
    description: 'Professional balloon decoration services for birthdays, weddings, corporate events, baby showers, and graduations. Free setup and takedown included.',
    url: '/services',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
