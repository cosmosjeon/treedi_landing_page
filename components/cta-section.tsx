"use client"

import { useMemo } from "react"

import { useLanguage } from "@/context/language-context"

const copy = {
  ko: {
    title: "질문이 쌓이기 전에,\n트리로 정리하세요.",
    description:
      "파생 질문을 가지치기 하듯 연결하고, 흐트러진 문맥을 한 번에 정리합니다.\n지금 Treedi에서 문맥 오염 없는 학습 흐름을 무료로 경험해 보세요.",
    cta: "무료로 시작하기",
  },
  en: {
    title: "Organize your questions into a tree\nbefore they start to pile up.",
        description:
          "Branch every follow-up with ease, and bring clarity back to your learning.\nTry Treedi for free—distraction-free and context-intact.",
    cta: "Start for free",
  },
} as const

export default function CTASection() {
  const { language } = useLanguage()
  const localizedCopy = useMemo(() => copy[language], [language])

  return (
    <div className="w-full relative overflow-hidden flex flex-col justify-center items-center gap-2">
      {/* Content */}
      <div className="self-stretch px-6 md:px-24 py-12 md:py-12 border-t border-b border-[rgba(55,50,47,0.12)] flex justify-center items-center gap-6 relative z-10">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="w-full h-full relative">
            {Array.from({ length: 300 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-4 w-full rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
                style={{
                  top: `${i * 16 - 120}px`,
                  left: "-100%",
                  width: "300%",
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-[800px] px-6 py-5 md:py-8 overflow-hidden rounded-lg flex flex-col justify-start items-center gap-6 relative z-20">
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch text-center flex justify-center flex-col text-[#49423D] text-3xl md:text-5xl font-semibold leading-tight md:leading-[56px] tracking-tight" style={{ fontFamily: language === 'en' ? 'Instrument Serif, serif' : 'inherit' }}>
              {localizedCopy.title.split("\n").map((line, index, arr) => (
                <span key={`${line}-${index}`}>
                  {line}
                  {index < arr.length - 1 ? <br /> : null}
                </span>
              ))}
            </div>
            <div className="w-full max-w-[1000px] text-center text-[#605A57] text-base leading-7 font-sans font-medium">
              {localizedCopy.description.split("\n").map((line, index, arr) => (
                <span key={`${line}-${index}`}>
                  {line}
                  {index < arr.length - 1 ? <br /> : null}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full max-w-[497px] flex flex-col justify-center items-center gap-12">
            <div className="flex justify-start items-center gap-4">
              <div className="h-10 px-12 py-[6px] relative bg-[#37322F] shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] overflow-hidden rounded-full flex justify-center items-center cursor-pointer hover:bg-[#2A2520] transition-colors">
                <div className="w-44 h-[41px] absolute left-0 top-0 bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
                <div className="flex flex-col justify-center text-white text-[13px] font-medium leading-5 font-sans">
                  {localizedCopy.cta}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
