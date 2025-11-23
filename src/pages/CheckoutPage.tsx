import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCartStore } from '@/store/cartStore';
import { useLanguageStore } from '@/store/languageStore';
import { api } from '@/lib/api';
import { toast } from 'sonner';

const CheckoutPage = () => {
  const { items, clearCart } = useCartStore();
  const { t } = useLanguageStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    comment: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.createOrder({
        customer: formData,
        items: items.map((item) => ({
          product_id: item.product.id,
          qty: item.qty,
        })),
      });

      toast.success(t('checkout.success'));
      clearCart();
      navigate('/');
    } catch (error) {
      toast.error('Ошибка при отправке заказа');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">{t('checkout.title')}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="fullName">{t('checkout.fullName')} *</Label>
            <Input
              id="fullName"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="company">{t('checkout.company')}</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="email">{t('checkout.email')} *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="phone">{t('checkout.phone')} *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="comment">{t('checkout.comment')}</Label>
            <Textarea
              id="comment"
              rows={4}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            />
          </div>

          <div className="bg-muted rounded-lg p-6">
            <h3 className="font-semibold mb-4">Ваш заказ:</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span>{item.product.name} × {item.qty}</span>
                  {item.product.price && item.product.price > 0 ? (
                    <span>{item.product.price * item.qty} ₽</span>
                  ) : (
                    <span>По запросу</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">
            {t('checkout.submit')}
          </Button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
