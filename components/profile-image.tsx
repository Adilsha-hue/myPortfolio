"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function ProfileImage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative w-56 h-[280px] md:w-64 md:h-[320px] lg:w-72 lg:h-[360px]"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-orange-200/40 via-amber-100/30 to-transparent rounded-3xl blur-xl dark:from-orange-900/20 dark:via-amber-900/10" />
      
      <Image
        src="/images/Adilsha.png"
        alt="Mohammed Adilsha Afsar M"
        width={420}
        height={520}
        className="w-full h-full object-contain drop-shadow-lg"
        priority
      />
    </motion.div>
  )
}
