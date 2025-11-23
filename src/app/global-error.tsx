'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Что-то пошло не так</h1>
          <button onClick={reset}>Попробовать снова</button>
        </div>
      </body>
    </html>
  );
}

