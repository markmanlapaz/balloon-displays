import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Balloon Displays — our story, our passion for balloon artistry, and our commitment to making every celebration unforgettable in the Greater Toronto Area.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Us | Balloon Displays',
    description: 'Learn about Balloon Displays — our story, our passion for balloon artistry, and our commitment to making every celebration unforgettable.',
    url: '/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
