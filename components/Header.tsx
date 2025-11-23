'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { CartDrawer } from './CartDrawer';
import { SearchBar } from './SearchBar';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const itemCount = useCartStore((state) => state.getItemCount());
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-bold">
                LaserIO
              </Link>
              <nav className="hidden md:flex gap-6">
                <Link href="/" className="hover:text-blue-200 transition">
                  Home
                </Link>
                <Link href="/categories" className="hover:text-blue-200 transition">
                  Catalog
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <SearchBar />
              <LanguageSwitcher />
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-blue-700 rounded transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

