'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CategoryTree } from '@/components/CategoryTree';
import { ProductsGrid } from '@/components/ProductsGrid';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { useCategory, useCategoriesTree } from '@/lib/hooks';
import type { Product } from '@/lib/types';

interface CatalogClientProps {
  slug: string;
}

export function CatalogClient({ slug }: CatalogClientProps) {
  const { data: categoryData, isLoading, error } = useCategory(slug);
  const { data: allCategories } = useCategoriesTree();
  const [sortBy, setSortBy] = useState<string>('');

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-4 gap-8">
            <div className="col-span-1 h-64 bg-gray-200 rounded"></div>
            <div className="col-span-3 space-y-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !categoryData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-600">Failed to load category</p>
      </div>
    );
  }

  const { category, children, featured, products } = categoryData;
  const isLeafCategory = !children || children.length === 0;

  let sortedProducts: Product[] = [];
  if (products) {
    sortedProducts = [...products];
    switch (sortBy) {
      case 'price_asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name_asc':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'new':
        sortedProducts.reverse();
        break;
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Catalog', href: '/categories' },
          { label: category.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          {allCategories && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold mb-4">Categories</h2>
              <CategoryTree categories={allCategories} activeSlug={slug} />
            </div>
          )}
        </aside>

        <div className="lg:col-span-3">
          <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-gray-600 mb-6">{category.description}</p>
          )}

          {!isLeafCategory && children && (
            <div className="space-y-12">
              {children.map((child) => (
                <section key={child.id}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">
                      <Link
                        href={`/catalog/${child.slug}`}
                        className="hover:text-blue-600"
                      >
                        {child.name}
                      </Link>
                    </h2>
                    {child.desc_product_count !== undefined && (
                      <span className="text-gray-500">
                        {child.desc_product_count} products
                      </span>
                    )}
                  </div>
                  {child.products_preview && child.products_preview.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {child.products_preview.map((product) => (
                        <Link
                          key={product.slug}
                          href={`/products/${product.slug}`}
                          className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                        >
                          {product.primary_image_url && (
                            <div className="aspect-square relative bg-gray-100">
                              <Image
                                src={product.primary_image_url}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="p-2">
                            <p className="text-sm font-medium line-clamp-2">
                              {product.name}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          )}

          {isLeafCategory && products && (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  {categoryData.pagination?.total || products.length} products
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border rounded"
                >
                  <option value="">Default</option>
                  <option value="new">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="name_asc">Name: A-Z</option>
                  <option value="name_desc">Name: Z-A</option>
                </select>
              </div>
              <ProductsGrid products={sortedProducts} />
            </>
          )}

          {featured && featured.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
              <ProductsGrid products={featured} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

