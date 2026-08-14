"use client"

import { motion } from "framer-motion"

export function Marquee({
  items,
  reverse = false,
  speed = 25,
}: {
  items: string[]
  reverse?: boolean
  speed?: number
}) {
  return (
    <div className="overflow-hidden whitespace-nowrap flex select-none py-3 border-y border-border bg-neutral-100/80 dark:bg-neutral-900/80 transition-colors">
      <motion.div
        className="flex items-center gap-8 shrink-0"
        initial={{ x: reverse ? "-50%" : "0%" }}
        animate={{ x: reverse ? "0%" : "-50%" }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
      >
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <span
            key={idx}
            className="flex items-center gap-8 text-xs sm:text-sm font-mono uppercase tracking-widest text-neutral-800 dark:text-neutral-200 font-bold"
          >
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
