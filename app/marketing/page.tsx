"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LightboxGallery } from "@/components/lightbox-gallery"
import { ArrowUpRight, ArrowLeft, FileDown, MessageCircle } from "lucide-react"

const clients = [
  {
    name: "HiTech Educare",
    sector: "Education Consultancy",
    work: "Lead generation funnels, Meta Ads, and university admission creative campaigns.",
  },
  {
    name: "Jay Bharath College",
    sector: "Higher Education",
    work: "Admission campaign creatives, digital event branding, and social media marketing.",
  },
  {
    name: "BenchMark International School",
    sector: "K-12 Education",
    work: "Academic admission campaigns, event promotions, digital communication, and school marketing assets.",
  },
  {
    name: "Metanoia Pediatric Dental Care",
    sector: "Healthcare / Dental",
    work: "Social media advertising creatives, pediatric dental awareness, and appointment generation.",
  },
  {
    name: "Kenz Dental Care",
    sector: "Healthcare / Dental",
    work: "Promotional creatives, dental service ads, and WhatsApp inquiry campaigns.",
  },
  {
    name: "Tales of Lens",
    sector: "Photography",
    work: "Visual campaign design, promotional social posters, and brand communication.",
  },
  {
    name: "Dr. Gude International",
    sector: "Professional Services",
    work: "International promotional flyers, digital advertising, and corporate branding communication.",
  },
]

const servicesList = [
  {
    title: "Meta Advertising & Paid Performance",
    desc: "Targeted campaigns across Facebook & Instagram, custom audience segmentation for Kerala and GCC NRI markets, Meta Instant Forms, and WhatsApp lead acquisition.",
  },
  {
    title: "Graphic Design & Conversion Creatives",
    desc: "Social media advertising posters, admission banners, clinic branding, reels covers, and high-resolution print-ready graphics designed around advertising psychology.",
  },
  {
    title: "Campaign Strategy & Content Planning",
    desc: "Content calendars, brand positioning, organic social management, A/B creative testing, and weekly CTR/CPA performance monitoring.",
  },
]

