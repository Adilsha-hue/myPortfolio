import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mohdadilsha.vercel.app"
const URL = `${SITE_URL}/services/iot-embedded`

export const metadata: Metadata = {
  title: "IoT & Embedded Engineer in Kerala — ESP32, Raspberry Pi | Adilsha",
  description:
    "Mohammed Adilsha Afsar M (Adilsha) — IoT & embedded engineer in Tirur, Kerala: ESP32/ESP8266 firmware, Raspberry Pi + OpenCV, MQTT telemetry, sensor networks, robotic arms & prototypes.",
  keywords: ["IoT Developer Kerala", "Embedded Engineer Tirur", "ESP32 Developer Kerala", "Raspberry Pi Developer", "Adilsha IoT", "IPT Robotics Kerala"],
  alternates: { canonical: URL },
  openGraph: { title: "IoT & Embedded Engineer in Kerala — Adilsha", description: "ESP32, Raspberry Pi, OpenCV, MQTT sensor builds & prototypes.", url: URL, type: "website" },
}

const faqs = [
  { q: "What IoT work do you do?", a: "ESP32/ESP8266 firmware (C/C++, Arduino), Raspberry Pi Python + OpenCV vision, MQTT/WebSocket telemetry, relay control, sensor interfacing over UART/I2C/SPI." },
  { q: "Can you build a prototype for our startup or lab?", a: "Yes — from breadboard to tested prototype with docs. See projects: autonomous trolley with robotic arm, IoT smart home, sensor monitoring systems." },
  { q: "Do you handle IPT / robotics + IoT combos?", a: "Yes — Adilsha combines robotics, IoT telemetry and vision (e.g. trolley + arm + obstacle avoidance) for colleges, startups and school labs." },
]

export default function IotEmbeddedPage() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "ProfessionalService", name: "IoT & Embedded Engineering by Mohammed Adilsha Afsar M", url: URL, areaServed: ["Tirur", "Malappuram", "Kerala", "India"], founder: { "@id": `${SITE_URL}/#person` } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` }, { "@type": "ListItem", position: 3, name: "IoT & Embedded", item: URL }] },
  ]
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-20 space-y-10">
        <nav aria-label="Breadcrumb" className="text-xs text-neutral-500"><Link href="/" className="hover:underline">Home</Link> / <Link href="/services" className="hover:underline">Services</Link> / IoT &amp; Embedded</nav>
        <header className="space-y-4 border-b border-border pb-8">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">IoT &amp; Embedded Engineer in Kerala — Adilsha (Mohammed Adilsha Afsar M)</h1>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">I&apos;m <strong>Adilsha</strong>, B.Tech ECE engineer in Tirur, Kerala. I build <strong>ESP32 / Raspberry Pi / Arduino</strong> systems — smart-home telemetry, sensor networks, robotic arms, OpenCV vision — from firmware to field-tested prototype.</p>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">Flagship: autonomous shopping trolley with 4-DOF arm (B.Tech capstone). More: <Link href="/projects" className="underline">engineering projects</Link>.</p>
        </header>
        <section className="space-y-3">
          <h2 className="text-lg font-bold">What I build</h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            {["ESP32/ESP8266 firmware", "Raspberry Pi + OpenCV", "MQTT / WebSocket telemetry", "Sensor interfacing (UART/I2C/SPI)", "Relay & motor control", "Prototype testing & docs"].map((d) => (<li key={d} className="p-3 rounded-lg border border-border bg-card">{d}</li>))}
          </ul>
        </section>
        <section className="space-y-4">
          <h2 className="text-lg font-bold">Frequently asked questions</h2>
          {faqs.map((f) => (<div key={f.q} className="p-4 rounded-xl border border-border bg-card"><h3 className="text-sm font-bold">{f.q}</h3><p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">{f.a}</p></div>))}
        </section>
        <p className="text-xs"><Link href="/contact" className="underline">Discuss your build →</Link></p>
      </main>
      <Footer />
      {jsonLd.map((s, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />))}
    </div>
  )
}
