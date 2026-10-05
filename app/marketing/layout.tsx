import type { Metadata } from "next"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mohdadilsha.vercel.app"

export const metadata: Metadata = {
  title: "Performance Marketing & Creative Direction in Kerala",
  description:
    "Mohammed Adilsha Afsar M (Adilsha) — Performance Marketer & Digital Marketer in Tirur, Kerala: Meta Ads, WhatsApp lead funnels, graphic design & video editing for education, healthcare & SMBs in Kerala & India.",
  keywords: [
    "Performance Marketer Kerala",
    "Digital Marketer Tirur",
    "Meta Ads Expert Kerala",
    "Mohammed Adilsha Marketing",
    "Adilsha Ads",
    "Graphic Designer Kerala",
    "Lead Generation Kerala",
  ],
  alternates: { canonical: `${SITE_URL}/marketing` },
  openGraph: {
    title: "Performance Marketing & Creative Direction — Adilsha, Kerala",
    description:
      "Meta Ads, WhatsApp funnels, graphic design & video editing by Mohammed Adilsha Afsar M for Kerala & India brands.",
    url: `${SITE_URL}/marketing`,
    type: "website",
  },
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Performance Marketing & Creative Direction — Mohammed Adilsha Afsar M",
    url: `${SITE_URL}/marketing`,
    areaServed: ["Tirur", "Malappuram", "Kochi", "Kerala", "India"],
    founder: { "@id": `${SITE_URL}/#person` },
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
