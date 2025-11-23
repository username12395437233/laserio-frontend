import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
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
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-blue-600 font-bold">
          {product.price > 0 ? `${product.price.toFixed(2)} ₽` : 'On request'}
        </p>
      </div>
    </Link>
  );
}

