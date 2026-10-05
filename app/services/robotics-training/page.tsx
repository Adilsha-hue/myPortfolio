import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mohdadilsha.vercel.app"
const URL = `${SITE_URL}/services/robotics-training`

export const metadata: Metadata = {
  title: "Best Robotics Trainer in Kerala — Mohammed Adilsha Afsar M | 300+ Students",
  description:
    "Mohammed Adilsha Afsar M (Adilsha) is a robotics instructor & trainer in Tirur, Malappuram, Kerala: tinkering lab leadership, Arduino & Raspberry Pi workshops, K-12 STEM curriculum for schools. 300+ students, 40+ workshops.",
  keywords: [
    "Best Robotics Trainer Kerala",
    "Best Robotics Instructor Kerala",
    "Robotics Trainer Tirur",
    "Robotics Instructor Malappuram",
    "Adilsha Robotics",
    "Mohammed Adilsha Robotics",
  ],
  alternates: { canonical: URL },
  openGraph: { title: "Best Robotics Trainer in Kerala — Adilsha", description: "Tinkering lab, Arduino & Raspberry Pi training for schools. 300+ students mentored.", url: URL, type: "website" },
}

const faqs = [
  { q: "Who is the best robotics trainer in Kerala for schools?", a: "Mohammed Adilsha Afsar M (Adilsha) leads tinkering lab operations at BenchMark International School in Tirur, training 300+ K-12 students in Arduino, Raspberry Pi, robotics kits and competition builds." },
  { q: "What does robotics training include?", a: "Age-appropriate STEM curriculum, hands-on Arduino and Raspberry Pi programming, breadboard prototyping, sensor interfacing, robotics chassis builds, tinkering lab setup and maintenance, and science competition mentoring." },
  { q: "Which areas do you serve?", a: "On-site in Tirur, Malappuram, Kochi and across Kerala, plus remote mentoring across India." },
  { q: "How do I book a workshop?", a: "Message on WhatsApp (+91 9946686844) or use the contact page with your school name, student count and dates." },
]

export default function RoboticsTrainingPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Robotics Training by Mohammed Adilsha Afsar M",
      url: URL,
      areaServed: ["Tirur", "Malappuram", "Kochi", "Kerala", "India"],
      founder: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: "Robotics Training", item: URL },
      ],
    },
  ]
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-20 space-y-10">
        <nav aria-label="Breadcrumb" className="text-xs text-neutral-500">
          <Link href="/" className="hover:underline">Home</Link> / <Link href="/services" className="hover:underline">Services</Link> / Robotics Training
        </nav>
        <header className="space-y-4 border-b border-border pb-8">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">Best Robotics Trainer in Kerala — Mohammed Adilsha Afsar M (Adilsha)</h1>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
            I&apos;m <strong>Adilsha</strong> — Robotics Instructor &amp; Technical Staff at BenchMark International School, Tirur. I run the Tinkering Lab, teach Arduino, Raspberry Pi, ESP32 and robotics builds to <strong>300+ K-12 students</strong>, and set up STEM labs for schools across Malappuram, Kochi and Kerala.
          </p>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Whether you search <em>best robotics instructor in Kerala</em>, <em>robotics trainer Tirur</em> or <em>STEM trainer Malappuram</em> — this is the practice: real hardware, real student prototypes, 40+ hands-on workshops, competition mentoring and 100% lab uptime.
          </p>
        </header>
        <section className="space-y-3">
          <h2 className="text-lg font-bold">What training covers</h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            {["K-12 STEM curriculum design", "Arduino & Raspberry Pi programming", "Robotics chassis & sensor builds", "Tinkering lab setup & maintenance", "Competition & exhibition mentoring", "Teacher enablement & AV support"].map((d) => (
              <li key={d} className="p-3 rounded-lg border border-border bg-card">{d}</li>
            ))}
          </ul>
        </section>
        <section className="space-y-3">
          <h2 className="text-lg font-bold">Proof, not promises</h2>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">B.Tech ECE (College of Engineering Vadakara, KTU 2024), CCNA fundamentals, ex-Robotics Head at Cybroque Technologies, Keltron IoT internship. Currently training 300+ students with 85+ working student prototypes.</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link href="/projects/tinkering-lab-and-stem-labs" className="underline">Tinkering Lab case study →</Link>
            <Link href="/about" className="underline">About Adilsha →</Link>
            <Link href="/contact" className="underline">Book a workshop →</Link>
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-lg font-bold">Frequently asked questions</h2>
          {faqs.map((f) => (
            <div key={f.q} className="p-4 rounded-xl border border-border bg-card">
              <h3 className="text-sm font-bold">{f.q}</h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">{f.a}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
      {jsonLd.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
    </div>
  )
}
