"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Project } from "@/lib/projects"

export function InteractiveProjectDrawer({ projects }: { projects: Project[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 200, damping: 20 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <div
      className="relative w-full border-t border-border"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIdx(null)}
    >
      {projects.map((project, idx) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          onMouseEnter={() => setHoveredIdx(idx)}
          data-cursor="VIEW"
          className="group relative flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-6 py-6 sm:py-8 border-b border-border hover:bg-neutral-500/5 px-2 sm:px-4 rounded-xl transition-all duration-300 min-w-0"
        >
          {/* Index & Title */}
          <div className="flex items-baseline gap-3 sm:gap-4 md:gap-8 min-w-0">
            <span className="font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400 group-hover:text-foreground transition-colors shrink-0">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-lg sm:text-2xl font-bold tracking-tight text-foreground group-hover:translate-x-2 transition-transform duration-300 text-balance leading-snug">
                {project.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 font-mono mt-1 line-clamp-2 font-medium break-words">
                {project.tags.join(" • ")}
              </p>
            </div>
          </div>

          {/* Category & Arrow Action */}
          <div className="flex items-center gap-4 sm:gap-6 mt-2 md:mt-0 pl-7 sm:pl-8 md:pl-0 shrink-0">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-semibold">
              {project.category}
            </span>
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-neutral-600 dark:text-neutral-400 group-hover:border-foreground group-hover:text-foreground group-hover:rotate-45 transition-all duration-300 bg-background">
              <ArrowUpRight size={14} />
            </div>
          </div>
        </Link>
      ))}

      {/* Floating Image Follower */}
      {hoveredIdx !== null && (
        <motion.div
          style={{
            x,
            y,
            pointerEvents: "none",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="hidden lg:block absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-30 w-80 h-48 rounded-xl overflow-hidden shadow-2xl border border-neutral-700 bg-neutral-950 p-5"
        >
          <div className="h-full flex flex-col justify-between text-white font-mono text-xs">
            <div className="flex justify-between items-center text-[10px] text-neutral-300 border-b border-neutral-800 pb-1.5 font-bold">
              <span>{projects[hoveredIdx].category}</span>
              <span className="text-emerald-400">CASE STUDY</span>
            </div>
            <div>
              <p className="font-bold text-sm leading-snug line-clamp-2 text-white">
                {projects[hoveredIdx].title}
              </p>
              <p className="text-xs text-neutral-300 line-clamp-2 mt-1.5 font-sans leading-relaxed">
                {projects[hoveredIdx].summary}
              </p>
            </div>
            <div className="text-[10px] text-neutral-400">
              STACK: {projects[hoveredIdx].tags.slice(0, 3).join(", ")}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
