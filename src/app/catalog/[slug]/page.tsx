import { notFound } from 'next/navigation';
import Image from 'next/image';
import { api } from '@/lib/api';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CategoryTree } from '@/components/CategoryTree';
import { ProductCard } from '@/components/ProductCard';
import { ProductsGrid } from '@/components/ProductsGrid';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string; page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data = await api.getCategory(slug);
    return {
      title: `Каталог — ${data.category.name} | LASER components`,
      description: `Каталог категории ${data.category.name}`,
    };
  } catch {
    return {
      title: 'Каталог | LASER components',
    };
  }
}

export default async function CatalogPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { sort, page } = await searchParams;

  let categoryData;
  try {
    categoryData = await api.getCategory(slug, {
      sort: sort || undefined,
      page: page ? parseInt(page) : undefined,
    });
  } catch {
    notFound();
  }

  const categoryTree = await api.getCategoryTree();
  const hasChildren = categoryData.children && categoryData.children.length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Каталог', href: '/catalog' },
          { label: categoryData.category.name, href: `/catalog/${slug}` },
        ]}
      />

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-80 flex-shrink-0 bg-catalog-sidebar p-4 rounded-lg h-fit sticky top-24">
          <CategoryTree categories={categoryTree} currentSlug={slug} />
        </aside>

        {/* Main content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">{categoryData.category.name}</h1>
            <Link
              href={`/catalog/${slug}/description`}
              className="text-accent hover:underline flex items-center gap-1"
            >
              Описание
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {hasChildren ? (
            /* Show subcategories */
            <div className="space-y-8">
              {categoryData.children!.map((child) => (
                <section key={child.id}>
                  <Link href={`/catalog/${child.slug}`}>
                    <h2 className="text-2xl font-semibold mb-4 hover:text-accent transition-colors flex items-center gap-2">
                      {child.name}
                      {child.desc_product_count && (
                        <span className="text-sm text-muted-foreground">
                          ({child.desc_product_count} шт)
                        </span>
                      )}
                      <ArrowRight className="w-5 h-5" />
                    </h2>
                  </Link>

                  {child.products_preview && child.products_preview.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {child.products_preview.map((product, idx) => (
                        <Link
                          key={idx}
                          href={`/products/${product.slug}`}
                          className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow"
                        >
                          <div className="aspect-square bg-muted rounded-md mb-2 flex items-center justify-center overflow-hidden relative">
                            {product.primary_image_url ? (
                              <Image
                                src={product.primary_image_url}
                                alt={product.name}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 50vw, 33vw"
                                unoptimized
                              />
                            ) : (
                              <div className="text-muted-foreground text-xs">No image</div>
                            )}
                          </div>
                          <div className="text-sm hover:text-accent transition-colors line-clamp-2">
                            {product.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          ) : categoryData.products ? (
            /* Show products */
            <ProductsGrid
              products={categoryData.products}
              pagination={categoryData.pagination}
              currentSort={sort}
              currentPage={page ? parseInt(page) : 1}
              categorySlug={slug}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

