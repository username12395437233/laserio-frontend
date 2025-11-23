import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          LASER components
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Лазерные и опто-электронные компоненты
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/catalog">
            <Button size="lg">
              Перейти в каталог
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/categories">
            <Button size="lg" variant="outline">
              Карта каталога
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Каталог</h2>
          <p className="text-muted-foreground mb-4">
            Широкий ассортимент лазерных и опто-электронных компонентов
          </p>
          <Link href="/catalog">
            <Button variant="outline" size="sm">
              Открыть каталог
            </Button>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Карта каталога</h2>
          <p className="text-muted-foreground mb-4">
            Навигация по всем категориям и подкатегориям
          </p>
          <Link href="/categories">
            <Button variant="outline" size="sm">
              Открыть карту
            </Button>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Контакты</h2>
          <p className="text-muted-foreground mb-4">
            Свяжитесь с нами для получения консультации
          </p>
          <Link href="/contacts">
            <Button variant="outline" size="sm">
              Контакты
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

