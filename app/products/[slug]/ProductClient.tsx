'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useProduct } from '@/lib/hooks';
import { useCartStore } from '@/store/cart';
import { Breadcrumbs } from '@/components/Breadcrumbs';

interface ProductClientProps {
  slug: string;
}

export function ProductClient({ slug }: ProductClientProps) {
  const { data: product, isLoading, error } = useProduct(slug);
  const addToCart = useCartStore((state) => state.add);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'docs'>(
    'description'
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-600">Failed to load product</p>
      </div>
    );
  }

  const images = product.primary_image_url
    ? [product.primary_image_url, ...(product.gallery || [])]
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Каталог', href: '/categories' },
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          {/* Sidebar can be added here if needed */}
        </aside>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              {images.length > 0 && (
                <div className="mb-4">
                  <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden mb-4 border border-gray-200">
                    <Image
                      src={images[selectedImage]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(idx)}
                          className={`aspect-square relative rounded overflow-hidden border-2 transition ${
                            selectedImage === idx
                              ? 'border-blue-600'
                              : 'border-transparent hover:border-gray-300'
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`${product.name} ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-4 py-2 rounded transition ${
                    activeTab === 'description'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Описание
                </button>
                {product.doc_url && (
                  <a
                    href={product.doc_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Скачать документацию
                  </a>
                )}
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-4 text-gray-900">{product.name}</h1>
              
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Для юридических лиц</p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-900 transition font-semibold flex items-center justify-center gap-2"
                >
                  Добавить в заявку
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {activeTab === 'description' && product.description && (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}

              {activeTab === 'specs' && product.specs && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Основные технические характеристики</h2>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.specs }}
                  />
                </div>
              )}
            </div>
          </div>

          {product.specs && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Основные технические характеристики</h2>
              <div
                className="prose max-w-none bg-white p-6 rounded-lg shadow"
                dangerouslySetInnerHTML={{ __html: product.specs }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
