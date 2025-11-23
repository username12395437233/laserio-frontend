'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Category } from '@/lib/api';
import { cn } from '@/lib/utils';

interface CategoryTreeProps {
  categories: Category[];
  currentSlug?: string;
}

interface CategoryItemProps {
  category: Category;
  level: number;
  currentSlug?: string;
}

const CategoryItem = ({ category, level, currentSlug }: CategoryItemProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(
    category.slug === currentSlug || category.children?.some(child => child.slug === currentSlug)
  );
  const hasChildren = category.children && category.children.length > 0;
  const isActive = pathname?.includes(`/catalog/${category.slug}`);

  return (
    <div className="w-full">
      <div
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-md transition-colors cursor-pointer',
          isActive
            ? 'bg-catalog-active text-white font-medium'
            : 'hover:bg-catalog-hover',
          level === 0 && 'bg-primary text-primary-foreground hover:bg-primary/90'
        )}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren && (
          <button className="flex-shrink-0">
            {isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
        <Link
          href={`/catalog/${category.slug}`}
          className="flex-1"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          {category.name}
        </Link>
      </div>

      {hasChildren && isOpen && (
        <div className={cn('ml-4 mt-1 space-y-1', level > 0 && 'border-l border-border pl-2')}>
          {category.children!.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              level={level + 1}
              currentSlug={currentSlug}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const CategoryTree = ({ categories, currentSlug }: CategoryTreeProps) => {
  return (
    <div className="space-y-1">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          level={0}
          currentSlug={currentSlug}
        />
      ))}
    </div>
  );
};
