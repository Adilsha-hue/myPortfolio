import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Mohammed Adilsha Afsar M",
  description: "Get in touch with Mohammed Adilsha Afsar M for robotics training, embedded systems, IoT and IT support.",
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}