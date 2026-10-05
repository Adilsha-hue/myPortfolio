import type { Metadata } from "next"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mohdadilsha.vercel.app"

export const metadata: Metadata = {
  title: "Services — Robotics Training, IoT, Marketing, Design & Video Editing in Kerala",
  description:
    "Services by Mohammed Adilsha Afsar M (Adilsha) in Kerala, India: robotics & STEM training for schools, embedded IoT prototyping, performance & digital marketing, graphic design, video editing, campus networking & IT support.",
  keywords: [
    "Robotics Training Kerala",
    "STEM Trainer Kerala",
    "IoT Development Kerala",
    "Performance Marketing Kerala",
    "Graphic Design Kerala",
    "Video Editing Kerala",
    "Adilsha Services",
  ],
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: "Services — Adilsha | Robotics, IoT, Marketing, Design, Video",
    description:
      "Robotics training, IoT builds, Meta Ads, graphic design & video editing in Tirur, Kerala.",
    url: `${SITE_URL}/services`,
    type: "website",
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}