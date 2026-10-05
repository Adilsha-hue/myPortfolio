import type { Metadata } from "next"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mohdadilsha.vercel.app"

export const metadata: Metadata = {
  title: "About Mohammed Adilsha Afsar M — Engineer, Robotics Trainer & Marketer in Kerala",
  description:
    "About Mohammed Adilsha Afsar M (Adilsha / Mohd Adilsha): B.Tech ECE engineer, Robotics Instructor & STEM Trainer (300+ students), Performance Marketer, Graphic Designer & IoT developer in Tirur, Malappuram, Kerala, India.",
  keywords: [
    "Mohammed Adilsha Afsar M",
    "Adilsha",
    "Mohammed Adilsha",
    "Mohd Adilsha",
    "Robotics Trainer Kerala",
    "STEM Trainer Kerala",
    "Performance Marketer Kerala",
    "B.Tech ECE Kerala",
  ],
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About Adilsha — Robotics Trainer, Marketer & Engineer, Kerala",
    description:
      "B.Tech ECE, CCNA, robotics training for 300+ students, Meta Ads & design for Kerala brands.",
    url: `${SITE_URL}/about`,
    type: "profile",
  },
}

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: { "@id": `${SITE_URL}/#person` },
  url: `${SITE_URL}/about`,
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
      {children}
    </>
  )
}