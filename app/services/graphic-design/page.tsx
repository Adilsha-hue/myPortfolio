import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mohdadilsha.vercel.app"
const URL = `${SITE_URL}/services/graphic-design`

export const metadata: Metadata = {
  title: "Best Graphic Designer in Kerala — Ads, Posters & Branding | Adilsha",
  description:
    "Mohammed Adilsha Afsar M (Adilsha) — graphic designer in Tirur, Kerala: conversion ad creatives, admission banners, dental & clinic branding, social posters & print graphics in Photoshop, Illustrator & Canva Pro.",
  keywords: ["Best Graphic Designer Kerala", "Graphic Designer Tirur", "Poster Designer Malappuram", "Ad Creative Designer Kerala", "Adilsha Design"],
  alternates: { canonical: URL },
  openGraph: { title: "Best Graphic Designer in Kerala — Adilsha", description: "Ad creatives, posters & branding that convert. 11-page portfolio.", url: URL, type: "website" },
}

const faqs = [
  { q: "Who is a good graphic designer in Kerala for ads?", a: "Mohammed Adilsha Afsar M (Adilsha) designs conversion-focused Meta ad creatives, admission banners and clinic branding — see the 11-page design portfolio PDF on this site." },
  { q: "What tools?", a: "Adobe Photoshop, Adobe Illustrator and Canva Pro — print-ready + social sizes, with typography and ad-psychology layouts." },
  { q: "Can you match our brand?", a: "Yes — share your logo, colors and 2 references; first concepts typically in 48–72 hours." },
]

export default function GraphicDesignPage() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "ProfessionalService", name: "Graphic Design by Mohammed Adilsha Afsar M", url: URL, areaServed: ["Tirur", "Malappuram", "Kerala", "India"], founder: { "@id": `${SITE_URL}/#person` } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` }, { "@type": "ListItem", position: 3, name: "Graphic Design", item: URL }] },
  ]
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-20 space-y-10">
        <nav aria-label="Breadcrumb" className="text-xs text-neutral-500"><Link href="/" className="hover:underline">Home</Link> / <Link href="/services" className="hover:underline">Services</Link> / Graphic Design</nav>
        <header className="space-y-4 border-b border-border pb-8">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">Best Graphic Designer in Kerala — Adilsha (Mohammed Adilsha Afsar M)</h1>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">I&apos;m <strong>Adilsha</strong>, a graphic designer in Tirur, Kerala. I design <strong>ad creatives that sell</strong> — Meta ad posters, admission banners, dental &amp; healthcare branding, event promotions and social kits — for 7+ Kerala brands.</p>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">Full work: <a className="underline" href="/design-portfolio.pdf" target="_blank" rel="noreferrer">11-page design portfolio (PDF)</a> and <Link href="/marketing" className="underline">marketing gallery</Link>.</p>
        </header>
        <section className="space-y-3">
          <h2 className="text-lg font-bold">Design deliverables</h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            {["Meta ad creatives & carousels", "Admission & event banners", "Clinic & brand identity kits", "Social posters & Reel covers", "Print-ready flex & flyers", "Rush 48-hr delivery option"].map((d) => (<li key={d} className="p-3 rounded-lg border border-border bg-card">{d}</li>))}
          </ul>
        </section>
        <section className="space-y-4">
          <h2 className="text-lg font-bold">Frequently asked questions</h2>
          {faqs.map((f) => (<div key={f.q} className="p-4 rounded-xl border border-border bg-card"><h3 className="text-sm font-bold">{f.q}</h3><p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">{f.a}</p></div>))}
        </section>
        <p className="text-xs"><Link href="/contact" className="underline">Request designs →</Link></p>
      </main>
      <Footer />
      {jsonLd.map((s, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />))}
    </div>
  )
}
