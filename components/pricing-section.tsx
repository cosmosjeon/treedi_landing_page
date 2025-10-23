"use client"

import { useMemo } from "react"

import { useLanguage } from "@/context/language-context"

export default function PricingSection() {
  const { language } = useLanguage()

  const copy = useMemo(
    () => ({
      ko: {
        sectionLabel: "요금제",
        leadTitle: "Treedi는 여러분의 진심 어린 피드백으로 성장합니다.",
        descriptionLines: [
          "7일간 사용해보신 뒤, 솔직한 피드백을 남겨주세요.",
          "지속적인 피드백을 남겨주시면 Treedi는 평생 무료로 이용하실 수 있습니다.",
        ],
        footnote:
          "*베타 기간 종료 후 유료화될 예정이며, 베타 이후에도 적극적으로 피드백을 남겨주신 분께는 계속 무료로 제공됩니다.",
        price: "₩0",
        betaLabel: "Beta 기간",
        cta: "무료로 시작하기",
      },
      en: {
        sectionLabel: "Pricing",
        leadTitle: "Treedi grows with your thoughtful feedback.",
        descriptionLines: [
          "Try Treedi for seven days and share your honest thoughts.",
          "Keep the feedback coming, and enjoy lifetime access for free.",
        ],
        footnote:
          "Paid plans will begin after beta, but active beta contributors keep free access even after launch.",
        price: "$0",
        betaLabel: "Beta period",
        cta: "Start for free",
      },
    }),
    []
  )

  const localizedCopy = copy[language]

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      

      

      {/* Pricing Cards Section - Single 0원 Card Full Width */}
      <div className="self-stretch border-b border-t border-[rgba(55,50,47,0.12)] flex justify-center items-center">
        <div className="flex justify-center items-start w-full">
          {/* Single Starter (0원) Card - expanded */}
          <div className="flex-1 max-w-[1060px] w-full px-6 md:px-10 py-8 md:py-12 border border-[#E0DEDB] overflow-hidden rounded-lg flex flex-col justify-start items-start gap-10 bg-white">
              {/* Plan Header + Horizontal Layout */}
              <div className="self-stretch flex flex-col justify-start items-center gap-8">
                  <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="text-[rgba(55,50,47,0.90)] text-xl md:text-2xl font-semibold leading-7 font-sans">
                    {localizedCopy.sectionLabel}
                  </div>
                </div>

                {/* Row: Left texts, Right ₩0 */}
                <div className="self-stretch flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                  {/* Left: 안내 문구 */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="text-left text-[#49423D] text-xl md:text-2xl font-bold leading-8 md:leading-9 font-sans">
                      {localizedCopy.leadTitle}
                    </div>
                    <div className="text-left text-[#605A57] text-base md:text-lg font-semibold leading-7 md:leading-8 font-sans">
                      {localizedCopy.descriptionLines.map((line, index) => (
                        <span key={`${line}-${index}`}>
                          {line}
                          {index < localizedCopy.descriptionLines.length - 1 ? <br /> : null}
                        </span>
                      ))}
                    </div>
                    <div className="text-left text-[rgba(73,66,61,0.70)] text-sm leading-6 font-sans">
                      {localizedCopy.footnote}
                    </div>
                  </div>

                  {/* Right: ₩0 + CTA */}
                  <div className="flex flex-col items-start gap-3 min-w-[200px]">
                    <div className="text-[#37322F] text-6xl md:text-7xl font-semibold leading-none font-serif">{localizedCopy.price}</div>
                    <div className="text-[#847971] text-sm md:text-base font-medium font-sans">{localizedCopy.betaLabel}</div>
                    <a href="https://treedi-ai.vercel.app" className="inline-block">
                      <div className="px-6 py-[12px] bg-[#37322F] shadow-[0px_2px_4px_rgba(55,50,47,0.12)] rounded-[99px] flex justify-center items-center hover:bg-[#2A2520] transition-colors">
                        <div className="text-[#FBFAF9] text-[14px] md:text-[15px] font-medium leading-5 font-sans">{localizedCopy.cta}</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              
          </div>
        </div>
      </div>
    </div>
  )
}
