"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function ProfileImage({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative group rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900/80 shadow-2xl ${className}`}
    >
      {/* Portrait Image */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-950">
        <Image
          src="/images/Adilsha.png"
          alt="Mohammed Adilsha Afsar M"
          fill
          sizes="(max-width: 768px) 280px, 360px"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          priority
        />
        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
      </div>

      {/* Floating Tag */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-2xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800/80 text-[11px] font-mono text-neutral-300">
        <span className="flex items-center gap-1.5 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          MOHAMMED ADILSHA
        </span>
        <span className="text-neutral-500">ECE / GROWTH</span>
      </div>
    </motion.div>
  )
}
