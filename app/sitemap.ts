import type { MetadataRoute } from "next"
import { projects } from "@/lib/projects"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mohdadilsha.vercel.app"
// Static date keeps sitemap stable between builds (avoids noisy lastModified churn)
const STATIC_DATE = new Date("2026-09-01")
// Update only when the homepage changes; don't claim every URL changed on each build.
const HOME_DATE = new Date("2026-10-19")

const SERVICE_SLUGS = [
  "performance-marketing",
  "digital-marketing",
  "graphic-design",
  "video-editing",
  "robotics-training",
  "stem-trainer",
  "iot-embedded",
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: HOME_DATE, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: STATIC_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/projects`, lastModified: STATIC_DATE, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/services`, lastModified: STATIC_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/marketing`, lastModified: STATIC_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified: STATIC_DATE, changeFrequency: "yearly", priority: 0.6 },
    ...SERVICE_SLUGS.map(
      (slug): MetadataRoute.Sitemap[number] => ({
        url: `${SITE_URL}/services/${slug}`,
        lastModified: STATIC_DATE,
        changeFrequency: "monthly",
        priority: 0.9,
      })
    ),
    ...projects.map(
      (p): MetadataRoute.Sitemap[number] => ({
        url: `${SITE_URL}/projects/${p.slug}`,
        lastModified: STATIC_DATE,
        changeFrequency: "monthly",
        priority: 0.8,
      })
    ),
  ]
}
