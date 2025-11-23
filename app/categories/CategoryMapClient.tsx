'use client';

import { CategoryMapColumns } from '@/components/CategoryMapColumns';
import { useCategoriesTree } from '@/lib/hooks';

export function CategoryMapClient() {
  const { data: categories, isLoading, error } = useCategoriesTree();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Catalog Map</h1>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Catalog Map</h1>
        <p className="text-red-600">Failed to load categories</p>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Catalog Map</h1>
        <p className="text-gray-500">No categories available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Catalog Map</h1>
      <CategoryMapColumns categories={categories} />
    </div>
  );
}

