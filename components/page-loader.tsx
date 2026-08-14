"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

function ScrambleText({ text, trigger }: { text: string; trigger: boolean }) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (!trigger) return
    let frame = 0
    const total = 18
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " "
            if (frame > (i / text.length) * total) return ch
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join("")
      )
      frame++
      if (frame > total) clearInterval(interval)
    }, 35)
    return () => clearInterval(interval)
  }, [trigger, text])

  return <span>{display}</span>
}

export function PageLoader({ onDone }: { onDone?: () => void }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const [scramble, setScramble] = useState(false)

  const lines = [
    "Initializing workspace...",
    "Loading assets...",
    "Mounting components...",
    "Ready.",
  ]

  useEffect(() => {
    // Only run once on mount
    const startTime = Date.now()
    const duration = 1200 // 1.2 seconds total duration

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const currentProgress = Math.min(Math.round((elapsed / duration) * 100), 100)
      
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(interval)
        setScramble(true)

        setTimeout(() => {
          setVisible(false)
          if (onDone) onDone()
        }, 350)
      }
    }, 20)

    return () => clearInterval(interval)
  }, []) // Empty dependency array ensures it never resets on parent re-renders

  if (!visible) return null

  const label = progress < 30 ? lines[0] : progress < 65 ? lines[1] : progress < 95 ? lines[2] : lines[3]

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden pointer-events-none"
        >
          {/* Noise texture overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "128px",
            }}
          />

          {/* Scanning line */}
          <motion.div
            className="pointer-events-none absolute left-0 right-0 h-px bg-foreground/10"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          />

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-8 w-full max-w-xs px-6">
            {/* Monogram / logo */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center shadow-2xl">
                <span className="text-background text-xl font-black font-mono tracking-tight select-none">MA</span>
              </div>
              {/* Orbiting dot */}
              <motion.span
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.6)]"
                animate={{ scale: [1, 1.4, 1], opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Progress bar */}
            <div className="w-full space-y-3">
              <div className="relative w-full h-[3px] bg-foreground/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-foreground rounded-full origin-left"
                  style={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 80, damping: 20 }}
                />
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ["-4rem", "calc(100% + 4rem)"] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Status + percentage */}
              <div className="flex items-center justify-between">
                <motion.p
                  key={label}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 tracking-widest uppercase"
                >
                  {label}
                </motion.p>
                <span className="text-[11px] font-mono font-bold text-foreground tabular-nums">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            {/* Name scramble — appears at 100% */}
            <AnimatePresence>
              {scramble && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs font-mono font-semibold text-foreground tracking-[0.25em] uppercase"
                >
                  <ScrambleText text="Mohammed Adilsha" trigger={scramble} />
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
