"use client"

import React, { useEffect, useMemo, useRef, type ReactNode, type RefObject } from "react"
import { loadGsap } from "@/lib/load-gsap"

interface ScrollFloatProps {
  children: ReactNode
  scrollContainerRef?: RefObject<HTMLElement>
  containerClassName?: string
  textClassName?: string
  animationDuration?: number
  ease?: string
  scrollStart?: string
  scrollEnd?: string
  stagger?: number
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null)

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : ""
    return text.split("").map((char, index) => {
      if (char === "\n") {
        return <br key={`br-${index}`} />
      }
      return (
        <span className="inline-block word" key={index}>
          {char === " " ? "\u00A0" : char}
        </span>
      )
    })
  }, [children])

  useEffect(() => {
    let isMounted = true

    const init = async () => {
      try {
        const { gsap, ScrollTrigger } = await loadGsap()
        if (!isMounted) return
        gsap.registerPlugin(ScrollTrigger)

        const el = containerRef.current
        if (!el) return

        const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window
        const charElements = el.querySelectorAll(".inline-block")

        gsap.fromTo(
          charElements,
          {
            willChange: "opacity, transform",
            opacity: 0,
            yPercent: 120,
            scaleY: 2.3,
            scaleX: 0.7,
            transformOrigin: "50% 0%",
          },
          {
            duration: animationDuration,
            ease: ease,
            opacity: 1,
            yPercent: 0,
            scaleY: 1,
            scaleX: 1,
            stagger: stagger,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: scrollStart,
              end: scrollEnd,
              scrub: true,
            },
          },
        )
      } catch (_) {
        // fail silently if GSAP fails to load
      }
    }

    init()
    return () => {
      isMounted = false
    }
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger])

  return (
    <h2 ref={containerRef} className={`my-5 overflow-hidden ${containerClassName}`}>
      <span className={`inline-block leading-[1.5] ${textClassName}`}>{splitText}</span>
    </h2>
  )
}

export default ScrollFloat


