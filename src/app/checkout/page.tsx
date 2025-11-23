'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useLanguageStore } from '@/store/languageStore';
import { api } from '@/lib/api';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const { t } = useLanguageStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    comment: '',
  });

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        customer: {
          fullName: formData.fullName,
          company: formData.company || undefined,
          email: formData.email,
          phone: formData.phone,
          comment: formData.comment || undefined,
        },
        items: items.map((item) => ({
          product_id: item.product.id,
          qty: item.qty,
        })),
      };

      await api.createOrder(orderData);
      clearCart();
      toast.success(t('checkout.success'));
      router.push('/');
    } catch (error) {
      // Fallback to mailto
      const subject = encodeURIComponent('Заказ с сайта LASER components');
      const body = encodeURIComponent(
        `ФИО: ${formData.fullName}\n` +
        `Компания: ${formData.company || 'Не указана'}\n` +
        `Email: ${formData.email}\n` +
        `Телефон: ${formData.phone}\n` +
        `Комментарий: ${formData.comment || 'Нет'}\n\n` +
        `Товары:\n${items.map((item) => `- ${item.product.name} (${item.qty} шт)`).join('\n')}`
      );
      window.location.href = `mailto:info@example.com?subject=${subject}&body=${body}`;
      clearCart();
      toast.success(t('checkout.success'));
      router.push('/');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          { label: t('checkout.title'), href: '/checkout' },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6">{t('checkout.title')}</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t('checkout.fullName')} *</label>
            <Input
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t('checkout.company')}</label>
            <Input
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t('checkout.email')} *</label>
            <Input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t('checkout.phone')} *</label>
            <Input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t('checkout.comment')}</label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              rows={4}
            />
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Товары в заказе</h2>
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="w-16 h-16 bg-muted rounded-md overflow-hidden relative flex-shrink-0">
                    {item.product.primary_image_url ? (
                      <Image
                        src={item.product.primary_image_url}
                        alt={item.product.name}
                        fill
                        className="object-contain"
                        sizes="64px"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-2">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Кол-во: {item.qty}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>{t('cart.total')}:</span>
                <span>{total > 0 ? `${total} ₽` : 'По запросу'}</span>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Отправка...' : t('checkout.submit')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

