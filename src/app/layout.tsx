import type { Metadata } from 'next';
import { DM_Sans, Fraunces, Bellota } from 'next/font/google';
import '@/styles/globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://balloondisplays.ca';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const bellota = Bellota({
  subsets: ['latin'],
  weight: '300',
  variable: '--font-bellota',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Balloon Displays | Stunning Balloon Decorations for Every Occasion',
    template: '%s | Balloon Displays',
  },
  description: 'Transform your events with stunning balloon arches, garlands, columns and custom displays. Professional balloon decoration services for parties, weddings, corporate events and celebrations.',
  keywords: ['balloon decorations', 'balloon arch', 'balloon garland', 'party decorations', 'event decor', 'balloon artist'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Balloon Displays',
    title: 'Balloon Displays | Stunning Balloon Decorations for Every Occasion',
    description: 'Transform your events with stunning balloon arches, garlands, columns and custom displays. Professional balloon decoration services for parties, weddings, corporate events and celebrations.',
    images: [
      {
        url: '/images/single-balloon-arch-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Balloon Displays — Professional balloon decoration services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Balloon Displays | Stunning Balloon Decorations for Every Occasion',
    description: 'Transform your events with stunning balloon arches, garlands, columns and custom displays.',
    images: ['/images/single-balloon-arch-hero.webp'],
  },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Balloon Displays',
  description: 'Professional balloon decoration services for parties, weddings, corporate events and celebrations in the Greater Toronto Area.',
  url: siteUrl,
  telephone: '+1-555-123-4567',
  email: 'hello@balloondisplays.com',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'ON',
    addressCountry: 'CA',
    addressLocality: 'Toronto',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Greater Toronto Area',
  },
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  image: `${siteUrl}/images/single-balloon-arch-hero.webp`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable} ${bellota.variable}`}>
      <body className="min-h-screen bg-cream-100 font-body antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
