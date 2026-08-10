import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" })

export const metadata: Metadata = {
  title: "Mohammed Adilsha Afsar M - Electronics & Communication Engineer | Robotics & IoT Developer",
  description:
    "Electronics & Communication Engineer, Robotics Trainer and IoT Developer from Kerala, India. Embedded systems, robotics, STEM education, networking and IT support.",
  keywords: [
    "Mohammed Adilsha Afsar M",
    "Robotics Trainer",
    "Electronics Engineer",
    "IoT Developer",
    "Embedded Systems",
    "STEM Education",
    "Arduino",
    "Raspberry Pi",
    "ESP32",
    "Kerala",
  ],
  openGraph: {
    title: "Mohammed Adilsha Afsar M - Robotics & IoT Developer",
    description:
      "Electronics & Communication Engineer, Robotics Trainer and IoT Developer from Kerala, India.",
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}