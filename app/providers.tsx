'use client'

import type { ReactNode } from "react"
import { Suspense } from "react"

import { LanguageProvider } from "@/context/language-context"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <LanguageProvider>{children}</LanguageProvider>
    </Suspense>
  )
}
