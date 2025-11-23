'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CategoryTree } from '@/components/CategoryTree';
import { ProductsGrid } from '@/components/ProductsGrid';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SearchBar } from '@/components/SearchBar';
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
          { label: 'Главная', href: '/' },
          { label: 'Каталог', href: '/categories' },
          { label: category.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          {allCategories && (
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="mb-4">
                <SearchBar />
              </div>
              <CategoryTree categories={allCategories} activeSlug={slug} />
            </div>
          )}
        </aside>

        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Каталог</h1>
            <Link href="#" className="text-blue-600 hover:text-blue-700">
              Описание →
            </Link>
          </div>

          {!isLeafCategory && children && (
            <div className="space-y-8">
              {children.map((child) => (
                <section key={child.id} className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      <Link
                        href={`/catalog/${child.slug}`}
                        className="hover:text-blue-600"
                      >
                        {child.name}
                      </Link>
                      {child.desc_product_count !== undefined && (
                        <span className="text-gray-600 font-normal ml-2">
                          ({child.desc_product_count}шт)
                        </span>
                      )}
                    </h2>
                    <Link
                      href={`/catalog/${child.slug}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      →
                    </Link>
                  </div>
                  {child.products_preview && child.products_preview.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {child.products_preview.map((product) => (
                        <Link
                          key={product.slug}
                          href={`/products/${product.slug}`}
                          className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden border border-gray-200"
                        >
                          <div className="aspect-square relative bg-gray-100">
                            {product.primary_image_url ? (
                              <Image
                                src={product.primary_image_url}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                <span className="text-gray-400 text-sm">No image</span>
                              </div>
                            )}
                          </div>
                          <div className="p-3">
                            <p className="text-sm font-medium line-clamp-2 text-gray-900">
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
                  {categoryData.pagination?.total || products.length} товаров
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">По умолчанию</option>
                  <option value="new">Новинки</option>
                  <option value="price_asc">Цена: по возрастанию</option>
                  <option value="price_desc">Цена: по убыванию</option>
                  <option value="name_asc">Название: А-Я</option>
                  <option value="name_desc">Название: Я-А</option>
                </select>
              </div>
              <ProductsGrid products={sortedProducts} />
            </>
          )}

          {featured && featured.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">Рекомендуемые товары</h2>
              <ProductsGrid products={featured} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
