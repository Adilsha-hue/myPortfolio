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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mohdadilsha.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Mohammed Adilsha Afsar M | Performance Marketer, Digital Marketer, Graphic Designer, Video Editor & Robotics Trainer in Kerala",
    template: "%s | Mohammed Adilsha Afsar M",
  },
  description:
    "Official portfolio of Mohammed Adilsha Afsar M (Adilsha / Mohd Adilsha) — Performance Marketer, Digital Marketer, Graphic Designer, Video Editor, Robotics Instructor, STEM Trainer & IoT Embedded Engineer in Tirur, Malappuram, Kerala, India. 300+ students mentored, 7+ brands, Meta Ads, WhatsApp funnels, Arduino, ESP32, Raspberry Pi.",
  keywords: [
    // Name variations — so "adil", "adilsha", "mohammed adilsha" all match
    "Mohammed Adilsha Afsar M",
    "Mohammed Adilsha",
    "Adilsha",
    "Adilsha Afsar",
    "Mohd Adilsha",
    "Adil",
    "Adilsha Portfolio",
    "Mohammed Adilsha Afsar M portfolio",
    // Role + location intent
    "Performance Marketer in Kerala",
    "Performance Marketer Tirur",
    "Performance Marketer Malappuram",
    "Digital Marketer in Kerala",
    "Digital Marketer Tirur",
    "Graphic Designer in Kerala",
    "Graphic Designer Tirur",
    "Graphic Designer Malappuram",
    "Video Editor in Kerala",
    "Video Editor Tirur",
    "Robotics Trainer Kerala",
    "Robotics Instructor Kerala",
    "Best Robotics Trainer Kerala",
    "Best Robotics Instructor Tirur",
    "STEM Trainer Kerala",
    "Tinkering Lab Trainer Kerala",
    "Embedded Systems Engineer Kerala",
    "IoT Developer Kerala",
    "ESP32 Developer Kerala",
    "Raspberry Pi Developer",
    "OpenCV Computer Vision",
    "Meta Ads Specialist Kerala",
    "Facebook Ads Expert Kerala",
    "Instagram Ads Marketer",
    "WhatsApp Lead Generation Kerala",
    "CCNA Network Engineer Kerala",
    "Tinkering Lab STEM",
    "Creative Director Portfolio Kerala",
  ],
  authors: [{ name: "Mohammed Adilsha Afsar M", url: SITE_URL }],
  creator: "Mohammed Adilsha Afsar M",
  publisher: "Mohammed Adilsha Afsar M",
  category: "portfolio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Mohammed Adilsha Afsar M — Performance Marketer, Graphic Designer & Robotics Trainer in Kerala",
    description:
      "Adilsha (Mohd Adilsha) bridges hardware engineering (Raspberry Pi, ESP32, OpenCV, robotics training for 300+ students) with high-converting Meta Ads, graphic design & video editing for Kerala & India brands.",
    url: SITE_URL,
    siteName: "Mohammed Adilsha Afsar M — Portfolio",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Mohammed Adilsha Afsar M (Adilsha) — Performance Marketer, Digital Marketer, Graphic Designer, Video Editor & Robotics Trainer in Kerala, India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Adilsha Afsar M — Performance Marketer, Designer & Robotics Trainer",
    description:
      "Adilsha from Tirur, Kerala: Meta Ads, graphic design, video editing, robotics & STEM training, IoT embedded systems.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "16x16 32x32 48x48" },
      { url: "/icon.png?v=2", sizes: "512x512", type: "image/png" },
      { url: "/icon.svg?v=2", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png?v=2", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico?v=2",
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Mohammed Adilsha Afsar M",
  alternateName: ["Adilsha", "Mohammed Adilsha", "Adilsha Afsar", "Mohd Adilsha", "Adil", "Mohd-Adilsha"],
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  jobTitle: [
    "Performance Marketer",
    "Digital Marketer",
    "Graphic Designer",
    "Video Editor",
    "Robotics Instructor",
    "Robotics Trainer",
    "STEM Trainer",
    "IoT Developer",
    "Embedded Systems Engineer",
  ],
  description:
    "Mohammed Adilsha Afsar M (Adilsha) is a Performance Marketer, Digital Marketer, Graphic Designer, Video Editor, Robotics Instructor, STEM Trainer and IoT Embedded Engineer based in Tirur, Malappuram, Kerala, India.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tirur",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  email: "mailto:mohammedadilshaafsarm@gmail.com",
  telephone: "+91-9946686844",
  sameAs: [
    "https://www.linkedin.com/in/mohd-adilsha",
    "https://www.instagram.com/mohd_adilsha/",
    "https://wa.me/919946686844",
  ],
  knowsAbout: [
    "Performance Marketing",
    "Meta Ads",
    "Digital Marketing",
    "Graphic Design",
    "Video Editing",
    "Robotics Training",
    "STEM Education",
    "Tinkering Lab",
    "Embedded Systems",
    "IoT",
    "ESP32",
    "Raspberry Pi",
    "Arduino",
    "OpenCV",
    "CCNA Networking",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "College of Engineering Vadakara, APJ Abdul Kalam Technological University",
  },
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Mohammed Adilsha Afsar M — Portfolio",
  alternateName: ["Adilsha Portfolio", "Mohammed Adilsha Portfolio"],
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#person` },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
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
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
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
