import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LaserIO - Laser & Optoelectronic Components',
  description: 'Browse our catalog of laser and optoelectronic components',
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Лазерные и оптоэлектронные компоненты
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Откройте для себя наш полный каталог высококачественных компонентов
        </p>
        <Link
          href="/categories"
          className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition font-semibold"
        >
          Перейти в каталог
        </Link>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Широкий выбор</h2>
          <p className="text-gray-600">
            Тысячи продуктов от ведущих производителей
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Гарантия качества</h2>
          <p className="text-gray-600">
            Все продукты соответствуют отраслевым стандартам
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Экспертная поддержка</h2>
          <p className="text-gray-600">
            Наша команда готова помочь найти правильное решение
          </p>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
        <Link
          href="/categories"
          className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition font-semibold"
        >
          Изучить каталог
        </Link>
      </section>
    </div>
  );
}
