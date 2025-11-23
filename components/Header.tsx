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
      <header className="bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white">
        {/* Top bar */}
        <div className="border-b border-blue-700">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-10 text-sm">
              <div className="flex items-center gap-4">
                <Link href="mailto:info@laserio.com" className="hover:text-blue-200 transition">
                  Почта
                </Link>
                <span>/</span>
                <Link href="tel:+1234567890" className="hover:text-blue-200 transition">
                  телефон
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <a href="#" className="hover:opacity-80 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                </a>
                <a href="#" className="hover:opacity-80 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2z"/>
                  </svg>
                </a>
                <a href="#" className="hover:opacity-80 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/" className="text-xl font-bold">
                  LASER components
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCartOpen(true)}
                  className="relative px-4 py-1 bg-blue-700 hover:bg-blue-600 rounded transition"
                >
                  Заявки {itemCount > 0 && <span className="ml-1">{itemCount}</span>}
                </button>
                <SearchBar />
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation bar */}
        <nav className="border-b border-blue-700">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-6 h-12">
              <Link href="/about" className="hover:text-blue-200 transition">
                О компании
              </Link>
              <Link href="/categories" className="hover:text-blue-200 transition">
                Карта каталога
              </Link>
              <Link href="/news" className="hover:text-blue-200 transition">
                Новости
              </Link>
              <Link href="/blog" className="hover:text-blue-200 transition">
                Блог
              </Link>
              <Link href="/gallery" className="hover:text-blue-200 transition">
                Фотогалерея
              </Link>
              <Link href="/service" className="hover:text-blue-200 transition">
                Сервис
              </Link>
              <Link href="/contacts" className="hover:text-blue-200 transition">
                Контакты
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
