import { Badge } from "@/components/landing/badge"
import { DecorativeRail } from "@/components/landing/decorative-rail"
import SmartSimpleBrilliant from "@/components/smart-simple-brilliant"
import YourWorkInSync from "@/components/your-work-in-sync"
import EffortlessIntegration from "@/components/effortless-integration-updated"
import NumbersThatSpeak from "@/components/numbers-that-speak"

export function BentoGridSection() {
  return (
    <section className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center">
      <div className="self-stretch px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] lg:w-[1060px] py-8 sm:py-12 md:py-16 border-b border-[rgba(55,50,47,0.12)] flex justify-center items-center gap-6">
        <div className="w-full max-w-[616px] px-4 sm:px-6 py-4 sm:py-5 shadow-[0px_2px_4px_rgba(50,45,43,0.06)] overflow-hidden rounded-lg flex flex-col justify-start items-center gap-3 sm:gap-4 shadow-none">
          <Badge
            icon={
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
                <rect x="7" y="1" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
                <rect x="1" y="7" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
                <rect x="7" y="7" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
              </svg>
            }
            text="Bento grid"
          />
          <div className="w-full max-w-[598.06px] text-center flex justify-center flex-col text-[#49423D] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            Built for absolute clarity and focused work
          </div>
          <p className="self-stretch text-center text-[#605A57] text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
            Stay focused with tools that organize, connect
            <br />
            and turn information into confident decisions.
          </p>
        </div>
      </div>

      <div className="self-stretch flex justify-center items-start">
        <DecorativeRail count={200} />

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-0 border-l border-r border-[rgba(55,50,47,0.12)]">
          <div className="border-b border-r-0 md:border-r border-[rgba(55,50,47,0.12)] p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-[#37322F] text-lg sm:text-xl font-semibold leading-tight font-sans">Smart. Simple. Brilliant.</h3>
              <p className="text-[#605A57] text-sm md:text-base font-normal leading-relaxed font-sans">
                Your data is beautifully organized so you see everything clearly without the clutter.
              </p>
            </div>
            <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg flex items-center justify-center overflow-hidden">
              <SmartSimpleBrilliant width="100%" height="100%" theme="light" className="scale-50 sm:scale-65 md:scale-75 lg:scale-90" />
            </div>
          </div>

          <div className="border-b border-[rgba(55,50,47,0.12)] p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-[#37322F] font-semibold leading-tight font-sans text-lg sm:text-xl">Your work, in sync</h3>
              <p className="text-[#605A57] text-sm md:text-base font-normal leading-relaxed font-sans">
                Every update flows instantly across your team and keeps collaboration effortless and fast.
              </p>
            </div>
            <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg flex items-center justify-center overflow-hidden">
              <YourWorkInSync width="100%" height="100%" theme="light" className="scale-95 sm:scale-100 md:scale-100 lg:scale-100" />
            </div>
          </div>

          <div className="border-t md:border-t-0 border-b md:border-b-0 border-[rgba(55,50,47,0.12)] p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-[#37322F] text-lg sm:text-xl font-semibold leading-tight font-sans">Effortless integration</h3>
              <p className="text-[#605A57] text-sm md:text-base font-normal leading-relaxed font-sans">
                Connect to your existing systems with zero friction and enjoy a consistent workflow.
              </p>
            </div>
            <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg flex items-center justify-center overflow-hidden relative">
              <div className="w-full h-full rounded-lg bg-[#F2EEEB] flex items-center justify-center">
                <EffortlessIntegration width={400} height={250} className="max-w-full max-h-full" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#F7F5F3] to-transparent pointer-events-none" />
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-[#37322F] text-lg sm:text-xl font-semibold leading-tight font-sans">Numbers that speak</h3>
              <p className="text-[#605A57] text-sm md:text-base font-normal leading-relaxed font-sans">
                Track growth with precision and turn raw data into confident decisions you can trust.
              </p>
            </div>
            <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg flex overflow-hidden items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <NumbersThatSpeak width="100%" height="100%" theme="light" className="w-full h-full object-contain" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#F7F5F3] to-transparent pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center opacity-20 hidden">
                <div className="flex flex-col items-center gap-2 p-4">
                  <div className="w-3/4 h-full bg-green-500 rounded-full" />
                </div>
                <div className="text-sm text-green-600">Growth Rate</div>
              </div>
            </div>
          </div>
        </div>

        <DecorativeRail count={200} />
      </div>
    </section>
  )
}

