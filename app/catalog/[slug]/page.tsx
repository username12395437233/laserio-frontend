import { Metadata } from 'next';
import { CatalogClient } from './CatalogClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} - LaserIO Catalog`,
    description: `Browse ${slug} category`,
  };
}

export default async function CatalogPage(props: PageProps) {
  const { slug } = await props.params;
  return <CatalogClient slug={slug} />;
}

