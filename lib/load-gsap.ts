export type TimelineLike = {
  kill(): void
  totalProgress(value: number): void
  duration(): number
  to(...args: unknown[]): TimelineLike
}

export type GsapModule = {
  registerPlugin(...plugins: unknown[]): void
  timeline(options?: unknown): TimelineLike
  set(target: unknown, vars: Record<string, unknown>): void
  fromTo(
    targets: unknown,
    fromVars: Record<string, unknown>,
    toVars: Record<string, unknown>,
  ): unknown
}

export type ScrollTriggerInstance = {
  disable?: () => void
  enable?: () => void
  kill?: () => void
  refresh?: () => void
}

export type ScrollTriggerModule = {
  create(options: unknown): ScrollTriggerInstance
  refresh(): void
}

declare global {
  interface Window {
    gsap?: GsapModule
    ScrollTrigger?: ScrollTriggerModule
  }
}

type GsapBundle = {
  gsap: GsapModule
  ScrollTrigger: ScrollTriggerModule
}

const GSAP_CORE_URL = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"
const GSAP_SCROLL_TRIGGER_URL = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"

const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    if (typeof document === "undefined") {
      reject(new Error("DOM unavailable"))
      return
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[data-gsap-script="${src}"]`)
    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve()
        return
      }
      existing.addEventListener("load", () => resolve(), { once: true })
      existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true })
      return
    }

    const script = document.createElement("script")
    script.src = src
    script.async = true
    script.dataset.gsapScript = src
    script.addEventListener("load", () => {
      script.dataset.loaded = "true"
      resolve()
    })
    script.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)))
    document.head.appendChild(script)
  })

let loader: Promise<GsapBundle> | null = null

export const loadGsap = (): Promise<GsapBundle> => {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("GSAP can only be loaded in the browser"))
  }

  if (!loader) {
    loader = (async () => {
      await loadScript(GSAP_CORE_URL)
      await loadScript(GSAP_SCROLL_TRIGGER_URL)

      if (!window.gsap || !window.ScrollTrigger) {
        throw new Error("GSAP scripts did not register expected globals")
      }

      return {
        gsap: window.gsap,
        ScrollTrigger: window.ScrollTrigger,
      }
    })()
  }

  return loader
}
