import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { useLanguageStore } from '@/store/languageStore';
import { useCartStore } from '@/store/cartStore';
import { api } from '@/lib/api';
import { ShoppingCart, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguageStore();
  const addItem = useCartStore((state) => state.addItem);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => api.getProduct(slug || ''),
    enabled: !!slug,
  });

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      toast.success(`${product.name} добавлен в заявки`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-12">Загрузка...</div>
        ) : product ? (
          <>
            <Breadcrumbs
              items={[
                { label: t('nav.home'), href: '/' },
                { label: t('nav.catalog'), href: '/catalog' },
                { label: product.name, href: `/products/${slug}` },
              ]}
            />

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Image gallery */}
              <div>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden mb-4">
                  {product.primary_image_url ? (
                    <img
                      src={product.primary_image_url}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-muted-foreground">No image</div>
                  )}
                </div>
                
                {product.gallery && product.gallery.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.gallery.map((img, idx) => (
                      <div key={idx} className="aspect-square bg-muted rounded-md overflow-hidden">
                        <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-contain" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product info */}
              <div>
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                
                {product.price && product.price > 0 ? (
                  <div className="text-2xl font-bold text-accent mb-6">{product.price} ₽</div>
                ) : (
                  <div className="text-xl text-muted-foreground mb-6">Цена по запросу</div>
                )}

                <Button onClick={handleAddToCart} size="lg" className="w-full mb-4">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {t('catalog.addToCart')}
                </Button>

                {product.has_docs && product.doc_url && (
                  <a href={product.doc_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg" className="w-full">
                      <Download className="w-5 h-5 mr-2" />
                      Скачать документацию
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList>
                <TabsTrigger value="description">{t('catalog.description')}</TabsTrigger>
                <TabsTrigger value="specs">Характеристики</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                {product.content_html ? (
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.content_html }}
                  />
                ) : (
                  <p className="text-muted-foreground">Описание отсутствует</p>
                )}
              </TabsContent>
              
              <TabsContent value="specs" className="mt-6">
                {product.specs_html ? (
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.specs_html }}
                  />
                ) : (
                  <p className="text-muted-foreground">Технические характеристики отсутствуют</p>
                )}
              </TabsContent>
            </Tabs>
          </>
        ) : null}
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
