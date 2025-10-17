'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

type Language = "ko" | "en"

type LanguageContextValue = {
  language: Language
  setLanguage: (value: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname() ?? "/"
  const searchParams = useSearchParams()
  const derivedLanguage: Language = pathname.startsWith("/en") ? "en" : "ko"
  const [language, setLanguageState] = useState<Language>(derivedLanguage)

  useEffect(() => {
    if (language !== derivedLanguage) {
      setLanguageState(derivedLanguage)
    }
  }, [language, derivedLanguage])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem("preferred-language", language)
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage: (value: Language) => {
        if (value === language) return
        setLanguageState(value)
        const pathWithoutLocale = pathname.startsWith("/en") ? pathname.slice(3) || "/" : pathname || "/"
        const targetPath =
          value === "en"
            ? pathWithoutLocale === "/"
              ? "/en"
              : `/en${pathWithoutLocale.startsWith("/") ? pathWithoutLocale : `/${pathWithoutLocale}`}`
            : pathWithoutLocale === "" ? "/" : pathWithoutLocale
        const searchString = searchParams?.toString()
        const href = searchString ? `${targetPath}?${searchString}` : targetPath
        router.push(href)
      },
    }),
    [language, pathname, router, searchParams]
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
