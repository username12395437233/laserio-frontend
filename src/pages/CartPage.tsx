import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { useLanguageStore } from '@/store/languageStore';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartPage = () => {
  const { items, removeItem, updateQty } = useCartStore();
  const { t } = useLanguageStore();

  const total = items.reduce((sum, item) => {
    const price = item.product.price || 0;
    return sum + price * item.qty;
  }, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t('cart.title')}</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">{t('cart.empty')}</p>
            <Link to="/catalog">
              <Button>Перейти в каталог</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div key={item.product.id} className="bg-card border border-border rounded-lg p-4 flex gap-4">
                  <div className="w-24 h-24 bg-muted rounded-md flex-shrink-0 overflow-hidden">
                    {item.product.primary_image_url ? (
                      <img
                        src={item.product.primary_image_url}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <Link to={`/products/${item.product.slug}`}>
                      <h3 className="font-semibold mb-2 hover:text-accent transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    {item.product.price && item.product.price > 0 ? (
                      <p className="text-lg font-bold">{item.product.price} ₽</p>
                    ) : (
                      <p className="text-muted-foreground">По запросу</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-muted rounded-md p-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateQty(item.product.id, item.qty - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.qty}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateQty(item.product.id, item.qty + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeItem(item.product.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-muted rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold">{t('cart.total')}:</span>
                <span className="text-2xl font-bold">
                  {total > 0 ? `${total} ₽` : 'По запросу'}
                </span>
              </div>
              
              <Link to="/checkout">
                <Button size="lg" className="w-full">
                  {t('cart.checkout')}
                </Button>
              </Link>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
