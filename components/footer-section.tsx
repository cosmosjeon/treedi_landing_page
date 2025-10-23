'use client'

import { useMemo } from "react"

import { useLanguage } from "@/context/language-context"
import { Logo } from "@/components/landing/logo"

type FooterColumn = {
  title: string
  links: string[]
}

const copy = {
  ko: {
    tagline: "코딩을 더 쉽게",
    columns: [
      {
        title: "제품",
        links: ["주요 기능", "요금제"],
      },
      {
        title: "회사",
        links: ["소개", "팀", "문의"],
      },
      {
        title: "자료",
        links: ["이용 약관", "문서"],
      },
    ] satisfies FooterColumn[],
  },
  en: {
    tagline: "Coding made effortless",
    columns: [
      {
        title: "Product",
        links: ["Features", "Pricing"],
      },
      {
        title: "Company",
        links: ["About us", "Our team", "Contact"],
      },
      {
        title: "Resources",
        links: ["Terms of use", "Documentation"],
      },
    ] satisfies FooterColumn[],
  },
} as const

export default function FooterSection() {
  const { language } = useLanguage()
  const { tagline, columns } = useMemo(() => copy[language], [language])
  return (
    <div className="w-full pt-10 flex flex-col justify-start items-start">
      {/* Main Footer Content */}
      <div className="self-stretch h-auto flex flex-col md:flex-row justify-between items-stretch pr-0 pb-8 pt-0">
        <div className="h-auto p-4 md:p-8 flex flex-col justify-start items-start gap-8">
          {/* Brand Section */}
          <div className="self-stretch flex justify-start items-center gap-3">
            <Logo width={120} height={120} className="text-[#49423D]" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="self-stretch p-4 md:p-8 flex flex-col sm:flex-row flex-wrap justify-start sm:justify-between items-start gap-6 md:gap-8">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col justify-start items-start gap-3 flex-1 min-w-[120px]">
              <div className="self-stretch text-[rgba(73,66,61,0.50)] text-sm font-medium leading-5 font-sans">{column.title}</div>
              <div className="flex flex-col justify-start items-start gap-2">
                {column.links.map((link) => (
                  <div
                    key={link}
                    className="text-[#49423D] text-sm font-normal leading-5 font-sans cursor-pointer hover:text-[#37322F] transition-colors"
                  >
                    {link}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section with Pattern */}
      <div className="self-stretch h-12 relative overflow-hidden border-t border-b border-[rgba(55,50,47,0.12)]">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="w-full h-full relative">
            {Array.from({ length: 400 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-[300px] h-16 border border-[rgba(3,7,18,0.08)]"
                style={{
                  left: `${i * 300 - 600}px`,
                  top: "-120px",
                  transform: "rotate(-45deg)",
                  transformOrigin: "top left",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
