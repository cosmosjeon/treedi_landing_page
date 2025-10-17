import { Badge } from "@/components/landing/badge"
import { DecorativeRail } from "@/components/landing/decorative-rail"

export function SocialProofSection() {
  return (
    <section className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center">
      <div className="self-stretch px-4 sm:px-6 md:px-24 py-8 sm:py-12 md:py-16 border-b border-[rgba(55,50,47,0.12)] flex justify-center items-center gap-6">
        <div className="w-full max-w-[586px] px-4 sm:px-6 py-4 sm:py-5 shadow-[0px_2px_4px_rgba(50,45,43,0.06)] overflow-hidden rounded-lg flex flex-col justify-start items-center gap-3 sm:gap-4 shadow-none">
          <Badge
            icon={
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="3" width="4" height="6" stroke="#37322F" strokeWidth="1" fill="none" />
                <rect x="7" y="1" width="4" height="8" stroke="#37322F" strokeWidth="1" fill="none" />
                <rect x="2" y="4" width="1" height="1" fill="#37322F" />
                <rect x="3.5" y="4" width="1" height="1" fill="#37322F" />
                <rect x="2" y="5.5" width="1" height="1" fill="#37322F" />
                <rect x="3.5" y="5.5" width="1" height="1" fill="#37322F" />
                <rect x="8" y="2" width="1" height="1" fill="#37322F" />
                <rect x="9.5" y="2" width="1" height="1" fill="#37322F" />
                <rect x="8" y="3.5" width="1" height="1" fill="#37322F" />
                <rect x="9.5" y="3.5" width="1" height="1" fill="#37322F" />
                <rect x="8" y="5" width="1" height="1" fill="#37322F" />
                <rect x="9.5" y="5" width="1" height="1" fill="#37322F" />
              </svg>
            }
            text="Social Proof"
          />
          <div className="w-full max-w-[472.55px] text-center flex justify-center flex-col text-[#49423D] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            Confidence backed by results
          </div>
          <p className="self-stretch text-center text-[#605A57] text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
            Our customers achieve more each day
            <br className="hidden sm:block" />
            because their tools are simple, powerful, and clear.
          </p>
        </div>
      </div>

      <div className="self-stretch border-[rgba(55,50,47,0.12)] flex justify-center items-start border-t border-b-0">
        <DecorativeRail count={50} />

        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-0 border-l border-r border-[rgba(55,50,47,0.12)]">
          {Array.from({ length: 8 }).map((_, index) => {
            const isMobileFirstColumn = index % 2 === 0
            const isDesktopFirstColumn = index % 4 === 0
            const isDesktopLastColumn = index % 4 === 3
            const isDesktopTopRow = index < 4
            const isDesktopBottomRow = index >= 4

            return (
              <div
                key={index}
                className={`
                  h-24 xs:h-28 sm:h-32 md:h-36 lg:h-40 flex justify-center items-center gap-1 xs:gap-2 sm:gap-3
                  border-b border-[rgba(227,226,225,0.5)]
                  ${index < 6 ? "sm:border-b-[0.5px]" : "sm:border-b"}
                  ${index >= 6 ? "border-b" : ""}
                  ${isMobileFirstColumn ? "border-r-[0.5px]" : ""}
                  sm:border-r-[0.5px] sm:border-l-0
                  ${isDesktopFirstColumn ? "md:border-l" : "md:border-l-[0.5px]"}
                  ${isDesktopLastColumn ? "md:border-r" : "md:border-r-[0.5px]"}
                  ${isDesktopTopRow ? "md:border-b-[0.5px]" : ""}
                  ${isDesktopBottomRow ? "md:border-t-[0.5px] md:border-b" : ""}
                  border-[#E3E2E1]
                `}
              >
                <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 relative shadow-[0px_-4px_8px_rgba(255,255,255,0.64)_inset] overflow-hidden rounded-full">
                  <img src="/horizon-icon.svg" alt="Horizon" className="w-full h-full object-contain" />
                </div>
                <div className="text-center flex justify-center flex-col text-[#37322F] text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-tight md:leading-9 font-sans">
                  Acute
                </div>
              </div>
            )
          })}
        </div>

        <DecorativeRail count={50} />
      </div>
    </section>
  )
}