const cvHighlights = {
  experience: [
    {
      role: "Performance Marketer & Graphic Designer",
      org: "Freelance · Multiple Businesses & Brands",
      period: "2023 — Present",
      detail: "Meta Ads for lead generation across education, healthcare, dental, photography and professional services — Kerala & GCC targeting, Instant Forms and WhatsApp funnels.",
    },
    {
      role: "Digital Marketing",
      org: "HiTech Educare",
      period: "Oct 2023 — Mar 2024",
      detail: "Facebook & Instagram content calendars, promotional creatives for education consultancy campaigns, engagement monitoring.",
    },
    {
      role: "Chief Creative Officer",
      org: "IEDC · College of Engineering Vadakara",
      period: "2022 — 2024",
      detail: "Led creative direction and visual communication for entrepreneurship and startup initiatives; event branding and campaign materials.",
    },
  ],
  skillGroups: [
    {
      label: "Performance Marketing",
      items: ["Meta Ads", "Lead Generation", "Instant Forms", "WhatsApp Campaigns", "Audience Targeting", "A/B Testing", "Retargeting"],
    },
    {
      label: "Digital Marketing",
      items: ["Social Media Marketing", "Content Calendars", "Campaign Strategy", "Creative Strategy", "Brand Communication"],
    },
    {
      label: "Graphic Design",
      items: ["Canva", "Adobe Photoshop", "Adobe Illustrator", "Ad Creatives", "Promotional Posters", "Branding"],
    },
  ],
  industries: ["Education & Admissions", "Healthcare & Dental", "Photography", "Professional Services", "Kerala Market", "GCC / NRI Audience"],
}

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-20 space-y-16">
        {/* Header */}
        <section className="space-y-4 pt-4 border-b border-border pb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Back to Overview</span>
          </Link>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            Performance Marketing & Creative Direction
          </h1>

          <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed max-w-2xl">
            I help businesses in education, healthcare, and professional services generate leads and build recognizable visual identities through Meta Ads and conversion-focused design.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono font-semibold">
            <a
              href="/Adilsha_Performance_Marketing_CV.pdf"
              target="_blank"
              rel="noreferrer"
              download="Mohammed_Adilsha_Afsar_M_Performance_Marketing_CV.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-700 text-white hover:bg-emerald-600 transition-colors shadow-sm"
            >
              <FileDown size={13} />
              <span>Download Marketing CV (PDF)</span>
            </a>

            <a
              href="/design-portfolio.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity shadow-sm"
            >
              <FileDown size={13} />
              <span>Download 11-Page Creative Book (PDF)</span>
            </a>

            <a
              href="https://wa.me/919946686844?text=Hi%20Adilsha,%20I'd%20like%20to%20discuss%20a%20marketing%20campaign"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-card hover:bg-neutral-100 dark:hover:bg-neutral-900 text-foreground transition-colors"
            >
              <MessageCircle size={13} className="text-emerald-600 dark:text-emerald-400" />
              <span>Discuss a Campaign on WhatsApp</span>
              <ArrowUpRight size={12} className="opacity-70" />
            </a>
          </div>
        </section>

        {/* Gallery */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-bold">
              Selected Creative Plates
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Click any piece to inspect typography and visual execution in full resolution.
            </p>
          </div>

          <LightboxGallery />
        </section>

        {/* Core Capabilities */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-bold">
              Marketing Capabilities
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {servicesList.map((srv, idx) => (
              <div key={idx} className="space-y-2 p-5 rounded-xl border border-border bg-card shadow-sm">
                <h3 className="text-sm font-bold text-foreground">
                  {srv.title}
                </h3>
                <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed mt-1">
                  {srv.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CV Highlights */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-3 gap-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-bold">
              From the Marketing CV
            </h2>
            <a
              href="/Adilsha_Performance_Marketing_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 transition-colors shrink-0"
            >
              <FileDown size={12} />
              <span>Full PDF</span>
              <ArrowUpRight size={11} className="opacity-70" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {cvHighlights.experience.map((exp, idx) => (
              <div key={idx} className={`p-5 rounded-xl border border-border bg-card shadow-sm ${idx === 0 ? "md:col-span-2" : ""}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <h3 className="text-sm font-bold text-foreground">{exp.role}</h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">{exp.period}</span>
                </div>
                <p className="text-[11px] font-mono uppercase tracking-wide text-emerald-700 dark:text-emerald-400 mt-0.5">{exp.org}</p>
                <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed mt-1.5">{exp.detail}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {cvHighlights.skillGroups.map((group) => (
              <div key={group.label} className="space-y-2 p-4 rounded-xl border border-border bg-card shadow-sm">
                <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">{group.label}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={item} className="text-[10px] px-2 py-0.5 rounded-full border border-border bg-neutral-100/70 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {cvHighlights.industries.map((ind) => (
              <span key={ind} className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                {ind}
              </span>
            ))}
          </div>
        </section>

        {/* Clients list */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-bold">
              Client Collaborations
            </h2>
          </div>

          <div className="space-y-4">
            {clients.map((client, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-border/60 pb-3 last:border-none">
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    {client.name}{" "}
                    <span className="text-neutral-600 dark:text-neutral-400 text-xs font-normal">
                      &bull; {client.sector}
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-0.5">{client.work}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Inquire CTA */}
        <section className="p-6 rounded-2xl border border-border bg-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-foreground">
              Need marketing campaigns or creative assets?
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Let&apos;s discuss your target audience, campaign goals, and timeline.
            </p>
          </div>

          <a
            href="https://wa.me/919946686844"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background text-xs font-bold shrink-0 hover:opacity-90 transition-opacity"
          >
            <span>Start a conversation</span>
            <ArrowUpRight size={13} />
          </a>
        </section>
      </main>

      <Footer />
    </div>
  )
}
