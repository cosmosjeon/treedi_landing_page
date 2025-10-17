'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

type Language = "ko" | "en"

type LanguageContextValue = {
  language: Language
  setLanguage: (value: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ko")

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("preferred-language") : null
    if (stored === "ko" || stored === "en") {
      setLanguageState(stored)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem("preferred-language", language)
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage: (value: Language) => {
        setLanguageState(value)
      },
    }),
    [language]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
