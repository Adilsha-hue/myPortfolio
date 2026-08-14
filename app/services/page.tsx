"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

const services = [
  {
    title: "Robotics Training & STEM Education",
    forWho: "Schools & Educational Hubs",
    description:
      "Hands-on robotics workshops, Arduino & Raspberry Pi programming, customized K-12 STEM curricula, and science competition mentoring. Currently training 300+ students at BenchMark International School.",
    deliverables: [
      "Tailored age-appropriate STEM curricula",
      "Hands-on hardware & robotics kit workshops",
      "Tinkering lab setup & equipment maintenance",
      "Student project mentoring & competition prep",
    ],
  },
  {
    title: "Embedded Systems & IoT Prototyping",
    forWho: "Startups, Researchers & Product Teams",
    description:
      "End-to-end prototyping and firmware development using ESP32, ESP8266, Raspberry Pi, and Arduino with wireless sensor telemetry and cloud integration.",
    deliverables: [
      "Microcontroller firmware (C/C++ & Python)",
      "Sensor interfacing over UART, I2C & SPI",
      "Wireless IoT telemetry (MQTT / WebSockets)",
      "Hardware testing, breadboard assembly & debugging",
    ],
  },
  {
    title: "Performance Marketing & Ad Creatives",
    forWho: "Education, Healthcare & SMBs",
    description:
      "Data-driven paid advertising on Facebook and Instagram paired with conversion-focused graphic design for client acquisition across Kerala and GCC NRI markets.",
    deliverables: [
      "Meta Ads campaign setup, targeting & Instant Forms",
      "WhatsApp lead capture & qualification funnels",
      "Social media posters, admission banners & creatives",
      "Weekly CTR, CPA & ROAS optimization",
    ],
  },
  {
    title: "Campus Networking & IT Infrastructure",
    forWho: "Schools, Offices & Commercial Facilities",
    description:
      "Reliable enterprise network setup, IP CCTV surveillance deployment, POS systems maintenance, and on-site hardware troubleshooting backed by CCNA fundamentals.",
    deliverables: [
      "LAN, router configuration & VLAN segmentation",
      "IP CCTV camera network & NVR surveillance setup",
      "Computer lab & classroom audio-visual maintenance",
      "Hardware troubleshooting & preventive servicing",
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-20 space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-foreground transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Back to Overview</span>
          </Link>
        </div>

        {/* Header */}
        <header className="space-y-3 border-b border-neutral-200 dark:border-neutral-800 pb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Services & Offerings
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
            Engineering solutions, hands-on STEM education, and performance marketing consulting.
          </p>
        </header>

        {/* Services List */}
        <section className="space-y-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/40 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  {service.title}
                </h2>
                <span className="text-xs font-mono text-neutral-400">{service.forWho}</span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60">
                <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                  Key Deliverables
                </p>
                <ul className="grid sm:grid-cols-2 gap-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                  {service.deliverables.map((d, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* Bottom CTA */}
        <footer className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Have a specific project requirement?
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Let&apos;s discuss scope, hardware components, or campaign objectives.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-md bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 text-xs font-medium shrink-0"
          >
            <span>Inquire now</span>
            <ArrowUpRight size={12} />
          </Link>
        </footer>
      </main>

      <Footer />
    </div>
  )
}