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
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'docs'>(
    'description'
  );
  const [selectedImage, setSelectedImage] = useState(0);

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
          { label: 'Catalog', href: '/categories' },
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          {images.length > 0 && (
            <div className="mb-4">
              <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden mb-4">
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
                      className={`aspect-square relative rounded overflow-hidden border-2 ${
                        selectedImage === idx
                          ? 'border-blue-600'
                          : 'border-transparent'
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
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="mb-6">
            <p className="text-3xl font-bold text-blue-600 mb-4">
              {product.price > 0 ? `${product.price.toFixed(2)} ₽` : 'On request'}
            </p>
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Add to Cart
            </button>
          </div>

          <div className="border-t pt-6">
            <div className="flex gap-4 border-b">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-2 px-4 ${
                  activeTab === 'description'
                    ? 'border-b-2 border-blue-600 font-semibold'
                    : ''
                }`}
              >
                Description
              </button>
              {product.specs && (
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 px-4 ${
                    activeTab === 'specs'
                      ? 'border-b-2 border-blue-600 font-semibold'
                      : ''
                  }`}
                >
                  Specifications
                </button>
              )}
              {product.doc_url && (
                <button
                  onClick={() => setActiveTab('docs')}
                  className={`pb-2 px-4 ${
                    activeTab === 'docs'
                      ? 'border-b-2 border-blue-600 font-semibold'
                      : ''
                  }`}
                >
                  Documentation
                </button>
              )}
            </div>
            <div className="mt-4">
              {activeTab === 'description' && product.description && (
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}
              {activeTab === 'specs' && product.specs && (
                <div dangerouslySetInnerHTML={{ __html: product.specs }} />
              )}
              {activeTab === 'docs' && product.doc_url && (
                <a
                  href={product.doc_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Download Documentation
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

