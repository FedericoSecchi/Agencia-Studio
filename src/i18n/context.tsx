import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { en } from './locales/en';
import { es } from './locales/es';

type Language = 'en' | 'es';

type Translations = typeof en;

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: <T = string>(key: string) => T;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};

interface I18nProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export const I18nProvider = ({ children, defaultLanguage = 'en' }: I18nProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return defaultLanguage;
    }

    // First, check if user has manually selected a language
    const saved = localStorage.getItem('language') as Language;
    if (saved === 'en' || saved === 'es') {
      return saved;
    }

    // If no saved preference, auto-detect from browser locale
    const preferredLanguages = navigator.languages?.length
      ? navigator.languages
      : [navigator.language].filter(Boolean);

    const latamSpanishLocales = new Set([
      'es-ar',
      'es-bo',
      'es-cl',
      'es-co',
      'es-cr',
      'es-cu',
      'es-do',
      'es-ec',
      'es-gt',
      'es-hn',
      'es-mx',
      'es-ni',
      'es-pa',
      'es-pe',
      'es-pr',
      'es-py',
      'es-sv',
      'es-uy',
      'es-ve',
    ]);

    const hasLatamSpanish = preferredLanguages.some((lang) => {
      const normalized = lang.toLowerCase();
      return Array.from(latamSpanishLocales).some((locale) =>
        normalized.startsWith(locale)
      );
    });

    if (hasLatamSpanish) {
      return 'es';
    }

    // Default to English for all other cases
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Persist manual selection to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const translations: Translations = language === 'es' ? es : en;
  const t = <T = string>(key: string): T => {
    const value = key
      .split('.')
      .reduce<unknown>((acc, part) => {
        if (acc && typeof acc === 'object' && part in (acc as Record<string, unknown>)) {
          return (acc as Record<string, unknown>)[part];
        }
        return undefined;
      }, translations);

    if (value === undefined) {
      if (typeof window !== 'undefined') {
        console.warn(`[i18n] Missing translation key: ${key}`);
      }
      return key as T;
    }

    return value as T;
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

