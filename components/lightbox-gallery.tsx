"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  ArrowUpRight,
} from "lucide-react"

export type DesignItem = {
  id: number
  src: string
  title: string
  category: "Admissions" | "Healthcare" | "Branding" | "Commercial"
  client: string
  description: string
}

export const designItems: DesignItem[] = [
  {
    id: 1,
    src: "/design-work/page-01.png",
    title: "Creative Director Portfolio Cover",
    category: "Branding",
    client: "Adilsha Creative",
    description: "Visual identity and editorial design portfolio cover.",
  },
  {
    id: 2,
    src: "/design-work/page-02.png",
    title: "Admission Campaign & Academic Branding",
    category: "Admissions",
    client: "BenchMark International School",
    description: "High-conversion admission promotion banners and social media launch campaign.",
  },
  {
    id: 3,
    src: "/design-work/page-03.png",
    title: "Higher Education Consultancy Creatives",
    category: "Admissions",
    client: "HiTech Educare",
    description: "Multi-channel lead generation posters for overseas education & university admissions.",
  },
  {
    id: 4,
    src: "/design-work/page-04.png",
    title: "College Admission & Fest Posters",
    category: "Admissions",
    client: "Jay Bharath College",
    description: "Campus recruitment, admission drives, and tech fest visual communication.",
  },
  {
    id: 5,
    src: "/design-work/page-05.png",
    title: "Pediatric Dental Care Branding",
    category: "Healthcare",
    client: "Metanoia Pediatric Dental",
    description: "Child-friendly dental care awareness posters and social media marketing creatives.",
  },
  {
    id: 6,
    src: "/design-work/page-06.png",
    title: "Dental Clinic Awareness & Appointment Ads",
    category: "Healthcare",
    client: "Kenz Dental Care",
    description: "Conversion-optimized WhatsApp and Facebook ads for specialized dental treatments.",
  },
  {
    id: 7,
    src: "/design-work/page-07.png",
    title: "Cinematic Photography Visuals",
    category: "Commercial",
    client: "Tales of Lens",
    description: "Editorial layouts and promotional posters for professional photography studio.",
  },
  {
    id: 8,
    src: "/design-work/page-08.png",
    title: "Global Services & Corporate Identity",
    category: "Commercial",
    client: "Dr. Gude International",
    description: "International corporate branding, digital flyers, and B2B communication materials.",
  },
  {
    id: 9,
    src: "/design-work/page-09.png",
    title: "IEDC Entrepreneurship & Startup Summit",
    category: "Branding",
    client: "IEDC CEV / KSUM",
    description: "Branding, stage backdrop, and social teasers for Kerala Startup Mission initiatives.",
  },
  {
    id: 10,
    src: "/design-work/page-10.png",
    title: "Tech Innovation & Robotics Workshop Posters",
    category: "Branding",
    client: "Cybroque & Tinkering Lab",
    description: "Visual posters for student robotics bootcamps and hands-on STEM hackathons.",
  },
  {
    id: 11,
    src: "/design-work/page-11.png",
    title: "Full Campaign Overview & Back Cover",
    category: "Branding",
    client: "Creative Showcase",
    description: "Summary of creative direction, typography systems, and color harmony palettes.",
  },
]

const categories = ["All", "Admissions", "Healthcare", "Branding", "Commercial"] as const

