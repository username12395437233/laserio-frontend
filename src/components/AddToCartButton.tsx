'use client';

import { Product } from '@/lib/api';
import { Button } from './ui/button';
import { useCartStore } from '@/store/cartStore';
import { useLanguageStore } from '@/store/languageStore';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface AddToCartButtonProps {
  product: Product;
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const { t } = useLanguageStore();

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} добавлен в заявки`);
  };

  return (
    <Button onClick={handleAddToCart} size="lg" className="w-full">
      <ShoppingCart className="w-5 h-5 mr-2" />
      {t('catalog.addToCart')}
    </Button>
  );
};

