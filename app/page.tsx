"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProfileImage } from "@/components/profile-image"
import { projects } from "@/lib/projects"
import {
  ArrowUpRight,
  MessageCircle,
  Mail,
  FileText,
  Check,
  Copy,
  Linkedin,
} from "lucide-react"
import { toast } from "sonner"

// Dynamic imports for heavy/client-only components — reduces initial JS parse time
const NoiseOverlay = dynamic(() => import("@/components/noise-overlay").then(m => ({ default: m.NoiseOverlay })), { ssr: false })
const CustomCursor = dynamic(() => import("@/components/custom-cursor").then(m => ({ default: m.CustomCursor })), { ssr: false })
const Marquee = dynamic(() => import("@/components/marquee").then(m => ({ default: m.Marquee })), { ssr: false })
const InteractiveOscilloscope = dynamic(() => import("@/components/interactive-oscilloscope").then(m => ({ default: m.InteractiveOscilloscope })), { ssr: false })
const InteractiveProjectDrawer = dynamic(() => import("@/components/interactive-project-drawer").then(m => ({ default: m.InteractiveProjectDrawer })), { ssr: false })
const InteractiveCreativeStudio = dynamic(() => import("@/components/interactive-creative-studio").then(m => ({ default: m.InteractiveCreativeStudio })), {
  ssr: false,
  loading: () => (
    <div className="w-full rounded-2xl border border-border bg-card shadow-md overflow-hidden animate-pulse" role="status" aria-label="Loading creative studio">
      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
        <span className="w-2 h-2 rounded-full bg-amber-500" />
        <div className="space-y-2 flex-1">
          <div className="h-3 w-1/2 bg-neutral-200 dark:bg-neutral-800 rounded" />
          <div className="h-2.5 w-1/3 bg-neutral-200 dark:bg-neutral-800 rounded" />
        </div>
        <div className="h-8 w-20 rounded-full bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  ),
})
const LightboxGallery = dynamic(() => import("@/components/lightbox-gallery").then(m => ({ default: m.LightboxGallery })), { ssr: false })

const marqueeKeywords1 = [
  "Autonomous Robotics",
  "Raspberry Pi 4",
  "Computer Vision (OpenCV)",
  "ESP32 & NodeMCU",
  "STEM Tinkering Lab",
  "CCNA Network Fundamentals",
]

const marqueeKeywords2 = [
  "Meta Ads Manager",
  "WhatsApp Lead Funnels",
  "Conversion Creatives",
  "Adobe Photoshop & Illustrator",
  "300+ Students Mentored",
  "Kerala & GCC Campaigns",
]

const clientsList = [
  { name: "BenchMark International School", role: "Robotics Trainer & IT Lead" },
  { name: "HiTech Educare", role: "Performance Marketer (Meta Ads)" },
  { name: "Jay Bharath College", role: "Creative Strategy & Admission Drives" },
  { name: "Metanoia Pediatric Dental", role: "Healthcare Brand Visuals & Ads" },
  { name: "Kenz Dental Care", role: "Conversion Social Media Ads" },
  { name: "Tales of Lens", role: "Creative Direction & Posters" },
  { name: "Dr. Gude International", role: "Corporate Global Campaigns" },
]

export default function HomePage() {
  const [activeMode, setActiveMode] = useState<"hardware" | "studio">("hardware")
  const [time, setTime] = useState("")
  const [copiedEmail, setCopiedEmail] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText("mohammedadilshaafsarm@gmail.com")
    setCopiedEmail(true)
    toast.success("Email copied: mohammedadilshaafsarm@gmail.com")
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black font-sans relative overflow-x-clip transition-colors">
      <NoiseOverlay />
      <CustomCursor />
      <Navbar />

      {/* Hero Section — inner content vertically centered via safe m-auto */}
      <section className="min-h-svh flex flex-col">
        <div className="m-auto w-full max-w-6xl px-4 sm:px-6 space-y-10 sm:space-y-12 pt-20 sm:pt-24 pb-12 sm:pb-16">
        {/* Status Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[11px] sm:text-xs font-mono text-neutral-700 dark:text-neutral-300 border-b border-border pb-4 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-semibold text-foreground truncate">TIRUR, KERALA (IST): {time || "LIVE"}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="font-medium truncate">B.TECH ECE &bull; CCNA &bull; GROWTH ADS</span>
            <span className="hidden md:inline text-neutral-400 shrink-0">/</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold hidden md:inline whitespace-nowrap">AVAILABLE FOR NEW BUILDS</span>
          </div>
        </div>

        {/* Hero Grid with Photo & Kinetic Typography */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Column: Massive Kinetic Typography & Bio */}
          <div className="lg:col-span-8 space-y-5 sm:space-y-6 min-w-0">
            <div className="space-y-2 select-none min-w-0">
              <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-neutral-600 dark:text-neutral-400 font-semibold">
                PORTFOLIO OF
              </p>
              <h1 className="fluid-display font-display font-extrabold uppercase text-foreground">
                MOHAMMED
                <br />
                <span className="text-neutral-500 dark:text-neutral-400 hover:text-foreground transition-colors duration-300">
                  ADILSHA
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-neutral-800 dark:text-neutral-200 font-normal leading-relaxed max-w-xl">
              Electronics & Communication Engineer, Robotics Trainer, and Performance Marketer.
              I engineer autonomous embedded systems and drive measurable brand growth.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2 text-xs font-mono">
              <a
                href="/Adilsha_CV.pdf"
                download="Mohammed_Adilsha_CV.pdf"
                data-cursor="DOWNLOAD"
                className="px-3.5 sm:px-4 py-2 rounded-full bg-foreground text-background font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <FileText size={13} />
                <span>RESUME (PDF)</span>
              </a>

              <a
                href="https://wa.me/919946686844"
                target="_blank"
                rel="noreferrer"
                data-cursor="CHAT"
                className="px-3.5 sm:px-4 py-2 rounded-full border border-border bg-card hover:bg-neutral-100 dark:hover:bg-neutral-900 text-foreground font-semibold transition-all flex items-center gap-1.5"
              >
                <MessageCircle size={13} className="text-emerald-600 dark:text-emerald-400" />
                <span>WHATSAPP</span>
                <ArrowUpRight size={11} className="opacity-70" />
              </a>

              <button
                onClick={copyEmail}
                data-cursor="COPY"
                className="px-3.5 sm:px-4 py-2 rounded-full border border-border bg-card hover:bg-neutral-100 dark:hover:bg-neutral-900 text-foreground font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {copiedEmail ? <Check size={13} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={13} />}
                <span>COPY EMAIL</span>
              </button>

              <a
                href="https://www.linkedin.com/in/mohd-adilsha"
                target="_blank"
                rel="noreferrer"
                data-cursor="LINKEDIN"
                className="px-3.5 sm:px-4 py-2 rounded-full border border-border bg-card hover:bg-neutral-100 dark:hover:bg-neutral-900 text-foreground font-semibold transition-all flex items-center gap-1.5"
              >
                <Linkedin size={13} className="text-blue-600 dark:text-blue-400" />
                <span>LINKEDIN</span>
                <ArrowUpRight size={11} className="opacity-70" />
              </a>
            </div>
          </div>

          {/* Right Column: Prominent Portrait Photo Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end min-w-0" data-cursor="ADILSHA">
            <div className="w-full max-w-[220px] xs:max-w-[260px] sm:max-w-[320px] mx-auto lg:mx-0">
              <ProfileImage />
            </div>
          </div>
        </div>

        {/* Perspective Mode Switcher Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-t border-border pt-6">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-700 dark:text-neutral-300 font-semibold shrink-0">
            EXPLORE PERSPECTIVE:
          </span>
          <div className="grid grid-cols-2 sm:flex w-full sm:w-auto p-1 rounded-2xl sm:rounded-full bg-neutral-100 dark:bg-neutral-900 border border-border gap-1 sm:gap-0">
            <button
              onClick={() => setActiveMode("hardware")}
              className={`px-3 sm:px-5 py-2 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-mono font-bold tracking-wider transition-all cursor-pointer truncate ${
                activeMode === "hardware"
                  ? "bg-foreground text-background shadow-md"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-foreground"
              }`}
            >
              ⚡ HARDWARE LAB
            </button>
            <button
              onClick={() => setActiveMode("studio")}
              className={`px-3 sm:px-5 py-2 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-mono font-bold tracking-wider transition-all cursor-pointer truncate ${
                activeMode === "studio"
                  ? "bg-foreground text-background shadow-md"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-foreground"
              }`}
            >
              🎨 CREATIVE STUDIO
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Stage (Changes based on mode!) */}
        <AnimatePresence mode="popLayout" initial={false}>
          {activeMode === "hardware" ? (
            <motion.div
              key="hardware"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[11px] sm:text-xs font-mono text-neutral-700 dark:text-neutral-300">
                <span className="font-semibold">[01] EMBEDDED COMPUTING & SIGNAL TELEMETRY</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap">STATUS: ACTIVE HARDWARE NODE</span>
              </div>
              <InteractiveOscilloscope />
            </motion.div>
          ) : (
            <motion.div
              key="studio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[11px] sm:text-xs font-mono text-neutral-700 dark:text-neutral-300">
                <span className="font-semibold">[02] PERFORMANCE MARKETING & CREATIVE DIRECTION</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold whitespace-nowrap">7+ CLIENT BRANDS</span>
              </div>
              <p className="text-neutral-800 dark:text-neutral-200 font-sans text-sm leading-relaxed">
                Combining high-converting Meta Ads Manager campaigns (Instant Forms & WhatsApp Funnels) with conversion graphic design across education, healthcare, and commercial sectors.
              </p>
              <InteractiveCreativeStudio />
              <div className="rounded-2xl border border-border bg-card shadow-sm">
                <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5 text-xs font-mono text-neutral-700 dark:text-neutral-300 font-semibold">
                  <span>CREATIVE WORKS &bull; CLIENT BRANDS</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">7+ BRANDS</span>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2.5">
                    {clientsList.map((c, i) => (
                      <span
                        key={i}
                        className="group px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-border text-[11px] text-neutral-800 dark:text-neutral-200 font-medium transition-all hover:border-amber-500/50 hover:-translate-y-0.5"
                      >
                        {c.name} &bull;{" "}
                        <span className="text-neutral-600 dark:text-neutral-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {c.role}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </section>

      {/* Infinite Marquee Tickers */}
      <div className="space-y-2 py-4">
        <Marquee items={marqueeKeywords1} speed={30} />
        <Marquee items={marqueeKeywords2} reverse speed={35} />
      </div>

      {/* Selected Engineering Projects with Interactive Floating Follower */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 border-b border-border pb-4">
          <div className="min-w-0">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-600 dark:text-neutral-400 font-semibold">
              WORKS ARCHIVE
            </span>
            <h2 className="fluid-h2 font-display font-extrabold uppercase tracking-tight text-foreground mt-1">
              SELECTED PROJECTS
            </h2>
          </div>
          <Link
            href="/projects"
            data-cursor="ALL"
            className="text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:text-foreground font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
          >
            <span>VIEW ALL PROJECTS ({projects.length})</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Interactive Floating Project Drawer */}
        <InteractiveProjectDrawer projects={projects} />
      </section>

      {/* Marketing & Design Gallery Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 border-b border-border pb-4">
          <div className="min-w-0">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-600 dark:text-neutral-400 font-semibold">
              CREATIVE DIRECTION
            </span>
            <h2 className="fluid-h2 font-display font-extrabold uppercase tracking-tight text-foreground mt-1">
              DESIGN GALLERY
            </h2>
          </div>
          <a
            href="/design-portfolio.pdf"
            target="_blank"
            rel="noreferrer"
            data-cursor="PDF"
            className="text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:text-foreground font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
          >
            <span>FULL 11-PAGE PDF</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        <LightboxGallery />
      </section>

      {/* Authentic Experience Log */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <div className="border-b border-border pb-4">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-600 dark:text-neutral-400 font-semibold">
            CHRONOLOGY
          </span>
          <h2 className="fluid-h2 font-display font-extrabold uppercase tracking-tight text-foreground mt-1">
            EXPERIENCE & ROLES
          </h2>
        </div>

        <div className="space-y-6">
          {[
            {
              role: "Technical Staff & Robotics Trainer",
              company: "BenchMark International School",
              location: "Kerala",
              period: "2024 — Present",
              detail:
                "Leading Tinkering Lab operations and delivering hands-on robotics training to 300+ students. Administering campus-wide VLANs and 60+ IP CCTV surveillance streams.",
            },
            {
              role: "Performance Marketer & Graphic Designer",
              company: "Freelance",
              location: "Kerala & GCC",
              period: "2023 — Present",
              detail:
                "Managing Meta Ads Manager campaigns, WhatsApp lead generation funnels, and advertising creatives for education, healthcare, and commercial brands.",
            },
            {
              role: "Robotics & Content Creation Head",
              company: "Cybroque Technologies",
              location: "IEDC CEV Incubator",
              period: "2023 — 2024",
              detail:
                "Engineered autonomous robotics hardware and led technical and creative direction for startup products.",
            },
            {
              role: "Chief Creative Officer",
              company: "IEDC — College of Engineering Vadakara",
              location: "Kerala",
              period: "2022 — 2024",
              detail:
                "Led creative identity and promotional materials for Kerala Startup Mission (KSUM) initiatives and entrepreneurship summits.",
            },
            {
              role: "Intern — Electronics & IoT",
              company: "Keltron",
              location: "Kochi",
              period: "May 2023",
              detail:
                "Developed microcontroller IoT prototypes and performed sensor interfacing and testing.",
            },
          ].map((exp, idx) => (
            <div
              key={idx}
              className="py-5 border-b border-border/60 flex flex-col md:flex-row md:items-baseline justify-between gap-2 sm:gap-3 sm:hover:px-2 transition-all min-w-0"
            >
              <div className="space-y-1 max-w-xl">
                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  {exp.role}{" "}
                  <span className="text-neutral-600 dark:text-neutral-400 font-normal">&bull; {exp.company}</span>
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                  {exp.detail}
                </p>
              </div>
              <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 shrink-0 font-medium">
                {exp.period}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Massive Awwwards Magnetic Contact Call to Action */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 lg:p-16 text-center space-y-6 sm:space-y-8 relative overflow-hidden shadow-xl">
          <div className="space-y-3 max-w-2xl mx-auto min-w-0">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-neutral-600 dark:text-neutral-400 font-semibold">
              INITIATE COLLABORATION
            </span>
            <h2 className="font-display font-extrabold uppercase tracking-tight text-foreground leading-[1.02] text-[clamp(1.7rem,7vw,3.75rem)] text-balance">
              LET&apos;S BUILD SOMETHING EXTRAORDINARY.
            </h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 font-sans max-w-lg mx-auto leading-relaxed pt-2">
              Available for robotics training workshops, embedded hardware prototyping, and performance marketing campaigns.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 pt-4 text-xs font-mono">
            <a
              href="mailto:mohammedadilshaafsarm@gmail.com"
              data-cursor="EMAIL"
              title="mohammedadilshaafsarm@gmail.com"
              className="w-full sm:w-auto sm:max-w-full px-4 sm:px-6 py-3 rounded-full bg-foreground text-background font-bold hover:scale-[1.02] transition-transform inline-flex items-center justify-center gap-2 shadow-xl text-[11px] sm:text-xs min-w-0"
            >
              <Mail size={14} className="shrink-0" />
              <span className="truncate">MOHAMMEDADILSHAAFSARM@GMAIL.COM</span>
            </a>

            <a
              href="https://wa.me/919946686844"
              target="_blank"
              rel="noreferrer"
              data-cursor="WHATSAPP"
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-border bg-card text-foreground font-bold hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all inline-flex items-center justify-center gap-2 text-[11px] sm:text-xs whitespace-nowrap"
            >
              <MessageCircle size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>+91 9946686844</span>
              <ArrowUpRight size={12} className="shrink-0" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}