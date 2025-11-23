import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translations, Language } from '@/i18n/translations';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: 'ru',
      
      setLanguage: (lang: Language) => set({ language: lang }),
      
      t: (key: string) => {
        const { language } = get();
        const keys = key.split('.');
        let value: any = translations[language];
        
        for (const k of keys) {
          value = value?.[k];
        }
        
        return value || key;
      },
    }),
    {
      name: 'laser-language-storage',
    }
  )
);
