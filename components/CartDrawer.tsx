'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const setQty = useCartStore((state) => state.setQty);
  const getTotal = useCartStore((state) => state.getTotal);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b bg-blue-900 text-white">
          <h2 className="text-xl font-bold">Заявка</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Заявка пуста</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 border-b pb-4">
                  {item.product.primary_image_url && (
                    <Image
                      src={item.product.primary_image_url}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="object-cover rounded border"
                    />
                  )}
                  <div className="flex-1">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="font-semibold hover:text-blue-600 text-sm"
                    >
                      {item.product.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => setQty(item.product.id, item.qty - 1)}
                        className="w-8 h-8 border rounded hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="text-sm">{item.qty}</span>
                      <button
                        onClick={() => setQty(item.product.id, item.qty + 1)}
                        className="w-8 h-8 border rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                      <button
                        onClick={() => remove(item.product.id)}
                        className="ml-auto text-red-500 hover:text-red-700 text-sm"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-between mb-4">
              <span className="font-bold">Итого:</span>
              <span className="font-bold">{getTotal().toFixed(2)} ₽</span>
            </div>
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full bg-blue-800 text-white text-center py-2 rounded hover:bg-blue-900 transition"
            >
              Перейти в заявку
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
