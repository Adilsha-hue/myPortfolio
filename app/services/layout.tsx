import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services | Mohammed Adilsha Afsar M",
  description:
    "Robotics & STEM training, embedded systems & IoT development, networking & IT support, and digital marketing services.",
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}