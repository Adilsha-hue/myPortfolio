"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function ProfileImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[480px]"
    >
      <Image src="/images/profile.png" alt="Mohammed Adilsha Afsar M" fill className="object-cover" priority />
    </motion.div>
  )
}
