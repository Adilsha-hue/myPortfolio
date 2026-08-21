"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Maximize2, X } from "lucide-react"
import { StudioEditor } from "./studio/editor"
import { renderPage } from "./studio/engine"

const GRID_CLS =
  "bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]"

function drawSpiral(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const cx = w / 2
  const cy = h / 2
  const maxR = Math.max(w, h) * 0.42
  const palette = ["#10b981", "#f59e0b", "#3b82f6", "#8b5cf6", "#ec4899", "#ef4444"]
  ctx.globalAlpha = 0.85
  ctx.lineCap = "round"
  for (let t = 0; t <= 1; t += 0.012) {
    const a1 = t * 3.5 * Math.PI * 2
    const a2 = Math.min(t + 0.02, 1) * 3.5 * Math.PI * 2
    const r1 = t * maxR
    const r2 = Math.min(t + 0.02, 1) * maxR
    ctx.strokeStyle = palette[Math.floor(t * palette.length) % palette.length]
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(a1) * r1, cy + Math.sin(a1) * r1)
    ctx.lineTo(cx + Math.cos(a2) * r2, cy + Math.sin(a2) * r2)
    ctx.stroke()
  }
  ctx.globalAlpha = 1
}

function MiniPreview() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext("2d")
    if (!ctx) return
    const rect = cv.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = Math.max(1, Math.round(rect.width))
    const h = Math.max(1, Math.round(rect.height))
    cv.width = w * dpr
    cv.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)
    let drew = false
    try {
      const raw = localStorage.getItem("studio_os_project_v1")
      if (raw) {
        const proj = JSON.parse(raw)
        const page = proj?.pages?.[proj?.activeIdx ?? 0]
        if (page && Array.isArray(page.objs)) {
          const s = Math.min(w / page.w, h / page.h)
          ctx.save()
          ctx.translate((w - page.w * s) / 2, (h - page.h * s) / 2)
          ctx.scale(s, s)
          renderPage(ctx, page, {})
          ctx.restore()
          drew = true
        }
      }
    } catch {}
    if (!drew) drawSpiral(ctx, w, h)
  }, [])
  return <canvas ref={ref} className="w-full h-full block pointer-events-none" />
}

export function InteractiveCreativeStudio() {
  const [expanded, setExpanded] = useState(false)

  const close = useCallback(() => setExpanded(false), [])

  useEffect(() => {
    if (!expanded) return
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.querySelector("textarea:focus, input:focus")) setExpanded(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [expanded])

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setExpanded(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setExpanded(true)
          }
        }}
        data-cursor="OPEN STUDIO"
        className="w-full rounded-2xl border border-border bg-card shadow-md overflow-hidden cursor-pointer group transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/60"
      >
        <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-foreground">
              CANVAS STUDIO OS
              <span className="hidden md:inline text-neutral-500 dark:text-neutral-400 normal-case tracking-normal font-medium">
                — a Canva-grade design suite, running entirely in your browser
              </span>
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono text-neutral-600 dark:text-neutral-400 font-medium mt-0.5 truncate">
              TEMPLATES · LAYERS · MAGIC DESIGN · MAGIC RESIZE · AI OCR · 40+ TOOLS
            </div>
          </div>

          <div className="hidden sm:block shrink-0" data-cursor="PREVIEW">
            <div className={`w-24 sm:w-32 h-14 sm:h-16 rounded-lg overflow-hidden border border-border bg-white dark:bg-neutral-900 ${GRID_CLS}`}>
              <MiniPreview />
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-foreground text-background rounded-full px-3 sm:px-4 py-2 group-hover:scale-105 transition-transform">
            OPEN STUDIO
            <Maximize2 size={13} />
          </div>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="studio-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-[100]"
            >
              <motion.div
                initial={{ scale: 0.97, y: 16, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.98, y: 10, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0"
              >
                <StudioEditor onClose={close} />
              </motion.div>
              <button
                type="button"
                aria-label="Close studio"
                onClick={close}
                data-cursor="CLOSE"
                className="fixed top-2 right-2 z-[120] w-7 h-7 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 backdrop-blur transition-all cursor-pointer hidden"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
