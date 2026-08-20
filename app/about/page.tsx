"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProfileImage } from "@/components/profile-image"
import { ArrowLeft, ArrowUpRight, FileDown } from "lucide-react"

const experience = [
  {
    role: "Technical Staff & Robotics Trainer",
    company: "BenchMark International School",
    location: "Tirur, Malappuram, Kerala",
    period: "July 2024 — Present",
    points: [
      "Leading operations of the Tinkering Lab and mentoring 300+ students in robotics, Arduino programming, and hardware prototyping.",
      "Managing campus-wide IT infrastructure, network switches, IP CCTV surveillance cameras (60+ streams), and POS systems.",
      "Supporting hybrid classroom audio-visual technology and teacher digital enablement.",
    ],
  },
  {
    role: "Performance Marketer & Graphic Designer",
    company: "Freelance",
    location: "Kerala & GCC",
    period: "2023 — Present",
    points: [
      "Planning and managing Facebook & Instagram ad campaigns with targeted lead generation for educational consultancies, colleges, and healthcare brands.",
      "Designing conversion-focused advertising posters, social media banners, and admission campaign creatives.",
      "Building automated lead capture funnels with Meta Instant Forms and WhatsApp Business integrations.",
    ],
  },
  {
    role: "Digital Marketing Intern",
    company: "HiTech Educare",
    location: "Tirur, Kerala",
    period: "Oct 2023 — Mar 2024",
    points: [
      "Managed social media content calendars and designed student-focused promotional creatives for university and study-abroad programs.",
      "Supported digital campaign planning, audience targeting, and weekly performance reporting.",
    ],
  },
  {
    role: "Robotics & Content Creation Head",
    company: "Cybroque Technologies",
    location: "Incubated under IEDC CEV",
    period: "June 2023 — June 2024",
    points: [
      "Developed autonomous mobile robotics platforms and student training kits.",
      "Led creative direction and digital promotional materials for startup initiatives.",
    ],
  },
  {
    role: "Chief Creative Officer",
    company: "IEDC — College of Engineering Vadakara",
    location: "Kerala",
    period: "2022 — 2024",
    points: [
      "Led creative direction, event branding, and promotional visual design for entrepreneurship summits and Kerala Startup Mission (KSUM) initiatives.",
    ],
  },
  {
    role: "Intern — Electronics & IoT",
    company: "Keltron (Kerala State Electronics Development Corp)",
    location: "Kochi, Kerala",
    period: "May 2023",
    points: [
      "Developed IoT microcontroller prototypes and performed industrial sensor interfacing and hardware testing.",
    ],
  },
]

