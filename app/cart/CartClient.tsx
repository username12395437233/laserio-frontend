'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cart';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export function CartClient() {
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const setQty = useCartStore((state) => state.setQty);
  const getTotal = useCartStore((state) => state.getTotal);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Cart' }]} />
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl mb-4">Your cart is empty</p>
          <Link
            href="/categories"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Cart' }]} />
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 bg-white p-4 rounded-lg shadow"
            >
              {item.product.primary_image_url && (
                <Link href={`/products/${item.product.slug}`}>
                  <Image
                    src={item.product.primary_image_url}
                    alt={item.product.name}
                    width={120}
                    height={120}
                    className="object-cover rounded"
                  />
                </Link>
              )}
              <div className="flex-1">
                <Link
                  href={`/products/${item.product.slug}`}
                  className="font-semibold text-lg hover:text-blue-600"
                >
                  {item.product.name}
                </Link>
                <p className="text-blue-600 font-bold mt-2">
                  {item.product.price > 0
                    ? `${item.product.price.toFixed(2)} ₽`
                    : 'On request'}
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQty(item.product.id, item.qty - 1)}
                      className="w-8 h-8 border rounded hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.qty}</span>
                    <button
                      onClick={() => setQty(item.product.id, item.qty + 1)}
                      className="w-8 h-8 border rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => remove(item.product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{getTotal().toFixed(2)} ₽</span>
              </div>
            </div>
            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{getTotal().toFixed(2)} ₽</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

