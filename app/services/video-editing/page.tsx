import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mohdadilsha.vercel.app"
const URL = `${SITE_URL}/services/video-editing`

export const metadata: Metadata = {
  title: "Best Video Editor in Kerala — Reels, Ads & YouTube | Adilsha",
  description:
    "Mohammed Adilsha Afsar M (Adilsha) — video editor in Tirur, Kerala: Reels/Shorts, Meta ad videos, YouTube edits, captions, color & sound for schools, clinics & brands across Kerala & India.",
  keywords: ["Best Video Editor Kerala", "Video Editor Tirur", "Reels Editor Kerala", "YouTube Editor Malappuram", "Adilsha Video Editing"],
  alternates: { canonical: URL },
  openGraph: { title: "Best Video Editor in Kerala — Adilsha", description: "Reels, ad videos & YouTube edits with hooks, captions & pacing.", url: URL, type: "website" },
}

const faqs = [
  { q: "Do you edit Reels and ad videos?", a: "Yes — hooks in the first 2 seconds, captions, b-roll, color and sound mastering sized for 9:16 Reels/Shorts and 1:1/16:9 ads." },
  { q: "What do you need from me?", a: "Raw clips + goal (admissions, appointments, sales) + one reference style. I handle cuts, captions, music and thumbnails." },
  { q: "Turnaround?", a: "Short-form typically 48–72 hours; bulk monthly packs on request via the contact page." },
]

export default function VideoEditingPage() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "ProfessionalService", name: "Video Editing by Mohammed Adilsha Afsar M", url: URL, areaServed: ["Tirur", "Malappuram", "Kerala", "India"], founder: { "@id": `${SITE_URL}/#person` } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` }, { "@type": "ListItem", position: 3, name: "Video Editing", item: URL }] },
  ]
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-20 space-y-10">
        <nav aria-label="Breadcrumb" className="text-xs text-neutral-500"><Link href="/" className="hover:underline">Home</Link> / <Link href="/services" className="hover:underline">Services</Link> / Video Editing</nav>
        <header className="space-y-4 border-b border-border pb-8">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">Best Video Editor in Kerala — Adilsha (Mohammed Adilsha Afsar M)</h1>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">I&apos;m <strong>Adilsha</strong>, a video editor in Tirur, Kerala for <strong>Reels, Meta ad videos and YouTube</strong> — fast hooks, clean captions, pacing, color and sound — for schools, clinics and local brands.</p>
        </header>
        <section className="space-y-3">
          <h2 className="text-lg font-bold">Editing deliverables</h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            {["Reels / Shorts editing", "Meta ad video cuts", "YouTube long-form edits", "Captions & hook titles", "Color & audio cleanup", "Thumbnails & covers"].map((d) => (<li key={d} className="p-3 rounded-lg border border-border bg-card">{d}</li>))}
          </ul>
        </section>
        <section className="space-y-4">
          <h2 className="text-lg font-bold">Frequently asked questions</h2>
          {faqs.map((f) => (<div key={f.q} className="p-4 rounded-xl border border-border bg-card"><h3 className="text-sm font-bold">{f.q}</h3><p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">{f.a}</p></div>))}
        </section>
        <p className="text-xs"><Link href="/contact" className="underline">Send your clips →</Link> · <Link href="/marketing" className="underline">See creative work →</Link></p>
      </main>
      <Footer />
      {jsonLd.map((s, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />))}
    </div>
  )
}
