'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import translations, { Language, Translations } from '@/locales/translations'

interface LanguageContextType {
  lang: Language
  setLang: (l: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ru',
  setLang: () => {},
  t: translations.ru,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('ru')

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language | null
    if (saved && (saved === 'en' || saved === 'ru' || saved === 'az')) {
      setLangState(saved)
    }
  }, [])

  const setLang = (l: Language) => {
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
