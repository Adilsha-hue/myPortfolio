"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function ProfileImage() {
  return (
    <div className="relative">
      {/* Main profile image with animation */}
      <motion.div
        className="relative z-10 aspect-square max-w-md mx-auto overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-400 p-1"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        whileHover={{ scale: 1.03 }}
      >
        <div className="relative w-full h-full overflow-hidden rounded-[22px] bg-white">
          <Image
            src="/images/profile.png"
            alt="Mohammed Adilsha Afsar M"
            width={600}
            height={600}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-3 -right-3 w-12 h-12 bg-yellow-400 rounded-full opacity-80 animate-pulse"></div>
        <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-300 rounded-full opacity-70 animate-bounce"></div>
      </motion.div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 -left-8 w-16 h-16 border-4 border-blue-200 rounded-full opacity-50 z-0"></div>
      <div className="absolute bottom-1/4 -right-8 w-20 h-20 border-4 border-blue-300 rounded-full opacity-50 z-0"></div>

      {/* Tech-themed decorative elements */}
      <motion.div
        className="absolute -bottom-6 right-1/4 bg-white rounded-lg px-3 py-2 shadow-lg z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <span className="text-sm font-medium text-blue-600">Robotics Expert</span>
      </motion.div>

      <motion.div
        className="absolute -top-6 left-1/4 bg-white rounded-lg px-3 py-2 shadow-lg z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <span className="text-sm font-medium text-blue-600">Designer</span>
      </motion.div>
    </div>
  )
}

