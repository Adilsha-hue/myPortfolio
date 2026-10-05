import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mohdadilsha.vercel.app"
const URL = `${SITE_URL}/services/performance-marketing`

export const metadata: Metadata = {
  title: "Best Performance Marketer in Kerala — Meta Ads & Leads | Adilsha",
  description:
    "Mohammed Adilsha Afsar M (Adilsha) — performance marketer in Tirur, Kerala: Facebook & Instagram Ads, Instant Forms, WhatsApp lead funnels, Kerala & GCC targeting, CTR/CPA/ROAS optimization for education, healthcare & SMBs.",
  keywords: ["Best Performance Marketer Kerala", "Meta Ads Expert Kerala", "Facebook Ads Tirur", "Performance Marketer Malappuram", "Adilsha Marketing", "Lead Generation Kerala"],
  alternates: { canonical: URL },
  openGraph: { title: "Best Performance Marketer in Kerala — Adilsha", description: "Meta Ads + WhatsApp funnels that generate admissions & appointments.", url: URL, type: "website" },
}

const faqs = [
  { q: "Who is the best performance marketer in Kerala?", a: "Mohammed Adilsha Afsar M (Adilsha) runs Meta Ads for education, healthcare and local brands across Kerala & GCC — Instant Forms, WhatsApp funnels, audience segmentation and weekly CTR/CPA optimization." },
  { q: "What platforms do you run ads on?", a: "Facebook & Instagram via Meta Ads Manager and Business Suite, driving to Instant Forms or WhatsApp Business." },
  { q: "Which industries?", a: "Education & admissions, dental & healthcare, photography, professional services, retail SMBs." },
  { q: "How do we start?", a: "Share your offer, geography and monthly budget on WhatsApp (+91 9946686844) — you get targeting, creative and funnel plan within 48 hours." },
]

export default function PerformanceMarketingPage() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "ProfessionalService", name: "Performance Marketing by Mohammed Adilsha Afsar M", url: URL, areaServed: ["Tirur", "Malappuram", "Kochi", "Kerala", "India"], founder: { "@id": `${SITE_URL}/#person` } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` }, { "@type": "ListItem", position: 3, name: "Performance Marketing", item: URL }] },
  ]
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-20 space-y-10">
        <nav aria-label="Breadcrumb" className="text-xs text-neutral-500"><Link href="/" className="hover:underline">Home</Link> / <Link href="/services" className="hover:underline">Services</Link> / Performance Marketing</nav>
        <header className="space-y-4 border-b border-border pb-8">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">Best Performance Marketer in Kerala — Adilsha (Mohammed Adilsha Afsar M)</h1>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">I&apos;m <strong>Adilsha</strong>, a performance marketer in Tirur, Kerala. I plan, launch and optimize <strong>Meta Ads</strong> (Facebook &amp; Instagram) with <strong>Instant Forms + WhatsApp funnels</strong> for colleges, schools, dental clinics and local businesses — Kerala &amp; GCC NRI audiences.</p>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">Clients include HiTech Educare, Jay Bharath College, BenchMark International School, Metanoia &amp; Kenz Dental, Tales of Lens and Dr. Gude International. Work samples: <Link href="/marketing" className="underline">marketing hub</Link>.</p>
        </header>
        <section className="space-y-3">
          <h2 className="text-lg font-bold">What you get</h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            {["Campaign setup & Kerala/GCC targeting", "Instant Forms + WhatsApp funnels", "Ad creatives & copy angles", "A/B testing & retargeting", "Weekly CTR/CPA reporting", "Landing & lead-flow fixes"].map((d) => (<li key={d} className="p-3 rounded-lg border border-border bg-card">{d}</li>))}
          </ul>
        </section>
        <section className="space-y-4">
          <h2 className="text-lg font-bold">Frequently asked questions</h2>
          {faqs.map((f) => (<div key={f.q} className="p-4 rounded-xl border border-border bg-card"><h3 className="text-sm font-bold">{f.q}</h3><p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">{f.a}</p></div>))}
        </section>
        <p className="text-xs"><Link href="/contact" className="underline">Get a campaign plan →</Link> · <a className="underline" href="https://wa.me/919946686844">WhatsApp Adilsha →</a></p>
      </main>
      <Footer />
      {jsonLd.map((s, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />))}
    </div>
  )
}
