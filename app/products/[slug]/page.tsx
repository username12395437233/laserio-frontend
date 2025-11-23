import { Metadata } from 'next';
import { ProductClient } from './ProductClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} - LaserIO`,
    description: `Product details for ${slug}`,
  };
}

export default async function ProductPage(props: PageProps) {
  const { slug } = await props.params;
  return <ProductClient slug={slug} />;
}

