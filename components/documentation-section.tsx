"use client"

import { useState, useEffect, useMemo } from "react"
import { useLanguage } from "@/context/language-context"

const cardsByLanguage = {
  ko: [
    {
      title: "일정을 계획하세요",
      description: "데이터를 탐색하고, 대시보드를 만들고,\n팀과 단번에 공유하세요.",
      image: "/modern-dashboard-interface-with-data-visualization.jpg",
    },
    {
      title: "데이터에서 인사이트까지",
      description: "원시 데이터를 실시간 분석으로\n즉시 활용 가능한 인사이트로 바꿉니다.",
      image: "/analytics-dashboard.png",
    },
    {
      title: "끊김 없는 협업",
      description: "팀과 실시간으로 협업하고\n인사이트를 바로 공유하세요.",
      image: "/team-collaboration-interface-with-shared-workspace.jpg",
    },
  ],
  en: [
    {
      title: "Plan your schedules",
      description: "Explore your data, build dashboards,\nand bring your team together.",
      image: "/modern-dashboard-interface-with-data-visualization.jpg",
    },
    {
      title: "Data to insights in minutes",
      description: "Transform raw data into actionable insights\nwith powerful analytics tools.",
      image: "/analytics-dashboard.png",
    },
    {
      title: "Collaborate seamlessly",
      description: "Work together in real time and\nshare what matters instantly.",
      image: "/team-collaboration-interface-with-shared-workspace.jpg",
    },
  ],
} as const

export default function DocumentationSection() {
  const { language } = useLanguage()
  const [activeCard, setActiveCard] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)

  const cards = useMemo(() => cardsByLanguage[language], [language])

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

          {/* Right Column - Image */}
          <div className="w-full md:w-auto rounded-lg flex flex-col justify-center items-center gap-2 order-1 md:order-2 md:px-0 px-[00]">
            <div className="w-full md:w-[580px] h-[250px] md:h-[420px] bg-white shadow-[0px_0px_0px_0.9056603908538818px_rgba(0,0,0,0.08)] overflow-hidden rounded-lg flex flex-col justify-start items-start">
              <div
                className={`w-full h-full transition-all duration-300 ${
                  activeCard === 0
                    ? "bg-gradient-to-br from-blue-50 to-blue-100"
                    : activeCard === 1
                      ? "bg-gradient-to-br from-purple-50 to-purple-100"
                      : "bg-gradient-to-br from-green-50 to-green-100"
                }`}
              />
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
