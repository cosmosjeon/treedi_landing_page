"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"

import { TreeVisualization } from "@/components/landing/tree-visualization"
import ScrollFloat from "@/components/scroll-float"
import { useLanguage } from "@/context/language-context"

const featureCopy = {
  ko: [
    {
      title: "일정을 계획하세요",
      description: "구독과 결제를 자동화해 고객 관리를 간편하게 만듭니다.",
    },
    {
      title: "데이터를 인사이트로",
      description: "실시간 분석으로 중요한 비즈니스 지표를 빠르게 파악하세요.",
    },
    {
      title: "팀 협업을 매끄럽게",
      description: "공유 대시보드와 협업 워크플로로 팀의 발걸음을 맞춥니다.",
    },
  ],
  en: [
    {
      title: "Plan your schedules",
      description: "Streamline subscriptions and billing with automated scheduling tools.",
    },
    {
      title: "Analytics & insights",
      description: "Turn business data into actionable insights with real-time analytics.",
    },
    {
      title: "Collaborate seamlessly",
      description: "Keep teams aligned through shared dashboards and collaborative workflows.",
    },
  ],
} as const

const copy = {
  ko: {
    headline: "질문이 많아질수록 꼬이는 AI 문맥,\n이젠 Treedi로 관리하세요.",
    subheading:
      "GPT로 공부하면, 한 질문이 다섯 개의 새 질문들을 낳습니다.\n다시 물을수록 문맥은 흐트러지죠.\nTreedi는 질문을 트리로 정리해 문맥이 꼬이지 않는 학습을 돕습니다.",
    ctaPrimary: "무료로 시작하기",
    arrow: {
      first: "1개의 질문",
      second: "5개의 더 모르는 개념",
      third: "다 질문하다보니 문맥이 다 꼬여...",
    },
    floatingLine1: "Treedi 에선 문맥의 오염 없이\n다양한 갈래로 질문할 수 있습니다.",
    floatingLine2: "1개의 질문에서 생겨난 5개의 질문을 즉석에서 해결하세요.",
    secondaryVideoCta: "무료로 시작하기",
  },
  en: {
    headline: "The more you ask AI,\nthe more tangled your context becomes.\nKeep it clear with Treedi",
    subheading:
      "One question leads to five more and the context quickly slips away.\nTreedi connects every question into a single,\nclear tree so your context always stays intact.",
    ctaPrimary: "Start for free",
    arrow: {
      first: "One question",
      second: "Five new unknown concepts",
      third: "Context ends up completely tangled...",
    },
    floatingLine1: "With Treedi, you can explore every follow-up\nwithout losing the context.",
    floatingLine2: "Resolve five follow-up questions from a single prompt — all in one place.",
    secondaryVideoCta: "Start for free",
  },
} as const

