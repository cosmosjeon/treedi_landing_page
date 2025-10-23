export interface FeatureCard {
  title: string
  description: string
  image?: string
  highlighted?: boolean
}

export const featureCards = {
  ko: [
    {
      title: "분기 처리",
      description: "답변에서 모르는 개념들이 있다면\n한번에 분기해서 질문하세요.",
      image: "/modern-dashboard-interface-with-data-visualization.jpg",
    },
    {
      title: "트리 정리",
      description: "폴더로 질문 트리를\n정리하세요.",
      image: "/analytics-dashboard.png",
    },
    {
      title: "문맥 선택",
      description: "문맥을 원하는 대로\n선택해서 질문하세요.",
      image: "/team-collaboration-interface-with-shared-workspace.jpg",
    },
  ] as FeatureCard[],
  en: [
    {
      title: "Branch Processing",
      description: "Branch out unknown concepts from answers\nand ask questions all at once.",
      image: "/modern-dashboard-interface-with-data-visualization.jpg",
    },
    {
      title: "Tree Organization",
      description: "Organize question trees\nwith folders.",
      image: "/analytics-dashboard.png",
    },
    {
      title: "Context Selection",
      description: "Select and ask questions\nwith the context you want.",
      image: "/team-collaboration-interface-with-shared-workspace.jpg",
    },
  ] as FeatureCard[],
} as const

