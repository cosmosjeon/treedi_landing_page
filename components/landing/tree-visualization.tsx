"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

import { loadGsap } from "@/lib/load-gsap"
import type { GsapModule, ScrollTriggerInstance, ScrollTriggerModule, TimelineLike } from "@/lib/load-gsap"

type TreeNode = {
  name: string
  children?: TreeNode[]
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export function TreeVisualization() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const timelineRef = useRef<TimelineLike | null>(null)
  const progressRef = useRef(0)
  const isLockedRef = useRef(false)
  const animationDoneRef = useRef(false)
  const lockedScrollYRef = useRef(0)
  const bodyOverflowRef = useRef<string>("")
  const bodyTouchActionRef = useRef<string>("")
  const lastTouchYRef = useRef<number | null>(null)
  const resizeAttachedRef = useRef(false)
  const gsapRef = useRef<GsapModule | null>(null)
  const scrollTriggerRef = useRef<ScrollTriggerInstance | null>(null)
  const scrollTriggerLibRef = useRef<ScrollTriggerModule | null>(null)
  const skipNextLockRef = useRef(false)

  useEffect(() => {
    let isMounted = true

    const destroyTimeline = () => {
      timelineRef.current?.kill()
      timelineRef.current = null
    }

    const detachInteractions = () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      lastTouchYRef.current = null
    }

    const unlockScroll = () => {
      if (!isLockedRef.current) return
      isLockedRef.current = false
      document.body.style.overflow = bodyOverflowRef.current || ""
      document.body.style.touchAction = bodyTouchActionRef.current || ""
      detachInteractions()
      requestAnimationFrame(() => {
        scrollTriggerLibRef.current?.refresh?.()
      })
    }

    const updateProgress = (delta: number) => {
      if (!timelineRef.current) return
      const next = clamp(progressRef.current + delta, 0, 1)
      if (next === progressRef.current) return
      progressRef.current = next
      timelineRef.current.totalProgress(next)

      if (next === 1) {
        animationDoneRef.current = true
        unlockScroll()
        scrollTriggerRef.current?.disable?.()
      } else if (next === 0 && delta < 0) {
        skipNextLockRef.current = true
        unlockScroll()
      }
    }

    const resetToStart = () => {
      progressRef.current = 0
      timelineRef.current?.totalProgress(0)
      animationDoneRef.current = false
    }

    const handleWheel = (event: WheelEvent) => {
      if (!isLockedRef.current) return
      if (event.deltaY < 0 && progressRef.current <= 0.02) {
        resetToStart()
        skipNextLockRef.current = true
        unlockScroll()
        return
      }
      event.preventDefault()
      window.scrollTo({ top: lockedScrollYRef.current })
      updateProgress(event.deltaY * 0.00035)
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (!isLockedRef.current || event.touches.length === 0) return
      lastTouchYRef.current = event.touches[0].clientY
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (!isLockedRef.current || event.touches.length === 0) return
      const currentY = event.touches[0].clientY
      if (lastTouchYRef.current == null) {
        lastTouchYRef.current = currentY
        return
      }
      const delta = lastTouchYRef.current - currentY
      lastTouchYRef.current = currentY
      if (delta < 0 && progressRef.current <= 0.02) {
        resetToStart()
        lastTouchYRef.current = null
        skipNextLockRef.current = true
        unlockScroll()
        return
      }
      updateProgress(delta * 0.002)
      event.preventDefault()
      window.scrollTo({ top: lockedScrollYRef.current })
    }

    const attachInteractions = () => {
      lastTouchYRef.current = null
      window.addEventListener("wheel", handleWheel, { passive: false })
      window.addEventListener("touchstart", handleTouchStart, { passive: false })
      window.addEventListener("touchmove", handleTouchMove, { passive: false })
    }

    const lockScroll = () => {
      if (isLockedRef.current || animationDoneRef.current) return
      isLockedRef.current = true
      lockedScrollYRef.current = window.scrollY
      bodyOverflowRef.current = document.body.style.overflow
      bodyTouchActionRef.current = document.body.style.touchAction
      document.body.style.overflow = "hidden"
      document.body.style.touchAction = "none"
      attachInteractions()
      window.scrollTo({ top: lockedScrollYRef.current })
    }

    const setupVisualization = () => {
      destroyTimeline()
      const svgElement = svgRef.current
      const container = svgElement?.parentElement
      const gsap = gsapRef.current
      if (!container || !svgElement || !gsap) return

      const cw = container.clientWidth || 960
      const ch = Math.max(360, Math.round(cw * 0.4))

      const svg = d3.select(svgElement)
      svg.selectAll("*").remove()
      svg.attr("width", cw).attr("height", ch).attr("viewBox", `0 0 ${cw} ${ch}`)

      const paddingLeft = 120
      const paddingRight = 24
      const paddingTop = 24
      const paddingBottom = 24

      const innerWidth = cw - paddingLeft - paddingRight
      const innerHeight = ch - paddingTop - paddingBottom

      const g = svg.append("g").attr("transform", `translate(${paddingLeft}, ${paddingTop})`)

      const treeData: TreeNode = {
        name: "AI 학습 질문",
        children: [
          {
            name: "머신러닝",
            children: [
              {
                name: "지도학습",
                children: [
                  {
                    name: "분류 알고리즘",
                    children: [
                      { name: "의사결정나무" },
                      { name: "서포트 벡터 머신" },
                    ],
                  },
                  {
                    name: "회귀 분석",
                    children: [
                      { name: "선형 회귀" },
                      { name: "릿지 회귀" },
                      { name: "라쏘 회귀" },
                      { name: "다항 회귀" },
                    ],
                  },
                ],
              },
              {
                name: "비지도학습",
                children: [
                  {
                    name: "클러스터링",
                    children: [
                      { name: "K-Means" },
                      { name: "계층적 클러스터링" },
                      { name: "DBSCAN" },
                    ],
                  },
                ],
              },
              {
                name: "강화학습",
                children: [
                  {
                    name: "Q-Learning",
                    children: [
                      { name: "탐험-활용 균형" },
                      { name: "가치 함수" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }

      const tree = d3
        .tree<TreeNode>()
        .size([innerHeight, innerWidth])
        .separation((a, b) => (a.parent === b.parent ? 1 : 2) / Math.max(a.depth, 1))

      const root = d3.hierarchy<TreeNode>(treeData)
      tree(root)

      const nodesData = root
        .descendants()
        .sort((a, b) => a.depth - b.depth || a.x - b.x)
      const linksData = root
        .links()
        .sort((a, b) => a.target.depth - b.target.depth || a.target.x - b.target.x)

      const linksSelection = g
        .selectAll(".link")
        .data(linksData)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr(
          "d",
          d3
            .linkHorizontal<d3.HierarchyPointLink<TreeNode>, d3.HierarchyPointNode<TreeNode>>()
            .x((d) => d.y)
            .y((d) => d.x),
        )
        .style("fill", "none")
        .style("stroke", "#8B8B8B")
        .style("stroke-width", 1.5)

      const nodesSelection = g
        .selectAll(".node")
        .data(nodesData)
        .enter()
        .append("g")
        .attr("class", "node")
        .style("opacity", 0)

      nodesSelection
        .append("circle")
        .attr("r", 5)
        .style("fill", "#666666")
        .style("stroke", "none")

      nodesSelection
        .append("text")
        .attr("dx", -10)
        .attr("dy", 3)
        .attr("text-anchor", "end")
        .style("font-family", "Spoqa Han Sans Neo, sans-serif")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("fill", "#000000")
        .text((d) => d.data.name)

      const nodeElements = nodesSelection.nodes() as SVGGElement[]
      const linkElements = linksSelection.nodes() as SVGPathElement[]

      nodesData.forEach((nodeDatum, index) => {
        const nodeEl = nodeElements[index]
        nodeEl.setAttribute("transform", `translate(${nodeDatum.y - 60},${nodeDatum.x}) scale(0.8)`)
        gsap.set(nodeEl, { opacity: 0 })
        if (index === 0) return
        const linkEl = linkElements[index - 1]
        const length = linkEl.getTotalLength()
        gsap.set(linkEl, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0,
        })
      })

      const timeline = gsap.timeline({ paused: true, defaults: { ease: "none" } })
      const targetTransforms: string[] = nodesData.map((nodeDatum) => `translate(${nodeDatum.y},${nodeDatum.x}) scale(1)`)

      const levels: Array<{ nodeIndices: number[]; linkElements: SVGPathElement[] }> = []
      nodesData.forEach((nodeDatum, index) => {
        const depth = nodeDatum.depth
        if (!levels[depth]) {
          levels[depth] = { nodeIndices: [], linkElements: [] }
        }
        levels[depth].nodeIndices.push(index)
        if (depth > 0) {
          levels[depth].linkElements.push(linkElements[index - 1])
        }
      })

      levels.forEach((level) => {
        const start = timeline.duration()

        level.linkElements.forEach((linkEl) => {
          timeline.to(linkEl, { strokeDashoffset: 0, opacity: 1, duration: 0.6 }, start)
        })

        level.nodeIndices.forEach((nodeIndex) => {
          timeline.to(
            nodeElements[nodeIndex],
            {
              opacity: 1,
              duration: 0.25,
            },
            start,
          )

          timeline.to(
            nodeElements[nodeIndex],
            {
              attr: { transform: targetTransforms[nodeIndex] },
              duration: 0.6,
            },
            start + 0.25,
          )
        })
      })

      timelineRef.current = timeline
      const initialProgress = animationDoneRef.current ? 1 : clamp(progressRef.current, 0, 1)
      progressRef.current = initialProgress
      timeline.totalProgress(initialProgress)
    }

    const init = async () => {
      try {
        const { gsap, ScrollTrigger } = await loadGsap()
        if (!isMounted) return
        gsapRef.current = gsap
        scrollTriggerLibRef.current = ScrollTrigger
        gsap.registerPlugin(ScrollTrigger)

        if (!wrapperRef.current || !svgRef.current) return

        setupVisualization()
        ScrollTrigger.refresh()

        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: "center center",
          end: "center center",
          onEnter: () => {
            if (skipNextLockRef.current) {
              skipNextLockRef.current = false
              return
            }
            if (!animationDoneRef.current) lockScroll()
          },
          onEnterBack: () => {
            if (skipNextLockRef.current) {
              skipNextLockRef.current = false
              return
            }
            if (!animationDoneRef.current) {
              lockScroll()
            } else {
              progressRef.current = 1
              timelineRef.current?.totalProgress(1)
            }
          },
          onLeaveBack: () => {
            if (!animationDoneRef.current) {
              progressRef.current = 0
              timelineRef.current?.totalProgress(0)
            }
            skipNextLockRef.current = false
            unlockScroll()
          },
        })
        ScrollTrigger.refresh()

        if (!resizeAttachedRef.current) {
          window.addEventListener("resize", setupVisualization)
          resizeAttachedRef.current = true
        }
      } catch (error) {
        console.error("Failed to initialise GSAP tree animation", error)
      }
    }

    init()

    return () => {
      isMounted = false
      unlockScroll()
      destroyTimeline()
      scrollTriggerRef.current?.kill?.()
      scrollTriggerRef.current = null
      if (resizeAttachedRef.current) {
        window.removeEventListener("resize", setupVisualization)
        resizeAttachedRef.current = false
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={wrapperRef} className="relative w-full max-w-[960px] h-[500px]">
      <svg ref={svgRef} className="w-full h-full" style={{ background: "transparent" }} />
    </div>
  )
}
