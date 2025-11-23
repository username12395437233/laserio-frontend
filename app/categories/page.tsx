import { Metadata } from 'next';
import { CategoryMapColumns } from '@/components/CategoryMapColumns';
import { useCategoriesTree } from '@/lib/hooks';
import { CategoryMapClient } from './CategoryMapClient';

export const metadata: Metadata = {
  title: 'Catalog Map - LaserIO',
  description: 'Browse our complete catalog structure',
};

export default function CategoriesPage() {
  return <CategoryMapClient />;
}

