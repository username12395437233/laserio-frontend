import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddToCartButton } from '@/components/AddToCartButton';
import { Download, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await api.getProduct(slug);
    return {
      title: `Купить ${product.name} — LASER components`,
      description: product.content_html
        ? product.content_html.replace(/<[^>]*>/g, '').substring(0, 160)
        : `Купить ${product.name} в каталоге LASER components`,
      openGraph: {
        title: product.name,
        description: product.content_html
          ? product.content_html.replace(/<[^>]*>/g, '').substring(0, 160)
          : `Купить ${product.name}`,
        images: product.primary_image_url ? [product.primary_image_url] : [],
      },
    };
  } catch {
    return {
      title: 'Товар | LASER components',
    };
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  let product;
  try {
    product = await api.getProduct(slug);
  } catch {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Каталог', href: '/catalog' },
          { label: product.name, href: `/products/${slug}` },
        ]}
      />

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Image gallery */}
        <div>
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden mb-4 relative">
            {product.primary_image_url ? (
              <Image
                src={product.primary_image_url}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                unoptimized
              />
            ) : (
              <div className="text-muted-foreground">No image</div>
            )}
          </div>

          {product.gallery && product.gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {product.gallery.map((img, idx) => (
                <div key={idx} className="aspect-square bg-muted rounded-md overflow-hidden relative">
                  <Image
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 25vw, 12.5vw"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          {product.price && product.price > 0 ? (
            <div className="text-2xl font-bold text-accent mb-6">{product.price} ₽</div>
          ) : (
            <div className="text-xl text-muted-foreground mb-6">Цена по запросу</div>
          )}

          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Для юридических лиц</p>
            <AddToCartButton product={product} />
          </div>

          {product.has_docs && product.doc_url && (
            <a href={product.doc_url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="w-full">
                <Download className="w-5 h-5 mr-2" />
                Скачать документацию
              </Button>
            </a>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList>
          <TabsTrigger value="description">Описание</TabsTrigger>
          <TabsTrigger value="specs">Характеристики</TabsTrigger>
          {product.has_docs && <TabsTrigger value="docs">Документация</TabsTrigger>}
        </TabsList>

        <TabsContent value="description" className="mt-6">
          {product.content_html ? (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: product.content_html }}
            />
          ) : (
            <p className="text-muted-foreground">Описание отсутствует</p>
          )}
        </TabsContent>

        <TabsContent value="specs" className="mt-6">
          {product.specs_html ? (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: product.specs_html }}
            />
          ) : (
            <p className="text-muted-foreground">Технические характеристики отсутствуют</p>
          )}
        </TabsContent>

        {product.has_docs && (
          <TabsContent value="docs" className="mt-6">
            {product.doc_url ? (
              <a
                href={product.doc_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:underline"
              >
                Скачать документацию
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <p className="text-muted-foreground">Документация отсутствует</p>
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

