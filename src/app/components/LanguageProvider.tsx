'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'hi' | 'hinglish';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check localStorage first
    const saved = localStorage.getItem('language') as Language | null;
    if (saved) {
      setLanguage(saved);
      return;
    }

    // Detect based on location using timezone or IP
    try {
      // Using timezone as a proxy for location
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const isIndian = timezone.includes('Kolkata') || timezone.includes('Asia/Calcutta');

      if (isIndian) {
        // Randomly choose hinglish or hindi for Indian users
        const lang = Math.random() > 0.5 ? 'hinglish' : 'hi';
        setLanguage(lang);
        localStorage.setItem('language', lang);
      }
    } catch (e) {
      // Fallback to English
      setLanguage('en');
    }
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
