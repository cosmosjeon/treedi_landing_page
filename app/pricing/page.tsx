"use client"

import { useMemo } from "react"
import { useLanguage } from "@/context/language-context"

export default function PricingPage() {
  const { language } = useLanguage()

  const copy = useMemo(
    () => ({
      ko: {
        heading: "요금제",
        leadTitle: "Treedi는 여러분의 진심 어린 피드백으로 성장합니다.",
        descriptionLines: [
          "7일간 사용해보신 뒤, 솔직한 피드백을 남겨주세요.",
          "지속적인 피드백을 남겨주시면 Treedi는 평생 무료로 이용하실 수 있습니다.",
        ],
        betaFootnote:
          "*베타 기간 종료 후 유료화될 예정이며, 베타 이후에도 적극적으로 피드백을 남겨주신 분께는 계속 무료로 제공됩니다.",
        afterBeta: "베타 기간 이후에는 월 10,000원(₩10,000)으로 제공됩니다.",
        price: "₩0",
        betaLabel: "Beta 기간",
        cta: "무료로 시작하기",
        ctaHref: "/start",
      },
      en: {
        heading: "Pricing",
        leadTitle: "Treedi grows with your thoughtful feedback.",
        descriptionLines: [
          "Try Treedi for seven days and share your honest thoughts.",
          "Keep the feedback coming, and enjoy lifetime access for free.",
        ],
        betaFootnote:
          "Paid plans will begin after beta, but active beta contributors keep free access even after launch.",
        afterBeta: "After beta, it will cost ₩10,000 per month.",
        price: "₩0",
        betaLabel: "Beta period",
        cta: "Start for free",
        ctaHref: "/start",
      },
    }),
    [],
  )

  const t = copy[language]

  return (
    <div className="w-full min-h-screen bg-[#F7F5F3] flex justify-center">
      <div className="w-full max-w-[1060px] px-6 md:px-8 lg:px-0 py-12 md:py-16">
        <div className="text-[#37322F] text-2xl md:text-3xl font-semibold mb-6">{t.heading}</div>

        <div className="border border-[#E0DEDB] bg-white rounded-lg shadow-[0px_0px_0px_0.9056603908538818px_rgba(0,0,0,0.08)] p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-10">
            {/* Left copy */}
            <div className="flex-1 min-w-[280px]">
              <div className="text-[#49423D] text-xl md:text-2xl font-bold leading-8 md:leading-9 font-sans mb-3">
                {t.leadTitle}
              </div>
              <div className="text-[#605A57] text-base md:text-lg font-semibold leading-7 md:leading-8 font-sans mb-3">
                {t.descriptionLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < t.descriptionLines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </div>
              <div className="text-[rgba(73,66,61,0.70)] text-sm leading-6 font-sans mb-2">{t.betaFootnote}</div>
              <div className="text-[rgba(73,66,61,0.85)] text-sm md:text-base leading-6 font-sans">
                {t.afterBeta}
              </div>
            </div>

            {/* Right price/cta (whole block clickable) */}
            <a href={t.ctaHref} className="group flex flex-col items-start gap-3 min-w-[220px] no-underline">
              <div className="text-[#37322F] text-6xl md:text-7xl font-semibold leading-none font-serif group-hover:opacity-90 transition-opacity">
                {t.price}
              </div>
              <div className="text-[#847971] text-sm md:text-base font-medium font-sans">{t.betaLabel}</div>
              <div className="px-6 py-3 bg-[#37322F] text-[#FBFAF9] rounded-[99px] shadow-[0px_2px_4px_rgba(55,50,47,0.12)] text-[14px] md:text-[15px] font-medium leading-5 font-sans group-hover:bg-[#2A2520] transition-colors">
                {t.cta}
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

