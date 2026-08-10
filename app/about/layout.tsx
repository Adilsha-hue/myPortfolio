import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Mohammed Adilsha Afsar M",
  description:
    "Electronics & Communication Engineer, Robotics Trainer and IoT Developer from Kerala, India.",
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}