export function LightboxGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [zoom, setZoom] = useState(1)

  const filteredItems =
    selectedCategory === "All"
      ? designItems
      : designItems.filter((item) => item.category === selectedCategory)

  const openLightbox = (index: number) => {
    setActiveIdx(index)
    setZoom(1)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = useCallback(() => {
    setActiveIdx(null)
    setZoom(1)
    document.body.style.overflow = "auto"
  }, [])

  const nextImage = useCallback(() => {
    if (activeIdx === null) return
    setActiveIdx((prev) => (prev! + 1) % filteredItems.length)
    setZoom(1)
  }, [activeIdx, filteredItems.length])

  const prevImage = useCallback(() => {
    if (activeIdx === null) return
    setActiveIdx((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length)
    setZoom(1)
  }, [activeIdx, filteredItems.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeIdx, closeLightbox, nextImage, prevImage])

  const currentItem = activeIdx !== null ? filteredItems[activeIdx] : null

  return (
    <div className="space-y-6">
      {/* Premium Filter Tabs */}
      <div className="flex flex-wrap gap-1.5" role="tablist">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              selectedCategory === cat
                ? "bg-foreground text-background shadow-sm"
                : "text-neutral-500 dark:text-neutral-400 hover:text-foreground bg-transparent border border-border hover:border-foreground/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Premium Gallery Grid */}
      <AnimatePresence mode="popLayout">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
            onClick={() => openLightbox(idx)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer select-none"
            style={{ isolation: "isolate" }}
          >
            {/* Image */}
            <div className="aspect-[3/4] relative overflow-hidden bg-neutral-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07]"
              />
              {/* Base vignette - always visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Category badge top-left */}
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-white/15 backdrop-blur-sm text-white/90 border border-white/20">
                  {item.category}
                </span>
              </div>

              {/* Zoom hint top-right */}
              <div className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>

              {/* Bottom info panel */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-2.5 sm:p-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-300 min-w-0">
                <p className="text-[10px] font-mono font-semibold text-white/60 uppercase tracking-wider truncate mb-0.5">
                  {item.client}
                </p>
                <p className="text-[13px] font-bold text-white leading-snug line-clamp-2">
                  {item.title}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      </AnimatePresence>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6"
            onClick={closeLightbox}
          >
            {/* Header Toolbar */}
            <div
              className="w-full max-w-5xl flex items-center justify-between z-20 text-white text-xs font-mono pb-2"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="font-bold truncate max-w-[60%] text-[11px] sm:text-xs">
                {currentItem.client} &bull; {activeIdx! + 1} / {filteredItems.length}
              </span>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setZoom((z) => Math.min(z + 0.2, 2))}
                  className="p-1.5 hover:opacity-75 text-white"
                  title="Zoom in"
                >
                  <ZoomIn size={18} />
                </button>
                <button
                  onClick={() => setZoom((z) => Math.max(z - 0.2, 0.8))}
                  className="p-1.5 hover:opacity-75 text-white"
                  title="Zoom out"
                >
                  <ZoomOut size={18} />
                </button>
                <button onClick={closeLightbox} className="p-1.5 hover:opacity-75 text-white" title="Close">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Image Preview Area with Responsive Navigation */}
            <div className="relative w-full flex-1 flex items-center justify-center min-h-0 py-2">
              {/* Previous Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="absolute left-1 sm:left-4 z-20 p-2 sm:p-3 rounded-full bg-black/50 sm:bg-transparent text-white/80 hover:text-white backdrop-blur-sm sm:backdrop-blur-none transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              {/* Next Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="absolute right-1 sm:right-4 z-20 p-2 sm:p-3 rounded-full bg-black/50 sm:bg-transparent text-white/80 hover:text-white backdrop-blur-sm sm:backdrop-blur-none transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              {/* Image Container */}
              <div
                className="relative max-h-[75dvh] sm:max-h-[82dvh] max-w-4xl w-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentItem.src}
                  alt={currentItem.title}
                  style={{ transform: `scale(${zoom})`, transition: "transform 0.15s ease-out" }}
                  className="max-h-[72dvh] sm:max-h-[80dvh] max-w-[90vw] sm:max-w-full w-auto object-contain rounded-md shadow-2xl"
                />
              </div>
            </div>

            {/* Bottom Caption Info */}
            <div
              className="w-full max-w-xl text-center text-white pt-2 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs sm:text-sm font-bold leading-tight">{currentItem.title}</p>
              <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5 line-clamp-1">{currentItem.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
