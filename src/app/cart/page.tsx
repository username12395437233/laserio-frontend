'use client';

import { useCartStore } from '@/store/cartStore';
import { useLanguageStore } from '@/store/languageStore';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQty, getTotalItems } = useCartStore();
  const { t } = useLanguageStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: t('nav.home'), href: '/' },
            { label: t('cart.title'), href: '/cart' },
          ]}
        />
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground mb-4">{t('cart.empty')}</p>
          <Link href="/catalog">
            <Button>
              Перейти в каталог
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const total = items.reduce((sum, item) => {
    const price = item.product.price || 0;
    return sum + price * item.qty;
  }, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: t('nav.home'), href: '/' },
          { label: t('cart.title'), href: '/cart' },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6">{t('cart.title')}</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-card border border-border rounded-lg p-4 flex gap-4"
            >
              <Link href={`/products/${item.product.slug}`} className="flex-shrink-0">
                  <div className="w-24 h-24 bg-muted rounded-md overflow-hidden relative">
                    {item.product.primary_image_url ? (
                      <Image
                        src={item.product.primary_image_url}
                        alt={item.product.name}
                        fill
                        className="object-contain"
                        sizes="96px"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
              </Link>

              <div className="flex-1">
                <Link href={`/products/${item.product.slug}`}>
                  <h3 className="font-medium hover:text-accent transition-colors mb-2">
                    {item.product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-muted-foreground">{t('cart.quantity')}:</label>
                    <Input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => updateQty(item.product.id, parseInt(e.target.value) || 1)}
                      className="w-20"
                    />
                  </div>

                  <div className="font-semibold">
                    {item.product.price && item.product.price > 0
                      ? `${item.product.price * item.qty} ₽`
                      : 'По запросу'}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.product.id)}
                    className="ml-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">{t('cart.total')}</h2>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span>Товаров: {getTotalItems()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>{t('cart.total')}:</span>
                <span>
                  {total > 0 ? `${total} ₽` : 'По запросу'}
                </span>
              </div>
            </div>
            <Link href="/checkout" className="block">
              <Button size="lg" className="w-full">
                {t('cart.checkout')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

