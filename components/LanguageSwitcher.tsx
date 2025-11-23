'use client';

import { useState } from 'react';

export function LanguageSwitcher() {
  const [lang, setLang] = useState<'ru' | 'en'>('ru');

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setLang('ru')}
        className={`px-3 py-1 rounded transition ${
          lang === 'ru' ? 'bg-blue-700' : 'hover:bg-blue-700'
        }`}
      >
        RU
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1 rounded transition ${
          lang === 'en' ? 'bg-blue-700' : 'hover:bg-blue-700'
        }`}
      >
        EN
      </button>
    </div>
  );
}

