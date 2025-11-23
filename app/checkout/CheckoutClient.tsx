'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { submitOrder } from '@/lib/api';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import type { OrderRequest } from '@/lib/types';

export function CheckoutClient() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const clear = useCartStore((state) => state.clear);

  const [formData, setFormData] = useState({
    full_name: '',
    company: '',
    email: '',
    phone: '',
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const order: OrderRequest = {
        customer: {
          full_name: formData.full_name,
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

      try {
        await submitOrder(order);
        clear();
        setSuccess(true);
      } catch (apiError) {
        // Fallback to mailto
        const subject = encodeURIComponent('Order from LaserIO');
        const body = encodeURIComponent(
          `Order Details:\n\n` +
            `Customer: ${formData.full_name}\n` +
            `Company: ${formData.company || 'N/A'}\n` +
            `Email: ${formData.email}\n` +
            `Phone: ${formData.phone}\n` +
            `Comment: ${formData.comment || 'N/A'}\n\n` +
            `Items:\n${items
              .map(
                (item) =>
                  `- ${item.product.name} x${item.qty} (${item.product.price}₽)`
              )
              .join('\n')}\n\n` +
            `Total: ${getTotal().toFixed(2)}₽`
        );
        window.location.href = `mailto:orders@laserio.com?subject=${subject}&body=${body}`;
        clear();
        setSuccess(true);
      }
    } catch (err) {
      setError('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Checkout' }]} />
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Order Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We will contact you shortly.
            </p>
            <a
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
            <div>
              <label className="block font-semibold mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Phone *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Comment</label>
              <textarea
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Order'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span>
                    {item.product.name} x{item.qty}
                  </span>
                  <span>
                    {item.product.price > 0
                      ? `${(item.product.price * item.qty).toFixed(2)} ₽`
                      : 'On request'}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{getTotal().toFixed(2)} ₽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

