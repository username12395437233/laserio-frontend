import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from '@/lib/types';

interface CartState {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (productId: number) => void;
  setQty: (productId: number, qty: number) => void;
  clear: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product) => {
        const items = get().items;
        const existing = items.find((item) => item.product.id === product.id);
        if (existing) {
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, qty: item.qty + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { product, qty: 1 }] });
        }
      },
      remove: (productId) => {
        set({ items: get().items.filter((item) => item.product.id !== productId) });
      },
      setQty: (productId, qty) => {
        if (qty <= 0) {
          get().remove(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, qty } : item
          ),
        });
      },
      clear: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((sum, item) => {
          const price = item.product.price > 0 ? item.product.price : 0;
          return sum + price * item.qty;
        }, 0);
      },
      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.qty, 0);
      },
    }),
    {
      name: 'laserio-cart',
    }
  )
);

