'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Category } from '@/lib/api';
import { cn } from '@/lib/utils';

interface CategoryMapColumnsProps {
  categories: Category[];
}

interface CategoryItemProps {
  category: Category;
  level: number;
}

const CategoryItem = ({ category, level }: CategoryItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div>
      <div className="flex items-center gap-2 py-1">
        {hasChildren && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex-shrink-0 hover:text-accent transition-colors"
          >
            {isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
        <Link
          href={`/catalog/${category.slug}`}
          className={cn(
            'hover:text-accent transition-colors',
            level === 0 && 'font-semibold'
          )}
        >
          {category.name}
        </Link>
        {category.desc_product_count && (
          <span className="text-sm text-muted-foreground">
            ({category.desc_product_count})
          </span>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className={cn('ml-6 mt-1 space-y-1', level > 0 && 'border-l border-border pl-2')}>
          {category.children!.map((child) => (
            <CategoryItem key={child.id} category={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const CategoryMapColumns = ({ categories }: CategoryMapColumnsProps) => {
  // Разделяем категории на 3 колонки
  const chunkSize = Math.ceil(categories.length / 3);
  const columns = [
    categories.slice(0, chunkSize),
    categories.slice(chunkSize, chunkSize * 2),
    categories.slice(chunkSize * 2),
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {columns.map((columnCategories, colIndex) => (
        <div key={colIndex} className="space-y-2">
          {columnCategories.map((category) => (
            <CategoryItem key={category.id} category={category} level={0} />
          ))}
        </div>
      ))}
    </div>
  );
};

