import type { Metadata } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import '@/styles/globals.css';

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

export const metadata: Metadata = {
  title: 'Balloon Displays | Stunning Balloon Decorations for Every Occasion',
  description: 'Transform your events with stunning balloon arches, garlands, columns and custom displays. Professional balloon decoration services for parties, weddings, corporate events and celebrations.',
  keywords: ['balloon decorations', 'balloon arch', 'balloon garland', 'party decorations', 'event decor', 'balloon artist'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-cream-100 font-body antialiased">
        {children}
      </body>
    </html>
  );
}
