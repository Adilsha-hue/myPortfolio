import type { Metadata } from "next"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mohdadilsha.vercel.app"

export const metadata: Metadata = {
  title: "Engineering & Robotics Projects — Raspberry Pi, ESP32, OpenCV",
  description:
    "Projects by Mohammed Adilsha Afsar M (Adilsha): autonomous shopping trolley with robotic arm, IoT smart home, autonomous robotics, tinkering lab STEM, sensor systems & campus networking in Kerala, India.",
  keywords: [
    "Raspberry Pi Projects Kerala",
    "ESP32 IoT Projects",
    "OpenCV Robotics",
    "Adilsha Projects",
    "Autonomous Robot India",
    "Tinkering Lab Projects",
  ],
  alternates: { canonical: `${SITE_URL}/projects` },
  openGraph: {
    title: "Engineering & Robotics Projects — Adilsha",
    description: "Autonomous robotics, IoT, computer vision & STEM case studies from Kerala.",
    url: `${SITE_URL}/projects`,
    type: "website",
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}