'use client'

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"

export function Header() {
  const { language, setLanguage } = useLanguage()
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const languageDropdownRef = useRef<HTMLDivElement | null>(null)

  const copy = {
    en: {
      products: "Products",
      pricing: "Pricing",
      docs: "Docs",
      login: "Log in",
      current: "en",
    },
    ko: {
      products: "제품",
      pricing: "요금제",
      docs: "문서",
      login: "로그인",
      current: "ko",
    },
  } as const

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLanguageSelect = (value: "ko" | "en") => {
    setLanguage(value)
    setIsLanguageMenuOpen(false)
  }

  return (
    <header className="w-full border-b border-[#37322f]/6 bg-[#f7f5f3]">
      <div className="max-w-[1060px] mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <div className="text-[#37322f] font-semibold text-lg">Brillance</div>
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-[#37322f] hover:text-[#37322f]/80 text-sm font-medium">
                {language === "ko" ? copy.ko.products : copy.en.products}
              </button>
              <button className="text-[#37322f] hover:text-[#37322f]/80 text-sm font-medium">
                {language === "ko" ? copy.ko.pricing : copy.en.pricing}
              </button>
              <button className="text-[#37322f] hover:text-[#37322f]/80 text-sm font-medium">
                {language === "ko" ? copy.ko.docs : copy.en.docs}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative" ref={languageDropdownRef}>
              <button
                type="button"
                onClick={() => setIsLanguageMenuOpen((prev) => !prev)}
                className="flex items-center gap-1 px-2 sm:px-3 md:px-[14px] py-1 sm:py-[6px] bg-white text-[#37322f] text-xs md:text-[13px] font-medium leading-5 rounded-full shadow-[0px_1px_2px_rgba(55,50,47,0.12)] hover:bg-[#f0eeeb] transition"
                aria-haspopup="menu"
                aria-expanded={isLanguageMenuOpen}
              >
                {language === "ko" ? copy.ko.current : copy.en.current}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isLanguageMenuOpen ? "rotate-180" : ""}`} />
              </button>
              {isLanguageMenuOpen ? (
                <div className="absolute right-0 mt-2 w-32 rounded-lg border border-[rgba(55,50,47,0.12)] bg-white py-1 shadow-[0px_8px_16px_rgba(55,50,47,0.12)] z-50">
                  <button
                    type="button"
                    onClick={() => handleLanguageSelect("ko")}
                    className={`block w-full px-3 py-2 text-left text-xs md:text-[13px] ${
                      language === "ko" ? "bg-[#f7f5f3] text-[#37322f]" : "text-[#4a443f] hover:bg-[#f7f5f3]"
                    }`}
                  >
                    {copy.ko.current}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLanguageSelect("en")}
                    className={`block w-full px-3 py-2 text-left text-xs md:text-[13px] ${
                      language === "en" ? "bg-[#f7f5f3] text-[#37322f]" : "text-[#4a443f] hover:bg-[#f7f5f3]"
                    }`}
                  >
                    {copy.en.current}
                  </button>
                </div>
              ) : null}
            </div>
            <Button variant="ghost" className="text-[#37322f] hover:bg-[#37322f]/5">
              {language === "ko" ? copy.ko.login : copy.en.login}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
