import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CategoryTree } from '@/components/CategoryTree';
import { ProductCard } from '@/components/ProductCard';
import { useLanguageStore } from '@/store/languageStore';
import { api } from '@/lib/api';
import { ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const CatalogPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguageStore();

  const { data: categoryTree } = useQuery({
    queryKey: ['categories', 'tree'],
    queryFn: () => api.getCategoryTree(),
  });

  const { data: categoryData, isLoading } = useQuery({
    queryKey: ['category', slug],
    queryFn: () => api.getCategory(slug || ''),
    enabled: !!slug,
  });

  const hasChildren = categoryData?.children && categoryData.children.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: t('nav.home'), href: '/' },
            { label: t('nav.catalog'), href: '/catalog' },
            ...(categoryData?.category ? [{ label: categoryData.category.name, href: `/catalog/${slug}` }] : []),
          ]}
        />

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-80 flex-shrink-0 bg-catalog-sidebar p-4 rounded-lg h-fit sticky top-24">
            <div className="mb-4">
              <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-md">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t('common.search')}
                  className="bg-transparent border-0 focus-visible:ring-0 h-6 p-0"
                />
              </div>
            </div>
            
            {categoryTree && (
              <CategoryTree categories={categoryTree} currentSlug={slug} />
            )}
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {isLoading ? (
              <div className="text-center py-12">Загрузка...</div>
            ) : categoryData ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-3xl font-bold">{categoryData.category.name}</h1>
                  <Link to={`/catalog/${slug}/description`} className="text-accent hover:underline flex items-center gap-1">
                    {t('catalog.description')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {hasChildren ? (
                  /* Show subcategories */
                  <div className="space-y-8">
                    {categoryData.children!.map((child) => (
                      <section key={child.id}>
                        <Link to={`/catalog/${child.slug}`}>
                          <h2 className="text-2xl font-semibold mb-4 hover:text-accent transition-colors flex items-center gap-2">
                            {child.name}
                            {child.desc_product_count && (
                              <span className="text-sm text-muted-foreground">
                                ({child.desc_product_count}{t('catalog.productsCount')})
                              </span>
                            )}
                            <ArrowRight className="w-5 h-5" />
                          </h2>
                        </Link>

                        {child.products_preview && child.products_preview.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {child.products_preview.map((product, idx) => (
                              <div key={idx} className="bg-card border border-border rounded-lg p-4">
                                <div className="aspect-square bg-muted rounded-md mb-2 flex items-center justify-center overflow-hidden">
                                  {product.primary_image_url ? (
                                    <img
                                      src={product.primary_image_url}
                                      alt={product.name}
                                      className="w-full h-full object-contain"
                                    />
                                  ) : (
                                    <div className="text-muted-foreground text-xs">No image</div>
                                  )}
                                </div>
                                <Link
                                  to={`/products/${product.slug}`}
                                  className="text-sm hover:text-accent transition-colors line-clamp-2"
                                >
                                  {product.name}
                                </Link>
                              </div>
                            ))}
                          </div>
                        )}
                      </section>
                    ))}
                  </div>
                ) : categoryData.products ? (
                  /* Show products */
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categoryData.products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CatalogPage;
