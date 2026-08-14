"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { NoiseOverlay } from "@/components/noise-overlay"
import { CustomCursor } from "@/components/custom-cursor"
import { ProfileImage } from "@/components/profile-image"
import { Marquee } from "@/components/marquee"
import { InteractiveOscilloscope } from "@/components/interactive-oscilloscope"
import { InteractiveProjectDrawer } from "@/components/interactive-project-drawer"
import { LightboxGallery } from "@/components/lightbox-gallery"
import { PageLoader } from "@/components/page-loader"
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
  const [loaderDone, setLoaderDone] = useState(false)

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
    <div className="min-h-screen bg-background text-foreground selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black font-sans relative overflow-x-hidden transition-colors">
      <PageLoader onDone={() => setLoaderDone(true)} />
      <NoiseOverlay />
      <CustomCursor />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
        {/* Status Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-700 dark:text-neutral-300 border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-foreground">TIRUR, KERALA (IST): {time || "LIVE"}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-medium">B.TECH ECE &bull; CCNA &bull; GROWTH ADS</span>
            <span className="hidden sm:inline text-neutral-400">/</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold hidden sm:inline">AVAILABLE FOR NEW BUILDS</span>
          </div>
        </div>

        {/* Hero Grid with Photo & Kinetic Typography */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Massive Kinetic Typography & Bio */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2 select-none">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-600 dark:text-neutral-400 font-semibold">
                PORTFOLIO OF
              </p>
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase leading-[0.9] tracking-tighter text-foreground">
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
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
              <a
                href="/Adilsha_CV.pdf"
                download="Mohammed_Adilsha_CV.pdf"
                data-cursor="DOWNLOAD"
                className="px-4 py-2 rounded-full bg-foreground text-background font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <FileText size={13} />
                <span>RESUME (PDF)</span>
              </a>

              <a
                href="https://wa.me/919946686844"
                target="_blank"
                rel="noreferrer"
                data-cursor="CHAT"
                className="px-4 py-2 rounded-full border border-border bg-card hover:bg-neutral-100 dark:hover:bg-neutral-900 text-foreground font-semibold transition-all flex items-center gap-1.5"
              >
                <MessageCircle size={13} className="text-emerald-600 dark:text-emerald-400" />
                <span>WHATSAPP</span>
                <ArrowUpRight size={11} className="opacity-70" />
              </a>

              <button
                onClick={copyEmail}
                data-cursor="COPY"
                className="px-4 py-2 rounded-full border border-border bg-card hover:bg-neutral-100 dark:hover:bg-neutral-900 text-foreground font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {copiedEmail ? <Check size={13} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={13} />}
                <span>COPY EMAIL</span>
              </button>

              <a
                href="https://www.linkedin.com/in/mohd-adilsha"
                target="_blank"
                rel="noreferrer"
                data-cursor="LINKEDIN"
                className="px-4 py-2 rounded-full border border-border bg-card hover:bg-neutral-100 dark:hover:bg-neutral-900 text-foreground font-semibold transition-all flex items-center gap-1.5"
              >
                <Linkedin size={13} className="text-blue-600 dark:text-blue-400" />
                <span>LINKEDIN</span>
                <ArrowUpRight size={11} className="opacity-70" />
              </a>
            </div>
          </div>

          {/* Right Column: Prominent Portrait Photo Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end" data-cursor="ADILSHA">
            <div className="w-full max-w-[280px] sm:max-w-[320px]">
              <ProfileImage />
            </div>
          </div>
        </div>

        {/* Perspective Mode Switcher Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border pt-6">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-700 dark:text-neutral-300 font-semibold">
            EXPLORE PERSPECTIVE:
          </span>
          <div className="flex p-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-border">
            <button
              onClick={() => setActiveMode("hardware")}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                activeMode === "hardware"
                  ? "bg-foreground text-background shadow-md"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-foreground"
              }`}
            >
              ⚡ HARDWARE LAB
            </button>
            <button
              onClick={() => setActiveMode("studio")}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
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
        <AnimatePresence mode="wait">
          {activeMode === "hardware" ? (
            <motion.div
              key="hardware"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between text-xs font-mono text-neutral-700 dark:text-neutral-300">
                <span className="font-semibold">[01] EMBEDDED COMPUTING & SIGNAL TELEMETRY</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">STATUS: ACTIVE HARDWARE NODE</span>
              </div>
              <InteractiveOscilloscope />
            </motion.div>
          ) : (
            <motion.div
              key="studio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl border border-border bg-card space-y-4 font-mono text-xs"
            >
              <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300 font-semibold">
                <span>[02] PERFORMANCE MARKETING & CREATIVE DIRECTION</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">7+ CLIENT BRANDS</span>
              </div>
              <p className="text-neutral-800 dark:text-neutral-200 font-sans text-sm leading-relaxed">
                Combining high-converting Meta Ads Manager campaigns (Instant Forms & WhatsApp Funnels) with conversion graphic design across education, healthcare, and commercial sectors.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {clientsList.map((c, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-900 border border-border text-[11px] text-neutral-800 dark:text-neutral-200 font-medium"
                  >
                    {c.name} &bull; <span className="text-neutral-600 dark:text-neutral-400">{c.role}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Infinite Marquee Tickers */}
      <div className="space-y-2 py-4">
        <Marquee items={marqueeKeywords1} speed={30} />
        <Marquee items={marqueeKeywords2} reverse speed={35} />
      </div>

      {/* Selected Engineering Projects with Interactive Floating Follower */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-600 dark:text-neutral-400 font-semibold">
              WORKS ARCHIVE
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-foreground mt-1">
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
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-600 dark:text-neutral-400 font-semibold">
              CREATIVE DIRECTION
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-foreground mt-1">
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
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-8">
        <div className="border-b border-border pb-4">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-600 dark:text-neutral-400 font-semibold">
            CHRONOLOGY
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-foreground mt-1">
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
              className="py-5 border-b border-border/60 flex flex-col md:flex-row md:items-baseline justify-between gap-3 hover:px-2 transition-all"
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
      <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="rounded-3xl border border-border bg-card p-8 sm:p-16 text-center space-y-8 relative overflow-hidden shadow-xl">
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-600 dark:text-neutral-400 font-semibold">
              INITIATE COLLABORATION
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-foreground leading-none">
              LET&apos;S BUILD SOMETHING EXTRAORDINARY.
            </h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 font-sans max-w-lg mx-auto leading-relaxed pt-2">
              Available for robotics training workshops, embedded hardware prototyping, and performance marketing campaigns.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-xs font-mono">
            <a
              href="mailto:mohammedadilshaafsarm@gmail.com"
              data-cursor="EMAIL"
              className="px-6 py-3.5 rounded-full bg-foreground text-background font-bold hover:scale-105 transition-transform inline-flex items-center gap-2 shadow-xl"
            >
              <Mail size={14} />
              <span>MOHAMMEDADILSHAAFSARM@GMAIL.COM</span>
            </a>

            <a
              href="https://wa.me/919946686844"
              target="_blank"
              rel="noreferrer"
              data-cursor="WHATSAPP"
              className="px-6 py-3.5 rounded-full border border-border bg-card text-foreground font-bold hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all inline-flex items-center gap-2"
            >
              <MessageCircle size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span>+91 9946686844</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}