'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Что-то пошло не так</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Произошла ошибка при загрузке страницы
      </p>
      <div className="flex gap-4 justify-center">
        <Button onClick={reset}>Попробовать снова</Button>
        <Link href="/">
          <Button variant="outline">Вернуться на главную</Button>
        </Link>
      </div>
    </div>
  );
}

