"use client"

import { useEffect, useRef, useState } from "react"

export function InteractiveOscilloscope() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeFrequency, setActiveFrequency] = useState(2.4)
  const [mode, setMode] = useState<"sine" | "pulse" | "noise">("sine")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let phase = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    window.addEventListener("resize", resize)

    const render = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      ctx.clearRect(0, 0, width, height)

      // Grid background
      ctx.lineWidth = 0.5
      ctx.strokeStyle = "rgba(160, 160, 160, 0.2)"
      const gridSize = 20

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Signal Trace
      ctx.lineWidth = 2.5
      ctx.strokeStyle = "#10b981" // Bright emerald signal
      ctx.shadowBlur = 10
      ctx.shadowColor = "rgba(16, 185, 129, 0.8)"

      ctx.beginPath()
      const centerY = height / 2
      const amplitude = height * 0.34
      // Adaptive step: fewer points on wide/low-power screens keeps 60fps everywhere
      const step = width > 700 ? 2 : 1

      for (let x = 0; x < width; x += step) {
        let y = centerY

        if (mode === "sine") {
          y =
            centerY +
            Math.sin(x * 0.02 * activeFrequency + phase) * amplitude * 0.8 +
            Math.sin(x * 0.008 + phase * 1.5) * (amplitude * 0.2)
        } else if (mode === "pulse") {
          const p = (x * 0.02 * activeFrequency + phase) % (Math.PI * 2)
          y = centerY + (p < Math.PI ? amplitude * 0.8 : -amplitude * 0.8)
        } else {
          y =
            centerY +
            Math.sin(x * 0.02 * activeFrequency + phase) * amplitude * 0.5 +
            (Math.random() - 0.5) * (amplitude * 0.6)
        }

        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }

      ctx.stroke()
      ctx.shadowBlur = 0

      phase += 0.045
      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      ro.disconnect()
      window.removeEventListener("resize", resize)
    }
  }, [activeFrequency, mode])

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-3 sm:p-5 font-mono text-xs text-neutral-800 dark:text-neutral-200 space-y-3 shadow-md overflow-hidden">
      {/* Title & Oscilloscope Telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="text-foreground font-bold uppercase tracking-wider text-[11px] sm:text-xs">
            HARDWARE SIGNAL OSCILLOSCOPE &bull; CH-1
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-semibold text-neutral-700 dark:text-neutral-300">
          <span>FREQ: {(activeFrequency * 12.5).toFixed(1)} kHz</span>
          <span>&bull;</span>
          <span>Vpp: 3.30V</span>
        </div>
      </div>

      {/* Waveform Canvas — touch-pan-y keeps vertical page scroll working on phones */}
      <div
        className="relative h-32 xs:h-36 sm:h-40 w-full bg-neutral-950 rounded-xl overflow-hidden cursor-ew-resize select-none border border-neutral-800 [touch-action:pan-y]"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const normX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
          setActiveFrequency(1 + normX * 4)
        }}
        onTouchMove={(e) => {
          if (e.touches.length > 0) {
            const rect = e.currentTarget.getBoundingClientRect()
            const touch = e.touches[0]
            const normX = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width))
            setActiveFrequency(1 + normX * 4)
          }
        }}
        title="Drag mouse or swipe horizontally to tune frequency"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute bottom-2 right-2 text-[9px] sm:text-[10px] font-bold text-white bg-black/80 px-2 py-0.5 rounded border border-neutral-700 backdrop-blur-sm pointer-events-none">
          INTERACTIVE WAVE &bull; TOUCH / HOVER TO TUNE
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 text-xs">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-neutral-600 dark:text-neutral-400 font-bold uppercase text-[11px] sm:text-xs">WAVEFORM:</span>
          {(["sine", "pulse", "noise"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-2.5 sm:px-3 py-1 rounded-md uppercase font-bold tracking-wider text-[11px] sm:text-xs transition-all cursor-pointer ${
                mode === m
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-foreground border border-border"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <span className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 font-mono font-medium">STM32 / ESP32 HARDWARE LAB</span>
      </div>
    </div>
  )
}
