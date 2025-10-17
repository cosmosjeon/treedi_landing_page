"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

type TreeNode = {
  name: string
  children?: TreeNode[]
}

export function TreeVisualization() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

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

    const svg = d3.select(svgRef.current)
    const container = svgRef.current.parentElement

    const render = () => {
      if (!container) return
      const cw = container.clientWidth || 960
      const ch = Math.max(360, Math.round(cw * 0.4))

      svg.selectAll("*").remove()
      svg.attr("width", cw).attr("height", ch).attr("viewBox", `0 0 ${cw} ${ch}`)

      const paddingLeft = 120
      const paddingRight = 24
      const paddingTop = 24
      const paddingBottom = 24

      const innerWidth = cw - paddingLeft - paddingRight
      const innerHeight = ch - paddingTop - paddingBottom

      const g = svg.append("g").attr("transform", `translate(${paddingLeft}, ${paddingTop})`)

      const tree = d3
        .tree<TreeNode>()
        .size([innerHeight, innerWidth])
        .separation((a, b) => (a.parent === b.parent ? 1 : 2) / Math.max(a.depth, 1))

      const root = d3.hierarchy<TreeNode>(treeData)
      tree(root)

      g
        .selectAll(".link")
        .data(root.links())
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

      const node = g
        .selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${d.y},${d.x})`)

      node
        .append("circle")
        .attr("r", (d) => (d.children ? 5 : 3))
        .style("fill", (d) => (d.children ? "#666666" : "#B8B8B8"))
        .style("stroke", "none")

      node
        .append("text")
        .attr("dx", -10)
        .attr("dy", 3)
        .attr("text-anchor", "end")
        .style("font-family", "Spoqa Han Sans Neo, sans-serif")
        .style("font-size", (d) => (d.children ? "12px" : "10px"))
        .style("font-weight", (d) => (d.children ? "bold" : "normal"))
        .style("fill", "#000000")
        .text((d) => d.data.name)
    }

    render()
    const resizeHandler = () => render()
    window.addEventListener("resize", resizeHandler)

    return () => {
      window.removeEventListener("resize", resizeHandler)
    }
  }, [])

  return <svg ref={svgRef} className="w-full h-full" style={{ background: "transparent" }} />
}
