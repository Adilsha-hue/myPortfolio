"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function ProfileImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-72 h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] flex items-center justify-center"
    >
      <Image
        src="/images/Adilsha.png"
        alt="Mohammed Adilsha Afsar M"
        fill
        className="object-contain scale-125"
        priority
      />
    </motion.div>
  )
}


