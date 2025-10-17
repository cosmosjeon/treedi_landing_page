"use client"

import { useMemo, useState } from "react"

import { useLanguage } from "@/context/language-context"

interface FAQItem {
  question: string
  answer: string
}

const faqCopy = {
  ko: {
    heading: "자주 묻는 질문",
    description: "Treedi에 대해 자주 받는 질문과 답변을 한 곳에 모았습니다.",
    items: [
      {
        question: "Treedi는 무엇이며, 누가 사용하면 좋나요?",
        answer:
          "Treedi는 질문을 트리 구조로 정리해 문맥이 꼬이지 않도록 돕는 학습 도구입니다. 스스로 공부하는 학습자, 팀 내 지식 공유가 필요한 분들께 특히 유용합니다.",
      },
      {
        question: "트리 기반 문맥 관리가 어떻게 동작하나요?",
        answer:
          "하나의 질문에서 파생되는 하위 질문들을 가지치기 하듯 연결해 저장합니다. 덕분에 관련 질문 간의 맥락을 잃지 않고, 필요한 흐름으로 쉽게 돌아갈 수 있습니다.",
      },
      {
        question: "외부 도구와 연동할 수 있나요?",
        answer:
          "예. Treedi는 API와 웹훅을 통해 기존 노트/문서 도구, 이슈 트래커 등과 연동할 수 있도록 확장성을 제공합니다.",
      },
      {
        question: "어떤 지원을 제공하나요?",
        answer:
          "베타 기간 동안 이메일 지원과 간단한 온보딩 가이드를 제공합니다. 피드백 채널을 통해 기능 제안과 문제 제보도 환영합니다.",
      },
      {
        question: "내 데이터는 안전한가요?",
        answer:
          "데이터 전송 구간 암호화와 기본 보안 수칙을 준수합니다. 추후 정식 출시 시 강화된 보안·감사 체계를 도입할 예정입니다.",
      },
      {
        question: "어떻게 시작하나요?",
        answer:
          "회원가입 후 바로 사용하실 수 있습니다. 데모 템플릿으로 트리 작성을 시작하고, 사용 중 불편한 점은 바로 피드백 남겨주세요.",
      },
    ] as FAQItem[],
  },
  en: {
    heading: "Frequently Asked Questions",
    description: "Everything you need to know about Treedi, gathered in one place.",
    items: [
      {
        question: "What is Treedi and who should use it?",
        answer:
          "Treedi keeps conversations tidy by arranging questions into a branching tree. Self-learners and teams that share knowledge benefit the most.",
      },
      {
        question: "How does tree-based context management work?",
        answer:
          "Every follow-up question is captured as a branch under the original prompt. You never lose context and can always trace the path back with ease.",
      },
      {
        question: "Can I connect Treedi with external tools?",
        answer:
          "Yes. Treedi exposes APIs and webhooks so you can link it with your notes, documentation platforms, or issue trackers.",
      },
      {
        question: "What kind of support do you provide?",
        answer:
          "During beta we offer email support and a short onboarding guide. We also welcome feature ideas and bug reports through our feedback channel.",
      },
      {
        question: "Is my data safe?",
        answer:
          "We encrypt data in transit and follow essential security practices. A fully audited security program will launch together with our paid plans.",
      },
      {
        question: "How do I get started?",
        answer:
          "Sign up and start right away. Use the demo templates to draft your first trees and send us feedback whenever something feels off.",
      },
    ] as FAQItem[],
  },
} as const

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FAQSection() {
  const { language } = useLanguage()
  const { heading, description, items } = useMemo(() => faqCopy[language], [language])
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="w-full flex justify-center items-start">
      <div className="flex-1 px-4 md:px-12 py-16 md:py-20 flex flex-col lg:flex-row justify-start items-start gap-6 lg:gap-12">
        {/* Left Column - Header */}
        <div className="w-full lg:flex-1 flex flex-col justify-center items-start gap-4 lg:py-5">
          <div className="w-full flex flex-col justify-center text-[#49423D] font-semibold leading-tight md:leading-[44px] font-sans text-4xl tracking-tight">
            {heading}
          </div>
          <div className="w-full text-[#605A57] text-base font-normal leading-7 font-sans">
            {description}
          </div>
        </div>

        {/* Right Column - FAQ Items */}
        <div className="w-full lg:flex-1 flex flex-col justify-center items-center">
          <div className="w-full flex flex-col">
            {items.map((item, index) => {
              const isOpen = openItems.includes(index)

              return (
                <div key={index} className="w-full border-b border-[rgba(73,66,61,0.16)] overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-5 py-[18px] flex justify-between items-center gap-5 text-left hover:bg-[rgba(73,66,61,0.02)] transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1 text-[#49423D] text-base font-medium leading-6 font-sans">
                      {item.question}
                    </div>
                    <div className="flex justify-center items-center">
                      <ChevronDownIcon
                        className={`w-6 h-6 text-[rgba(73,66,61,0.60)] transition-transform duration-300 ease-in-out ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-[18px] text-[#605A57] text-sm font-normal leading-6 font-sans">
                      {item.answer}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
