import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mohdadilsha.vercel.app"
const URL = `${SITE_URL}/services/digital-marketing`

export const metadata: Metadata = {
  title: "Best Digital Marketer in Kerala — Social, Content & Campaigns | Adilsha",
  description:
    "Mohammed Adilsha Afsar M (Adilsha) — digital marketer in Tirur, Malappuram, Kerala: social media calendars, content strategy, campaign planning & engagement growth for schools, clinics & brands across Kerala & India.",
  keywords: ["Best Digital Marketer Kerala", "Digital Marketer Tirur", "Social Media Marketer Malappuram", "Adilsha Digital Marketing"],
  alternates: { canonical: URL },
  openGraph: { title: "Best Digital Marketer in Kerala — Adilsha", description: "Content calendars, campaign strategy & social growth for Kerala brands.", url: URL, type: "website" },
}

const faqs = [
  { q: "Who is a good digital marketer in Tirur / Malappuram?", a: "Mohammed Adilsha Afsar M (Adilsha) manages content calendars, creatives and paid + organic campaigns for education and healthcare brands — ex-HiTech Educare, IEDC creative lead." },
  { q: "Do you handle monthly social media?", a: "Yes — calendars, poster/Reel creatives, captions, posting rhythm and monthly performance review." },
  { q: "Organic or paid?", a: "Both — organic builds trust, Meta Ads buys speed. Most clients run a hybrid with WhatsApp lead capture." },
]

export default function DigitalMarketingPage() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "ProfessionalService", name: "Digital Marketing by Mohammed Adilsha Afsar M", url: URL, areaServed: ["Tirur", "Malappuram", "Kerala", "India"], founder: { "@id": `${SITE_URL}/#person` } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` }, { "@type": "ListItem", position: 3, name: "Digital Marketing", item: URL }] },
  ]
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-20 space-y-10">
        <nav aria-label="Breadcrumb" className="text-xs text-neutral-500"><Link href="/" className="hover:underline">Home</Link> / <Link href="/services" className="hover:underline">Services</Link> / Digital Marketing</nav>
        <header className="space-y-4 border-b border-border pb-8">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">Best Digital Marketer in Kerala — Adilsha (Mohammed Adilsha Afsar M)</h1>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">I&apos;m <strong>Adilsha</strong>, a digital marketer in Tirur, Kerala — content calendars, brand positioning, social management and campaign strategy for schools, clinics and SMBs. Former Digital Marketing (HiTech Educare) and Chief Creative Officer (IEDC CEV).</p>
        </header>
        <section className="space-y-3">
          <h2 className="text-lg font-bold">Digital marketing services</h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            {["Monthly content calendars", "Social page management", "Campaign & launch planning", "Creative strategy & copy", "Audience & competitor research", "Monthly growth reporting"].map((d) => (<li key={d} className="p-3 rounded-lg border border-border bg-card">{d}</li>))}
          </ul>
        </section>
        <section className="space-y-4">
          <h2 className="text-lg font-bold">Frequently asked questions</h2>
          {faqs.map((f) => (<div key={f.q} className="p-4 rounded-xl border border-border bg-card"><h3 className="text-sm font-bold">{f.q}</h3><p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">{f.a}</p></div>))}
        </section>
        <p className="text-xs"><Link href="/marketing" className="underline">See marketing work →</Link> · <Link href="/contact" className="underline">Start a plan →</Link></p>
      </main>
      <Footer />
      {jsonLd.map((s, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />))}
    </div>
  )
}
