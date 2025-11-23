'use client';

import { useState } from 'react';

export function LanguageSwitcher() {
  const [lang, setLang] = useState<'ru' | 'en'>('ru');

  return (
    <div className="flex gap-1">
      <button
        onClick={() => setLang('ru')}
        className={`px-2 py-1 rounded text-sm transition ${
          lang === 'ru' ? 'bg-blue-700' : 'hover:bg-blue-800'
        }`}
      >
        RU
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-2 py-1 rounded text-sm transition ${
          lang === 'en' ? 'bg-blue-700' : 'hover:bg-blue-800'
        }`}
      >
        EN
      </button>
    </div>
  );
}
