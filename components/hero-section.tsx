import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative pt-[216px] pb-16">
      <div className="max-w-[1060px] mx-auto px-4">
        <div className="flex flex-col items-center gap-12">
          {/* Hero Content */}
          <div className="max-w-[937px] flex flex-col items-center gap-3">
            <div className="flex flex-col items-center gap-6">
              <h1 className="max-w-[748px] text-center text-[#37322f] text-3xl md:text-[48px] font-bold leading-tight md:leading-[58px] lg:leading-[1.15] font-sans">
                질문이 많아질수록 꼬이는 AI 문맥,<br />이젠 Treedi로 관리하세요.
              </h1>
              <p className="max-w-[506px] text-center text-[#37322f]/80 text-lg font-medium leading-7">
                GPT로 공부하면, 한 질문이 다섯 개의 새 개념을 낳습니다.
                <br />
                다시 물을수록 문맥은 흐트러지죠.
                <br />
                Treedi는 질문을 트리로 정리해 문맥이 꼬이지 않는 학습을 돕습니다.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button className="h-10 px-12 bg-[#37322f] hover:bg-[#37322f]/90 text-white rounded-full font-medium text-sm shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset]">
              무료로 시작하기
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
