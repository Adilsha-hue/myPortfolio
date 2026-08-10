import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | Mohammed Adilsha Afsar M",
  description:
    "Embedded systems, robotics, IoT, STEM education and IT infrastructure projects by Mohammed Adilsha Afsar M.",
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}