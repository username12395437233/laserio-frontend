import { api } from '@/lib/api';
import { CategoryMapColumns } from '@/components/CategoryMapColumns';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Карта каталога — LASER components',
  description: 'Карта каталога лазерных и опто-электронных компонентов',
};

export default async function CategoryMapPage() {
  const categories = await api.getCategoryTree();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Карта каталога', href: '/categories' },
        ]}
      />

      <h1 className="text-4xl font-bold mb-8">КАРТА КАТАЛОГА</h1>

      <CategoryMapColumns categories={categories} />
    </div>
  );
}

