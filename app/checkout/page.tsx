import { Metadata } from 'next';
import { CheckoutClient } from './CheckoutClient';

export const metadata: Metadata = {
  title: 'Checkout - LaserIO',
  description: 'Complete your order',
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}

