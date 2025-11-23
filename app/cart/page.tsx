import { Metadata } from 'next';
import { CartClient } from './CartClient';

export const metadata: Metadata = {
  title: 'Cart - LaserIO',
  description: 'Your shopping cart',
};

export default function CartPage() {
  return <CartClient />;
}