const stackList = [
  {
    category: "Hardware & Embedded",
    items: "Raspberry Pi 4, Arduino Uno/Nano, ESP32, ESP8266, STM32, OpenCV Computer Vision, Embedded C, Python, UART, I2C, SPI, PWM, DC/Servo Motor Drivers, Sensor Interfacing, Breadboard & PCB Prototyping.",
  },
  {
    category: "Networking & IT",
    items: "Cisco CCNA 200-301 (Network Fundamentals), LAN & Router Configuration, Subnetting, VLAN Segmentation, DHCP/DNS, IP CCTV & NVR Systems, POS Infrastructure, Hardware Troubleshooting, Linux.",
  },
  {
    category: "Marketing & Design",
    items: "Meta Ads Manager, Meta Business Suite, Meta Instant Forms, WhatsApp Lead Campaigns, Audience Targeting (Kerala & GCC NRI), A/B Testing, Campaign Optimization, Adobe Photoshop, Adobe Illustrator, Canva Pro.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-20 space-y-16">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Back to Overview</span>
          </Link>
        </div>

        {/* Intro */}
        <section className="space-y-6">
          <div className="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-6">
            <div className="space-y-3 flex-1">
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
                Mohammed Adilsha Afsar M
              </h1>
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Electronics & Communication Engineer &bull; Robotics Trainer &bull; Performance Marketer
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono font-medium">
                Tirur, Malappuram, Kerala, India
              </p>
            </div>
            <div className="w-full max-w-[200px] sm:max-w-[180px] md:max-w-[220px] shrink-0 mx-auto sm:mx-0">
              <ProfileImage />
            </div>
          </div>

          <div className="space-y-4 text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed pt-2">
            <p>
              I graduated with a Bachelor of Technology in Electronics & Communication Engineering from the College of Engineering Vadakara (APJ Abdul Kalam Technological University, KTU) in 2024.
            </p>
            <p>
              My work spans two complementary domains: <strong className="text-foreground">physical embedded computing</strong> (microcontrollers, autonomous robotics, computer vision, and network infrastructure) and <strong className="text-foreground">creative performance marketing</strong> (Meta advertising, conversion funnels, and graphic design).
            </p>
            <p>
              Currently, I lead lab operations and STEM robotics training at BenchMark International School, training over 300+ students while managing the school&apos;s digital network and IT infrastructure. Simultaneously, I work with regional and GCC-focused businesses on digital advertising and brand communication.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono font-semibold">
            <a
              href="/Adilsha_CV.pdf"
              download="Mohammed_Adilsha_CV.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity shadow-sm"
            >
              <FileDown size={13} />
              <span>Download Resume (PDF)</span>
            </a>
            <a
              href="/design-portfolio.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-card hover:bg-neutral-100 dark:hover:bg-neutral-900 text-foreground transition-colors"
            >
              <span>Creative Director Portfolio (PDF)</span>
              <ArrowUpRight size={12} className="opacity-70" />
            </a>
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="space-y-4">
          <div className="border-b border-border pb-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-bold">
              Education & Certifications
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h3 className="font-bold text-foreground">
                  B.Tech in Electronics & Communication Engineering
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                  College of Engineering Vadakara &bull; APJ Abdul Kalam Technological University (KTU)
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 font-semibold">2020 — 2024</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pt-3 border-t border-border/60">
              <div>
                <h3 className="font-bold text-foreground">
                  Cisco Certified Network Associate (CCNA 200-301)
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">Network Fundamentals, Routing & IP Infrastructure</p>
              </div>
              <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 font-semibold">Cisco</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pt-3 border-t border-border/60">
              <div>
                <h3 className="font-bold text-foreground">
                  GEN Emissary Certificate
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">Global Entrepreneurship Network</p>
              </div>
              <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 font-semibold">GEN</span>
            </div>
          </div>
        </section>

        {/* Experience Log */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-bold">
              Career Timeline
            </h2>
          </div>

          <div className="space-y-8">
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-sm font-bold text-foreground">
                    {exp.role}{" "}
                    <span className="text-neutral-600 dark:text-neutral-400 font-normal">&bull; {exp.company}</span>
                  </h3>
                  <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 font-semibold">{exp.period}</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">{exp.location}</p>
                <ul className="space-y-2 text-xs text-neutral-800 dark:text-neutral-200 list-disc list-inside pt-1">
                  {exp.points.map((p, i) => (
                    <li key={i} className="leading-relaxed">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Knowledge */}
        <section className="space-y-4">
          <div className="border-b border-border pb-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-bold">
              Technical & Domain Stack
            </h2>
          </div>

          <div className="space-y-4 text-xs leading-relaxed">
            {stackList.map((st) => (
              <div key={st.category} className="space-y-1 p-4 rounded-xl border border-border bg-card shadow-sm">
                <h3 className="font-bold text-foreground font-mono">
                  {st.category}
                </h3>
                <p className="text-neutral-800 dark:text-neutral-200 mt-1 leading-relaxed">{st.items}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="space-y-2 border-t border-border pt-6">
          <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-bold">
            Languages
          </h2>
          <p className="text-xs text-neutral-800 dark:text-neutral-200 font-medium">
            English (Fluent), Hindi (Proficient), Malayalam (Native), Arabic (Working Knowledge).
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}