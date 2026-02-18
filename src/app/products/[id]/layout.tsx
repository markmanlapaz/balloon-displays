import type { Metadata } from 'next';
import { getProductById } from '@/lib/data';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductById(params.id);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for could not be found.',
    };
  }

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.id}` },
    openGraph: {
      title: `${product.name} | Balloon Displays`,
      description: product.description,
      url: `/products/${product.id}`,
      images: [
        {
          url: product.image,
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
