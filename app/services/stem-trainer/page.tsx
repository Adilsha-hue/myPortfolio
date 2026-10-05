import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mohdadilsha.vercel.app"
const URL = `${SITE_URL}/services/stem-trainer`

export const metadata: Metadata = {
  title: "Best STEM Trainer in Kerala — Tinkering Lab & ATL Mentor | Adilsha",
  description:
    "Mohammed Adilsha Afsar M (Adilsha) — STEM trainer in Tirur, Kerala: tinkering lab & ATL setup, Arduino/Raspberry Pi curriculum, design thinking & hardware debugging for K-12 schools across Kerala & India.",
  keywords: ["Best STEM Trainer Kerala", "Tinkering Lab Trainer Kerala", "ATL Lab Mentor", "STEM Trainer Tirur", "Adilsha STEM"],
  alternates: { canonical: URL },
  openGraph: { title: "Best STEM Trainer in Kerala — Adilsha", description: "Tinkering lab & STEM curriculum for schools. 300+ students, 40+ workshops.", url: URL, type: "website" },
}

const faqs = [
  { q: "Who is a good STEM trainer for schools in Kerala?", a: "Mohammed Adilsha Afsar M (Adilsha) runs tinkering lab operations at BenchMark International School, Tirur — project-based STEM learning, Arduino/Raspberry Pi, 3D prototyping and design thinking for K-12." },
  { q: "Can you set up our tinkering / ATL lab?", a: "Yes — procurement, equipment layout, safety practices, soldering stations, multimeters, kits, plus teacher training and maintenance schedules." },
  { q: "Do you offer competition mentoring?", a: "Yes — robotics competitions, science exhibitions and innovation challenges, from chassis wiring to presentation prep." },
]

export default function StemTrainerPage() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "ProfessionalService", name: "STEM Training by Mohammed Adilsha Afsar M", url: URL, areaServed: ["Tirur", "Malappuram", "Kerala", "India"], founder: { "@id": `${SITE_URL}/#person` } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` }, { "@type": "ListItem", position: 3, name: "STEM Trainer", item: URL }] },
  ]
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-20 space-y-10">
        <nav aria-label="Breadcrumb" className="text-xs text-neutral-500"><Link href="/" className="hover:underline">Home</Link> / <Link href="/services" className="hover:underline">Services</Link> / STEM Trainer</nav>
        <header className="space-y-4 border-b border-border pb-8">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">Best STEM Trainer in Kerala — Adilsha (Mohammed Adilsha Afsar M)</h1>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">I&apos;m <strong>Adilsha</strong>, a STEM trainer in Tirur, Malappuram: I turn classrooms into innovation hubs — circuits, breadboards, Arduino programming, robotics kits, soldering, multimeters and computational thinking, tailored by age group.</p>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">Searching <em>best STEM trainer Kerala</em>, <em>tinkering lab mentor</em> or <em>ATL lab trainer</em>? 300+ students trained, 85+ prototypes built, 40+ hands-on labs delivered.</p>
        </header>
        <section className="space-y-3">
          <h2 className="text-lg font-bold">STEM services for schools</h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            {["Progressive K-12 STEM curriculum", "Arduino & robotics kits", "Breadboard & PCB prototyping", "Soldering & measurement safety", "Design thinking projects", "Exhibition & olympiad prep"].map((d) => (
              <li key={d} className="p-3 rounded-lg border border-border bg-card">{d}</li>
            ))}
          </ul>
        </section>
        <section className="space-y-4">
          <h2 className="text-lg font-bold">Frequently asked questions</h2>
          {faqs.map((f) => (<div key={f.q} className="p-4 rounded-xl border border-border bg-card"><h3 className="text-sm font-bold">{f.q}</h3><p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">{f.a}</p></div>))}
        </section>
        <p className="text-xs"><Link href="/contact" className="underline">Invite Adilsha to your school →</Link></p>
      </main>
      <Footer />
      {jsonLd.map((s, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />))}
    </div>
  )
}
