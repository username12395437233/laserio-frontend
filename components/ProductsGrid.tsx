import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';

interface ProductsGridProps {
  products: Product[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  if (products.length === 0) {
    return <p className="text-gray-500 text-center py-8">No products found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

