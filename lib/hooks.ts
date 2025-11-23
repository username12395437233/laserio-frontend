'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCategoriesTree, fetchCategory, fetchProduct } from './api';

export function useCategoriesTree() {
  return useQuery({
    queryKey: ['categories', 'tree'],
    queryFn: fetchCategoriesTree,
  });
}

export function useCategory(slug: string) {
  return useQuery({
    queryKey: ['categories', slug],
    queryFn: () => fetchCategory(slug),
    enabled: !!slug,
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['products', slug],
    queryFn: () => fetchProduct(slug),
    enabled: !!slug,
  });
}

