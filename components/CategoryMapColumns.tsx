'use client';

import Link from 'next/link';
import type { CategoryTreeNode } from '@/lib/types';
import { CategoryTree } from './CategoryTree';

interface CategoryMapColumnsProps {
  categories: CategoryTreeNode[];
}

function splitIntoColumns(categories: CategoryTreeNode[]): [
  CategoryTreeNode[],
  CategoryTreeNode[],
  CategoryTreeNode[]
] {
  const perColumn = Math.ceil(categories.length / 3);
  return [
    categories.slice(0, perColumn),
    categories.slice(perColumn, perColumn * 2),
    categories.slice(perColumn * 2),
  ];
}

export function CategoryMapColumns({ categories }: CategoryMapColumnsProps) {
  const [col1, col2, col3] = splitIntoColumns(categories);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <CategoryTree categories={col1} />
      </div>
      <div>
        <CategoryTree categories={col2} />
      </div>
      <div>
        <CategoryTree categories={col3} />
      </div>
    </div>
  );
}

