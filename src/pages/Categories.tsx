import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { useLanguageStore } from '@/store/languageStore';
import { api, Category } from '@/lib/api';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const CategoryMapItem = ({ category, level = 0 }: { category: Category; level?: number }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div className="mb-2">
      <div className="flex items-start gap-2">
        {hasChildren && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex-shrink-0 mt-1"
          >
            {isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
        <Link
          to={`/catalog/${category.slug}`}
          className={cn(
            'hover:text-accent transition-colors',
            level === 0 && 'font-semibold text-lg',
            level === 1 && 'font-medium'
          )}
        >
          {category.name}
        </Link>
      </div>
      
      {hasChildren && isOpen && (
        <div className="ml-6 mt-2 space-y-2">
          {category.children!.map((child) => (
            <CategoryMapItem key={child.id} category={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const Categories = () => {
  const { t } = useLanguageStore();
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories', 'tree'],
    queryFn: () => api.getCategoryTree(),
  });

  // Split categories into 3 columns
  const columnsCount = 3;
  const columns: Category[][] = [];
  if (categories) {
    const itemsPerColumn = Math.ceil(categories.length / columnsCount);
    for (let i = 0; i < columnsCount; i++) {
      columns.push(categories.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn));
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: t('nav.home'), href: '/' },
            { label: t('nav.categoryMap'), href: '/categories' },
          ]}
        />

        <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-12 px-8 rounded-lg mb-8 text-center">
          <h1 className="text-4xl font-bold">КАРТА КАТАЛОГА</h1>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Загрузка...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {columns.map((column, idx) => (
              <div key={idx} className="space-y-4">
                {column.map((category) => (
                  <CategoryMapItem key={category.id} category={category} />
                ))}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
