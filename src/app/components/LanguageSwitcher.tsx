'use client';

import { useLanguage } from './LanguageProvider';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇬🇧' },
    { code: 'hinglish' as const, name: 'Hinglish', flag: '🇮🇳' },
    { code: 'hi' as const, name: 'हिंदी', flag: '🇮🇳' },
  ];

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-slate-400" />
      <div className="flex gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code);
              localStorage.setItem('language', lang.code);
            }}
            className={`px-3 py-1 rounded text-xs font-medium transition-all ${
              language === lang.code
                ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50'
                : 'text-slate-400 hover:text-slate-300'
            }`}
            title={lang.name}
          >
            {lang.flag} {lang.code === 'hinglish' ? 'Mix' : lang.code.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
