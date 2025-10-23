"use client"

import { useMemo } from "react"
import { useLanguage } from "@/context/language-context"

export default function StartPage() {
  const { language } = useLanguage()
  const t = useMemo(
    () =>
      ({
        ko: {
          title: "무료 플랜 시작",
          desc: "현재는 베타 기간으로 무료입니다. 베타 종료 후에는 월 10,000원(₩10,000)으로 전환됩니다.",
          go: "Treedi 시작하기",
          goHref: "https://treedi-ai.vercel.app",
        },
        en: {
          title: "Start Free Plan",
          desc: "During beta, it's free. After beta, pricing becomes ₩10,000/month.",
          go: "Go to Treedi",
          goHref: "https://treedi-ai.vercel.app",
        },
      }[language]),
    [language],
  )

  return (
    <div className="w-full min-h-screen bg-[#F7F5F3] flex justify-center items-start">
      <div className="w-full max-w-[900px] px-6 md:px-8 lg:px-0 py-16">
        <div className="bg-white border border-[#E0DEDB] rounded-lg shadow-[0px_0px_0px_0.9056603908538818px_rgba(0,0,0,0.08)] p-8 md:p-12">
          <h1 className="text-[#37322F] text-2xl md:text-3xl font-semibold mb-4">{t.title}</h1>
          <p className="text-[#605A57] text-base md:text-lg leading-7 mb-8">{t.desc}</p>
          <a href={t.goHref} className="inline-block">
            <div className="px-6 py-3 bg-[#37322F] text-white rounded-[99px] hover:bg-[#2A2520] transition-colors text-sm md:text-base font-medium">
              {t.go}
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