export function LandingHero() {
  const { language } = useLanguage()
  const features = useMemo(() => featureCopy[language], [language])
  const localizedCopy = useMemo(() => copy[language], [language])
  const headlineLines = useMemo(() => localizedCopy.headline.split("\n"), [localizedCopy.headline])
  const subheadingLines = useMemo(() => localizedCopy.subheading.split("\n"), [localizedCopy.subheading])
  const [activeCard, setActiveCard] = useState(0)
  const mountedRef = useRef(true)
  const arrowSectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: arrowScrollProgress } = useScroll({
    target: arrowSectionRef,
    offset: ["start end", "end start"],
  })

  const opacity1 = useTransform(arrowScrollProgress, [0, 0.2, 0.4], [0, 1, 1])
  const y1 = useTransform(arrowScrollProgress, [0, 0.2], [50, 0])
  const opacity2 = useTransform(arrowScrollProgress, [0.2, 0.4, 0.6], [0, 1, 1])
  const y2 = useTransform(arrowScrollProgress, [0.2, 0.4], [50, 0])
  const opacity3 = useTransform(arrowScrollProgress, [0.4, 0.6, 0.8], [0, 1, 1])
  const y3 = useTransform(arrowScrollProgress, [0.4, 0.6], [50, 0])

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      if (!mountedRef.current) return
      setActiveCard((current) => (current + 1) % features.length)
    }, 5000)

    return () => {
      clearInterval(rotationInterval)
      mountedRef.current = false
    }
  }, [features.length])

  useEffect(() => {
    setActiveCard(0)
  }, [features])

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  return (
    <>
      <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-[216px] pb-8 sm:pb-12 md:pb-16 flex flex-col justify-start items-center px-2 sm:px-4 md:px-8 lg:px-0 w-full">
        <div className="w-full max-w-[937px] flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          <div className="self-stretch rounded-[3px] flex flex-col justify-center items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            <div className={`w-full max-w-[748.71px] text-center flex justify-center flex-col text-[#37322F] font-bold px-2 sm:px-4 md:px-0 ${language === 'en' ? 'text-[20px] xs:text-[24px] sm:text-[28px] md:text-[36px] lg:text-[52px] leading-[1.1] sm:leading-[1.15] md:leading-[1.2] lg:leading-[1.15]' : 'text-[18px] xs:text-[20px] sm:text-[24px] md:text-[32px] lg:text-[48px] leading-[1.1] sm:leading-[1.15] md:leading-[1.2] lg:leading-[1.15]'}`} style={{ fontFamily: language === 'en' ? 'Instrument Serif, serif' : 'inherit' }}>
              {headlineLines.map((line, index) => (
                <span key={`${line}-${index}`}>
                  {line}
                  {index < headlineLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </div>
            <div className="w-full max-w-[700px] text-center flex justify-center flex-col text-[rgba(55,50,47,0.80)] sm:text-lg md:text-xl leading-[1.4] sm:leading-[1.45] md:leading-[1.5] lg:leading-7 font-sans px-2 sm:px-4 md:px-0 lg:text-lg font-medium text-sm">
              {subheadingLines.map((line, index) => (
                <span key={`${line}-${index}`}>
                  {line}
                  {index < subheadingLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-[497px] flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 relative z-10 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
          <div className="backdrop-blur-[8.25px] flex justify-start items-center gap-4">
            <a href="#" className="inline-block">
              <div className="h-10 sm:h-11 md:h-12 px-6 sm:px-8 md:px-10 lg:px-12 py-2 sm:py-[6px] relative bg-[#37322F] shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] overflow-hidden rounded-full flex justify-center items-center">
                <div className="w-20 sm:w-24 md:w-28 lg:w-44 h-[41px] absolute left-0 top-[-0.5px] bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply" />
                <div className="flex flex-col justify-center text-white text-sm sm:text-base md:text-[15px] font-medium leading-5 font-sans">
                  {localizedCopy.ctaPrimary}
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="absolute top-[232px] sm:top-[248px] md:top-[264px] lg:top-[320px] left-1/2 -translate-x-1/2 z-0 pointer-events-none">
          <img
            src="/mask-group-pattern.svg"
            alt=""
            className="w-[936px] sm:w-[1404px] md:w-[2106px] lg:w-[2808px] h-auto opacity-30 sm:opacity-40 md:opacity-50 mix-blend-multiply"
            style={{ filter: "hue-rotate(15deg) saturate(0.7) brightness(1.2)" }}
          />
        </div>

        <div className="w-full max-w-[720px] pt-2 sm:pt-4 pb-6 sm:pb-8 md:pb-10 px-2 sm:px-4 md:px-6 lg:px-11 flex flex-col justify-center items-center gap-2 relative z-5 my-8 sm:my-12 md:my-16 lg:my-16 mb-0 lg:pb-0">
          <div className="w-full max-w-[720px] aspect-video bg-white shadow-[0px_0px_0px_0.9056603908538818px_rgba(0,0,0,0.08)] overflow-hidden rounded-[6px] sm:rounded-[8px] lg:rounded-[9.06px] flex flex-col justify-start items-start">
            <div className="self-stretch flex-1 flex justify-start items-start">
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full overflow-hidden">
                  <div
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${activeCard === 0 ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-sm"}`}
                  >
                    <video
                      src="/videos/landing-1.mov"
                      className="w-full h-full object-contain"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>

                  <div
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${activeCard === 1 ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-sm"}`}
                  >
                    <img src="/analytics-dashboard-with-charts-graphs-and-data-vi.jpg" alt="Analytics Dashboard" className="w-full h-full object-cover" />
                  </div>

                  <div
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${activeCard === 2 ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-sm"}`}
                  >
                    <img
                      src="/data-visualization-dashboard-with-interactive-char.jpg"
                      alt="Data Visualization Dashboard"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={arrowSectionRef} className="w-full flex flex-col items-center gap-4 my-8 sm:my-12 md:my-16">
          <motion.div
            style={{ opacity: opacity1, y: y1, fontFamily: language === 'en' ? 'Instrument Serif, serif' : 'inherit' }}
            className="text-center text-[#37322F] text-[16px] xs:text-[18px] sm:text-[20px] md:text-[28px] lg:text-[40px] font-bold leading-[1.1] sm:leading-[1.15] md:leading-[1.2] lg:leading-[1.15]"
          >
            {localizedCopy.arrow.first}
          </motion.div>
          <motion.div style={{ opacity: opacity1, y: y1 }} className="flex flex-col items-center gap-2">
            <ArrowIcon />
          </motion.div>
          <motion.div
            style={{ opacity: opacity2, y: y2, fontFamily: language === 'en' ? 'Instrument Serif, serif' : 'inherit' }}
            className="text-center text-[#37322F] text-[16px] xs:text-[18px] sm:text-[20px] md:text-[28px] lg:text-[40px] font-bold leading-[1.1] sm:leading-[1.15] md:leading-[1.2] lg:leading-[1.15]"
          >
            {localizedCopy.arrow.second}
          </motion.div>
          <motion.div style={{ opacity: opacity2, y: y2 }} className="flex flex-col items-center gap-2">
            <ArrowIcon />
          </motion.div>
          <motion.div
            style={{ opacity: opacity3, y: y3, fontFamily: language === 'en' ? 'Instrument Serif, serif' : 'inherit' }}
            className="text-center text-[#37322F] text-[16px] xs:text-[18px] sm:text-[20px] md:text-[28px] lg:text-[40px] font-bold leading-[1.1] sm:leading-[1.15] md:leading-[1.2] lg:leading-[1.15]"
          >
            {localizedCopy.arrow.third}
          </motion.div>
        </div>

        <div className="w-full my-8 sm:my-12 md:my-16 lg:my-16 flex items-center justify-center">
          <TreeVisualization />
        </div>

        {/* 안내 문구: 트리 시각화와 두 번째 영상 사이 */}
        <div className="w-full my-8 sm:my-12 md:my-16 flex flex-col items-center justify-center text-center gap-2 px-4 sm:px-6 md:px-8">
          <ScrollFloat
            animationDuration={2.5}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.025}
            containerClassName=""
            textClassName="text-[#37322F] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight"
            style={{ fontFamily: language === 'en' ? 'Instrument Serif, serif' : 'inherit' }}
          >
            {localizedCopy.floatingLine1}
          </ScrollFloat>
          <ScrollFloat
            animationDuration={2.5}
            ease="back.inOut(2)"
            scrollStart="center bottom+=30%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.02}
            containerClassName="my-2"
            textClassName="text-[rgba(73,66,61,0.90)] text-sm sm:text-base md:text-lg leading-relaxed"
          >
            {localizedCopy.floatingLine2}
          </ScrollFloat>
        </div>

        {/* 기존 히어로 영상 블록을 아래에 한 번 더 렌더 */}
        <div className="w-full max-w-[720px] pt-2 sm:pt-4 pb-6 sm:pb-8 md:pb-10 px-2 sm:px-4 md:px-6 lg:px-11 flex flex-col justify-center items-center gap-2 relative z-5 my-8 sm:my-12 md:my-16 lg:my-16 mb-0 lg:pb-0">
          <div className="w-full max-w-[720px] aspect-video bg-white shadow-[0px_0px_0px_0.9056603908538818px_rgba(0,0,0,0.08)] overflow-hidden rounded-[6px] sm:rounded-[8px] lg:rounded-[9.06px] flex flex-col justify-start items-start">
            <div className="self-stretch flex-1 flex justify-start items-start">
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full overflow-hidden">
                  <div className="absolute inset-0 opacity-100 scale-100">
                    <video src="/videos/landing-1.mov" className="w-full h-full object-contain" autoPlay loop muted playsInline />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </>
  )
}

function ArrowIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70">
      <defs>
        <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#37322F" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#37322F" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path 
        d="M12 4L12 20M12 20L7 15M12 20L17 15" 
        stroke="url(#arrowGradient)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="12" cy="12" r="1" fill="#37322F" opacity="0.3" />
    </svg>
  )
}
