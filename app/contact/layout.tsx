import type { Metadata } from "next"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mohdadilsha.vercel.app"

export const metadata: Metadata = {
  title: "Contact Adilsha — Hire for Robotics Training, IoT, Marketing & Design",
  description:
    "Contact Mohammed Adilsha Afsar M (Adilsha) in Tirur, Kerala: hire for robotics & STEM training, embedded IoT builds, performance marketing, graphic design & video editing. Email, WhatsApp +91 9946686844.",
  keywords: [
    "Contact Adilsha",
    "Hire Robotics Trainer Kerala",
    "Hire Performance Marketer Kerala",
    "Mohammed Adilsha Contact",
  ],
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact Adilsha — Kerala",
    description: "Robotics training, IoT, marketing & design inquiries. Replies within 24 hours.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}