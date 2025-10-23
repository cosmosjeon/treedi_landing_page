"use client"

import { useState, useEffect, useMemo } from "react"
import { useLanguage } from "@/context/language-context"
import { featureCards } from "@/lib/feature-constants"

export default function DocumentationSection() {
  const { language } = useLanguage()
  const [activeCard, setActiveCard] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)

  const cards = useMemo(() => featureCards[language], [language])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length)
      setAnimationKey((prev) => prev + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [cards.length])

  useEffect(() => {
    setActiveCard(0)
    setAnimationKey((prev) => prev + 1)
  }, [cards])

  const handleCardClick = (index: number) => {
    setActiveCard(index)
    setAnimationKey((prev) => prev + 1)
  }

  return (
    <div className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center">
      {/* Header Section removed */}

      {/* Content Section */}
      <div className="self-stretch px-4 md:px-9 overflow-hidden flex justify-start items-center">
        <div className="flex-1 py-8 md:py-11 flex flex-col md:flex-row justify-start items-center gap-6 md:gap-12">
          {/* Left Column - Feature Cards */}
          <div className="w-full md:w-auto md:max-w-[400px] flex flex-col justify-center items-center gap-4 order-2 md:order-1">
            {cards.map((card, index) => {
              const isActive = index === activeCard

              return (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`w-full overflow-hidden flex flex-col justify-start items-start transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white shadow-[0px_0px_0px_0.75px_#E0DEDB_inset]"
                      : "border border-[rgba(2,6,23,0.08)]"
                  }`}
                >
                  <div
                    className={`w-full h-0.5 bg-[rgba(50,45,43,0.08)] overflow-hidden ${isActive ? "opacity-100" : "opacity-0"}`}
                  >
                    <div
                      key={animationKey}
                      className="h-0.5 bg-[#322D2B] animate-[progressBar_5s_linear_forwards] will-change-transform"
                    />
                  </div>
                  <div className="px-6 py-5 w-full flex flex-col gap-2">
                    <div className="self-stretch flex justify-center flex-col text-[#49423D] text-sm font-semibold leading-6 font-sans">
                      {card.title}
                    </div>
                    <div className="self-stretch text-[#605A57] text-[13px] font-normal leading-[22px] font-sans whitespace-pre-line">
                      {card.description}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column - Preview Image (from public/) */}
          <div className="w-full md:w-auto rounded-lg flex flex-col justify-center items-center gap-2 order-1 md:order-2 md:px-0 px-[00]">
            <div className="w-full md:w-[580px] h-[250px] md:h-[420px] bg-white shadow-[0px_0px_0px_0.9056603908538818px_rgba(0,0,0,0.08)] overflow-hidden rounded-lg flex flex-col justify-start items-start">
              <div className="relative w-full h-full">
                {/* 분기 처리 (earliest) */}
                <img
                  src="/capture-branch.png"
                  alt="분기 처리"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${activeCard === 0 ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                />
                {/* 트리 정리 (middle) */}
                <img
                  src="/capture-tree.png"
                  alt="트리 정리"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${activeCard === 1 ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                />
                {/* 문맥 선택 (latest) */}
                <img
                  src="/capture-context.png"
                  alt="문맥 선택"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${activeCard === 2 ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progressBar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  )
}
