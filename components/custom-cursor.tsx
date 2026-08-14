"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [hoverText, setHoverText] = useState("")
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Only run on non-touch screens
    if (window.matchMedia("(pointer: coarse)").matches) return
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement | null
      if (!target) return

      const customText = target.closest("[data-cursor]")?.getAttribute("data-cursor")
      if (customText) {
        setHoverText(customText)
        setIsPointer(true)
      } else {
        setHoverText("")
        const isClickable =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          window.getComputedStyle(target).cursor === "pointer"
        setIsPointer(Boolean(isClickable))
      }
    }

    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [cursorX, cursorY, isVisible])

  if (!mounted || !isVisible) return null

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center font-mono text-[10px] font-bold uppercase tracking-wider text-black select-none"
      animate={{
        width: hoverText ? 72 : isPointer ? 32 : 12,
        height: hoverText ? 72 : isPointer ? 32 : 12,
        backgroundColor: hoverText
          ? "rgba(255, 255, 255, 0.95)"
          : isPointer
          ? "rgba(255, 255, 255, 0.4)"
          : "rgba(255, 255, 255, 0.8)",
        backdropFilter: isPointer ? "blur(4px)" : "none",
        mixBlendMode: hoverText ? "normal" : "difference",
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    >
      {hoverText && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-neutral-900 drop-shadow-sm"
        >
          {hoverText}
        </motion.span>
      )}
    </motion.div>
  )
}
