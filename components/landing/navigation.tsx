"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, Globe } from "lucide-react"

import { useLanguage } from "@/context/language-context"

export function LandingNavigation() {
  const { language, setLanguage } = useLanguage()
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const languageDropdownRef = useRef<HTMLDivElement | null>(null)

  const copy = {
    en: {
      products: "Products",
      docs: "Docs",
      login: "Log in",
      langLabel: "en",
    },
    ko: {
      products: "제품",
      docs: "문서",
      login: "로그인",
      langLabel: "ko",
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

  return (
    <div className="w-full h-12 sm:h-14 md:h-16 lg:h-[84px] absolute left-0 top-0 flex justify-center items-center z-20 px-6 sm:px-8 md:px-12 lg:px-0">
      <div className="w-full h-0 absolute left-0 top-6 sm:top-7 md:top-8 lg:top-[42px] border-t border-[rgba(55,50,47,0.12)] shadow-[0px_1px_0px_white]" />

      <div className="w-full max-w-[calc(100%-32px)] sm:max-w-[calc(100%-48px)] md:max-w-[calc(100%-64px)] lg:max-w-[700px] lg:w-[700px] h-10 sm:h-11 md:h-12 py-1.5 sm:py-2 px-3 sm:px-4 md:px-4 pr-2 sm:pr-3 bg-[#F7F5F3] backdrop-blur-sm shadow-[0px_0px_0px_2px_white] overflow-visible rounded-[50px] flex justify-between items-center relative z-30">
        <div className="flex justify-center items-center">
          <div className="flex justify-start items-center">
            <div className="flex flex-col justify-center text-[#2F3037] text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-5 font-sans">
              Brillance
            </div>
          </div>
          <div className="pl-3 sm:pl-4 md:pl-5 lg:pl-5 flex justify-start items-start hidden sm:flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-4">
            <div className="flex justify-start items-center">
              <div className="flex flex-col justify-center text-[rgba(49,45,43,0.80)] text-xs md:text-[13px] font-medium leading-[14px] font-sans">
                {language === "ko" ? copy.ko.products : copy.en.products}
              </div>
            </div>
            <div className="flex justify-start items-center">
              <div className="flex flex-col justify-center text-[rgba(49,45,43,0.80)] text-xs md:text-[13px] font-medium leading-[14px] font-sans">
                {language === "ko" ? copy.ko.docs : copy.en.docs}
              </div>
            </div>
          </div>
        </div>
        <div className="h-6 sm:h-7 md:h-8 flex items-center gap-2 sm:gap-3">
          <div
            className="relative"
            ref={languageDropdownRef}
            onMouseEnter={() => setIsLanguageMenuOpen(true)}
            onMouseLeave={() => setIsLanguageMenuOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsLanguageMenuOpen((prev) => !prev)}
              className="flex items-center gap-1 px-2 sm:px-3 md:px-[14px] py-1 sm:py-[6px] bg-white text-[#37322F] text-xs md:text-[13px] font-medium leading-5 rounded-full shadow-[0px_1px_2px_rgba(55,50,47,0.12)] hover:bg-[#f0eeeb] transition"
              aria-haspopup="menu"
              aria-expanded={isLanguageMenuOpen}
            >
              <Globe className="h-3.5 w-3.5" />
            </button>
            {isLanguageMenuOpen ? (
              <div className="absolute right-0 mt-2 w-32 rounded-lg border border-[rgba(55,50,47,0.12)] bg-white py-1 shadow-[0px_8px_16px_rgba(55,50,47,0.12)] z-50">
                <button
                  type="button"
                  onClick={() => {
                    setLanguage("ko")
                    setIsLanguageMenuOpen(false)
                  }}
                  className={`block w-full px-3 py-2 text-left text-xs md:text-[13px] ${
                    language === "ko" ? "bg-[#f7f5f3] text-[#37322F]" : "text-[#4a443f] hover:bg-[#f7f5f3]"
                  }`}
                >
                  {copy.ko.langLabel}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage("en")
                    setIsLanguageMenuOpen(false)
                  }}
                  className={`block w-full px-3 py-2 text-left text-xs md:text-[13px] ${
                    language === "en" ? "bg-[#f7f5f3] text-[#37322F]" : "text-[#4a443f] hover:bg-[#f7f5f3]"
                  }`}
                >
                  {copy.en.langLabel}
                </button>
              </div>
            ) : null}
          </div>
          <a href="#" className="inline-block">
            <div className="px-2 sm:px-3 md:px-[14px] py-1 sm:py-[6px] bg-white shadow-[0px_1px_2px_rgba(55,50,47,0.12)] overflow-hidden rounded-full flex justify-center items-center">
              <div className="flex flex-col justify-center text-[#37322F] text-xs md:text-[13px] font-medium leading-5 font-sans">
                {language === "ko" ? copy.ko.login : copy.en.login}
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

