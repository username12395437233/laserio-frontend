import { redirect } from 'next/navigation';
import { api } from '@/lib/api';

export default async function CatalogRootPage() {
  // Перенаправляем на первую категорию или на карту каталога
  const categories = await api.getCategoryTree();
  if (categories.length > 0) {
    redirect(`/catalog/${categories[0].slug}`);
  }
  redirect('/categories');
}

