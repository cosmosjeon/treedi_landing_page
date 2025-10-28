import type React from "react"
import type { Metadata } from "next"
import { Inter, Instrument_Serif } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
  display: "swap",
  preload: true,
  fallback: ["serif"],
})

const geistSans = localFont({
  src: [
    {
      path: "./fonts/GeistVF.woff",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-geist",
  display: "swap",
  preload: true,
})

const geistMono = localFont({
  src: [
    {
      path: "./fonts/GeistMonoVF.woff",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Treedi - AI 문맥 관리 솔루션",
  description:
    "질문이 많아질수록 꼬이는 AI 문맥, 이젠 Treedi로 관리하세요. 체계적인 대화 관리로 더 나은 AI 경험을 제공합니다.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="font-spoqa antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
