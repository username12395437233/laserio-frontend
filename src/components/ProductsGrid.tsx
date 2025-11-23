'use client';

import { Product } from '@/lib/api';
import { ProductCard } from './ProductCard';
import { Button } from './ui/button';
import { useSearchParams, useRouter } from 'next/navigation';

interface ProductsGridProps {
  products: Product[];
  pagination?: {
    current_page: number;
    total_pages: number;
    total_items: number;
  };
  currentSort?: string;
  currentPage?: number;
  categorySlug: string;
}

export const ProductsGrid = ({
  products,
  pagination,
  currentSort,
  currentPage = 1,
  categorySlug,
}: ProductsGridProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    router.push(`/catalog/${categorySlug}?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/catalog/${categorySlug}?${params.toString()}`);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Товары не найдены</p>
      </div>
    );
  }

  return (
    <div>
      {/* Sort controls */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Сортировка:</span>
        <div className="flex gap-2">
          {[
            { value: 'new', label: 'Новинки' },
            { value: 'price_asc', label: 'Цена: по возрастанию' },
            { value: 'price_desc', label: 'Цена: по убыванию' },
            { value: 'name_asc', label: 'Название: А-Я' },
            { value: 'name_desc', label: 'Название: Я-А' },
          ].map((option) => (
            <Button
              key={option.value}
              variant={currentSort === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.total_pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Назад
          </Button>
          <span className="text-sm text-muted-foreground">
            Страница {pagination.current_page} из {pagination.total_pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.total_pages}
          >
            Вперед
          </Button>
        </div>
      )}
    </div>
  );
};

