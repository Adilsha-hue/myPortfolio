import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransition } from "@/components/page-transition"
import { Toaster } from "sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" })

export const metadata: Metadata = {
  title: "Mohammed Adilsha Afsar M | Embedded Systems, Robotics & Growth Marketing",
  description:
    "Official portfolio of Mohammed Adilsha Afsar M — Electronics & Communication Engineer, Robotics Trainer, and Performance Marketer from Kerala, India.",
  keywords: [
    "Mohammed Adilsha Afsar M",
    "Adilsha Portfolio",
    "Robotics Trainer Kerala",
    "Embedded Systems Engineer",
    "IoT Developer Kerala",
    "Meta Ads Specialist",
    "Creative Director Portfolio",
    "Tinkering Lab STEM",
    "OpenCV Computer Vision",
    "CCNA Network Engineer",
  ],
  authors: [{ name: "Mohammed Adilsha Afsar M" }],
  creator: "Mohammed Adilsha Afsar M",
  openGraph: {
    title: "Mohammed Adilsha Afsar M - Engineer, Robotics Trainer & Growth Marketer",
    description:
      "Bridging deep hardware engineering (Raspberry Pi, ESP32, OpenCV) with high-converting creative performance marketing.",
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
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased selection:bg-primary selection:text-primary-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <PageTransition />
          {children}
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}