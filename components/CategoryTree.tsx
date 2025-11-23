'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { CategoryTreeNode } from '@/lib/types';

interface CategoryTreeProps {
  categories: CategoryTreeNode[];
  activeSlug?: string;
  level?: number;
}

export function CategoryTree({
  categories,
  activeSlug,
  level = 0,
}: CategoryTreeProps) {
  return (
    <ul className={level === 0 ? 'space-y-1' : 'ml-4 mt-1 space-y-1'}>
      {categories.map((category) => {
        const isActive = category.slug === activeSlug;
        const hasChildren = category.children && category.children.length > 0;
        const [isOpen, setIsOpen] = useState(
          isActive || (hasChildren && level === 0)
        );

        return (
          <li key={category.id}>
            <div className="flex items-center">
              {hasChildren && (
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="mr-1 w-4 h-4 flex items-center justify-center"
                >
                  {isOpen ? '−' : '+'}
                </button>
              )}
              <Link
                href={`/catalog/${category.slug}`}
                className={`block px-2 py-1 rounded hover:bg-gray-100 ${
                  isActive ? 'bg-blue-100 text-blue-700 font-semibold' : ''
                }`}
              >
                {category.name}
                {category.desc_product_count !== undefined && (
                  <span className="text-gray-500 text-sm ml-2">
                    ({category.desc_product_count})
                  </span>
                )}
              </Link>
            </div>
            {hasChildren && isOpen && (
              <CategoryTree
                categories={category.children!}
                activeSlug={activeSlug}
                level={level + 1}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

