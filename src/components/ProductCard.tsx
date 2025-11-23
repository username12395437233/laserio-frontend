'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { useLanguageStore } from '@/store/languageStore';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const { t } = useLanguageStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} добавлен в заявки`);
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="aspect-square bg-muted rounded-md mb-3 flex items-center justify-center overflow-hidden relative">
          {product.primary_image_url ? (
            <Image
              src={product.primary_image_url}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
          ) : (
            <div className="text-muted-foreground text-sm">No image</div>
          )}
        </div>
        
        <h3 className="font-medium text-sm mb-2 flex-1 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center justify-between mt-auto pt-2">
          {product.price && product.price > 0 ? (
            <span className="font-semibold">{product.price} ₽</span>
          ) : (
            <span className="text-sm text-muted-foreground">По запросу</span>
          )}
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleAddToCart}
            className="h-8"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
};
