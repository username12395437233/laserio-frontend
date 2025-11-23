import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <Link href="/contacts" className="hover:text-white transition">
              Контакты
            </Link>
            <Link href="/address" className="hover:text-white transition">
              Адрес
            </Link>
          </div>
          <div className="text-xl font-bold">LASER components</div>
          <div className="flex items-center gap-6">
            <Link href="/delivery" className="hover:text-white transition">
              Доставка и оплата
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Пользовательское соглашение
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
