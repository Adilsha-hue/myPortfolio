import type React from "react"
import "@/app/globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

export const metadata = {
  title: "Mohammed Adilsha Afsar M - Robotics Trainer & Graphic Designer",
  description: "Personal portfolio website showcasing robotics training programs and graphic design work",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <AnimatedBackground />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

