'use client';

import { useState } from 'react';

export function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Поиск"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-3 py-1 bg-blue-800 text-white placeholder-blue-300 rounded-l text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-700"
      />
      <button className="px-3 py-1 bg-blue-700 rounded-r hover:bg-blue-600 transition border border-blue-700 border-l-0">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
}
